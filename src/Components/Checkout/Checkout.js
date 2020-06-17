import React, { useState, useEffect } from 'react';
import './Checkout.css'
import { getDatabaseCart } from '../../utilities/databaseManager';
import PreviewItem from '../previewItem/PreviewItem';
import DeliveryForm from '../DeliveryForm/DeliveryForm';
import NavBar from '../NavBar/NavBar';

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [isShipmentSubmitted, setIsShipmentSubmitted] = useState(false);
    const handleIsShipmentSubmitted = () => {
        setIsShipmentSubmitted(true);
    }
    //load cart products from database
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
    }, []);

    return (
        <div>
            <div>
                <NavBar
                    cart={cart}
                >
                </NavBar>
            </div>
            <div className="reviewArea">
                <div className="deliveryForm">
                    <DeliveryForm
                        cart={cart}
                        handleIsShipmentSubmitted={handleIsShipmentSubmitted}
                    ></DeliveryForm>
                </div>
                <div className="ProductReview">
                    <PreviewItem
                        isShipmentSubmitted={isShipmentSubmitted}
                    ></PreviewItem>
                </div>
            </div>
        </div>
    );
};

export default Checkout;