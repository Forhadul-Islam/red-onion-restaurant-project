import React, { useEffect, useState, useReducer } from 'react';
import './NavBar.css'
import logo from '../../logo/logo2.png'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDatabaseCart, addToDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../resourses/fakeData';
import { Link } from 'react-router-dom';
import { useAuth } from '../LogIn/useAuth';

const NavBar = () => {
    const auth = useAuth();
    const user = useAuth().user;

    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProduct = productKey.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProduct);
    }, [])
    // let itemQuantity;
    // useEffect(() => {
    //     const savedCart = getDatabaseCart();
    //     const itemKey = Object.keys(savedCart);
    //     document.querySelector("#itemQuantity").innerHTML = itemKey.length;
    // })
    return (
        <div className="navBar container">
            <nav>
                <a href="/">
                    <img src={logo} alt="" />
                </a>
            </nav>
            <div className="logIn">
                <span>
                    <FontAwesomeIcon style={{ color: "#545151", marginRight: ".3rem" }} icon={faShoppingCart} />
                    <span
                        style={{ color: "#e8082d", cursor: "pointer", fontWeight: "700", fontSize: "16px" }}
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