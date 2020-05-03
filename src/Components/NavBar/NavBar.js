import React, { useEffect, useState } from 'react';
import './NavBar.css'
import logo from '../../logo/logo2.png'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDatabaseCart, addToDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../resourses/fakeData';
import { Link } from 'react-router-dom';

const NavBar = () => {
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
    return (
        <div className="navBar container">
            <nav>
                <a href="/">
                    <img src={logo} alt="" />
                </a>
            </nav>
            <div className="logIn">
                <span>
                    <FontAwesomeIcon style={{ color: "#545151" }} icon={faShoppingCart} />
                    <span style={{ color: "#e8082d", cursor: "pointer", fontWeight: "700", fontSize: "18px" }}> {cart.length}</span>
                </span>
                <a className="logInLink" href="/logIn">LogIn</a>
                <a className="mainButton" href="/logIn">Sign up</a>
            </div>
        </div>
    );
};

export default NavBar;