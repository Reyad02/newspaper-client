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
import Admin from "../Layout/Admin";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AllUsers from "../pages/AllUsers/AllUsers";
import AdminArticles from "../pages/AdminArticles/AdminArticles";
import AddPublisher from "../pages/AddPublisher/AddPublisher";
import UserPage from "../pages/UserPage/UserPage";
import AdminHome from "../pages/AdminHome/AdminHome";
import ErrorElement from "../error/ErrorElement";



export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Main></Main>,
            errorElement: <ErrorElement></ErrorElement>,
            children: [
                {
                    path: "/",
                    element: <Home></Home>
                },
                {
                    path: "addArticle",
                    element: <PrivateRoute><AddArticle></AddArticle></PrivateRoute>,
                    loader: () => fetch('http://localhost:5000/publishers')
                },
                {
                    path: "allArticles",
                    element: <AllArticle></AllArticle>,
                    loader: () => fetch('http://localhost:5000/articles'),

                },
                {
                    path: "allArticles/details/:id",
                    element: <PrivateRoute><NewsDetails></NewsDetails></PrivateRoute>,
                    loader: ({ params }) => fetch(`http://localhost:5000/details/${params.id}`)
                },
                {
                    path: "premium-individual/details/:id",
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
                    // loader: ({ params }) => fetch(`http://localhost:5000/my-articles/${params.email}`),
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
                },
                {
                    path: "userPage/:email",
                    element: <PrivateRoute><UserPage></UserPage></PrivateRoute>,
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
        {
            path: "/admin",
            element: <AdminPrivateRoute><Admin></Admin></AdminPrivateRoute>,
            children: [
                {
                    path: "adminHome",
                    element: <AdminPrivateRoute><AdminHome></AdminHome></AdminPrivateRoute>,
                    loader: () => fetch('http://localhost:5000/articles-publisher')
                },
                {
                    path: "allUsers",
                    element: <AdminPrivateRoute><AllUsers></AllUsers></AdminPrivateRoute>,
                    // loader: () => fetch('http://localhost:5000/users')
                },
                {
                    path: "articles",
                    element: <AdminPrivateRoute><AdminArticles></AdminArticles></AdminPrivateRoute>,
                    // loader: () => fetch('http://localhost:5000/all-articles')
                },
                {
                    path: "publish",
                    element: <AdminPrivateRoute><AddPublisher></AddPublisher></AdminPrivateRoute>,
                    loader: () => fetch('http://localhost:5000/publishers')
                },
            ]
        }

    ]);

