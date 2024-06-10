import { useContext, useEffect, useState } from "react";
import usePremiumUser from "../../hooks/usePremiumUser";
import { AuthContext } from "../../provider/AuthProvider";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import NewsCard from "../Shared/NewsCard/NewsCard";
import NewsPremCard from "../Shared/Components/NewsPremCard/NewsPremCard";
import { useNavigate } from "react-router-dom";

const PremiumArticle = () => {
    const { user, logOut } = useContext(AuthContext);
    const { isPremium } = usePremiumUser(user?.email);
    const [premiumArticles, setPremiumArticles] = useState([]);
    const [premiumAuthors, setPremiumAuthors] = useState([]);
    const navigate = useNavigate();


    const getValuefromPublish = e => {
        const searchQuery = e.target.value;
        console.log(searchQuery);
        axiosPublic.get('/getAuthorQueries', {
            params: {
                getAuthor: searchQuery
            }
        })
            .then(function (response) {
                setPremiumArticles(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        if (!isPremium) {
            logOut();
            navigate("/login")

        }
        axiosPublic.get("/premiumArticles")
            .then(res => {
                setPremiumArticles(res.data);
                console.log(res.data);
            })

        axiosPublic.get("/allAuthors")
            .then(res => {
                const uniqueAuthors = Array.from(new Set(res.data));
                setPremiumAuthors(uniqueAuthors);
                console.log(uniqueAuthors);
            })
            .catch(err => console.error(err));

    }, []);
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex gap-10 justify-center mb-4 items-center">
                <span className="text-lg">Author</span>
                <select name="publisher" id="publisher" onInput={getValuefromPublish} className="p-2 rounded-lg bg-base-100 border dropdown text-base input input-bordered" required>
                    <option value="all">All</option>
                    {
                        premiumAuthors.map(p => <option key={p} value={p}>{p}</option>)
                    }
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    premiumArticles.map(article => <NewsPremCard key={article._id} article={article}></NewsPremCard>)
                }
            </div>
        </div>
    );
};

export default PremiumArticle;