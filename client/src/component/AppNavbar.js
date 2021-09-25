import { Collapse, Container, Navbar, NavbarToggler, Nav, NavItem, Form, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Fragment, useCallback, useEffect, useState } from "react"
import LoginModal from './auth/LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT_REQUEST } from '../redux/type'
import RegisterModal from './auth/RegisterModal'



const AppNavbar = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const { isAuthenticated, user, userRole } = useSelector((state) => state.auth);
    console.log(userRole, "UserRole");

    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST
        })
    },[user])

    useEffect(() => {
        setIsOpen(false)
    },[user])

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }
    
    const addPostClick = () => {

    }


    const authLink = (
        <Fragment>
            <NavItem>
                {userRole === "Admin"? (
                    <Form className="col mt-2">
                        <Link to="post" className="btn btn-success block text-white px-3" onClick={addPostClick}>
                            Add post
                        </Link>
                    </Form>
                ):""}
            </NavItem>
            <NavItem className="d-flex justify-content-center">
                <Form className="col mt-2">
                    {user && user.name? (
                        <Link>
                            <Button outline color="light" className="px-3" block>
                                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
                            </Button>
                        </Link>
                    ):(
                        <Link>
                            <Button outline color="light" className="px-3" block>
                                <strong>No User</strong>
                            </Button>
                        </Link>
                    )}
                </Form>
            </NavItem>
            <NavItem>
                <Form className="col">
                    <Link onClick={onLogout} to="#">
                        <Button outline color="light" className="mt-2" block>
                            Logout
                        </Button>
                    </Link>
                </Form>
            </NavItem>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <NavItem>
                <RegisterModal/>
            </NavItem>
            <NavItem>
                <LoginModal/>
            </NavItem>
        </Fragment>
    )

    return (
        <Fragment>
            <Navbar color='dark' dark expand='lg' className='sticky-top'>
                <Container>
                    <Link to='/' className='text-white text-decoration-none'>
                        Blog Home
                    </Link>
                    <NavbarToggler onClick={handleToggle}/>
                    <Collapse isOpen={isOpen}>
                        <Nav className='ml-auto d-flex justify-content-around'>
                            {isAuthenticated ? 
                            authLink :
                            guestLink }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default AppNavbar;