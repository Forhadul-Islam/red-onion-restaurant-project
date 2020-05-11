import React, { useEffect } from 'react';
import './Product.css'
import { Link } from 'react-router-dom'
import { getDatabaseCart } from '../../utilities/databaseManager';
const Product = (props) => {
    const { name, img, message, price, key } = props.product;

    return (
        <div className="product">
            <div className="cart">
                <div style={{ height: "140px", width: "140px" }} >
                    <img src={img} alt="" />
                </div>
                <Link style={{ textDecoration: "none" }} to={"/product/" + key}>
                    <div className="info">
                        <p className="productName">{name}</p>
                        <small>{message}</small>
                        <p className="price">${price}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Product;