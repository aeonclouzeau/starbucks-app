// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCRVk9ZrHlvHZgyz6lUsgkFLCR0RciZD3k",
	authDomain: "test-project-firebase28.firebaseapp.com",
	projectId: "test-project-firebase28",
	storageBucket: "test-project-firebase28.appspot.com",
	messagingSenderId: "844848901840",
	appId: "1:844848901840:web:1ace99c5521709db3af8d5",
	measurementId: "G-31C1XQH5NL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase
const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const database = getDatabase(app);
export const db = getFirestore(app);
