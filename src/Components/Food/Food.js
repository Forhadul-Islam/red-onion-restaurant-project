import React, { useState, useEffect } from 'react';
import './Food.css'
import fakeData from '../../resourses/fakeData';
import lunch from '../../resourses/fakeData/lunch'
import dinner from '../../resourses/fakeData/dinner'
import breakfast from '../../resourses/fakeData/breakfast'
import Product from '../Product/Product';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'

const Food = () => {
    const [products, setProducts] = useState(breakfast);
    const [cart, setCart] = useState([]);

    // //tis way is pretty well
    // const [selectType, setSelectType] = useState("Breakfast");
    // const selectedFood = fakeData.filter(food => food.type === selectType);

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
        <div>

            <div className="foodContainer">
                <Nav className="itemType" activeKey="Breakfast">
                    <Nav.Item>
                        <Nav.Link className="itemLink" eventKey="Breakfast" onClick={() => setProducts(breakfast)}>Breakfast</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="itemLink" eventKey="Lunch" onClick={() => setProducts(lunch)}>Lunch</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="itemLink" eventKey="Dinner" onClick={() => setProducts(dinner)}>Dinner</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    </Nav.Item>
                </Nav>
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
                            cart.length ? <Link style={{ textDecoration: "none" }} to="/checkout">
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
        </div>
    );
};

export default Food;