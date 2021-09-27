import Helmet from 'helmet';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { POST_LOADING_REQUEST } from '../../redux/type';
import { Row } from 'reactstrap'
import { Spinner } from '../../component/spinner/Spinner'
import {PostCardOne} from '../../component/post/PostCardOne'

const PostCardList = () => {
    const {posts} = useSelector((state) => (state.post));
    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch({type:POST_LOADING_REQUEST},[dispatch])
    });

    return(
        <Fragment>
             <Helmet title="Home">
                 <Row>
                     {posts? <PostCardOne posts={posts}/> : <Spinner/>}
                 </Row>
             </Helmet>
        </Fragment>
    )
}

export default PostCardList;