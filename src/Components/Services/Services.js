import React, { useState } from 'react';
import './Services.css'
import serviceData from '../../resourses/servicesData'
import ServiceItem from '../ServiceItem/ServiceItem';

const Services = () => {
    const [serviceInfo, setServiceInfo] = useState(serviceData)
    return (
        <div className="serviceContainer container ">
            <div style={{ lineHeight: "1", margin: "40px 0 20px 0" }}>
                <h3>Why you choose us</h3>
                <small>
                    <span>Lorem ipsum dolor sit amet consectetur.</span>
                    <br />
                    <span>Nam cum autem atque Atque modi unde accusantium totam!</span>
                    <br />
                    <span>Accusantium iusto tenetur lorem ipsum dolor sit amet nihil vel voluptates.</span>
                </small>

            </div>
            <div className="serviceItems">
                {
                    serviceInfo.map(service => <ServiceItem

                        services={service}
                    ></ServiceItem>)
                }
            </div>
        </div>
    );
};

export default Services;