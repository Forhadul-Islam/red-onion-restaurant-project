import React from 'react';
import './Footer.css';
import logo from '../../logo/logo2.png'

const Footer = () => {
    return (
        <div className="footerArea">
            <div style={{ margin: "0" }} className="row element">
                <div className="col-md-6"> <img src={logo} alt="" /> </div>
                <div className="col-md-3 supportLink">
                    <ul>
                        <li>About online food</li>
                        <li>Read our blog</li>
                        <li>Sign up to deliver</li>
                        <li>Add your restaurant</li>
                    </ul>
                </div>
                <div className="col-md-3 supportLink">
                    <ul>
                        <li>About online food</li>
                        <li>Read our blog</li>
                        <li>Sign up to deliver</li>
                        <li>Add your restaurant</li>
                    </ul>
                </div>

            </div>
            <div>
                <div className="row copyrightBar">
                    <col-md-6><p className="copyright">copyright © 2020 online food</p></col-md-6>
                    <col-md-2><p className="copyright">privacy policy</p></col-md-2>
                    <col-md-2><p className="copyright">Terms of Use</p></col-md-2>
                    <col-md-2><p className="copyright">Pricing</p></col-md-2>
                </div>
            </div>

        </div>
    );
};
export default Footer;