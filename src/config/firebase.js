import firebase from 'firebase/app'

import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    // 各人の認証情報を記述
    apiKey: "AIzaSyAihZTntmeSxSUSZi_C5xj1ZCBukAjLj_I",
    authDomain: "chat-app-6deb0.firebaseapp.com",
    projectId: "chat-app-6deb0",
    storageBucket: "chat-app-6deb0.appspot.com",
    messagingSenderId: "1081315979889",
    appId: "1:1081315979889:web:469002c453d073d32f21d0"
}

firebase.initializeApp(firebaseConfig)

export default firebase