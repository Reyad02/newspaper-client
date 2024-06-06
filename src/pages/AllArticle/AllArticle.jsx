import { useLoaderData } from "react-router-dom";
import NewsCard from "../Shared/NewsCard/NewsCard";

const AllArticle = () => {
    const articles = useLoaderData();
    // const { _id, title, description, photo, publisher } = articles;
    return (
        <div>
            <div className="grid grid-cols-3 gap-10">
                {
                    articles.map(article => <NewsCard key={article._id} article={article}></NewsCard>)
                }
            </div>
        </div>
    );
};

export default AllArticle;