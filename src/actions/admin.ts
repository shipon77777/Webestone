"use server";

import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

import { db } from "@/lib/firebase";
import { collection, doc, getDoc, setDoc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

export async function uploadFile(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        if (!file) return { success: false, error: 'No file uploaded' };

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename and save to public/uploads
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const uploadDir = path.join(PUBLIC_DIR, 'uploads');

        // Ensure uploads directory exists
        await fs.mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);

        return { success: true, url: `/uploads/${filename}` };
    } catch (error) {
        console.error('Error uploading file:', error);
        return { success: false, error: 'Failed to upload file' };
    }
}

export async function getData(filename: string) {
    try {
        // Remove extension to get doc ID
        const docId = filename.replace('.json', '');
        const docRef = doc(db, "content", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().data;
        } else {
            // Fallback to local file if not in DB yet (migration helper)
            console.log(`Document ${docId} not found in DB, falling back to local file.`);
            try {
                const filePath = path.join(DATA_DIR, filename);
                const fileContent = await fs.readFile(filePath, 'utf-8');
                return JSON.parse(fileContent);
            } catch (localError) {
                console.warn(`Local file ${filename} also not found.`);
                return null;
            }
        }
    } catch (error) {
        console.error(`Error reading ${filename} from DB:`, error);
        return null;
    }
}

export async function saveData(filename: string, data: any) {
    try {
        const docId = filename.replace('.json', '');
        const docRef = doc(db, "content", docId);
        await setDoc(docRef, { data }, { merge: true });
        return { success: true };
    } catch (error) {
        console.error(`Error writing ${filename} to DB:`, error);
        return { success: false, error: 'Failed to save data' };
    }
}

// --- Blog Actions ---

export async function getBlogPosts() {
    try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        // Fallback to unsorted if query fails (e.g. index missing)
        try {
            const querySnapshot = await getDocs(collection(db, "blogs"));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (e) {
            return [];
        }
    }
}

export async function getBlogPostById(id: string) {
    try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching blog post ${id}:`, error);
        return null;
    }
}

export async function saveBlogPost(postData: any) {
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            ...postData,
            createdAt: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error saving blog post:", error);
        return { success: false, error: "Failed to save post" };
    }
}

export async function updateBlogPost(id: string, postData: any) {
    try {
        const docRef = doc(db, "blogs", id);
        await updateDoc(docRef, { ...postData, updatedAt: new Date().toISOString() });
        return { success: true };
    } catch (error) {
        console.error(`Error updating blog post ${id}:`, error);
        return { success: false, error: "Failed to update post" };
    }
}

export async function deleteBlogPost(id: string) {
    try {
        await deleteDoc(doc(db, "blogs", id));
        return { success: true };
    } catch (error) {
        console.error(`Error deleting blog post ${id}:`, error);
        return { success: false, error: "Failed to delete post" };
    }
}
