import React, { useState, useEffect } from 'react';
import './LogIn.css';
import logo from '../../logo/logo.png'
import { useAuth } from './useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../NavBar/NavBar';
import { getDatabaseCart } from '../../utilities/databaseManager';


const LogIn = () => {
    const auth = useAuth();
    const user = useAuth().user;
    const handleSwitchToSignIn = useAuth().handleSwitchToSignIn;
    const handleSwitchToLogin = useAuth().handleSwitchToLogin;
    const handleChange = useAuth().handleChange;
    const createAccount = useAuth().createAccount
    const signInWithEmailAndPassword = useAuth().signInWithEmailAndPassword;
    const signInWithGoogle = () => {
        auth.signInWithGoogle()
            .then(res => {
                window.location.pathname = "/checkout"
            })
    }
    const signOut = useAuth().signOut;


    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        fetch('https://red-onion-shopping.herokuapp.com/products/getProductsByKey', {
            method: 'POST',
            body: JSON.stringify(productKey),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setCart(data);
            })
    }, [])

    return (
        <div>
            <div>
                <NavBar
                    cart={cart}
                ></NavBar>
            </div>
            <div className="logInForm">
                <div>
                    <img src={logo} alt="" />
                </div>
                <div
                    // style={{ display: user.isSignedInWithGoogle ? "none" : "block" }} 
                    className="formArea"
                >
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

                    <form
                        onSubmit={signInWithEmailAndPassword}
                        style={{ display: user.hasAnAccount ? "block" : "none" }}
                        action="">
                        <input
                            onBlur={handleChange}
                            className="logInFormInput"
                            type="text"
                            name="email"
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

                    {
                        user.error && <p style={{ color: "red" }}>{user.error}!!</p>

                    }


                </div>
                <small style={{ color: "#545b62", fontSize: "15px" }}>or</small>

                {
                    user.isSignedIn ? <button
                        onClick={signOut}
                        className="signInButton"
                        style={{ backgroundColor: "#344452", fontSize: "14px", fontWeight: "400" }}
                    >
                        <FontAwesomeIcon icon={faGlobe} /> Sign out
                </button>
                        : <button

                            onClick={signInWithGoogle}
                            className="signInButton"
                            style={{ backgroundColor: "#344452", fontSize: "14px", fontWeight: "400" }}
                        >
                            <FontAwesomeIcon icon={faGlobe} /> Sign in with google
                </button>

                }

            </div>
        </div>
    );
};

export default LogIn;