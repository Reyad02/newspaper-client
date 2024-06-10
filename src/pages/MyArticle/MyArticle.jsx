import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";

const MyArticle = () => {
    const [myArticles, setMyArticles] = useState([])
    // const allArticles = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [declineReason, setDeclineReason] = useState("");
    // console.log(allArticles)
    const { user } = useContext(AuthContext);
    const { email } = useParams(); // Get the email from the URL params
    console.log("params emAIL", email)

    const handleDelete = (id) => {
        // console.log(id);
        axiosPublic.delete(`/delete-article/${id}`)
            .then(res => {
                console.log(res.data);
                const filterArticles = myArticles.filter(article => article._id !== id);
                setMyArticles(filterArticles);
            })
    }

    const handleDecline = (reason) => {
        console.log(reason);
        setDeclineReason(reason);
        document.getElementById('my_modal_2').showModal()
    }

    useEffect(() => {
        axiosSecure.get(`/my-articles/${email}`)
            .then(res => {
                console.log(res.data);
                setMyArticles(res.data);
            })
            .catch(err => {
                console.error('Failed to fetch articles:', err);
            });

    }, [axiosSecure, email])
    return (
        <div className="max-w-7xl mx-auto">
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
                                        {/* <td>{article.status}</td> */}
                                        <td>{article.status === "declined" ? <><p>{article.status}</p><button className="btn btn-xs mt-2 bg-blue-200 text-gray-600" onClick={() => handleDecline(article?.declineReason)}>Reason</button></> : <>{article.status}</>}</td>
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
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center text-red-400">Decline Reason: {declineReason}</h3>
                    {/* <p className="py-4">Press ESC key or click outside to close</p> */}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default MyArticle;