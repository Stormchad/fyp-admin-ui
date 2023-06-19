import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

function NavigationBar(props) {

  const { currentPage } = props;

  return (

    <Navbar color="light" light expand="md">
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/Cart">Carts</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Product">Products</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Inventory">Inventories</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
