import React from 'react';
import Container from '@material-ui/core/Container';
import { NavMenu } from '../Navigation/NavMenu';

const Layout = (props) => {
    return (
      <div>
        <NavMenu />
        <Container>
          {props.children}
        </Container>
      </div>
    );
}

export default Layout;
