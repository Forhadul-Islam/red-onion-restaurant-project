import React from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
    const handleScroll = () => {

    }
    return (
        <div>
            <div className="scrollToTop">
                <a onScroll={handleScroll} href="/#" className="toTopBtn">^</a>
            </div>
        </div>
    );
};

export default ScrollToTop;