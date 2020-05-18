import React from 'react';
import Container from '@material-ui/core/Container';
import NavMenu from '../Navigation/NavMenu';

const Layout = (props) => {
    return (
      <>
        <NavMenu/>
        <Container>
          {props.children}
        </Container>
      </>
    );
}

export default Layout;
