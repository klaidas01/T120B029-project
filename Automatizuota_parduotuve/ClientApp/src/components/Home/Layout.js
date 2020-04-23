import React from 'react';
import Container from '@material-ui/core/Container';
import NavMenu from '../Navigation/NavMenu';

const Layout = (props) => {
    return (
      <div>
        <NavMenu role={props.role} logout={props.logout}/>
        <Container>
          {props.children}
        </Container>
      </div>
    );
}

export default Layout;
