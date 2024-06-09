import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import AuthProvider, { AuthContext } from "../../../provider/AuthProvider";
import { useContext, useEffect } from "react";
import usePremiumUser from "../../../hooks/usePremiumUser";

const NewsCard = ({ article }) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { isPremium } = usePremiumUser(user?.email);

    const { _id, title, description, photo, publisher, isPremium: premiumArticle } = article;

    // useEffect(() => {
    //     axiosPublic.get(`/user/${user?.email}`)
    // }, []);


    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={photo} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                </h2>
                <p>{description.length > 50 ? description.slice(0, 50) + "..." : description}</p>
                {
                    premiumArticle === "not" ? <Link className="btn bg-green-300" to={`details/${_id}`}>Details</Link> : isPremium ? <Link className="btn bg-green-300" to={`details/${_id}`}>Details</Link> : <button className="btn w-full" disabled>Details</button>
                }
            </div>
        </div>
    );
};

export default NewsCard;