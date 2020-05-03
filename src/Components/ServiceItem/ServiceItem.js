import React from 'react';
import './ServiceItem.css'

const ServiceItem = (props) => {
    //console.log(props)
    const { img, icon, service, content } = props.services

    return (
        <div className="service">
            <div className="item">
                <div>
                    <img src={img} alt="" />
                </div>
                <div style={{ lineHeight: "1" }}>
                    <div><h6>{service}</h6></div>
                    <div style={{ fontWeight: "200" }}>{content}</div>
                </div>
            </div>
        </div>
    );
};

export default ServiceItem;