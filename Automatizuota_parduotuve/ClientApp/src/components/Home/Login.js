import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Layout from './Layout';
import Routes from './Routes';

const Login = () => {

    const [role, setRole] = useState("guest");

    const logout = () => {
        setRole("guest");
    }

    if (role !== "guest") {
        return (
            <Layout role={role} logout={logout}>
                <Routes role={role} />
            </Layout>
        )
    }

    return (
        <>
        <Button onClick = {() => setRole("user")}>Login as user</Button>
        <Button onClick = {() => setRole("admin")}>Login as admin</Button>
        </>
    );
}

export default Login;