import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Card, CardBody, CardTitle, CardText, Button  } from 'reactstrap';
import '../Styles/Inventory.css';
import NavigationBar from './NavigationBar';
import Header from './Header';
import SearchBar from './searchBar';



function Inventory() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {

    const response = await axios.get('http://localhost:4002/admin/inventories');
    setData(response.data.docs);

  }

  useEffect(() => {
    fetchData();
  }, []);

const handleDelete = async (inventoryId) => {
  try {
    await fetch(`http://localhost:4002/admin/inventory/${inventoryId}`, 
    {
      method: 'DELETE',
    })
    .then((response) => {

      if (response.ok) 
      {
        setMessage('Inventory deleted successfully!');
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

const handleSearch = async () => {
  try {
    const requestBody = {
      "productCode":`${searchTerm}`
    }
    const response = await axios.post(`http://localhost:4002/admin/inventories/search`, requestBody);
    setData(response.data.inventory.docs || []);
  } catch (error) {
    console.error(error);
  }
};


const handleEdit = (_id) => {
  history.push(`/UpdateInventory/${_id}`);
};

const clearSearch = () => {
  setSearchTerm(''); // Clear the searchTerm state
  fetchData(); // Fetch all carts again
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
            <CardText><b> Available Amount: </b> {data[i].quantity}</CardText>
            <Button size="sm" color="primary" onClick={() => console.log(handleEdit(data[i]._id))}>Edit</Button>
            &nbsp;
            <Button size="sm" color="danger" onClick={() => handleDelete(data[i]._id)}>Delete</Button>
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
        <Link to="/CreateInventory">
          <button className="create-inventory-btn">Update Inventory</button>
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

export default Inventory;
