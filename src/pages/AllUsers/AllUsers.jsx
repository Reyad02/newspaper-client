import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const AllUsers = () => {
    const users = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const [allUsers, setAllusers] = useState([])


    // console.log(users);

    const handleMakeAdmin = (id) => {
        axiosPublic.put(`/update-user-role/${id}`)
            .then(res => {
                console.log(res.data);
                setAllusers(prevUsers => prevUsers.map(user =>
                    user._id === id ? { ...user, role: 'admin' } : user
                ));
                // setAllusers(users)
            })
    }

    useEffect(() => {
        setAllusers(users);
    }, [users]);


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
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
        </div>
    );
};

export default AllUsers;