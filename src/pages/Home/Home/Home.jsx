import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Hero from '../Hero/Hero';
import SubscriptionPlan from '../SubscriptionPlan/SubscriptionPlan';
import CountUp from 'react-countup';
// import CountUp from 'react-countup/build/CountUp';

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [publishers, setPublishers] = useState([]);
    const [userCount, setUserCount] = useState(0); // Add state for user count
    const [premiumUsers, setPremiumUsers] = useState(0); // Add state for premium users

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
    }, [axiosPublic]);

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
                            <CountUp delay={2} end={userCount-premiumUsers} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SubscriptionPlan />
        </div>
    );
};

export default Home;
