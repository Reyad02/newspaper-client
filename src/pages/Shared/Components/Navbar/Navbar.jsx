import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../../provider/AuthProvider';
import usePremiumUser from '../../../../hooks/usePremiumUser';

const Navbar = () => {
    const { user, loading, logOut } = useContext(AuthContext);
    const { isPremium } = usePremiumUser(user?.email);


    const navlinks = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/addArticle"}>Add Articles</NavLink></li>
        <li><NavLink to={"allArticles"}>All Articles</NavLink></li>
        <li><a>Subscription</a></li>
        {
            isPremium && <li><NavLink to={"premium-individual"}>Premium Article</NavLink></li>
        }
        <li><NavLink to={`my-article/${user?.email}`}>My Articles</NavLink></li>
        {/* {
            user && 
        } */}


    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navlinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-end">
                {/* {
                    user ? <button className="btn">Logout</button> : <NavLink to="/login" className="btn">Login</NavLink>
                } */}
                {/* <a className="btn">Button</a> */}

                {
                    user ?
                        <>
                            <button onClick={logOut} className="bg-red-500 text-white p-2 rounded-md hover:bg-black mr-4">Logout</button>
                            <img src={user.photoURL} alt="" className='w-10 rounded-full' />
                        </>

                        : <NavLink to="/login" className="bg-green-500 text-black rounded-md p-2">Login</NavLink>
                }
            </div>
        </div>
    );
};

export default Navbar;