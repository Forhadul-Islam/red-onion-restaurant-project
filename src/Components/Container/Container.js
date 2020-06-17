import React, { useState, useEffect } from 'react';
import './Container.css';
import Header from '../Header/Header';
import Food from '../Food/Food';
import Services from '../Services/Services';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import NavBar from '../NavBar/NavBar';
import { getDatabaseCart } from '../../utilities/databaseManager';


const Container = () => {
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
                const cartProduct = productKey.map(key => {
                    const product = data.find(product => product.key === key);
                    product.quantity = savedCart[key];
                    return product;
                })
                setCart(cartProduct);
            })
    }, [])
    // useEffect(() => {
    //     const savedCart = getDatabaseCart();
    //     const productKey = Object.keys(savedCart);
    //     const cartProduct = productKey.map(key => {
    //         const product = fakeData.find(product => product.key === key);
    //         product.quantity = savedCart[key];
    //         return product
    //     })
    //     setCart(cartProduct);
    // }, []);
    return (
        <div>
            <div>
                <NavBar
                    cart={cart}
                ></NavBar>
            </div>
            <div className="headerBanner">
                <Header></Header>
            </div>
            <div>
                <ScrollToTop></ScrollToTop>
            </div>
            <div className="product">
                <Food></Food>
            </div>
            <div className="container">
                <Services></Services>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Container;