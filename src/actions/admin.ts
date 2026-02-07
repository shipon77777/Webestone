"use server";

import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

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
        const filePath = path.join(DATA_DIR, filename);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return null; // Handle error gracefully
    }
}

export async function saveData(filename: string, data: any) {
    try {
        const filePath = path.join(DATA_DIR, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 4), 'utf-8');
        return { success: true };
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        return { success: false, error: 'Failed to save data' };
    }
}
