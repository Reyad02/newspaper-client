import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const { user, updateUserProfile, setLoading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value || user?.displayName;
        const imageFile = form.photo.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        if (imageFile) {
            fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_key}`, {
                method: "POST",
                body: formData,
            }).then(res => res.json())
                .then(data => {
                    const userInfo = {
                        name: name,
                        photo: data.data.display_url,
                    }
                    axiosPublic.put(`/update-user/${user?.email}`, userInfo)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                updateUserProfile(name, data.data.display_url)
                                setLoading(false);
                                Swal.fire({
                                    position: "center",
                                    title: "Updates!",
                                    text: "Profile updated successfully!",
                                    icon: "success",
                                    timer: 1500
                                });
                                navigate("/");
                            }
                        })
                })
        } else if (!imageFile) {
            const userInfo = {
                name: name,
                photo: user?.photoURL
            }
            axiosPublic.put(`/update-user/${user?.email}`, userInfo)
                .then(res => {
                    if (res.data.modifiedCount) {
                        updateUserProfile(name, user?.photoURL)
                        // console.log(user);
                        setLoading(false);
                        Swal.fire({
                            position: "center",
                            title: "Updates!",
                            text: "Profile updated successfully!",
                            icon: "success",
                            timer: 1500
                        });
                        // navigate("/");
                    }
                })
        }
    }
    return (
        <div className='max-w-7xl mx-auto'>
            <form className="card-body" onSubmit={handleUser}>
                <div className="form-control ">
                    <div className=' flex justify-center'>
                        <img src={user?.photoURL} alt="" className='w-20 rounded-md justify-center items-center ' />
                    </div>
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" name="photo" className="" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" defaultValue={user?.displayName} name="name" placeholder="Title" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" defaultValue={user?.email} readOnly name="email" placeholder="Title" className="input input-bordered" />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UserPage;