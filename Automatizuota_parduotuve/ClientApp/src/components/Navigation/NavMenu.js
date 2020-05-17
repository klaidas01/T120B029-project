import React from 'react';
import { IconButton, Button } from '@material-ui/core';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import './NavMenu.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const NavMenu = (props) => {

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Automatizuota parduotuvė</NavbarBrand>
              <ul>
                Rolė: {props.role}
              </ul>
              <ul>
              <Button component={NavLink} to="/orders">
                Užsakymai
              </Button>
              </ul>
              {props.role !== 'system' &&
              <ul>
              <Button component={NavLink} to="/items">
                Prekės
              </Button>
              </ul>}
              {props.role !== 'system' &&
              <ul>
              <IconButton component={Link} to="/cart">
                <ShoppingCartIcon />
              </IconButton>
              </ul>}
              <ul>
                <Button onClick = {props.logout}>Atsijungti</Button>
              </ul>
          </Container>
        </Navbar>
      </header>
    );
}

export default NavMenu;
