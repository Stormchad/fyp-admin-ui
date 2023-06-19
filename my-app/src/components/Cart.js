import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Button  } from 'reactstrap';
import '../Styles/Carts.css';
import NavigationBar from './NavigationBar';
import Header from './Header';


function Cart() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://us-central1-cart-4dab3.cloudfunctions.net/api/carts');
      setData(response.data);
    }

    fetchData();
  }, []);


const handleDelete = async (cartId) => {
  try {
    await fetch(`https://us-central1-cart-4dab3.cloudfunctions.net/api/cart/${cartId}`, 
    {
      method: 'DELETE',
    })
    .then((response) => {

      if (response.ok) 
      {
        setMessage('Cart deleted successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 2000)
        return response.json();
      }
      else 
      {
        setMessage('Some error occurred!');
      }

    })
    
  } 
  catch (error) 
  {
    console.error(error);
  }
};

const handleReset = async (cartId) => {
  try {
    await fetch(`vhttps://us-central1-cart-4dab3.cloudfunctions.net/api/admin/cart/reset/${cartId}`, 
    {
      method: 'POST',
    })
    .then((response) => {

      if (response.ok) 
      {
        setMessage('Cart reset successful!');
        setTimeout(() => {
          window.location.reload();
        }, 1000)
        return response.json();
      }
      else 
      {
        setMessage('Some error occurred!');
      }

    })
    
  } 
  catch (error) 
  {
    console.error(error);
  }
};






  const rows = [];
  let currentRow = [];
  for (let i = 0; i < data.length; i++) {
    currentRow.push(
      <div className="col-md-4 mb-3" key={data[i].id}>

        <Card className="shadow-sm">
          <CardBody>
            <CardTitle className="cardTitle"><b> Cart Number: </b> {data[i].cartNumber}</CardTitle> 
            <CardText><b> Special Code: </b> {data[i].specialCode}</CardText>
            <CardText><b> User Connected: </b> {data[i].userConnection.toString()}</CardText>
            <CardText><b> User name: </b> {data[i].username}</CardText>
            <CardText><b> Number of products in cart: </b> {data[i].products.length}</CardText>
            <CardText><b> Checkout status: </b> {data[i].checkoutComplete.toString()}</CardText>
            &nbsp;
            <Button size="sm" color="danger"  onClick={() => handleDelete(data[i]._id)}>Delete</Button>
            &nbsp;
            <Button size="sm" class="btn btn-warning" onClick={() => handleReset(data[i]._id)}>Reset</Button>
          </CardBody>
        </Card>

      </div>
    );

    if (currentRow.length === 3 || i === data.length - 1) {
      rows.push(
        <div className="row" key={i}>
          {currentRow}
        </div>
      );
      currentRow = [];
    }
  }



  return (

    <div>
        <Header/>
        <NavigationBar/>
        {message && (
          <div className="alert alert-dark" role="alert">
            {message}
          </div>
        )}
      <div>
          <header className="header">
            <h1><b>Carts</b></h1>
          </header>
        </div>

        <div>
        <Link to="/CreateCart">
          <button>Create Cart</button>
        </Link>
        </div>

        <br></br>
        <br></br>

        <div className="container mt-3">
        {rows}
        </div>
    </div>
  );
}

export default Cart;
