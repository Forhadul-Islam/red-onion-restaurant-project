import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductPreview.css';
import { faShoppingCart, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDatabaseCart, addToDatabaseCart } from '../../utilities/databaseManager';
import NavBar from '../NavBar/NavBar';


const ProductPreview = () => {
    const { productKey } = useParams();
    const [currentProduct, setCurrentProduct] = useState([]);
    const { name, type, img, price } = currentProduct;
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://red-onion-shopping.herokuapp.com/products/' + productKey)
            .then(res => res.json())
            .then(data => {
                setCurrentProduct(data);
            })
    }, [productKey])


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

    const handleAddProduct = product => {
        const toAddedKey = product.key;
        const sameProduct = cart.find(product => product.key === toAddedKey);
        const others = cart.filter(product => product.key !== toAddedKey);
        let count;
        let newCart
        if (sameProduct) {
            sameProduct.quantity = sameProduct.quantity + 1;
            count = sameProduct.quantity;
            newCart = [...others, sameProduct]
            setCart(newCart)
        } else {
            product.quantity = 1;
            count = product.quantity;
            newCart = [...others, product];
            setCart(newCart);
        }
        // document.getElementById("quantity").innerHTML = count;
        addToDatabaseCart(product.key, count);

    }


    const handleDecrease = (product) => {
        const toAddedKey = product.key;
        const sameProduct = cart.find(product => product.key === toAddedKey);
        const others = cart.filter(product => product.key !== toAddedKey);
        let count;
        let newCart;
        if (sameProduct) {
            if (sameProduct.quantity > 0) {
                sameProduct.quantity = sameProduct.quantity - 1;
                count = sameProduct.quantity;
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
        <div>
            <div className="productPreviewNav">
                <NavBar
                    cart={cart}
                ></NavBar>
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
                            {
                                currentProduct.length === 0 ? <div>
                                    <button
                                        disabled
                                        style={{ backgroundColor: "transparent" }}
                                        onClick={() => handleDecrease(currentProduct)}
                                    >
                                        <FontAwesomeIcon className="quantityIcon" icon={faMinus} />
                                    </button>
                                    <p id="quantity">
                                        Zero
                                </p>
                                    <button
                                        disabled
                                        style={{ backgroundColor: "transparent" }}
                                        onClick={() => handleAddProduct(currentProduct)}
                                    >
                                        <FontAwesomeIcon className="quantityIcon" icon={faPlus} />
                                    </button>
                                </div>
                                    : <div>
                                        <button
                                            style={{ backgroundColor: "transparent" }}
                                            onClick={() => handleDecrease(currentProduct)}
                                        >
                                            <FontAwesomeIcon className="quantityIcon" icon={faMinus} />
                                        </button>
                                        <p id="quantity">
                                            Zero
                            </p>
                                        <button
                                            style={{ backgroundColor: "transparent" }}
                                            onClick={() => handleAddProduct(currentProduct)}
                                        >
                                            <FontAwesomeIcon className="quantityIcon" icon={faPlus} />
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                    {
                        currentProduct.length === 0 ? <button
                            disabled
                            onClick={() => handleAddProduct(currentProduct)}
                            className="addToCartButton"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                       Add
                  </button>

                            : <button
                                onClick={() => handleAddProduct(currentProduct)}
                                className="addToCartButton"
                            >
                                <FontAwesomeIcon icon={faShoppingCart} />
                         Add
                    </button>
                    }
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