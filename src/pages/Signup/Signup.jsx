import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const Signup = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleForm = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const imageFile = form.photo.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_key}`, {
            method: "POST",
            body: formData,
        }).then(res => res.json())
            .then(data => {
                createUser(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        updateUserProfile(name, data.data.display_url)
                            .then(() => {
                                const userInfo = {
                                    name: name,
                                    email: email,
                                    photo: data.data.display_url,
                                    role: "user",
                                    premiumTaken: null,
                                }
                                axiosPublic.post('/users', userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            Swal.fire({
                                                position: "center",
                                                title: "Registered!",
                                                text: "Successfully registered!",
                                                icon: "success",
                                                timer: 1500
                                            });
                                            navigate("/");
                                        }
                                    })

                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage)
                    });
            })
    }
    const handleGoogleLogin = () => {
        googleSignIn()
            .then((userCredential) => {
                const loggedInUser = userCredential.user;
                console.log(" looged in user ", loggedInUser);
                axiosPublic.get(`/user/${loggedInUser?.email}`)
                    .then(res => {
                        console.log(res);
                        if (res.data) {
                            if (res.data?.premiumTaken > new Date().toISOString()) {
                                console.log("premium taken");

                            } else {
                                axiosPublic.put(`update-user-premium/${loggedInUser?.email}`)
                                    .then(res => {
                                        console.log(res.data);
                                    })
                                console.log("premium not taken");
                            }
                            navigate("/");
                        }
                        else {
                            const userInfo = {
                                name: loggedInUser.displayName,
                                email: loggedInUser.email,
                                photo: loggedInUser.photoURL,
                                role: "user",
                                premiumTaken: null,
                            }
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            position: "center",
                                            title: "Registered!",
                                            text: "Successfully registered!",
                                            icon: "success",
                                            timer: 1500
                                        });
                                        navigate("/");
                                    }
                                })
                        }
                    })
            })
    }
    return (
        <div className="mx-auto max-w-2xl">
            <form className="card-body" onSubmit={handleForm}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" name="photo" className=" " required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign up</button>
                </div>
            </form>
            <p className='text-center '>If you have an account than please <Link to={"/login"} className='text-blue-400'>login</Link> first</p>
            <div className="flex flex-col w-full border-opacity-50 ">
                <div className="divider">OR</div>
                <div className='flex justify-center'>
                    <button onClick={handleGoogleLogin} className="btn btn-wide"><FaGoogle /> Login with Google</button>
                </div>
            </div>
        </div>

    );
};

export default Signup;