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

function User() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const fetchData = async () => {
    const response = await axios.get('http://localhost:4002/users');
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
      username:`${searchTerm}`
    }
    const response = await axios.post(`http://localhost:4002/users/search`, requestBody);
    setData(response.data.user.docs || []);
  } catch (error) {
    console.error(error);
  }
};

  

  const handleDelete = async (userId) => {
    try {
      await fetch(`http://localhost:4002/user/:${userId}`, 
      {
        method: 'DELETE',
      })
      .then((response) => {

        if (response.ok) 
        {
          setMessage('User deleted successfully!');
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

  


  const AddCredits = (_id) => {
    history.push(`/UpdateProduct/${_id}`);
  };



  const rows = [];
  let currentRow = [];
  for (let i = 0; i < data.length; i++) {
    currentRow.push(
      <div className="col-md-4 mb-3" key={data[i].id}>

        <Card className="shadow-sm">
          <CardBody>
            <CardTitle className="cardTitle"><b> User Name: </b> {data[i].username}</CardTitle>
            <CardText><b> Email: </b>{data[i].email} </CardText>
            <CardText><b> Display Name: </b> {data[i].displayName}</CardText>
            <CardText><b> Admin Privilages: </b> {data[i].adminPrevilages.toString()}</CardText>
            <CardText><b> Cart Connection: </b> {data[i].cartConnection}</CardText>
            <Button size="sm" color="primary" onClick={() => AddCredits(data[i]._id)}>Add credits</Button>
            
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

      <div className="head-buttons">

        <div className='create-product'>
        <Link to="/CreateUser">
          <button>Create New Admin</button>
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

export default User;