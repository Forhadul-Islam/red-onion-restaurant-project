import React, { useState, useEffect } from 'react';
import './Checkout.css'
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../resourses/fakeData';
import PreviewItem from '../previewItem/PreviewItem';
import DeliveryForm from '../DeliveryForm/DeliveryForm';

const Checkout = () => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartItem = productKey.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartItem);
    }, [])

    // console.log(cart)
    return (
        <div>
            <div></div>
            <div className="reviewArea">
                <div className="deliveryForm">
                    <DeliveryForm></DeliveryForm>
                </div>
                <div className="ProductReview">
                    <PreviewItem
                        cart={cart}
                    >
                    </PreviewItem>
                </div>
            </div>
        </div>
    );
};

export default Checkout;