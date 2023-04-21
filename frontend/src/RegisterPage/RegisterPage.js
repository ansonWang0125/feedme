import React, {useState, useEffect} from 'react';
import './RegisterPage.css';
import FeedMe from '../assets/FeedMe.jpg';
import twitterLogo from '../assets/twitterLogo.png';
import TwitterLogin from 'react-twitter-auth';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { getGoogleUrl } from '../utils/getGoogleUrl';
import { FormattedMessage } from "react-intl";
import {UseLoginContext} from '../Context/LoginCnt'
import { UseLangContext } from '../Context/LangCnt';
import { toast } from "react-toastify";
import { validateEmail } from "../services/authService";
import { useDispatch } from "react-redux";



const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
};


const RegisterPage = () => {
    const redirect_uri = process.env?.REACT_APP_GOOGLE_OAUTH_REDIRECT
    const clientID = process.env?.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
    const redirect_login = process.env?.REACT_APP_TWITTER_REDIRECT_LOGIN
    const request_token = process.env?.REACT_APP_TWITTER_REQUEST_URL
    const location = useLocation();
    const [checkbox, setCheckbox] = useState(false);
    let from = ((location.state)?.from?.pathname) || '/';
    const navigate = useNavigate();
    const {changeLogin} = UseLoginContext();
    // const {lang} = UseLangContext();

    const [formData, setformData] = useState(initialState);
    const { name, email, password, password2 } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };
    // useEffect(()=>{console.log(lang)}, [lang])


    const handleClickCheckbox = () => {
        setCheckbox(!checkbox)
    }

    const handleSubmit = () => {
        changeLogin(true)
        navigate('/mypage')
    }
    const register = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            return toast.error("All fields are required");
        }
        if (password.length < 6) {
            return toast.error("Passwords must be up to 6 characters");
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }
        if (password !== password2) {
            return toast.error("Passwords do not match");
        }

        const userData = {
            name,
            email,
            password,
        };
    };

    return (
        <div className="container">
            <div id='logo'>
                    <img src={FeedMe} alt='feedme' id="feedmelogo"/>
                </div>
            <div className="body">
                
                <form onSubmit={register} id="info">
                <div id="header">
                    <h2 className="infos" style={{margin:"5px"}}>Welcome, newbie!</h2>
                </div>
                    <input
                        type="text"
                        className="input infos" 
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        className="input infos" 
                        placeholder="Email"
                        // autoComplete={checkbox?'email':'off'}
                        required
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        className="input infos" 
                        placeholder="Password"
                        // autoComplete={checkbox?'current-password':'off'}
                        required
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        className="input infos" 
                        placeholder="Confirm Password"
                        required
                        name="password2"
                        value={password2}
                        onChange={handleInputChange}
                    />
                    <div id="external" className="infos">
                        <Link 
                            href={getGoogleUrl(from, redirect_uri, clientID)}
                            id="google-icon"
                        >
                            <GoogleLogo  id="googlelogo"/>    
                        </Link> 
                        <TwitterLogin loginUrl={redirect_login}
                            onFailure={onFailed} onSuccess={onSuccess}
                            requestTokenUrl={request_token}
                            className="twitter-button"
                            >
                                <img src={twitterLogo} alt="Twitter Logo" />
                        </TwitterLogin>
                    </div>
                    <button type="submit" className="infos" id="signup">
                        Sign up
                    </button>
                    <div id='dashLine' className="infos">
                        <div id="line"></div>
                        <div id="text"><FormattedMessage id="login.or" defaultMessage="or" /></div>
                        <div id="line"></div>
                    </div>
                </form>
                <span style={{display:"flex", justifyContent:"center", marginTop:"5px"}}>
                    <p style={{fontSize:"14px"}}> &nbsp; &nbsp; &nbsp; Already have an account? &nbsp; &nbsp; &nbsp;</p>
                    <Link style={{fontSize:"13px"}} to = "/login">Log in</Link>
                </span>
                
            </div>
        </div>
    )
}

export default RegisterPage;
