import { Link } from 'react-router-dom';
import './GetStartedPage.css';

export default function GetStarted() {
    return (
        <div className="get-started">
            <h2>Get Started</h2>
            <h3>Get in to your account to do the action</h3>
            <div className="buttons">
                <Link to="/register" className="btn">Sign Up</Link>
                <br/>
                <Link to="/login" className="btn">Sign In</Link>
            </div>
        </div>
    );
}
