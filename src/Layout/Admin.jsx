import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import Navbar from '../pages/Shared/Components/Navbar/Navbar';
import { IoReorderThree } from 'react-icons/io5';

const Admin = () => {
    const [isAdmin, adminLoading] = useAdmin();
    // console.log(admin);
    return (
        <>
            {/* <Navbar></Navbar> */}
            <div className="flex flex-col items-start lg:flex-row gap-4">
                <div className="">
                    {/* <ul className="menu text-black">
                        {
                            <div className='fixed '>
                                <li><NavLink to="/admin/allUsers">
                                    All Users
                                </NavLink></li>
                                <li><NavLink to="/admin/articles">
                                    All Articles
                                </NavLink></li>
                                <li><NavLink to="/admin/publish">
                                    Add Publishers
                                </NavLink></li>
                            </div>

                        }
                    </ul> */}
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center ">
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden ml-14 md:ml-10 mt-4 z-10"><IoReorderThree /></label>
                        </div>
                        <div className="drawer-side z-10">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu md:w-64 min-h-full bg-red-400 text-base-content">
                                <li><NavLink to="/">
                                    Home
                                </NavLink></li>
                                <li><NavLink to="/admin/adminHome">
                                    Admin Home
                                </NavLink></li>
                                <li><NavLink to="/admin/allUsers">
                                    All Users
                                </NavLink></li>
                                <li><NavLink to="/admin/articles">
                                    All Articles
                                </NavLink></li>
                                <li><NavLink to="/admin/publish">
                                    Add Publishers
                                </NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-1 mx-auto">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Admin;