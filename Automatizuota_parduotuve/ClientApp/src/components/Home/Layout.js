import React from 'react';
import Container from '@material-ui/core/Container';
import NavMenu from '../Navigation/NavMenu';

const Layout = (props) => {
    return (
      <>
        <NavMenu role={props.role} logout={props.logout}/>
        <Container>
          {props.children}
        </Container>
      </>
    );
}

export default Layout;
