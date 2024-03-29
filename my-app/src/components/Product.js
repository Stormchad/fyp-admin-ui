import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Button  } from 'reactstrap';
import '../Styles/Product.css';
import { createBrowserHistory } from 'history';
import { useHistory } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Header from './Header';
import SearchBar from './searchBar'

function Product() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const fetchData = async () => {
    const response = await axios.get('http://localhost:4002/products');
    setData(response.data.docs);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const clearSearch = () => {
    setSearchTerm('');
    fetchData();
  };

  const handleSearch = async () => {
  try {
    const requestBody = {
      "productName":`${searchTerm}`
    }
    const response = await axios.post(`http://localhost:4002/product/search`, requestBody);
    setData(response.data.product.  docs || []);
  } catch (error) {
    console.error(error);
  }
};

  

  const handleDelete = async (productId) => {
    try {
      await fetch(`http://localhost:4002/admin/product/${productId}`, 
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

      <div className="head-buttons">

        <div className='create-product'>
        <Link to="/CreateProduct">
          <button>Create Product</button>
        </Link>
        </div>

        <div className='upload-product'>
        <Link to="/CreateProduct">
          <button>Upload Product</button>
        </Link>
        </div>

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