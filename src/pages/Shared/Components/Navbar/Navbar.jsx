import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../../provider/AuthProvider';

const Navbar = () => {
    const { user, loading, logOut } = useContext(AuthContext);

    const navlinks = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><a>Add Articles</a></li>
        <li><a>All Articles</a></li>
        <li><a>Subscription</a></li>
        {/* {
            user && 
        } */}
        <li><a>Subscription</a></li>
        {
            user ? <button onClick={logOut} className="bg-red-500 text-white px-2 rounded-md hover:bg-black">Logout</button> : <NavLink to="/login" className="bg-green-500 text-black rounded-md p-2">Login</NavLink>
        }

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
            </div>
        </div>
    );
};

export default Navbar;