import React from 'react';

import axios from 'axios';
import MainNav from '../containers/Nav';

import { Spinner } from 'reactstrap';
import no_image from '../resources/no_image1.png';

import {BASE_URL, AUTH_TOKEN} from '../store/actions/ActionTypes';


class Setting extends React.Component {

    state = {
        cart_count: 0,
        favourite_count: 0,
        user: '',
        isLoading: false,
        messageTitle: '',
        message: '',
        alertType: 'default',
        alertVisible: false,
    }

    loginToggle = () => this.setState({ loginModal: !this.state.loginModal });
    registerToggle = () => this.setState({ registerModal: !this.state.registerModal });

    componentDidMount() {
        if (AUTH_TOKEN) {
            axios.get(BASE_URL + '/register/', { headers: { 'Authorization': `token ${AUTH_TOKEN}` } })
                .then(response => {
                    this.setState({
                        user: response.data.data.user,
                        cart_count: response.data.data.cart_count,
                        favourite_count: response.data.data.favourite_count,
                        isLoading: false
                    })
                });
        }
        else {
            this.setState({
                alertVisible: true,
                alertType: 'warning',
                messageTitle: 'not logged in',
                message: 'Please login to continue'
            })
        }
    }


    render() {
        return (
            <main id='setting'>
                <div style={{ marginTop: '0px', position: 'fixed', zIndex: 9999 }}>
                    <MainNav
                        cart_count={this.state.cart_count}
                        favourite_count={this.state.favourite_count}
                    />
                </div>
                {
                    this.state.isLoading ?
                        <div id='spnner'>
                            <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
                        </div>
                        :
                        <div id='profile'>
                            <h4 id='title'>MY PROFILE</h4>
                            <div id='details'>
                                <div><img src={no_image} alt='profile_image' /></div>
                                <div>
                                    {this.state.user.last_name !== null
                                        ? <h6><strong>Name :</strong> {this.state.user.first_name + ' ' + this.state.user.last_name}</h6>
                                        : <h6><strong>Name :</strong> {this.state.user.first_name}</h6>
                                    }
                                    <h6><strong>Phone :</strong> {this.state.user.phone}</h6>
                                    <h6><strong>Email :</strong> {this.state.user.email}</h6><br/>
                                    {/* <button id='change_password'>CHANGE PASSWORD</button>
                                    <button id='update'>UPDATE</button>
                                    <button id='remove'>REMOVE</button> */}
                                </div>
                            </div>
                        </div>
                }

            </main >
        )
    }
}


export default Setting;