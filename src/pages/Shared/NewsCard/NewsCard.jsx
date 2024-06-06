import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const NewsCard = ({article}) => {
    const axiosPublic = useAxiosPublic();

    const { _id, title, description, photo, publisher } = article;


    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={photo} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    {/* <div className="badge badge-secondary">{title}</div> */}
                </h2>
                <p>{description.length > 50 ?  description.slice(0,50)+"..." : description}</p>
                {/* <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div> */}
                <Link className="btn bg-green-300" to={`details/${_id}`}>Details</Link>
            </div>
        </div>
    );
};

export default NewsCard;