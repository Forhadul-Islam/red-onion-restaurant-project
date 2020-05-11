import React, { useState, useEffect, createContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import fakeData from '../../resourses/fakeData';
import './ProductPreview.css';
import { Button } from '@material-ui/core';
import { faShoppingCart, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDatabaseCart, addToDatabaseCart } from '../../utilities/databaseManager';
import { prettyDOM } from '@testing-library/react';



const ProductPreview = () => {

    const { productKey } = useParams();
    const product = fakeData.find(product => product.key === productKey)
    const { name, type, img, key, price, message } = product;
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProduct = productKey.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = savedCart[key];
            return product
        })
        setCart(cartProduct);
    }, []);

    let currentProduct = cart.filter(product => product.key === productKey);
    console.log(currentProduct)
    const handleAddProduct = product => {
        const toAddedKey = product.key;
        const sameProduct = cart.find(product => product.key === toAddedKey);
        const others = cart.filter(product => product.key !== toAddedKey);
        let count = 1;
        let newCart
        if (sameProduct) {
            product.quantity = product.quantity + 1;
            count = product.quantity;
            newCart = [...others, sameProduct]
            setCart(newCart)
        } else {
            product.quantity = 1;
            newCart = [...others, product];
            setCart(newCart);
        }
        document.getElementById("quantity").innerHTML = count;
        addToDatabaseCart(product.key, count)
    }




    const handleDecrease = (product) => {
        const toAddedKey = product.key;
        const sameProduct = cart.find(product => product.key === toAddedKey);
        const others = cart.filter(product => product.key !== toAddedKey)
        let count;
        let newCart;
        if (sameProduct) {
            if (product.quantity > 0) {
                product.quantity = product.quantity - 1;
                count = product.quantity;
                newCart = [...others, sameProduct]
                setCart(newCart)
                document.getElementById("quantity").innerHTML = count;
            } else {
                alert("Sorry, Quantity cannot be negative")
            }
        }

        addToDatabaseCart(product.key, count)
    }

    useEffect(() => {
        // const { productKey } = useParams();
        const savedCart = getDatabaseCart();
        // const productKey = Object.keys(savedCart);
        if (savedCart[productKey]) {

            document.querySelector("#quantity").innerHTML = savedCart[productKey]
        }
    })

    return (
        <div style={{ backgroundColor: "aliceblue", height: " 100 %" }}>
            <div>
                <h4 className="cartItemNumber">
                    <span>
                        {cart.length}
                    </span>
                    <FontAwesomeIcon
                        style={{ color: "#d63474" }}
                        icon={faShoppingCart}
                    />
                </h4>
            </div>
            <div className="previewArea ">
                <section className="productDetail">
                    <div>
                        <h2 style={{ fontSize: "30px", color: "#403e3e" }}>
                            {name}
                        </h2>
                        <h5 style={{ color: "#403e3e" }} >
                            {type}
                        </h5>
                        <p>
                            Vegetables, including lettuce, corn, tomatoes, onions, celery, cucumbers, mushrooms, and more are also sold at many grocery stores, and are purchased similarly to the way that fruits are. Grocery stores typically stock more vegetables than fruit at any given time, as vegetables remain fresh longer than fruits do, generally speaking.
                    </p>
                    </div>
                    <div className="PricingArea">
                        <div className="price">
                            <h4 id="productPrice">${price}</h4>
                        </div>
                        <div className="quantityManagement">
                            <div>
                                <button
                                    style={{ backgroundColor: "transparent" }}
                                    onClick={() => handleDecrease(product)}
                                >
                                    <FontAwesomeIcon className="quantityIcon" icon={faMinus} />
                                </button>
                                <p id="quantity">
                                    Zero
                                </p>
                                <button
                                    style={{ backgroundColor: "transparent" }}
                                    onClick={() => handleAddProduct(product)}
                                >
                                    <FontAwesomeIcon className="quantityIcon" icon={faPlus} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => handleAddProduct(product)}
                        className="addToCartButton"
                    >
                        <FontAwesomeIcon icon={faShoppingCart} />
                         Add
                    </button>
                    <Link style={{ textDecoration: "none" }} to="/checkout"><h3 className="goToCart">Go to cart</h3></Link>

                </section>
                <section className="productImage">
                    <img src={img} alt="" />

                </section>
            </div>
        </div>

    );
};

export default ProductPreview;