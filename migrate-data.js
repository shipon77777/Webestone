
const fs = require('fs');
const path = require('path');
const { initializeApp, getApps, getApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

// 1. Initialize Firebase (Ensure this matches your client config)
const firebaseConfig = {
    apiKey: "AIzaSyDm_QjRdUc4JqCClZddkYCMYV1a-waw-N4",
    authDomain: "webestone.firebaseapp.com",
    projectId: "webestone",
    storageBucket: "webestone.firebasestorage.app",
    messagingSenderId: "1043179120897",
    appId: "1:1043179120897:web:5ad63d0505bba242695300",
    measurementId: "G-72YLE20X0K"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// 2. Define Data Directory
const DATA_DIR = path.join(__dirname, 'src/data');

// 3. Migration Function
async function migrateData() {
    console.log("Starting data migration to Firestore...");

    try {
        const files = await fs.promises.readdir(DATA_DIR);

        for (const file of files) {
            if (path.extname(file) === '.json') {
                const docId = file.replace('.json', ''); // e.g., 'services', 'site'
                const filePath = path.join(DATA_DIR, file);

                try {
                    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
                    const data = JSON.parse(fileContent);

                    if (data) {
                        console.log(`Migrating ${file} to collection 'content', document '${docId}'...`);

                        // Write to Firestore
                        await setDoc(doc(db, "content", docId), { data: data }, { merge: true });
                        console.log(`✅ Successfully migrated ${file}`);
                    }
                } catch (readError) {
                    console.error(`❌ Error reading/parsing ${file}:`, readError.message);
                }
            }
        }

        console.log("\n🎉 Data migration complete!");
        process.exit(0);

    } catch (err) {
        console.error("❌ Migration failed:", err);
        process.exit(1);
    }
}

// Run Migration
migrateData();
