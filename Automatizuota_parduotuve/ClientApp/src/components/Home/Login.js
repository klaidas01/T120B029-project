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
        <div><Button onClick = {() => setRole("user")}>Login as user</Button></div>
        <div><Button onClick = {() => setRole("admin")}>Login as admin</Button></div>
        <div><Button onClick = {() => setRole("system")}>Login as automated system</Button></div>
        </>
    );
}

export default Login;