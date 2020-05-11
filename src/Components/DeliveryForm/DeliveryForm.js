import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './DeliveryForm.css';
import { useAuth } from '../LogIn/useAuth';

const DeliveryForm = (props) => {
    const auth = useAuth();
    const [userInfo, setUserInfo] = useState("")
    console.log(userInfo);
    const { register, handleSubmit, reset, watch, errors } = useForm();
    const onSubmit = (data, e) => {
        setUserInfo(data)
        // console.log(data);
        e.target.reset()
        e.preventDefault()
    }

    return (
        <div className="formArea">
            <h4>Client form</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="formInput" value={auth.user.name} name="name" ref={register({ required: true })} placeholder="Your name" />
                {errors.name && <span>Name is required</span>}
                <input className="formInput" value={auth.user.email} name="email" ref={register({ required: true })} placeholder="Your email" />
                {errors.email && <span>Email is required</span>}
                <input className="formInput" name="address" ref={register({ required: true })} placeholder="Address" />
                {errors.address && <span>Address is required</span>}
                <input className="formInput" name="phone" ref={register({ required: true })} placeholder="A valid phone number" />
                {errors.phone && <span>Phone number is required</span>}
                <input className="formInput" name="ZipCode" ref={register({ required: true })} placeholder="Zip code" />
                {errors.ZipCode && <span>This field is required</span>}
                <br />

                <input className="formSubmitButton" type="submit" />
            </form>

        </div>
    );
};

export default DeliveryForm;