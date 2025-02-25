import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SubscriptionPlan = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            <div className="border border-pink-300 rounded-lg p-2 h-full px-6 py-4 ">
                <div className="flex justify-between">
                    <div>
                        <h1>Normal </h1>
                        <h1>User</h1>
                    </div>
                    <div>
                        <p>FREE</p>
                        <p>FOR UNLIMITED TIME</p>
                    </div>
                </div>
                <div className="ml-4">
                    <ul className="list-disc space-y-1">
                        <li>Free Account</li>
                        <li>Cancel Anytime</li>
                        <li>1 Post In 24 Hours</li>
                    </ul>
                </div>
                <div className="h-full mt-10">
                    <p className="text-center h-full">Free for unlimited time. You can not post more than 1 in 24 hours. </p>
                </div>
            </div>

            <div className="border border-pink-300 rounded-lg p-2  px-6 py-4 ">
                <div className="flex justify-between">
                    <div>
                        <h1>Premium </h1>
                        <h1>VIP User</h1>
                    </div>
                    <div>
                        <p>Premium</p>
                        <p>FOR 1 MONTH</p>
                    </div>
                </div>
                <div className="ml-4">
                    <ul className="list-disc space-y-1">
                        <li>1 Premium Account</li>
                        <li>Cancel Anytime</li>
                        <li>Unlimited post in 24 hours</li>
                    </ul>
                </div>
                <div className="my-2">
                    <Link className="btn w-full rounded-full" to={"/individual-Subscription"}>Get Premium membership</Link>
                </div>
                <div className="">
                    <p className="text-center " >Must have to pay $5 to get premium membership</p>
                </div>
            </div>

        </div>
    );
};

export default SubscriptionPlan;