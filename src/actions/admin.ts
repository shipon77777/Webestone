"use server";

import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
