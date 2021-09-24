import {useState, useEffect} from 'react'
import {CLEAR_ERROR_SUCCESS, REGISTER_REQUEST} from '../../redux/type'
import { useDispatch, useSelector } from 'react-redux'
import {ModalBody, ModalHeader, NavLink, Modal, Alert, FormGroup, Form, Label, Input, Button} from 'reactstrap'

const RegisterModal = () => {
    //container 구조부분

    const [modal, setModal] = useState(false);
    const [form, setValue] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [localMsg, setLocalMsg] = useState('');
    const {errMsg} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const handgleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_SUCCESS
        })
        setModal(!modal)
        
    }
    useEffect(() => {
        try {
            setLocalMsg(errMsg)
        } catch (error) {
            console.error(error);
        }

    },[errMsg])
    
    const onChange = (e) => {
        setValue({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {
        const {user, eamil, password} = form;
        const newUser = {user, eamil, password};
        console.log('RegisterNewUser', newUser);

        dispatch({
            type:REGISTER_REQUEST,
            payload: newUser
        })
    }

    //presentaion 구조부분
    return(
        <div>
            <NavLink onClick={handgleToggle} href='#'>
                Register
                <Modal isOpen={modal} onClick={handgleToggle}>
                    <ModalHeader onClick={handgleToggle}>
                        Register
                    </ModalHeader>
                    <ModalBody>
                        {localMsg? <Alert color='danger'> {localMsg} </Alert> : null}
                        <Form onSubmit={onsubmit}>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    type='text'
                                    id='name'
                                    name='name'
                                    placeholder='Name'
                                    onChange={onchange}
                                />
                                <Label for='email'>Email</Label>
                                <Input
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder='Email'
                                    onChange={onchange}
                                />
                                <Label for='password'>Password</Label>
                                <Input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Password'
                                    onChange={onchange}
                                />
                                <Button color='black' className='mt-2' block>
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>

            </NavLink>
        </div>
    )
}

export default RegisterModal;