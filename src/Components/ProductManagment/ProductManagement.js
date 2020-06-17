import React from 'react';
// import fakeData from '../../resourses/fakeData';

const ProductManagement = () => {
    const products = '';
    const handleAddProducts = () => {
        console.log('product added', products)
        fetch('https://red-onion-shopping.herokuapp.com/addProducts', {
            method: 'POST',
            body: JSON.stringify(products),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("data posted ", data);
            })
    }
    return (
        <div>
            <h2>ProductManagement page</h2>
            <button disabled onClick={handleAddProducts}>Add Products</button>
            <p>Add Product button is disabled!</p>
        </div>
    );
};

export default ProductManagement;