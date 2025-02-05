import React from "react"
import "bulma/css/bulma.min.css"

const OAuthScreen = () => {
    const handleOAuthClick = () => {
        window.location.href = "http://localhost:3010/zoom/oauth"
    };

    return (
        <div className="container mt-5">
            <h1 className="title">ZOOM URL GENERATOR for knowledge star ⭐️</h1>
            <div className="field">
                <div className="control">
                    <button className="button is-primary" onClick={handleOAuthClick}>
                        Authorize Zoom!!!
                    </button>
                </div>
            </div>
        </div>
    );
}
export default OAuthScreen;