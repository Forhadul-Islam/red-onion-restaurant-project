import React from 'react';
import './NavBar.css'
import logo from '../../logo/logo2.png'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from '../LogIn/useAuth';

const NavBar = (props) => {
    const auth = useAuth();
    const user = useAuth().user;
    const cart = props.cart;

    return (
        <div className="navBar ">
            <nav>
                <a href="/">
                    <img src={logo} alt="" />
                </a>
            </nav>
            <div className="logIn">
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FontAwesomeIcon style={{ color: "#545151", marginRight: ".3rem" }} icon={faShoppingCart} />
                    <span
                        style={{ color: "#e8082d", cursor: "pointer", fontWeight: "700", fontSize: "15px" }}
                        id="itemQuantity"
                    >
                        {cart.length}
                    </span>
                </span>
                {
                    user.isSignedIn ? <div className="loggedInUser">
                        <small>{auth.user.name}</small>
                        <a onClick={auth.signOut} className="logInLink" href="/">LogOut</a>
                    </div>
                        : <div className="logInArea">
                            <a className="logInLink" href="/logIn">LogIn</a>
                            <a className="mainButton" href="/logIn">Sign up</a>
                        </div>
                }

            </div>
        </div>
    );
};

export default NavBar;