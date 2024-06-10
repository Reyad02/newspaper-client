import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const AdminArticles = () => {
    const [allArticles, setAllArticles] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentArticleId, setCurrentArticleId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchArticles = async (page = 1) => {
        const response = await axiosPublic.get(`/admin-all-articles?page=${page}&limit=6`);
        setAllArticles(response.data.articles);
        setTotalPages(response.data.totalPages);
    };


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
        const reason = event.target.reason.value;

        axiosPublic.put(`/reason-decline/${currentArticleId}`, { reason })
            .then(res => {
                setAllArticles(prevArticles => prevArticles.map(article => article._id === currentArticleId ? { ...article, status: 'declined' } : article));
                setShowModal(false);
            });
    };

    useEffect(() => {
        fetchArticles(page);

        axiosPublic.get('/users')
            .then(res => {
                setUsers(res.data);
            });
    }, [page, axiosPublic]);

    return (
        <div className="mx-auto ">
              <Helmet>
                    <title>24NEWS | Articles</title>
                </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allArticles.map((article) => (
                    <div key={article._id} className="card bg-base-100  shadow-xl">
                        <figure className="px-10 h-full pt-10">
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
            <div className="flex justify-center my-8">
                <div className="join ">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`join-item btn ${page === index + 1 ? 'btn-active' : ''}`}
                            onClick={() => setPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminArticles;
