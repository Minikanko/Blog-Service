import React, { Fragment } from 'react'
import Header from "../component/Header"
import Footer from "../component/Footer"
import AppNavbar from '../component/AppNavbar';
import { Container } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router';
import {PostCardList, PostWrite, PostDetail, CategoryResult, Search } from './normalRoute'

const MyRouter = () => (
    <Fragment>
        <AppNavbar/>
        <Header></Header>
        <Container id="main-body">
            <Switch>
                <Route path='/' exact component={PostCardList}/>
                <Route path='/post' exact component={PostWrite}/>
                <Route path='/post/:id' exact component={PostDetail}/>
                <Route path='/post/category/:categoryName' exact component={CategoryResult}/>
                <Route path='/search/:searchTerm' exact component={Search}/>
                <Redirect from="*" to="/"/>
            </Switch>
        </Container>
        <Footer></Footer>
    </Fragment>
)


export default MyRouter;

