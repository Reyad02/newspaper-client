import { Link } from "react-router-dom";

const SubscriptionPlan = () => {
    return (
        <div className="grid grid-cols-3 gap-10">
            <div className="border border-pink-300 rounded-lg p-2">
                <div className="flex justify-between">
                    <div>
                        <h1>Premium </h1>
                        <h1>Individual</h1>
                    </div>
                    <div>
                        <p>FREE</p>
                        <p>FOR 1 MONTH</p>
                    </div>
                </div>
                <div  className="ml-4">
                    <ul className="list-disc">
                        <li>1 Premium Account</li>
                        <li>1 Cancel Anytime</li>
                        <li>15 hours/month of listening time from our audiobooks subscriber catalog</li>
                    </ul>
                </div>
                <div>
                    <Link className="btn w-full rounded-full" to={"/individual-Subscription"}>Try free for 1 month</Link>
                </div>
                <div>
                    <p>Free for 1 month, then $10.99 per month after.</p>
                </div>
            </div>

            <div className="border border-pink-300 rounded-lg p-2">
                <div className="flex justify-between">
                    <div>
                        <h1>Premium </h1>
                        <h1>Duo</h1>
                    </div>
                    <div>
                        <p>FREE</p>
                        <p>FOR 1 MONTH</p>
                    </div>
                </div>
                <div className="ml-4">
                    <ul className="list-disc">
                        <li>1 Premium Account</li>
                        <li>1 Cancel Anytime</li>
                        <li>15 hours/month of listening time from our audiobooks subscriber catalog</li>
                    </ul>
                </div>
                <div>
                    <button className="btn w-full rounded-full">Try free for 1 month</button>
                </div>
                <div>
                    <p>Free for 1 month, then $10.99 per month after.</p>
                </div>
            </div>

            <div className="border border-pink-300 rounded-lg p-2">
                <div className="flex justify-between">
                    <div>
                        <h1>Premium </h1>
                        <h1>Family</h1>
                    </div>
                    <div>
                        <p>FREE</p>
                        <p>FOR 1 MONTH</p>
                    </div>
                </div>
                <div  className="ml-4">
                    <ul className="list-disc">
                        <li>1 Premium Account</li>
                        <li>1 Cancel Anytime</li>
                        <li>15 hours/month of listening time from our audiobooks subscriber catalog</li>
                    </ul>
                </div>
                <div>
                    <button className="btn w-full rounded-full">Try free for 1 month</button>
                </div>
                <div>
                    <p>Free for 1 month, then $10.99 per month after.</p>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPlan;