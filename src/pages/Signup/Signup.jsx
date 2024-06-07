import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Signup = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
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
                        console.log(user)
                        updateUserProfile(name, data.data.display_url)
                            .then(() => {
                                // console.log("Profile updated");
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
            }
            )
    }
    return (
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
                <button className="btn btn-primary">Login</button>
            </div>
        </form>
    );
};

export default Signup;