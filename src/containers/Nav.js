
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, Row, Col } from 'reactstrap';
import * as authActions from '../store/actions/actions';
import { connect } from 'react-redux';

import logo from '../resources/logo/l2.png';
import whatsapp from '../resources/icons/whatsapp.png';

import "../styles/scss/style.scss";
import jQuery from 'jquery'


(function ($) {
    $(function () {
        $('nav ul li a:not(:only-child)').click(function (e) {
            $(this).siblings('.nav-dropdown').toggle();
            $('.nav-dropdown').not($(this).siblings()).hide();
            e.stopPropagation();
        });
        $('html').click(function () {
            $('.nav-dropdown').hide();
        });
        $('#nav-toggle').click(function () {
            $('nav ul').slideToggle();
        });
        $('#nav-toggle').on('hover', function () {
            this.classList.toggle('active');
        });
    });
})(jQuery);


class MainNav extends React.PureComponent {

    state = {
        username: '',
        password: '',
        otp: '',
        newUser: {},
        errors: {
            first_name: '',
            phone: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    }


    newUserController = event => {
        this.props.message();
        const data = this.state.newUser;
        this.setState({ errors: {} })
        data[event.target.name] = event.target.value;
        this.setState({
            newUser: data,
        });
    }

    submitRegisterForm = (event) => {
        let is_valid = this.formValidation()
        event.preventDefault();
        if (is_valid) {
            event.preventDefault();
            this.props.register(this.state.newUser);
        }
        else {
            this.setState({
                isLoading: false,
                message: 'Form is not valid, Please fill all the required fields',
                alertType: 'danger',
                alertVisible: true,
            })
        }
    }

    formValidation = () => {
        let formIsValid = true;
        let errors = {};
        let fields = this.state.newUser;

        if (!fields["first_name"] || fields["first_name"] === '') {
            errors["first_name"] = "formError";
            formIsValid = false
        }
        if (!fields["phone"] || fields["phone"] === '' || fields['phone'].length > 13 || fields['phone'].length < 10) {
            errors["phone"] = "formError";
            formIsValid = false
        }
        if (!fields["email"] || fields["email"] === '') {
            errors["email"] = "formError";
            formIsValid = false
        }
        if (!fields["password"] || fields["password"] === '' || fields['password'].length < 6) {
            errors["password"] = "formError";
            errors["confirm_password"] = "formError";
            formIsValid = false
        }
        if (!fields["confirm_password"] || fields["confirm_password"] === '') {
            errors["confirm_password"] = "formError";
            formIsValid = false
        }
        if (fields["confirm_password"] !== fields["password"]) {
            errors["confirm_password"] = "formError";
            errors["password"] = "formError";
            formIsValid = false
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    inputChanged = event => {
        if (event.target.name === 'username') this.setState({ username: event.target.value });
        else if (event.target.name === 'password') this.setState({ password: event.target.value });
        this.props.message();
    }

    otpChanged = event => {
        this.props.message();
        if (event.target.name === 'otp') this.setState({ otp: event.target.value });
    }

    login = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.username, this.state.password);
    }

    otpVerification = (event) => {
        event.preventDefault();
        this.props.message();
        if (this.state.otp.length === 6) {
            this.props.verifyOtp(this.state.otp, this.state.username);
        }
    }

    resendOtp = (event) => {
        event.preventDefault();
        this.props.resendOtp(this.state.username);
    }

    componentDidMount() {
        this.props.message();
    }

    render() {
        return (
            <section className="navigation">
                <div className="nav-container">
                    <div className="brand">
                        <a href="/"><img id='logo' src={logo} alt='logo' /></a>
                    </div>
                    <nav>
                        <div className="nav-mobile"><span id="nav-toggle" href="#"><span></span></span></div>
                        <ul className="nav-list">
                            <li>
                                <div className="dropdown">
                                    <button className="dropbtn">SHOP
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" /></svg></button>
                                    <div className="dropdown-content">
                                        <a href='/products'>JUICES</a>
                                        <a href='/products'>SUBSCRIPTIONS</a>
                                    </div>
                                </div>
                            </li>

                            {this.props.isAuthenticated ? (
                                <span>
                                    <li>
                                        <a href="/cart">
                                            <button className="dropbtn">CART <span id='count'>{this.props.cart_count}</span></button>
                                        </a>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropbtn">ACCOUNT
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" /></svg></button>
                                            <div className="dropdown-content">
                                                <a href="/account/profile">MY PROFILE</a>
                                                <a href="/orders">ORDERS</a>
                                                <span><button id='logout-button' onClick={() => this.props.logout()}>LOGOUT</button></span>
                                            </div>
                                        </div>
                                    </li>
                                </span>
                            ) : (
                                    <span>
                                        <li><button className="dropbtn" onClick={() => this.props.LModal()}>LOG IN</button></li>
                                        <li><button className="dropbtn" onClick={() => this.props.RModal()}>SIGN UP</button></li>
                                    </span>
                                )}
                            <li>
                                <a href="tel:+919524284655">
                                    <button className="dropbtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00e676" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                                            &nbsp;&nbsp;9524284655</button>
                                </a>
                            </li>
                            <li>
                                <a href="https://api.whatsapp.com/send?phone=+919524284655" rel="noopener noreferrer" target="_blank">
                                    <button className="dropbtn"><img src={whatsapp} width='30px' alt='whatsapp' /> Whatsapp Us</button>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {/* <a href="/"><img id='vfc' src={vfc} alt='vocal for local' /></a> */}

                    <div>
                        <Modal className='login-form' isOpen={this.props.loginModal} toggle={this.loginToggle} backdrop={'static'}>
                            <ModalHeader toggle={() => this.props.LModal()}>Mother Store Login</ModalHeader>
                            <ModalBody>
                                {this.props.otpVerificationButton
                                    ? (
                                        <Button color='success' onClick={() => this.props.OModal()} block>VERIFY OTP</Button>
                                    )
                                    : (
                                        <div>
                                            <Form>
                                                <Label className='login-form__label'>Username</Label>
                                                <Input
                                                    className='login-form__input'
                                                    type="text"
                                                    name='username'
                                                    value={this.state.username}
                                                    onChange={this.inputChanged}
                                                    placeholder="Phone / Email"
                                                    title="Valid Phone/ Email Phone only is allowed to login"
                                                    required />
                                                <Label className='login-form__label'>Password</Label>
                                                <Input
                                                    className='login-form__input'
                                                    type='password'
                                                    name='password'
                                                    value={this.state.password}
                                                    onChange={this.inputChanged}
                                                    placeholder='Password' required />
                                                <br />
                                                <Button className='login-form__button' color='light' onClick={this.login} type='submit' block>LOGIN</Button>
                                                <hr />
                                            </Form>
                                            <a href='account/passwprd/reset'><Button color="link" size={'sm'} block>FORGET PASSWORD</Button></a>
                                        </div>
                                    )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="light" size={'sm'} onClick={() => this.props.RModal()}>REGISTER</Button>
                                <Button color="danger" onClick={() => this.props.LModal()} size={'sm'}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>

                    <div>
                        <Modal className='login-form' isOpen={this.props.registerModal} toggle={this.registerToggle} backdrop={'static'}>
                            <ModalHeader toggle={() => this.props.RModal()}>New user Registration</ModalHeader>
                            <ModalBody>
                                <Form>

                                    <Row form>
                                        <Col md={6}>
                                            <Label className='login-form__label' for="first_name">Firstname</Label>
                                            <Input
                                                type="text"
                                                name="first_name"
                                                id="first_name"
                                                className={'login-form__input ' + this.state.errors.first_name}
                                                placeholder="First Name"
                                                onChange={this.newUserController}
                                                value={this.state.newUser.first_name}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Label className='login-form__label' for="last_name">Lastname</Label>
                                            <Input
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                className={'login-form__input'}
                                                placeholder="Last Name"
                                                onChange={this.newUserController}
                                                value={this.state.newUser.last_name} />
                                        </Col>

                                        <Label className='login-form__label' for="phone">Phone Number</Label>
                                        <Input
                                            className={'login-form__input ' + this.state.errors.phone}
                                            type="number"
                                            name='phone'
                                            id='phone'
                                            placeholder="10 digit Phone Number"
                                            onChange={this.newUserController}
                                            value={this.state.newUser.phone} />

                                        <Label className='login-form__label' for="email">Email ID</Label>
                                        <Input
                                            className={'login-form__input ' + this.state.errors.email}
                                            type="email"
                                            name='email'
                                            placeholder="Email ID"
                                            onChange={this.newUserController}
                                            value={this.state.newUser.email} />

                                        <Col md={6}>
                                            <Label className='login-form__label' for="password">Password</Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className={'login-form__input ' + this.state.errors.password}
                                                placeholder="Password"
                                                onChange={this.newUserController}
                                                value={this.state.newUser.password} />
                                        </Col>

                                        <Col md={6}>
                                            <Label className='login-form__label' for="confirm_password">Confirm Password</Label>
                                            <Input
                                                type="password"
                                                name="confirm_password"
                                                id="confirm_password"
                                                className={'login-form__input ' + this.state.errors.confirm_password}
                                                placeholder="Confirm Password"
                                                onChange={this.newUserController}
                                                value={this.state.newUser.confirm_password} />
                                        </Col>
                                    </Row>

                                    <br />
                                    <Button className='login-form__button' onClick={this.submitRegisterForm} block>REGISTER</Button>
                                    <hr />
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="light" size={'sm'} onClick={() => this.props.LModal()}>LOGIN</Button>
                                <Button color="danger" onClick={() => this.props.RModal()} size={'sm'}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>

                    <div>

                        <Modal className='login-form' isOpen={this.props.otpModal} toggle={this.otpToggle} backdrop={'static'}>

                            <ModalHeader>OTP Verification</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Label className='login-form__label'>OTP</Label>
                                    <Input
                                        className='login-form__input'
                                        type="text"
                                        name='otp'
                                        value={this.state.otp}
                                        onChange={this.otpChanged}
                                        placeholder="Enter 6 digit OTP"
                                        required />
                                    <br />
                                    <Button className='login-form__button' color='light' type='submit' onClick={this.otpVerification} block>VERIFY</Button>
                                </Form>
                                <Button onClick={this.resendOtp} color="link" size={'sm'} block>Resend OTP</Button>
                                <hr />
                            </ModalBody>
                        </Modal>
                    </div>

                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(authActions.authLogin(username, password)),
        resendOtp: (username) => dispatch(authActions.resendOtp(username)),
        register: (data) => dispatch(authActions.authSignup(data)),
        logout: () => dispatch(authActions.logout()),
        message: () => dispatch(authActions.message()),
        verifyOtp: (otp, username) => dispatch(authActions.verifyOtp(otp, username)),
        LModal: () => dispatch(authActions.loginModal()),
        RModal: () => dispatch(authActions.registerModal()),
        OModal: () => dispatch(authActions.otpModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
