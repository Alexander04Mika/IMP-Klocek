import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom"; 
import './Cookiesstyle.css';

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [cookiesAccepted, setCookiesAccepted] = useState(false);
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        const consent = Cookies.get("cookieConsent");
        const messageClosed = Cookies.get("messageClosed");

        if (messageClosed === "true") {
            setShowMessage(false);
        } else {
            setShowMessage(true);
        }

        if (!consent) {
            setShowBanner(true);
        } else if (consent === "accepted") {
            setCookiesAccepted(true);
        }
    }, []);

    const acceptCookies = () => {
        Cookies.set("cookieConsent", "accepted", { expires: 365, path: "/" });
        setCookiesAccepted(true);
        setShowBanner(false);
    };

    const declineCookies = () => {
        Cookies.set("cookieConsent", "declined", { expires: 365, path: "/" });
        setShowBanner(false);
    };

    const closeMessage = () => {
        Cookies.set("messageClosed", "true", { expires: 365, path: "/" });
        setShowMessage(false); 
    };

    return (
        <>
            {showBanner && (
                <div className="banner">
                    <p>
                        🍪 Tento web používá cookies ke zlepšení vašeho zážitku.{" "}
                        <Link to="/cookie-policy" className="link">Zjistěte více</Link>.
                    </p>
                    
                    <div className="buttonContainer">
                        <button onClick={acceptCookies} className="acceptButton">Přijmout vše</button>
                        <button onClick={declineCookies} className="declineButton">Přijmout pouze nezbytné</button>
                    </div>
                </div>
            )}

            {cookiesAccepted && showMessage && (
                <div className="cookieMessage">
                    <button onClick={closeMessage} className="closeButton">×</button>
                    ✅ Souhlasili jste s použitím cookies. Užijte si svůj zážitek!
                </div>
            )}
        </>
    );
};

export default CookieConsent;

