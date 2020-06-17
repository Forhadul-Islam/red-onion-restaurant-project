import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './DeliveryForm.css';
import { useAuth } from '../LogIn/useAuth';
import { getDatabaseCart } from '../../utilities/databaseManager';

const DeliveryForm = (props) => {
    const auth = useAuth();
    const [shipmentInfo, setShipmentInfo] = useState(null)
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data, e) => {
        e.target.reset();
        e.preventDefault();
        setShipmentInfo(data);
        props.handleIsShipmentSubmitted();
        const savedCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            shipmentInfo: data,
            cart: savedCart
        }
        //post order to database
        fetch('https://red-onion-shopping.herokuapp.com/placeOrder', {
            method: 'POST',
            body: JSON.stringify(orderDetails),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('successfully added', data);
            })
    }

    return (
        <div>
            <div className="formArea" style={{ display: shipmentInfo ? 'none' : 'block' }}>
                <h4>Client form</h4>
                <form style={{ lineHeight: "1" }} onSubmit={handleSubmit(onSubmit)}>
                    <input className="formInput" value={auth.user.name} name="name" ref={register({ required: true })} placeholder="Your name" />
                    {errors.name && <span>Name is required</span>}
                    <br />
                    <input className="formInput" value={auth.user.email} name="email" ref={register({ required: true })} placeholder="Your email" />
                    {errors.email && <span>Email is required</span>}
                    <br />
                    <input className="formInput" name="address" ref={register({ required: true })} placeholder="Address" />
                    {errors.address && <span>Address is required</span>}
                    <br />
                    <input className="formInput" name="phone" ref={register({ required: true })} placeholder="A valid phone number" />
                    {errors.phone && <span>Phone number is required</span>}
                    <br />
                    <input className="formInput" name="ZipCode" ref={register({ required: true })} placeholder="Zip code" />
                    {errors.ZipCode && <span>This field is required</span>}
                    <br />
                    <input className="formSubmitButton btn btn-danger" type="submit" />
                </form>
            </div>
            <div>
                <h3 style={{ display: shipmentInfo ? 'block' : 'none' }}>Thanks for submitting your information.</h3>
            </div>
        </div>
    );
};

export default DeliveryForm;