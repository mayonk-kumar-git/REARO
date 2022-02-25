import React, { useState, createContext } from "react";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyCVAZ1H72O6W69DyIkz58MqTiM5qGXAcT8",
  authDomain: "real-estate-social-media-app.firebaseapp.com",
  projectId: "real-estate-social-media-app",
  storageBucket: "real-estate-social-media-app.appspot.com",
  messagingSenderId: "823921504588",
  appId: "1:823921504588:web:b8376c549db37a942bdfe9",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await app.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await app
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(firebase.auth().currentUser.uid)
                  .set({
                    fname: "User",
                    lname: "Name",
                    about: "--About--",
                    phone: "",
                    country: "",
                    city: "",
                    email: email,
                    createdAt: firebase.firestore.Timestamp.fromDate(
                      new Date()
                    ),
                    userImg: null,
                  });
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await app.auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
