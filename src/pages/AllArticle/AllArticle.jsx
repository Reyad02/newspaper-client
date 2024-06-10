import { useLoaderData } from "react-router-dom";
import NewsCard from "../Shared/NewsCard/NewsCard";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { colourOptions } from "../AddArticle/jsForSelect/jsForSelect";
import { Helmet } from "react-helmet-async";

const AllArticle = () => {
    const articles = useLoaderData();
    const [searchedArticles, setSearchedArticles] = useState(articles);
    const axiosPublic = useAxiosPublic();
    const [publlishers, setPublishers] = useState([]);

    // const { _id, title, description, photo, publisher } = articles;
    const getValue = e => {
        const searchQuery = e.target.value;

        axiosPublic.get('/getRecentQueries', {
            params: {
                getRecentQueries: searchQuery
            }
        })
            .then(function (response) {
                setSearchedArticles(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getValuefromPublish = e => {
        const searchQuery = e.target.value;
        // console.log(searchQuery);
        axiosPublic.get('/getRecentQueries', {
            params: {
                getPublishQuery: searchQuery
            }
        })
            .then(function (response) {
                setSearchedArticles(response.data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    }

    const getValuefromTags = e => {
        const getTagQuery = e.target.value;
        // console.log(getTagQuery);
        axiosPublic.get('/getRecentQueries', {
            params: {
                getTagQueries: getTagQuery
            }
        })
            .then(function (response) {
                setSearchedArticles(response.data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    }

    useEffect(() => {
        axiosPublic.get('/publishers')
            .then(res => {
                setPublishers(res.data);
            })
    }, [axiosPublic]);

    return (
        <div className="max-w-7xl mx-auto">
              <Helmet>
                    <title>24NEWS | Articles</title>
                </Helmet>
            <label className="input input-bordered flex items-center gap-2 mb-4">
                <input type="text" name="searchQuery" className="grow" onInput={getValue} placeholder="Search" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
            <div className="flex gap-10 justify-center mb-4 items-center">
                <span className="text-lg">Publisher</span>
                <select name="publisher" id="publisher" onInput={getValuefromPublish} className="p-2 rounded-lg bg-base-100 border dropdown text-base input input-bordered" required>
                    <option value="all">All</option>
                    {
                        publlishers.map(p => <option key={p._id} value={p.name}>{p.name}</option>)
                    }
                </select>
                <span className="text-lg">Tags</span>
                <select
                    name="colourOption"
                    id="colourOption"
                    className="p-2 rounded-lg bg-base-100 border dropdown text-base input input-bordered"
                    required
                    onInput={getValuefromTags}
                >
                    <option value="all">All</option>
                    {colourOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    searchedArticles.map(article => <NewsCard key={article._id} article={article}></NewsCard>)
                }
            </div>
        </div>
    );
};

export default AllArticle;