import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
// import Typewriter from 'react-ts-typewriter';
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();




const Hero = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false}>
            <div className=" hero h-full" style={{ backgroundImage: 'url(https://i.postimg.cc/Hk3dMCnV/1.jpg)' }}>
                <div className="hero-overlay bg-opacity-45 "></div>
                <div className=" w-full">
                    <div className="hero-content text-white text-left w-full justify-start ml-24" data-aos="fade-up" data-aos-duration="2000">
                        <div className="max-w-lg border ">
                            <h1 className="mb-5 text-6xl font-semibold ">
                                Hi this is me
                            </h1>
                            <Link to={"/all"}><button className="btn btn-primary">View Details</button> </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Rw7mPUniE7gqObCvZS4wWZAeU9rx2Kp9lw&s"} />
            </div>

        </Carousel>

    );
};

export default Hero;