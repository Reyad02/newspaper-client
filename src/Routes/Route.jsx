import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Login from "../Layout/Login";
import Signup from "../pages/Signup/Signup";
import AddArticle from "../pages/AddArticle/AddArticle";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AllArticle from "../pages/AllArticle/AllArticle";
import NewsDetails from "../pages/NewsDetails/NewsDetails";
import IndividualSubscriptionPage from "../pages/Subscription/IndividualSubscription/IndividualSubscriptionPage";
import PremiumArticle from "../pages/PremiumArticle/PremiumArticle";
import MyArticle from "../pages/MyArticle/MyArticle";
import UpdateNews from "../pages/UpdateNews/UpdateNews";



export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Main></Main>,
            children: [
                {
                    path: "/",
                    element: <Home></Home>
                },
                {
                    path: "addArticle",
                    element: <PrivateRoute><AddArticle></AddArticle></PrivateRoute>,
                },
                {
                    path: "allArticles",
                    element: <PrivateRoute><AllArticle></AllArticle></PrivateRoute>,
                    loader: () => fetch('http://localhost:5000/articles'),

                },
                {
                    path: "allArticles/details/:id",
                    element: <PrivateRoute><NewsDetails></NewsDetails></PrivateRoute>,
                    loader: ({ params }) => fetch(`http://localhost:5000/details/${params.id}`)
                },
                {
                    path: "individual-Subscription",
                    element: <PrivateRoute><IndividualSubscriptionPage></IndividualSubscriptionPage></PrivateRoute>,
                },
                {
                    path: "premium-individual",
                    element: <PrivateRoute><PremiumArticle></PremiumArticle></PrivateRoute>,
                },
                {
                    path: "my-article/:email",
                    element: <PrivateRoute><MyArticle></MyArticle></PrivateRoute>,
                    loader: ({ params }) => fetch(`http://localhost:5000/my-articles/${params.email}`),
                },
                {
                    path: "my-article/:email/details/:id",
                    element: <PrivateRoute><NewsDetails></NewsDetails></PrivateRoute>,
                    loader: ({ params }) => fetch(`http://localhost:5000/details/${params.id}`)
                },
                {
                    path: "my-article/:email/update/:id",
                    element: <PrivateRoute><UpdateNews></UpdateNews></PrivateRoute>,
                    loader: ({ params }) => fetch(`http://localhost:5000/details/${params.id}`)
                }

            ],

        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/signUp",
            element: <Signup></Signup>
        },

    ]);

