import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdOutlineDateRange, MdOutlineMenuBook, MdRemoveRedEye } from "react-icons/md";
AOS.init();

const Hero = () => {
    const axiosPublic = useAxiosPublic();
    const [topArticles, setTopArticles] = useState([]);

    useEffect(() => {
        axiosPublic.get('/top-articles')
            .then(response => {
                // console.log('Top articles:', response.data);
                setTopArticles(response.data);
            })
            .catch(error => {
                // console.error('Error fetching top articles:', error);
            });
    }, [axiosPublic]);

    return (
        <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false}>

            {
                topArticles.map((article, idx) => (
                    <div key={idx}>
                        <div className=" hero min-h-screen" style={{ backgroundImage: `url(${article.photo})` }}>
                            <div className="hero-overlay bg-opacity-45 max-h-screen"></div>
                            <div className=" w-full">
                                <div className="hero-content text-white text-left w-full justify-start  md:ml-24" data-aos="fade-up" data-aos-duration="2000">
                                    <div className="max-w-xl  ">
                                        <h1 className="mb-5 text-2xl md:text-5xl font-semibold ">
                                            {article.title}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute text-white bottom-0 md:bottom-10 lg:bottom-24 ml-4 md:ml-28 flex gap-2 md:gap-6">
                            <p className="  flex items-center gap-2"><MdRemoveRedEye /> {article.count}</p>
                            <p className="  flex items-center gap-2"><MdOutlineMenuBook />{article.publisher}</p>
                            {
                                article.postedDate && <p className=" flex items-center gap-2"><MdOutlineDateRange />{article.postedDate ? new Date(article.postedDate).toISOString().split('T')[0] : null}</p>
                            }
                            {/* <p className=" flex items-center gap-2"><MdOutlineDateRange />{article?.postedDate}</p> */}
                        </div>
                    </div>
                ))

            }

        </Carousel>

    );
};

export default Hero;