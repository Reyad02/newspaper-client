import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import Navbar from '../pages/Shared/Components/Navbar/Navbar';

const Admin = () => {
    const [isAdmin, adminLoading] = useAdmin();
    // console.log(admin);
    return (
        <>
            <Navbar></Navbar>
            <div className="flex gap-4">
                <div className="w-64 min-h-full bg-[#D1A054]">
                    <ul className="menu text-black">
                        <li className="text-center"><p className="font-semibold text-3xl">Newspaper</p></li>
                        {
                            <>
                                <li><NavLink to="/admin/allUsers">
                                    All Users
                                </NavLink></li>
                                <li><NavLink to="/dashboard/addItems">
                                    All Articles
                                </NavLink></li>
                                <li><NavLink to="/dashboard/manageItems">
                                    Add Publishers
                                </NavLink></li>
                            </>

                        }


                    </ul>
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Admin;