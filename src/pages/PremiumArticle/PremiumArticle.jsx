import { useContext } from "react";
import usePremiumUser from "../../hooks/usePremiumUser";
import { AuthContext } from "../../provider/AuthProvider";

const PremiumArticle = () => {
    const { isPremium } = usePremiumUser(user?.email);

    return (
        <div>
            { isPremium ? <h1>PREMIUM ARTICLE</h1> : <h1>NOT PREMIUM</h1>}
        </div>
    );
};

export default PremiumArticle;