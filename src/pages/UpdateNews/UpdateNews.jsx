import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Select from 'react-select';
import chroma from 'chroma-js';

import { colourOptions } from '../AddArticle/jsForSelect/jsForSelect';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const UpdateNews = () => {
    const [publishers, setPublishers] = useState([]);
    const updateNews = useLoaderData();
    const idUpdateNews = updateNews._id;
    const axiosPublic = useAxiosPublic();
    const [selectedTags, setSelectedTags] = useState([]);
    const navigate = useNavigate();
    const [selectedPublisher, setSelectedPublisher] = useState('');


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

    const handleUpadate = (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value || updateNews.title;
        const publisher = form.publisher.value || updateNews.publisher;
        const tags = selectedTags.map(tag => tag.value) || updateNews.tags.map(tag => tag);
        const imageFile = form.photo.files[0];
        const description = form.description.value || updateNews.description;
        console.log(title, publisher, tags, imageFile, description);
        const formData = new FormData();
        formData.append('image', imageFile);

        if (imageFile) {
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
                    }
                    axiosPublic.put(`/update-article/${idUpdateNews}`, articleInfo)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                Swal.fire({
                                    position: "center",
                                    title: "Updates!",
                                    text: "News updated successfully!",
                                    icon: "success",
                                    timer: 1500
                                });
                                navigate(`/my-article/${updateNews?.author}`);
                            }
                        })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // console.log(errorMessage)
                });
        }
        else if (!imageFile) {
            const articleInfo = {
                title: title,
                publisher: publisher,
                tags: tags,
                photo: updateNews.photo,
                description: description,
            }
            axiosPublic.put(`/update-article/${idUpdateNews}`, articleInfo)
                .then(res => {
                    if (res.data.modifiedCount) {
                        Swal.fire({
                            position: "center",
                            title: "Updates!",
                            text: "News updated successfully!",
                            icon: "success",
                            timer: 1500
                        });
                        navigate(`/my-article/${updateNews?.author}`);
                    }
                })
        }
        e.target.reset();
    }

    useEffect(() => {
        axiosPublic.get('/publishers')
            .then(res => {
                setPublishers(res.data);
                setSelectedPublisher(updateNews.publisher); // Set the selectedPublisher after fetching publishers

            })
    }, [axiosPublic, updateNews.publisher])


    return (
        <div className="max-w-7xl mx-auto">
            <form onSubmit={handleUpadate}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" name="title" defaultValue={updateNews?.title} placeholder="Title" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    {/* <textarea placeholder="Description" name="description" defaultValue={updateNews?.description} className="textarea textarea-bordered"></textarea> */}
                    <input type="text" placeholder="Description" name="description" defaultValue={updateNews?.description} className="textarea textarea-bordered"/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" name="photo" className="mb-2" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Publisher</span>
                    </label>
                    {/* <p>{updateNews.publisher}</p> */}
                    {/* <select defaultValue={selectedPublisher} name="publisher" id="publisher" className="p-2 rounded-lg bg-base-100 border dropdown text-base" required>
                        {
                            publishers.map((publish, index) => {
                                return (
                                    <option key={index} value={publish.name}>{publish.name}</option>
                                )
                            })
                        }
                    </select> */}
                    <select
                        value={selectedPublisher}
                        onChange={(e) => setSelectedPublisher(e.target.value)}
                        name="publisher"
                        id="publisher"
                        className="p-2 rounded-lg bg-base-100 border dropdown text-base"
                        required
                    >
                        {publishers.map((publish, index) => (
                            <option key={index} value={publish.name}>{publish.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tags</span>
                    </label>
                    {/* <p>{updateNews?.tags.map(tag => tag)}</p> */}
                    <Select
                        isMulti
                        name="colors"
                        options={colourOptions}
                        className="basic-multi-select "
                        classNamePrefix="select"
                        styles={colourStyles}
                        onChange={setSelectedTags}
                        // defaultValue={updateNews?.tags.map(tag => [tag])}
                        required
                    />
                </div>
                <div className="form-control">
                    <button className="btn btn-primary mt-8">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateNews;