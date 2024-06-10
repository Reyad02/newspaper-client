import { Link } from "react-router-dom";

const ErrorElement = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-white flex-col">
            <img src="https://i.ibb.co/0mNNvbs/404-error-page-not-found.gif" className=" " alt="" />
            <Link to={"/"}><button className="btn bg-[#99C866] text-white border-none outline-none">Go Back Home</button></Link>
        </div>
    );
};

export default ErrorElement;