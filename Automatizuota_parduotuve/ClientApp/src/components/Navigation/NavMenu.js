import React from 'react';
import { IconButton, Button } from '@material-ui/core';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import './NavMenu.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { AuthConsumer } from "../../authContext";
import Can from "../Home/Can";
import Logout from '../Home/Logout';

const NavMenu = () => {
  return (
    <AuthConsumer>
      {({ user }) => (
        <Can
        role={user.role}
        perform="navbar:view"
        yes={() => 
          <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
            <Container>
              <NavbarBrand tag={Link} to="/">Automatizuota parduotuvė</NavbarBrand>
                <ul>
                  Rolė: {user.role}
                </ul>
                <ul>
                <Button component={NavLink} to="/orders">
                  Užsakymai
                </Button>
                </ul>
                <Can
                  role={user.role}
                  perform="items:list"
                  yes={() => 
                    <ul>
                      <Button component={NavLink} to="/items">
                        Prekės
                      </Button>
                    </ul>
                  }
                />
                <Can
                  role={user.role}
                  perform="cart:view"
                  yes={() => 
                    <ul>
                    <IconButton component={Link} to="/cart">
                      <ShoppingCartIcon />
                    </IconButton>
                    </ul>
                  }
                />
                <ul>
                  <Logout />
                </ul>
            </Container>
          </Navbar>
        }
        />
      )}
    </AuthConsumer>
  );
}

export default NavMenu;
