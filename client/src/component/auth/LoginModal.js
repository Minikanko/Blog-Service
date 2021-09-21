import React, { useEffect, useState } from "react"
import { ModalBody, ModalHeader, NavLink, Modal, Alert, FormGroup, Form, Input, Label, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/type'

const LoginModal = () => {
    const [modal, setmodal] = useState(false)
    const [localMsg, setLocalMsg] = useState('')
    const [form, setValues] = useState({
        email : "",
        password:""
    })
    const dispatch = useDispatch();
    //state = createRouteReducer
    const { errMsg } = useSelector((state) => state.auth)

    //useEffect(effectCallBack, [변화시점])
    useEffect(() => {
        try {
            setLocalMsg(errMsg);
        } catch (error) {
            console.log(error);
        }
    }, [errMsg]);

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        })
        setmodal(!modal);
    }

    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        //새로고침방지
        e.preventDefault();
        const {email, password} = form;
        const user = {email, password};
        dispatch({
            type: LOGIN_REQUEST,
            payload: user
        })
    }
    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Login</ModalHeader>
                <ModalBody>
                    {localMsg}
                    {localMsg ? <Alert color='danger'>{localMsg}</Alert> : null}
                    <Form onSubmit = {onSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={onChange}
                            />
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={onChange}
                            />

                            <Button color="dark" className="mt-2 block">
                                Login
                            </Button>
                            </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default LoginModal;