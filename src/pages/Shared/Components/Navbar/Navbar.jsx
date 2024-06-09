import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../../provider/AuthProvider';
import usePremiumUser from '../../../../hooks/usePremiumUser';
import useAdmin from '../../../../hooks/useAdmin';

const Navbar = () => {
    const { user, loading, logOut } = useContext(AuthContext);
    const { isPremium } = usePremiumUser(user?.email);
    const [isAdmin, adminLoading] = useAdmin(user?.email);
    console.log("isAdmin", isAdmin);

    // const [isAdmin, adminLoading] = useAdmin(user?.email);
    // console.log(isAdmin);
    // if (loading || adminLoading) return <p>Loading...</p>;

    const navlinks = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"addArticle"}>Add Articles</NavLink></li>
        <li><NavLink to={"allArticles"}>All Articles</NavLink></li>
        <li><a>Subscription</a></li>
        {
            isPremium && <li><NavLink to={"premium-individual"}>Premium Article</NavLink></li>
        }
        {
            isAdmin && <li><NavLink to={"admin"}>Dashboard</NavLink></li>
        }

        <li><NavLink to={`my-article/${user?.email}`}>My Articles</NavLink></li>
        


    </>
    return (
        <div className="navbar bg-base-100 max-w-7xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navlinks}
                    </ul>
                </div>
                <Link to={"/"} className="btn btn-ghost text-xl"><img src="https://i.ibb.co/c2QQ1h6/images-removebg-preview.png" alt="" className='w-36' /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <>
                            <button onClick={logOut} className=" text-gray-400 p-2 rounded-md hover:bg-black mr-4">Logout</button>
                            <img src={user.photoURL} alt="" className='w-10 rounded-full' />
                        </>

                        : <NavLink to="/login" className="text-gray-400 rounded-md p-2">Login</NavLink>
                }
            </div>
        </div>
    );
};

export default Navbar;