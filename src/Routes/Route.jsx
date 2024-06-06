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
                    loader: () =>  fetch('http://localhost:5000/articles') ,

                },
                {
                    path: "allArticles/details/:id",
                    element: <PrivateRoute><NewsDetails></NewsDetails></PrivateRoute>,
                    loader: ({params}) =>  fetch(`http://localhost:5000/details/${params.id}`) 
                },

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

