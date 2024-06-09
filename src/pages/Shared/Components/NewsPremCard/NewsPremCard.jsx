import { Link } from "react-router-dom";
import { useContext } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../provider/AuthProvider";
import usePremiumUser from "../../../../hooks/usePremiumUser";

const NewsPremCard = ({ article }) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { isPremium } = usePremiumUser(user?.email);
    const { _id, title, description, photo, publisher, isPremium: premiumArticle } = article;

    return (
        <>
            <div className={`card w-96 ${premiumArticle === "not" ? `bg-yellow-50 opacity-80 text-black` : `bg-base-100`} shadow-xl`}>
                <figure><img src={photo} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {title}
                    </h2>
                    <p>{description.length > 50 ? description.slice(0, 50) + "..." : description}</p>
                    {
                        premiumArticle === "not" ? <Link className="btn bg-blue-300 text-black border-none outline-none" to={`details/${_id}`}>Details</Link> : isPremium ? <Link className="btn bg-blue-300 text-black border-none outline-none" to={`details/${_id}`}>Details</Link> : <button className="btn bg-blue-300 w-full text-black border-none outline-none" disabled>Details</button>
                    }
                </div>
            </div >

        </>
    );
};

export default NewsPremCard;