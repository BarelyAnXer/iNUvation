import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAvO4MxTSZRFx7rcFpCrIXPjFLy_qBJpxU",
    authDomain: "voting-a6010.firebaseapp.com",
    projectId: "voting-a6010",
    storageBucket: "voting-a6010.appspot.com",
    messagingSenderId: "919048184639",
    appId: "1:919048184639:web:4b30763d266815ec1de98a",
    databaseURL: "https://voting-a6010-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const rtdb = getDatabase(app);