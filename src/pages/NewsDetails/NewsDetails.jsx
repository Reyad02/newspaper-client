import { useLoaderData } from "react-router-dom";

const NewsDetails = () => {
    const loadNews = useLoaderData();
    const { _id, title, description, photo, publisher, tags } = loadNews;

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={photo} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="py-6">{description}</p>
                    {/* <button className="btn btn-primary">Get Started</button> */}
                    <p>Author: {publisher}</p>
                    <div>Tags: {tags.map((tag, idx)=> <div className="badge badge-primary mr-2 uppercase" key={idx}>{tag}</div>)}</div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetails;