import { useLoaderData } from "react-router-dom";
import NewsCard from "../Shared/NewsCard/NewsCard";

const AllArticle = () => {
    const articles = useLoaderData();
    // const { _id, title, description, photo, publisher } = articles;
    return (
        <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    articles.map(article => <NewsCard key={article._id} article={article}></NewsCard>)
                }
            </div>
        </div>
    );
};

export default AllArticle;