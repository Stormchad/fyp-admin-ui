import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Button  } from 'reactstrap';
import '../Styles/Product.css';
import { createBrowserHistory } from 'history';
import { useHistory } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Header from './Header';

function Product() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://us-central1-cart-4dab3.cloudfunctions.net/api/products');
      setData(response.data);
    }

    fetchData();
  }, []);


  

  const handleDelete = async (productId) => {
    try {
      await fetch(`https://us-central1-cart-4dab3.cloudfunctions.net/api/admin/product/${productId}`, 
      {
        method: 'DELETE',
      })
      .then((response) => {

        if (response.ok) 
        {
          setMessage('Product deleted successfully!');
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


  const handleEdit = (_id) => {
    history.push(`/UpdateProduct/${_id}`);
  };



  const rows = [];
  let currentRow = [];
  for (let i = 0; i < data.length; i++) {
    currentRow.push(
      <div className="col-md-4 mb-3" key={data[i].id}>

        <Card className="shadow-sm">
          <CardBody>
            <CardTitle className="cardTitle"><b> Product Name: </b> {data[i].productName}</CardTitle>
            <CardText><b> Product Code: </b>{data[i].productCode} </CardText>
            <CardText><b> Product Price: </b> {data[i].productPrice}</CardText>
            <Button size="sm" color="primary" onClick={() => console.log(handleEdit(data[i]._id))}>Edit</Button>
            &nbsp;
            
            <Button size="sm" color="danger"  onClick={() => handleDelete(data[i]._id)}>Delete</Button>
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
            <h1><b>Products</b></h1>
          </header>
        </div>
        

        <div>
        <Link to="/CreateProduct">
          <button>Create Product</button>
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

export default Product;
