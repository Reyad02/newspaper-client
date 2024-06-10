import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
    const users = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const [allUsers, setAllusers] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const fetchUsers = async (page = 1) => {
        const response = await axiosPublic.get(`/admin-users?page=${page}&limit=5`);
        setAllusers(response.data.users);
        setTotalPages(response.data.totalPages);
    };

    // console.log(users);

    const handleMakeAdmin = (id) => {
        axiosPublic.put(`/update-user-role/${id}`)
            .then(res => {
                // console.log(res.data);
                setAllusers(prevUsers => prevUsers.map(user =>
                    user._id === id ? { ...user, role: 'admin' } : user
                ));
            })
    }

    useEffect(() => {
        fetchUsers(page);
    }, [page]);


    return (
        <div className=" mx-auto">
            <Helmet>
                <title>24NEWS | All Users</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table  md:mt-0">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map(user => {
                                return (
                                    <tr key={user._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user.photo} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.name}
                                            <div className="text-sm text-gray-500">{user.role}</div>

                                        </td>
                                        <td>{user.email}</td>
                                        <th>
                                            {
                                                user.role === "admin" ? <p className="text-blue-400 ">Admin</p> : <button className="btn btn-ghost btn-xs" onClick={() => handleMakeAdmin(user._id)}>Set Admin</button>
                                            }
                                        </th>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            <div className="flex justify-center my-8">
                <div className="join">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`join-item btn ${page === index + 1 ? "btn-active" : ""}`}
                            onClick={() => setPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;