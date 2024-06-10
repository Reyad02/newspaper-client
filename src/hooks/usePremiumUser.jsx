import { useState, useEffect } from 'react';
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from './useAxiosSecure';

const usePremiumUser = (email) => {
    const [isPremium, setIsPremium] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!email) return;

        const fetchUserData = () => {
            axiosSecure.get(`/user/${email}`) //get user by email
                .then(res => {
                    if (res.data) {
                        if (res.data?.premiumTaken > new Date().toISOString()) {
                            // localStorage.setItem('premium', true);
                            console.log("premium taken");
                            setIsPremium(true);

                        } else {
                            axiosPublic.put(`update-user-premium/${email}`)
                            .then(res => {
                                console.log(res.data);
                            })
                            console.log("premium not taken");
                            setIsPremium(false);
                        }
                    }
                })
        };

        fetchUserData();
    }, [email, axiosPublic]);

    return { isPremium };
};

export default usePremiumUser;
