import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/createProduct.css';
import NavigationBar from './NavigationBar';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const CreateProduct = () => {
  const history = useHistory();
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (productName && productCode && productPrice) {
      
      if (isNaN(productPrice)) {
        console.error('Product price must be a number.');
        setMessage('price should be a number');
      }
      // Create the product object
      const product = {
        productName: productName,
        productCode: productCode,
        productPrice: parseFloat(productPrice),
      };

      // Make the POST API call
      fetch('https://us-central1-cart-4dab3.cloudfunctions.net/api/admin/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((response) => {

          if (response.ok) 
          {
            setMessage('Product created successfully!');
            setTimeout(() => {
              history.goBack();
            }, 2000)
            return response.json();
          }
          else 
          {
            setMessage('Some error occurred!');
          }

        })

    } else {
      // Handle form validation error (fields are not filled)
      console.error('Please fill in all fields.');
    }
  };

  return (
    <div>
    <div>
        <Header/>
        <NavigationBar/>
        <br></br>
      <h1><b>Create Product</b></h1>
    </div>
    <div className="create-product-page">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        {message && (
          <div className="alert alert-dark" role="alert">
            {message}
          </div>
        )}
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productCode">Product Code:</label>
          <input
            type="text"
            id="productCode"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="text"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Create</button>
          <br></br>
          <button type="button" onClick={() => history.goBack()}>Go Back</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateProduct;
