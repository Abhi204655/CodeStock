import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="landing">
            <div className="landing-header">
                <h1>CodeStock</h1>
            </div>
            <div className="landing-form">
                <h1 class="not-found-h1"><span>404</span> Not Found</h1>
                <p class="not-found-p">The page you are looking for is either not available or shifted somewhere else</p>
                <Link to='/'>Back to Home</Link>
            </div>
            <div className="landing-footer">
                <p>Made with love by Abhi</p>
            </div>
        </div >
    )
}
