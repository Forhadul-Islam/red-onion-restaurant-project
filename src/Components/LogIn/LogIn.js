import React, { useState } from 'react';
import './LogIn.css';
import logo from '../../logo/logo.png'
import { useAuth } from './useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';


const LogIn = () => {
    const user = useAuth().user;
    const handleSwitchToSignIn = useAuth().handleSwitchToSignIn;
    const handleSwitchToLogin = useAuth().handleSwitchToLogin;
    const handleChange = useAuth().handleChange;
    const createAccount = useAuth().createAccount




    return (
        <div className="logInForm">
            <div>
                <img src={logo} alt="" />
            </div>
            <div className="formArea">
                <form
                    onSubmit={createAccount}
                    style={{ display: user.hasAnAccount ? "none" : "block" }}
                    action="">
                    <input
                        onBlur={handleChange}
                        className="logInFormInput"
                        type="text"
                        name="name"
                        autoComplete="off"
                        required
                        placeholder="Name" />
                    <br />
                    <input
                        onBlur={handleChange}
                        className="logInFormInput"
                        type="text"
                        name="email"
                        autoComplete="off"
                        required
                        placeholder="Email" />
                    <br />
                    <input
                        onBlur={handleChange}
                        className="logInFormInput"
                        type="password"
                        name="password"
                        autoComplete="off"
                        required
                        placeholder="Password" />
                    <br />
                    <input
                        onBlur={handleChange}
                        className="logInFormInput"
                        type="password"
                        name="confirmPassword"
                        autoComplete="off"
                        required
                        placeholder="Confirm password" />
                    <br />
                    <input
                        className="signInButton"
                        type="submit"
                        value="Sign in" />
                </form>
                <form style={{ display: user.hasAnAccount ? "block" : "none" }} action="">
                    <input
                        onBlur={handleChange}
                        className="logInFormInput"
                        type="text"
                        name="name"
                        autoComplete="off"
                        placeholder="Email" />
                    <br />
                    <input
                        onBlur={handleChange}
                        className="logInFormInput"
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Password" />
                    <br />

                    <input
                        className="signInButton"
                        type="submit"
                        value="Log in" />
                </form>


                {
                    user.hasAnAccount ? <p onClick={handleSwitchToSignIn}>Create new account</p>
                        : <p onClick={handleSwitchToLogin}>Already have an account?</p>
                }

                <button
                    className="signInButton"
                    style={{ backgroundColor: "#344452", fontSize: "14px", fontWeight: "400" }}
                >
                    <FontAwesomeIcon icon={faGlobe} /> Sign in with google
                </button>

            </div>

        </div>
    );
};

export default LogIn;