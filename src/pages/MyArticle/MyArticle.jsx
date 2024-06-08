import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MyArticle = () => {
    const [myArticles, setMyArticles] = useState([])
    const allArticles = useLoaderData();
    const axiosPublic = useAxiosPublic();
    console.log(allArticles)

    const handleDelete = (id) => {
        // console.log(id);
        axiosPublic.delete(`/delete-article/${id}`)
            .then(res => {
                console.log(res.data);
                const filterArticles = myArticles.filter(article => article._id !== id);
                setMyArticles(filterArticles);
            })
    }

    useEffect(() => {
        setMyArticles(allArticles);
    }, [allArticles])
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Premium</th>
                            <th className="flex justify-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myArticles.map((article, index) => {
                                return (
                                    <tr key={article._id}>
                                        <th>{index + 1}</th>
                                        <td>{article.title.length < 40 ? article.title : article.title.slice(0, 40) + "..."}</td>
                                        <td>{article.status}</td>
                                        <td>{article.isPremium === "yes" ? "Premium" : "Not Premium"}</td>
                                        <td className="flex justify-evenly">
                                            <Link className="btn btn-sm btn-primary" to={`details/${article._id}`}>Details</Link>
                                            <Link className="btn btn-sm btn-warning" to={`update/${article._id}`}>Update</Link>
                                            <button onClick={() => handleDelete(article._id)} className="btn btn-sm btn-error">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyArticle;