import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { FacebookAuthProvider } from "firebase/auth/web-extension";

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get(`/admin/${email}`)
            .then(res => {
                if (res.data.length > 0) {
                    // console.log(email)
                    setIsAdmin(true);
                    setAdminLoading(false);
                }
                else{
                    // console.log(email)
                    setIsAdmin(false);
                    setAdminLoading(true);
                }
                // console.log(res.data);
                // console.log("Called");
            })
            .catch(err => {
                // console.error(err);
                setIsAdmin(false);
                setAdminLoading(true);
            });
    }, [email, axiosPublic]);

    return [isAdmin, adminLoading];
};

export default useAdmin;
