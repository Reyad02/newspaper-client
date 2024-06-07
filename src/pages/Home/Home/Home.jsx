import Hero from '../Hero/Hero';
import SubscriptionPlan from '../SubscriptionPlan/SubscriptionPlan';

const Home = () => {
    return (
        <div className='space-y-4'>
            <Hero></Hero>
            <SubscriptionPlan></SubscriptionPlan>
        </div>
    );
};

export default Home;