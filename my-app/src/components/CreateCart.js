import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/createProduct.css';
import NavigationBar from './NavigationBar';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const CreateCart = () => {
  const history = useHistory();
  const [cartNumber, setCartNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (cartNumber) {
      
      if (isNaN(cartNumber)) {
        console.error('Cart Number must be a number.');
        setMessage('Please enter a number');
      }
      // Create the product object
      const cart = {
        cartNumber: cartNumber
      };

      // Make the POST API call
      fetch('https://us-central1-cart-4dab3.cloudfunctions.net/api/admin/carts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
      })
        .then((response) => {

          if (response.ok) 
          {
            setMessage('Cart created successfully!');
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
      <h1><b>Create Cart</b></h1>
    </div>
    <div className="create-product-page">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        {message && (
          <div className="alert alert-dark" role="alert">
            {message}
          </div>
        )}
          <label htmlFor="cartNumber">Assign a cart number to your cart:</label>
          <input
            type="text"
            id="cartNumber"
            value={cartNumber}
            onChange={(e) => setCartNumber(e.target.value)}
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

export default CreateCart;
