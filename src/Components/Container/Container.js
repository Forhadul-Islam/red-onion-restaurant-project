import React from 'react';
import './Container.css';
import Header from '../Header/Header';
import Food from '../Food/Food';
import Services from '../Services/Services';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';


const Container = () => {
    return (
        <div>
            <div className="headerBanner">
                <Header></Header>
            </div>
            <div>
                <ScrollToTop></ScrollToTop>
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