import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="bannerArea">
            <div className="bannerContent">
                <h2>Welcome,</h2>
                <h3>Best food waiting for you</h3>
                <div className="search">
                    <input type="text" placeholder="Search food items" name="" id="" />
                    <button style={{ position: "absolute" }} className="mainButton">Search</button>
                </div>
            </div>
        </div>
    );
};

export default Header;