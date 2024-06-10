// import { useEffect, useState } from 'react';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
// import Hero from '../Hero/Hero';
// import SubscriptionPlan from '../SubscriptionPlan/SubscriptionPlan';
// import CountUp from 'react-countup';
// // import CountUp from 'react-countup/build/CountUp';

// const Home = () => {
//     const axiosPublic = useAxiosPublic();
//     const [publishers, setPublishers] = useState([]);
//     const [userCount, setUserCount] = useState(0); // Add state for user count
//     const [premiumUsers, setPremiumUsers] = useState(0); // Add state for premium users

//     useEffect(() => {
//         axiosPublic.get('/publishers')
//             .then(response => {
//                 console.log('Publishers:', response.data);
//                 setPublishers(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching publishers:', error);
//             });

//         axiosPublic.get('/usersCount')
//             .then(response => {
//                 console.log('Users count:', response.data);
//                 setUserCount(response.data.totalUsers); // Set the user count
//                 setPremiumUsers(response.data.premiumUserCount); // Set the premium users count
//             })
//             .catch(error => {
//                 console.error('Error fetching users count:', error);
//             });
//     }, [axiosPublic]);

//     return (
//         <div className='space-y-4'>
//             <Hero />
//             <div className='mx-auto max-w-7xl'>
//                 <h2 className='text-4xl text-center uppercase font-semibold mt-12 my-4'>Publishers</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {publishers.map((publisher, idx) => (
//                         <div key={idx} className="p-6 rounded-lg shadow-lg flex flex-col justify-center items-center border">
//                             <img src={publisher.photo} className='w-20' alt="" />
//                             <h2 className="text-2xl font-bold mb-2">{publisher.name}</h2>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='mx-auto max-w-7xl'>
//                 <div className='flex justify-center'>
//                     <div className="stats shadow justify-center items-center">
//                         <div className="stat place-items-center">
//                             <div className="stat-title">Total User</div>
//                             <div className="stat-value">
//                                 <CountUp delay={2} end={userCount} />
//                             </div>
//                         </div>

//                         <div className="stat place-items-center">
//                             <div className="stat-title">Premium Users</div>
//                             <div className="stat-value text-secondary">
//                             <CountUp delay={2} end={premiumUsers} />

//                             </div>
//                         </div>

//                         <div className="stat place-items-center">
//                             <div className="stat-title">Free Users</div>
//                             <div className="stat-value">
//                             <CountUp delay={2} end={userCount-premiumUsers} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <SubscriptionPlan />
//         </div>
//     );
// };

// export default Home;


// import { useEffect, useState } from 'react';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
// import Hero from '../Hero/Hero';
// import SubscriptionPlan from '../SubscriptionPlan/SubscriptionPlan';
// import CountUp from 'react-countup';
// import Modal from 'react-modal';
// import { useNavigate } from 'react-router-dom';

// // Set the root element for accessibility purposes
// Modal.setAppElement('#root');

// const Home = () => {
//     const axiosPublic = useAxiosPublic();
//     const [publishers, setPublishers] = useState([]);
//     const [userCount, setUserCount] = useState(0); // Add state for user count
//     const [premiumUsers, setPremiumUsers] = useState(0); // Add state for premium users
//     const [showModal, setShowModal] = useState(false); // State to manage modal visibility
//     const navigate = useNavigate();

//     useEffect(() => {
//         axiosPublic.get('/publishers')
//             .then(response => {
//                 console.log('Publishers:', response.data);
//                 setPublishers(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching publishers:', error);
//             });

//         axiosPublic.get('/usersCount')
//             .then(response => {
//                 console.log('Users count:', response.data);
//                 setUserCount(response.data.totalUsers); // Set the user count
//                 setPremiumUsers(response.data.premiumUserCount); // Set the premium users count
//             })
//             .catch(error => {
//                 console.error('Error fetching users count:', error);
//             });

//         // Set a timeout to show the modal after 10 seconds
//         const timer = setTimeout(() => {
//             setShowModal(true);
//         }, 10000);

//         // Cleanup the timer on component unmount
//         return () => clearTimeout(timer);
//     }, [axiosPublic]);

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     const navigateToSubscription = () => {
//         navigate('/individual-Subscription');
//         closeModal();
//     };

//     return (
//         <div className='space-y-4'>
//             <Hero />
//             <div className='mx-auto max-w-7xl'>
//                 <h2 className='text-4xl text-center uppercase font-semibold mt-12 my-4'>Publishers</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {publishers.map((publisher, idx) => (
//                         <div key={idx} className="p-6 rounded-lg shadow-lg flex flex-col justify-center items-center border">
//                             <img src={publisher.photo} className='w-20' alt="" />
//                             <h2 className="text-2xl font-bold mb-2">{publisher.name}</h2>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='mx-auto max-w-7xl'>
//                 <div className='flex justify-center'>
//                     <div className="stats shadow justify-center items-center">
//                         <div className="stat place-items-center">
//                             <div className="stat-title">Total User</div>
//                             <div className="stat-value">
//                                 <CountUp delay={2} end={userCount} />
//                             </div>
//                         </div>

//                         <div className="stat place-items-center">
//                             <div className="stat-title">Premium Users</div>
//                             <div className="stat-value text-secondary">
//                             <CountUp delay={2} end={premiumUsers} />

//                             </div>
//                         </div>

//                         <div className="stat place-items-center">
//                             <div className="stat-title">Free Users</div>
//                             <div className="stat-value">
//                             <CountUp delay={2} end={userCount-premiumUsers} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <SubscriptionPlan />

//             {/* Modal for subscription */}
//             <Modal
//                 isOpen={showModal}
//                 onRequestClose={closeModal}
//                 contentLabel="Subscription Modal"
//                 className="Modal"
//                 overlayClassName="Overlay"
//             >
//                 <h2>Join Our Premium Membership!</h2>
//                 <p>Enjoy exclusive benefits by becoming a premium member.</p>
//                 <button onClick={navigateToSubscription} className="btn btn-primary">Take a Subscription</button>
//                 <button onClick={closeModal} className="btn">Close</button>
//             </Modal>
//         </div>
//     );
// };

// export default Home;


import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Hero from '../Hero/Hero';
import SubscriptionPlan from '../SubscriptionPlan/SubscriptionPlan';
import CountUp from 'react-countup';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

// Set the root element for accessibility purposes
Modal.setAppElement('#root');

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [publishers, setPublishers] = useState([]);
    const [userCount, setUserCount] = useState(0); // Add state for user count
    const [premiumUsers, setPremiumUsers] = useState(0); // Add state for premium users
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const navigate = useNavigate();

    useEffect(() => {
        axiosPublic.get('/publishers')
            .then(response => {
                console.log('Publishers:', response.data);
                setPublishers(response.data);
            })
            .catch(error => {
                console.error('Error fetching publishers:', error);
            });

        axiosPublic.get('/usersCount')
            .then(response => {
                console.log('Users count:', response.data);
                setUserCount(response.data.totalUsers); // Set the user count
                setPremiumUsers(response.data.premiumUserCount); // Set the premium users count
            })
            .catch(error => {
                console.error('Error fetching users count:', error);
            });

        // Set a timeout to show the modal after 10 seconds
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 10000);

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [axiosPublic]);

    const closeModal = () => {
        setShowModal(false);
    };

    const navigateToSubscription = () => {
        navigate('/individual-Subscription');
        closeModal();
    };

    // Custom styles for centering the modal
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%', // Optional: Adjust width as needed
            maxWidth: '500px', // Optional: Set a maximum width
            textAlign: 'center', // Optional: Center the text
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)' // Optional: Set overlay background color
        }
    };

    return (
        <div className='space-y-4'>
            <Hero />
            <div className='mx-auto max-w-7xl'>
                <h2 className='text-4xl text-center uppercase font-semibold mt-12 my-4'>Publishers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publishers.map((publisher, idx) => (
                        <div key={idx} className="p-6 rounded-lg shadow-lg flex flex-col justify-center items-center border">
                            <img src={publisher.photo} className='w-20' alt="" />
                            <h2 className="text-2xl font-bold mb-2">{publisher.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mx-auto max-w-7xl'>
                <div className='flex justify-center'>
                    <div className="stats shadow justify-center items-center">
                        <div className="stat place-items-center">
                            <div className="stat-title">Total User</div>
                            <div className="stat-value">
                                <CountUp delay={2} end={userCount} />
                            </div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Premium Users</div>
                            <div className="stat-value text-secondary">
                                <CountUp delay={2} end={premiumUsers} />
                            </div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Free Users</div>
                            <div className="stat-value">
                                <CountUp delay={2} end={userCount - premiumUsers} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SubscriptionPlan />

            {/* Modal for subscription */}
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                contentLabel="Subscription Modal"
                style={customStyles}
            >
                <div className='space-y-1'>
                    <h2>Join Our Premium Membership!</h2>
                    <p>Enjoy exclusive benefits by becoming a premium member.</p>
                    <div className='flex gap-4 justify-center'>
                        <button onClick={navigateToSubscription} className="btn btn-primary">Take a Subscription</button>
                        <button onClick={closeModal} className="btn">Close</button>
                    </div>

                </div>
            </Modal>
        </div>
    );
};

export default Home;
