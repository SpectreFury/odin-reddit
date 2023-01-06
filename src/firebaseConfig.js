// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdwC05BPfbT7zotUSjd0bt6Mf_XI7fpQ8",
  authDomain: "odin-reddit.firebaseapp.com",
  projectId: "odin-reddit",
  storageBucket: "odin-reddit.appspot.com",
  messagingSenderId: "868206102220",
  appId: "1:868206102220:web:c6cbafcf2eda108cc66469",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
