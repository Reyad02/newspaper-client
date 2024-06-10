import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const { signInUser, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signInUser(email, password)
            .then((userCredential) => {
                Swal.fire({
                    position: "center",
                    title: "Logged In!",
                    text: "Successfully logged in!",
                    icon: "success",
                    timer: 1500
                });
                const loggedInUser = userCredential.user;
                axiosPublic.get(`/user/${loggedInUser?.email}`)
                    .then(res => {
                        if (res.data) {
                            if (res.data?.premiumTaken > new Date().toISOString()) {
                                // console.log("premium taken");

                            } else {
                                axiosPublic.put(`update-user-premium/${loggedInUser?.email}`)
                                    .then(res => {
                                        // console.log(res.data);
                                    })
                                // console.log("premium not taken");
                            }
                        }
                    })

                navigate(location?.state ? location?.state : "/");
                // console.log(loggedInUser);
                // const user = { email };
                // axios.post("http://localhost:5000/jwt", user, {
                //     withCredentials: true
                // })
                // .then(res => {
                //     console.log(res.data);
                //     if (res.data.success) {
                //         navigate(location?.state ? location?.state : "/");
                //     }
                // })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorMessage)
                Swal.fire({
                    position: "center",
                    title: "Error!",
                    text: errorMessage,
                    icon: "error",
                    timer: 1500
                });
            });
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((userCredential) => {
                const loggedInUser = userCredential.user;
                // console.log(" looged in user ", loggedInUser);
                axiosPublic.get(`/user/${loggedInUser?.email}`)
                    .then(res => {
                        // console.log(res);
                        if (res.data) {
                            if (res.data?.premiumTaken > new Date().toISOString()) {
                                // console.log("premium taken");

                            } else {
                                axiosPublic.put(`update-user-premium/${loggedInUser?.email}`)
                                    .then(res => {
                                        // console.log(res.data);
                                    })
                                // console.log("premium not taken");
                            }
                            navigate(location?.state ? location?.state : "/");
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
                                        navigate(location?.state ? location?.state : "/");
                                    }
                                })
                        }
                    })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorMessage)
            });
    }
    return (
        <div className='mx-auto max-w-2xl'>
            <form className="card-body" onSubmit={handleLogin}>
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
                    <input className="btn text-white" type="submit" value="Sing In" />
                </div>
            </form>
            <p className='text-center '>If you do not have any account than please <Link to={"/signUp"} className='text-blue-400'>register</Link> first</p>
            <div className="flex flex-col w-full border-opacity-50 ">
                <div className="divider">OR</div>
                <div className='flex justify-center'>
                    <button onClick={handleGoogleLogin} className="btn btn-wide"><FaGoogle /> Login with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;