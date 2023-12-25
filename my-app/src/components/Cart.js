import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Button  } from 'reactstrap';
import '../Styles/Carts.css';
import NavigationBar from './NavigationBar';
import Header from './Header';
import SearchBar from './searchBar';
import '../Styles/SearchBar.css';


function Cart() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async() =>{
      const response = await axios.get('http://localhost:4002/carts');
      setData(response.data.docs);
  }

  useEffect(() => {
    fetchData();
  }, []);



const handleDelete = async (cartId) => {
  try {
    await fetch(`http://localhost:4002/cart/${cartId}`, 
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
    await fetch(`http://localhost:4002/admin/cart/reset/${cartId}`, 
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

const handleSearch = async () => {
  try {
    const response = await axios.get(`http://localhost:4002/cart/search?cartNumber=${searchTerm}`);
    setData(response.data.docs || []); // Set data to response.data.docs or an empty array if undefined
  } catch (error) {
    console.error(error);
  }
};

const clearSearch = () => {
  setSearchTerm(''); // Clear the searchTerm state
  fetchData(); // Fetch all carts again
};

  const rows = [];
  let currentRow = [];
  console.log(data)
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

        <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />

        {message && (
          <div className="alert alert-dark" role="alert">
            {message}
          </div>
        )}

        <div>
        <Link to="/CreateCart">
          <button className="create-cart-btn">Create Cart</button>
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
