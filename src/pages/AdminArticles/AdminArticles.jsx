// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

// const AdminArticles = () => {
//     const allLoadedArticles = useLoaderData();
//     const [allArticles, setAllArticles] = useState([]);
//     const axiosPublic = useAxiosPublic();
//     const [users, setUsers] = useState([]);

//     const handleArticleApprove = (id) => {
//         axiosPublic.put(`/approve-article/${id}`)
//             .then(res => {
//                 // console.log(res.data);
//                 setAllArticles(prevArticles => prevArticles.map(article => article._id === id ? { ...article, status: 'approved' } : article));
//             })
//     }

//     const handePremiumArticle = (id) => {
//         axiosPublic.put(`/update-article-premium/${id}`)
//             .then(res => {
//                 // console.log(res.data);
//                 setAllArticles(prevArticles => prevArticles.map(article => article._id === id ? { ...article, isPremium: 'yes' } : article))
//             })
//     }

//     const handleDeleteArticle = (id) => {
//         axiosPublic.delete(`/delete-article/${id}`)
//             .then(res => {
//                 // console.log(res.data);
//                 // setAllArticles(prevArticles => prevArticles.map(article => article._id === id ? { ...article, isPremium: 'yes' } : article))
//                 const filterArticles = allArticles.filter(article => article._id !== id);
//                 setAllArticles(filterArticles);
//             })
//     }

//     // const handleDecline = (id) => {
//     //     const modal = document.getElementById('my_modal_3').showModal();
//     //     // handleSaveReason(id);
//     // }

//     const handleSaveReason = (event, id) => {
//         event.preventDefault();
//         const form = event.target;
//         const reason = form.reason.value;
//         // const id = id;
//         axiosPublic.put(`/reason-decline/${id}`, { reason })
//             .then(res => {
//                 // console.log(res.data);
//                 setAllArticles(prevArticles => prevArticles.map(article => article._id === id ? { ...article, status: 'declined' } : article));
//                 document.getElementById('my_modal_3').close();
//             })
//     }


//     useEffect(() => {
//         setAllArticles(allLoadedArticles);
//         axiosPublic.get('/users')
//             .then(res => {
//                 // console.log(res.data);
//                 setUsers(res.data);
//             })
//     }, [allLoadedArticles, axiosPublic])

//     return (
//         <div className="grid grid-cols-3 gap-10">
//             {
//                 allArticles.map((article) => (<>
//                     <div key={article._id} className="card w-96 bg-base-100 shadow-xl">
//                         <figure className="px-10 pt-10">
//                             <img src={article.photo} alt={article.title} className="rounded-xl" />
//                         </figure>
//                         <div className="card-body items-center text-center">
//                             <h2 className="card-title">{article.title}</h2>
//                             {
//                                 users.map(user => {
//                                     if (user.email === article.author) {
//                                         return (
//                                             <div className="flex gap-4 items-center" key={user._id}>
//                                                 <img src={user.photo} alt="" className="w-6 rounded-full" />
//                                                 <p key={user._id} className="ml-2">Author Name: {user.name}</p>
//                                             </div>

//                                         )
//                                     }
//                                 })
//                             }
//                             <p>Author Email: {article.author}</p>
//                             <p>Posted Date: {article.postedDate}</p>
//                             <p>Status: {article.status}</p>
//                             <p>Publisher: {article.publisher}</p>
//                             <div className="card-actions">
//                                 {
//                                     article.status === "pending" ? <>
//                                         <button className="btn btn-primary btn-xs" onClick={() => handleArticleApprove(article._id)}>Approve</button> <button className="btn btn-primary btn-xs" onClick={() => document.getElementById('my_modal_3').showModal()}>Decline</button>
//                                     </>
//                                         : <span className="text-xs text-green-400">{article.status}</span>
//                                 }
//                                 <button className="btn btn-primary btn-xs" onClick={() => handleDeleteArticle(article._id)}>Delete</button>
//                                 {
//                                     article.isPremium === "not" ? <button className="btn btn-primary btn-xs" onClick={() => handePremiumArticle(article._id)}>Make Premium</button> : <span className="text-xs text-green-400">Premium</span>
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                     <dialog id="my_modal_3" className="modal">
//                         <div className="modal-box">
//                             <form method="dialog">
//                                 {/* if there is a button in form, it will close the modal */}
//                                 <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                             </form>
//                             <h3 className="font-bold text-lg">Reason</h3>
//                             <p className="py-4 text-xs text-gray-400">Press ESC key or click on ✕ button to close</p>
//                             <form onSubmit={() => handleSaveReason(article._id)}>
//                                 <textarea name="reason" className="w-full h-24" placeholder="Enter Reason"></textarea>
//                                 <button className="btn">Save</button>
//                             </form>
//                         </div>
//                     </dialog>
//                 </>
//                 ))
//             }

//         </div>
//     );
// };

// export default AdminArticles;


import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AdminArticles = () => {
    const allLoadedArticles = useLoaderData();
    const [allArticles, setAllArticles] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentArticleId, setCurrentArticleId] = useState(null);

    const handleArticleApprove = (id) => {
        axiosPublic.put(`/approve-article/${id}`)
            .then(res => {
                setAllArticles(prevArticles => prevArticles.map(article => article._id === id ? { ...article, status: 'approved' } : article));
            });
    };

    const handePremiumArticle = (id) => {
        axiosPublic.put(`/update-article-premium/${id}`)
            .then(res => {
                setAllArticles(prevArticles => prevArticles.map(article => article._id === id ? { ...article, isPremium: 'yes' } : article));
            });
    };

    const handleDeleteArticle = (id) => {
        axiosPublic.delete(`/delete-article/${id}`)
            .then(res => {
                const filterArticles = allArticles.filter(article => article._id !== id);
                setAllArticles(filterArticles);
            });
    };

    const handleDecline = (id) => {
        setCurrentArticleId(id);
        setShowModal(true);
    };

    const handleSaveReason = (event) => {
        event.preventDefault();
        // console.log("ID: ", currentArticleId);
        const reason = event.target.reason.value;

        axiosPublic.put(`/reason-decline/${currentArticleId}`, { reason })
            .then(res => {
                setAllArticles(prevArticles => prevArticles.map(article => article._id === currentArticleId ? { ...article, status: 'declined' } : article));
                setShowModal(false);
            });
    };

    useEffect(() => {
        setAllArticles(allLoadedArticles);
        axiosPublic.get('/users')
            .then(res => {
                setUsers(res.data);
            });
    }, [allLoadedArticles, axiosPublic]);

    return (
        <div className="mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allArticles.map((article) => (
                    <div key={article._id} className="card bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={article.photo} alt={article.title} className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{article.title}</h2>
                            {users.map(user => (
                                user.email === article.author && (
                                    <div className="flex gap-4 items-center" key={user._id}>
                                        <img src={user.photo} alt="" className="w-6 rounded-full" />
                                        <p className="ml-2">Author Name: {user.name}</p>
                                    </div>
                                )
                            ))}
                            <p>Author Email: {article.author}</p>
                            {
                                article.postedDate && <p>Posted Date: {new Date(article.postedDate).toISOString().split('T')[0]}</p>
                            }
                            {/* <p>Posted Date: {article.postedDate && new Date(article.postedDate).toISOString().split('T')[0]}</p> */}
                            <p>Status: {article.status}</p>
                            <p>Publisher: {article.publisher}</p>
                            <div className="card-actions">
                                {article.status === "pending" ?
                                    <>
                                        <button className="btn btn-primary btn-xs" onClick={() => handleArticleApprove(article._id)}>Approve</button>
                                        <button className="btn btn-primary btn-xs" onClick={() => handleDecline(article._id)}>Decline</button>
                                    </>
                                    :
                                    <span className="text-xs text-green-400">{article.status}</span>
                                }
                                <button className="btn btn-primary btn-xs" onClick={() => handleDeleteArticle(article._id)}>Delete</button>
                                {article.isPremium === "not" ? (
                                    <button className="btn btn-primary btn-xs" onClick={() => handePremiumArticle(article._id)}>Make Premium</button>
                                ) : (
                                    <span className="text-xs text-green-400">Premium</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {showModal && (
                    <dialog id="my_modal_3" className="modal" open>
                        <div className="modal-box">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setShowModal(false)}>✕</button>
                            <h3 className="font-bold text-lg">Reason</h3>
                            <p className="py-4 text-xs text-gray-400">Press ESC key or click on ✕ button to close</p>
                            <form onSubmit={handleSaveReason}>
                                <textarea name="reason" className="w-full h-24" placeholder="Enter Reason"></textarea>
                                <button className="btn">Save</button>
                            </form>
                        </div>
                    </dialog>
                )}
            </div>
        </div>
    );
};

export default AdminArticles;
