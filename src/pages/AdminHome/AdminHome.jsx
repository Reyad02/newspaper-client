import { useLoaderData } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import { useEffect, useState } from 'react';
import { axiosPublic } from '../../hooks/useAxiosPublic';

const AdminHome = () => {
    const allPublishers = useLoaderData();
    const [totalUser, setTotalUser] = useState({ premiumUserCount: 0, totalUsers: 0 });
    const [articlesStatus, setArticlesStatus] = useState({ approved: 0, pending: 0, declined: 0 });

    const data = [
        ['Publisher', 'Number of Articles'],
        ...allPublishers.map(publisher => [publisher._id, publisher.count])
    ];

    const data1 = [
        ['User Type', 'Count'],
        ['Premium Users', totalUser.premiumUserCount],
        ['Normal Users', totalUser.totalUsers - totalUser.premiumUserCount],
    ];

    const data2 = [
        ['Article Status', 'Number'],
        ['Approved', articlesStatus.approved],
        ['Pending', articlesStatus.pending],
        ['Declined', articlesStatus.declined],
    ];

    const options = {
        is3D: true,
        backgroundColor: 'transparent',
        legend: 'none',
    };

    const options1 = {
        backgroundColor: 'transparent',
        legend: { position: 'none' },
    };

    const options2 = {
        title: "Articles Status Distribution",
        hAxis: { titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        chartArea: { width: "50%", height: "70%" },
        legend: { position: 'none' },

    };

    useEffect(() => {
        axiosPublic.get('/usersCount')
            .then(res => {
                console.log(res.data);
                setTotalUser(res.data);
            })
            .catch(err => console.error(err));

        axiosPublic.get('/articles-status-count')
            .then(res => {
                console.log(res.data);
                const statusData = res.data.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, { approved: 0, pending: 0, declined: 0 });
                setArticlesStatus(statusData);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <div className='flex flex-col lg:flex-row md:mr-10 md:mt-10'>
                <div className='flex-1'>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        height={"400px"}
                        className='bg-transparent'
                    />
                    <p className='text-center'>Number of Approved Articles by Publisher</p>
                </div>
                <div className='flex-1'>
                    <Chart
                        chartType="Bar"
                        height="400px"
                        data={data1}
                        options={options1}
                        className='bg-transparent'
                    />
                    <p className='text-center'>Number of Users</p>
                </div>
            </div>
            <div className='mt-4'>
                <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="400px"
                    data={data2}
                    options={options2}
                    className='bg-transparent'
                />
                <p className='text-center'>Articles Status Distribution</p>
            </div>
        </div>
    );
};

export default AdminHome;
