// import { useContext, useEffect } from "react";
// import { useLoaderData } from "react-router-dom";
// import { AuthContext } from "../../provider/AuthProvider";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

// const NewsDetails = () => {
//     const loadNews = useLoaderData();
//     const { _id, title, description, photo, publisher, tags } = loadNews;
//     const { user } = useContext(AuthContext);
//     const axiosPublic = useAxiosPublic();
//     useEffect(() => {
//         if (user?.email !== publisher) {
//             axiosPublic.put(`news/${_id}`)
//                 .then(res => {
//                     console.log(res.data);
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 })
//         }
//     }, [user, publisher, _id, axiosPublic]);

//     return (
//         <div className="hero min-h-screen bg-base-200">
//             <div className="hero-content flex-col lg:flex-row-reverse">
//                 <img src={photo} className="max-w-sm rounded-lg shadow-2xl" />
//                 <div>
//                     <h1 className="text-5xl font-bold">{title}</h1>
//                     <p className="py-6">{description}</p>
//                     {/* <button className="btn btn-primary">Get Started</button> */}
//                     <p>Author: {publisher}</p>
//                     <div>Tags: {tags.map((tag, idx) => <div className="badge badge-primary mr-2 uppercase" key={idx}>{tag}</div>)}</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NewsDetails;


import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const NewsDetails = () => {
    const loadNews = useLoaderData();
    const { _id, title, description, photo, publisher, tags, author, postedDate } = loadNews;
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        if (user?.email !== author) {
            const updateViews = async () => {
                try {
                    const response = await axiosPublic.put(`news/${_id}`);
                    // console.log('View count updated:', response.data);
                } catch (error) {
                    // console.error('Error updating view count', error);
                }
            };
            updateViews();
        }
    }, [_id, axiosPublic, author, user.email]);

    return (
        <div className="hero min-h-screen bg-base-200">
              <Helmet>
                    <title>24NEWS | News</title>
                </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={photo} className="max-w-sm rounded-lg shadow-2xl" alt={title} />
                <div>
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="py-6">{description}</p>
                    <div className="space-y-1">
                        <p>Author: {author}</p>
                        <p>Publisher: {publisher}</p>
                        <div>Tags: {tags.map((tag, idx) => (
                            <div className="badge badge-primary mr-2 uppercase" key={idx}>{tag}</div>
                        ))}
                        </div>
                        {
                            postedDate && <p>Posted on: {new Date(postedDate).toISOString().split('T')[0]}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetails;
