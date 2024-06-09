import Select from 'react-select';
import chroma from 'chroma-js';

import { colourOptions } from './jsForSelect/jsForSelect';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useContext, useEffect, useRef, useState } from 'react';
import auth from '../../firebase/firebase.config';
import { AuthContext } from '../../provider/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';

const AddArticle = () => {
    const publisher = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const [selectedTags, setSelectedTags] = useState([]);
    const { user } = useContext(AuthContext);
    const [resetSelect, setResetSelect] = useState(false); // State to reset Select component
    const navigate = useNavigate();


    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'transparent', padding: '2px' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        multiValue: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: color.alpha(0.1).css(),
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: 'white',
            },
        }),
    };

    const handleAddArticle = (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const publisher = form.publisher.value;
        const tags = selectedTags.map(tag => tag.value);
        const imageFile = form.photo.files[0];
        const description = form.description.value;
        console.log(title, publisher, tags, imageFile, description);
        const formData = new FormData();
        formData.append('image', imageFile);

        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_key}`, {
            method: "POST",
            body: formData,

        }).then(res => res.json())
            .then(data => {
                const articleInfo = {
                    title: title,
                    publisher: publisher,
                    tags: tags,
                    photo: data.data.display_url,
                    description: description,
                    author: user?.email,
                    isPremium: "not",
                    status: "pending",
                    count: 0,
                    postedDate: new Date().toISOString(),

                }
                axiosPublic.post('/articles', articleInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "center",
                                title: "Waiting!",
                                text: "Wait for admin approved!",
                                icon: "success",
                                timer: 1500
                            });
                            form.reset();
                            setSelectedTags([]);
                            setResetSelect(true);
                            navigate("/");

                        }
                    })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    // Reset the Select component when reset flag changes
    useEffect(() => {
        let isMounted = true; // Flag to track if component is mounted

        if (resetSelect && isMounted) {
            setSelectedTags([]); // Reset the Select component
            setResetSelect(false); // Reset the flag
        }

        return () => {
            isMounted = false; // Set the flag to false when component is unmounted
        };
    }, [resetSelect]);



    return (
        <div className='mx-auto max-w-7xl'>
            <form className="card-body" onSubmit={handleAddArticle}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" name="title" placeholder="Title" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" name="photo" className=" " required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Publisher</span>
                    </label>
                    <select name="publisher" id="publisher" className="p-2 rounded-lg bg-base-100 border dropdown text-base input input-bordered" required>
                        {
                            publisher.map(p => <option key={p._id} value={p.name}>{p.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tags</span>
                    </label>
                    <Select
                        isMulti
                        name="colors"
                        options={colourOptions}
                        className="basic-multi-select "
                        classNamePrefix="select"
                        styles={colourStyles}
                        onChange={(selected) => {
                            setSelectedTags(selected);
                            setResetSelect(false); // Set reset flag to false when selection changes
                        }}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea placeholder="Description" name="description" className="textarea textarea-bordered"></textarea>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Add News</button>
                </div>
            </form>
        </div>
    );
};

export default AddArticle;