import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddPublisher = () => {
    // const allPublishers = useLoaderData();
    const [publishers, setPublishers] = useState([]);
    const axiosPublic = useAxiosPublic();
    let count = 0;
    // console.log(allPublishers);

    const handlePublisher = (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const photo = e.target[1].files[0];
        // console.log(name, photo);
        const formData = new FormData();
        formData.append('image', photo);

        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_key}`, {
            method: "POST",
            body: formData,

        }).then(res => res.json())
            .then(data => {
                console.log(data.data.display_url);
                const articleInfo = {
                    name: name,
                    photo: data.data.display_url
                }
                axiosPublic.post('/publishers', articleInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "center",
                                title: "DONE!",
                                text: "Successfully Added!",
                                icon: "success",
                                timer: 1500
                            });
                            setPublishers(prevPublishers => [...prevPublishers, { name, photo: data.data.display_url }]);

                        }
                    })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }


    // const updatePublisher = (id) => {

    useEffect(() => {
        axiosPublic.get('/publishers')
            .then(res => {
                setPublishers(res.data);
            })

        // setPublishers(allPublishers);
    }, [axiosPublic])
    return (
        <div key={count}>
            <div className="hero bg-base-200">
                <div className="hidden">

                    {count++}
                </div>
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handlePublisher}>
                            <h1 className="text-3xl font-semibold uppercase text-center">Publisher</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="file" className="input" required />
                                {/* {
                                    <p>Publishers length  {publishers.length}</p>
                                } */}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div  className="card shadow-2xl bg-base-100">
                {publishers.map((publisher) => (
                    <div className="card-body " key={publisher._id}>
                        <div className="flex justify-between">
                            <div>
                                <h1 className="">{publisher.name}</h1>
                            </div>
                            <div>
                                <img src={publisher.photo} alt={publisher.name} className="w-10" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddPublisher;