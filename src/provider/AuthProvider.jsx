import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";
// import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    // const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // const premiumTaken = () => {
    //     // setLoading(true);
    //     return axiosPublic.get(`/user/${user?.email}`) //get user by email
    //             .then(res => {
    //                 if (res.data) {
    //                     if (res.data?.premiumTaken > new Date().toISOString()) {
    //                         // localStorage.setItem('premium', true);
    //                         console.log("premium taken");

    //                     } else {
    //                         // localStorage.removeItem('premium');
    //                         console.log("premium not taken");
    //                     }
    //                 }
    //             })
    // }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // setLoading(false);

            // if (currentUser) {
            //     axiosPublic.get(`/user/${currentUser.email}`) //get user by email
            //         .then(res => {
            //             if (res.data) {
            //                 if (res.data?.premiumTaken > new Date().toISOString()) {
            //                     // localStorage.setItem('premium', true);
            //                     console.log("premium taken");

            //                 } else {
            //                     // localStorage.removeItem('premium');
            //                     console.log("premium not taken");
            //                 }
            //             }
            //         })

            // }

            if (currentUser) {
                const userInfo = { email: currentUser.email }

                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false);
                        }
                    })
            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            console.log("current user: ", currentUser);
        });
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user, loading, createUser, signInUser, logOut, updateUserProfile, googleSignIn, setLoading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;