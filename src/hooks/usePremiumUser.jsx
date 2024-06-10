import { useState, useEffect } from 'react';
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from './useAxiosSecure';

const usePremiumUser = (email) => {
    const [isPremium, setIsPremium] = useState(false);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!email) return;

        const fetchUserData = () => {
            axiosPublic.get(`/user/${email}`) //get user by email
                .then(res => {
                    if (res.data) {
                        if (res.data?.premiumTaken> new Date().toISOString()) {
                            // localStorage.setItem('premium', true);
                            // console.log("premium taken");
                            setIsPremium(true);
                            console.log("premium taken", isPremium)

                        } else {
                            axiosPublic.put(`update-user-premium/${email}`)
                                .then(res => {
                                    console.log(res.data);
                                })
                            // console.log("premium not taken");
                            setIsPremium(false);
                            console.log("premium not taken", isPremium)
                        }
                    }
                })
        };

        fetchUserData();
    }, [isPremium,email, axiosPublic, axiosSecure]);

    return { isPremium };
};

export default usePremiumUser;
