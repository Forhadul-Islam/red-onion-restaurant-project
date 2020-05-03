import React, { useState, useEffect } from 'react';
import './Food.css'
import fakeData from '../../resourses/fakeData';
// import lunchItem from '../../resourses/fakeData/lunch'
// import dinnerItem from '../../resourses/fakeData/dinner'
// import breakfastItem from '../../resourses/fakeData/breakfast'
import Product from '../Product/Product';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Food = () => {
    const [products, setProducts] = useState(fakeData);
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
    console.log(cart)

    return (
        <div className="foodContainer">
            <div className="itemType">
                <a className="itemLink" href="/">Breakfast</a>
                <a className="itemLink" href="/">Lunch</a>
                <a className="itemLink" href="/">Dinner</a>
            </div>
            <div>
                <div className="product">
                    {
                        products.map(product => <Product
                            key={product.key}
                            product={product}
                        >
                        </Product>)
                    }

                </div>
                <div>
                    {
                        cart.length ? <Link to="/checkout">
                            <button
                                style={{ display: "block", margin: "auto" }}
                                className="btn btn-danger">
                                Checkout your food
                        </button>
                        </Link>
                            : <button disabled
                                style={{ display: "block", margin: "auto" }}
                                className="btn btn-danger">
                                Checkout your food
                        </button>
                    }

                </div>
            </div>


        </div>
    );
};

export default Food;