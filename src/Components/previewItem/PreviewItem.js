import React, { useState, useEffect } from 'react';
import './PreviewItem.css';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDatabaseCart, addToDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';


const PreviewItem = (props) => {
    // const [cart, setCart] = useState([]);
    // useEffect(() => {
    //     const savedCart = getDatabaseCart()
    //     const productKey = Object.keys(savedCart);
    //     const cartItems = productKey.map(key => {
    //         const product = fakeData2.find(product => product.key === key);
    //         product.quantity = savedCart[key];
    //         return product;
    //     })
    //     setCart(cartItems);
    // }, [])

    // const handleAddProduct = product => {
    //     const savedItem = getDatabaseCart();
    //     const itemKey = Object.keys(savedItem);
    //     const count = savedItem[product.key] + 1
    //     addToDatabaseCart(product.key, count);
    // }

    // const handleDecrease = product => {
    //     const savedItem = getDatabaseCart();
    //     const itemKey = Object.keys(savedItem);
    //     const count = savedItem[product.key] - 1
    //     addToDatabaseCart(product.key, count);
    // }

    const [cart, setCart] = useState([]);
    //fetching cart items from database
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
        document.getElementsByClassName("quantity").innerHTML = count;
        addToDatabaseCart(product.key, count)
    }

    const handleRemoveProduct = product => {
        const productKey = product.key;
        const newCart = cart.filter(product => product.key !== productKey);
        setCart(newCart)
        removeFromDatabaseCart(productKey);
    }

    const handleDecrease = (product) => {
        const toAddedKey = product.key;
        const sameProduct = cart.find(product => product.key === toAddedKey);
        const others = cart.filter(product => product.key !== toAddedKey)
        let count;
        let newCart;
        if (sameProduct) {
            if (sameProduct.quantity > 0) {
                sameProduct.quantity = sameProduct.quantity - 1;
                count = sameProduct.quantity;
                newCart = [...others, sameProduct]
                setCart(newCart)
                document.getElementsByClassName("quantity").innerHTML = count;
            } else {
                alert("Sorry, Quantity cannot be negative")
            }
        }

        addToDatabaseCart(product.key, count)
    }
    const formattedNumber = num => {
        return num.toFixed(2)
    }
    // have fun with new cart
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];
        const price = subtotal + cartItem.price * cartItem.quantity;
        subtotal = price;
    }
    subtotal = formattedNumber(subtotal)

    let tax = (subtotal / 100) * 5;
    tax = formattedNumber(tax);

    let shipment = 0;
    if (subtotal > 300) {
        shipment = 0;
    } else if (shipment < 300 && shipment > 100) {
        shipment = 10
    } else {
        shipment = 15
    }
    let total = parseFloat(subtotal) + parseFloat(tax) + parseFloat(shipment);
    total = formattedNumber(total);


    return (
        <div className="checkoutProduct" >
            <div className="cartArea">
                <table>
                    <tr>
                        <td>Subtotal:</td>
                        <td>${subtotal}</td>
                    </tr>
                    <tr>
                        <td>Tax:</td>
                        <td>${tax}</td>
                    </tr>
                    <tr>
                        <td>Shipment:</td>
                        <td>${shipment}</td>
                    </tr>
                    <tr>
                        <td>Total:</td>
                        <td>${total}</td>
                    </tr>
                </table>
                <br />
                {
                    props.isShipmentSubmitted ? <button className="cartButton btn btn-danger">Place Order</button>
                        : <button disabled className="cartButton btn btn-danger">Place Order</button>
                }
            </div>
            <div className="cartManagementArea">
                {
                    cart.map(product => (
                        <div className="cartItemArea" >
                            <div className="itemImage"> <img src={product.img} alt="" /></div>
                            <div className="itemInfo">
                                <h6 style={{ fontSize: "11px" }}>{product.name}</h6>
                                <h4 className="price">${product.price}</h4>
                            </div>
                            <div className="itemQuantityManage">
                                <div>
                                    <button onClick={() => handleDecrease(product)}>
                                        <FontAwesomeIcon className="quantityIcon" icon={faMinus} />
                                    </button>
                                    <p className="quantity">
                                        {product.quantity}
                                    </p>
                                    <button onClick={() => handleAddProduct(product)}>
                                        <FontAwesomeIcon className="quantityIcon" icon={faPlus} />
                                    </button>
                                </div>
                                <div className="removeBtn">
                                    {
                                        <button onClick={() => handleRemoveProduct(product)}>Remove</button>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default PreviewItem;