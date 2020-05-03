import React from 'react';
import './Container.css';
import Header from '../Header/Header';
import Food from '../Food/Food';
import Services from '../Services/Services';
import Footer from '../Footer/Footer';


const Container = () => {
    return (
        <div>
            <div className="headerBanner">
                <Header></Header>
            </div>
            <div className="product">
                <Food></Food>
            </div>
            <div className="container">
                <Services></Services>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Container;