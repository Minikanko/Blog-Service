import { Collapse, Container, Navbar, NavbarToggler, Nav } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Fragment } from "react"


const AppNavbar = () => {
    return (
        <Fragment>
            <Navbar color='dark' dark expand='lg' className='sticky-top'>
                <Container>
                    <Link to='/' className='text-white text-decoration-none'>
                        Blog Home
                    </Link>
                    <NavbarToggler/>
                    <Collapse isOpen={true}>
                        <Nav className='ml-auto d-flex justify-content-around'>
                            {true ? 
                            <h1 className='text-white'>authLink</h1> :
                            <h1 className='text-white'> geustLink</h1> }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default AppNavbar;