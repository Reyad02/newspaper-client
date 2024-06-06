import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signInUser(email, password)
            .then((userCredential) => {
                Swal.fire({
                    position: "center",
                    title: "Registered!",
                    text: "Successfully registered!",
                    icon: "success",
                    timer: 1500
                });
                const loggedInUser = userCredential.user;
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
                console.log(errorMessage)
            });
    }
    return (
        <div>
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
                    <input className="btn bg-[#FF3811] text-white" type="submit" value="Sing In" />
                </div>
            </form>
        </div>
    );
};

export default Login;