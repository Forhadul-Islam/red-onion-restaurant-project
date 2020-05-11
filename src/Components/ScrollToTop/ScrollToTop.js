import React from 'react';
import './ScrollToTop.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll, faArrowUp } from "@fortawesome/free-solid-svg-icons";



// const toTop = document.querySelector(".toTopBtn");
// window.addEventListener('scroll', () => {
//     if (window.pageYOffset > 100) {
//         toTop.classList.add("active")
//     } else {
//         toTop.classList.remove("active")
//     }
// })
const ScrollToTop = () => {

    return (
        <div>
            <div className="scrollToTop">
                <a href="/#" className="toTopBtn">
                    <FontAwesomeIcon icon={faArrowUp} />
                </a>
            </div>
        </div>
    );
};

export default ScrollToTop;