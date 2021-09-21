import { Collapse, Container, Navbar, NavbarToggler, Nav } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Fragment, useCallback, useEffect, useState } from "react"
import LoginModal from './auth/LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT_REQUEST } from '../redux/type'



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
    })

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

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
                            <h1 className='text-white'>authLink</h1> :
                            <LoginModal/> }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default AppNavbar;