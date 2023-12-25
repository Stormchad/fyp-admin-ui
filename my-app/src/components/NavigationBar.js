import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import '../Styles/NavigationBar.css'; // Ensure this is correctly imported

function NavigationBar() {
  return (
    <Navbar className="custom-navbar" expand="md">
      <Nav className="ml-auto" navbar> {/* This class aligns items to the right */}
        <NavItem>
          <NavLink href="/Cart">Carts</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Product">Products</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Inventory">Inventories</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/User">Users</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
