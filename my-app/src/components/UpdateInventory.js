import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/createProduct.css';
import NavigationBar from './NavigationBar';
import Header from './Header';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { createBrowserHistory } from 'history';


const UpdateInventory = () => {

  const { _id } = useParams();

  const history = useHistory();
  const [quantity, setQuantity] = useState('');
  const [productCode, setProductCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (productCode && quantity) {
      
      if (isNaN(quantity)) 
      {
        console.error('Product price must be a number.');
        setMessage('price should be a number');
      }
      else
      {
                // Create the product object
      const product = {
        quantity: quantity,
        productCode: productCode,
      };

      // Make the POST API call
      fetch(`https://us-central1-cart-4dab3.cloudfunctions.net/api/admin/inventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((response) => {

          if (response.ok) 
          {
            setMessage('Inventory Updated Successfully!!!');
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
      }
      

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
      <h1><b>Update Inventory</b></h1>
    </div>
    <div className="create-product-page">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        {message && (
          <div className="alert alert-dark" role="alert">
            {message}
          </div>
        )}
          <label htmlFor="">Product Code:</label>
          <input
            type="text"
            id="productCode"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Update</button>
          <br></br>
          <button type="button" onClick={() => history.goBack()}>Go Back</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateInventory;
