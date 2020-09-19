import React from 'react';

import axios from 'axios';
import MainNav from '../containers/Nav';

import {AUTH_TOKEN, BASE_URL} from '../store/actions/ActionTypes';


class Item extends React.Component {

    state = {
        cart_count: 0,
        favourite_count: 0,
        item: '',
        isLoading: true,
        messageTitle: '',
        message: '',
        alertType: 'default',
        alertVisible: false,
    }


    componentDidMount() {
        if (AUTH_TOKEN) {
            axios.get(BASE_URL + this.props.location.pathname + '/', { headers: { 'Authorization': `token ${AUTH_TOKEN}` } })
                .then(response => {
                    this.setState({
                        item: response.data.data.item,
                        cart_count: response.data.data.cart_count,
                        favourite_count: response.data.data.favourite_count,
                        isInCart: response.data.data.is_in_cart,
                        isLoading: false
                    })
                });
        }
        else {
            axios.get(BASE_URL + this.props.location.pathname + '/')
                .then(response => {
                    this.setState({
                        item: response.data.data.item,
                        isLoading: false
                    })
                });
        }
    }

    addToCart = () => {
        if (AUTH_TOKEN) {
            axios.post(BASE_URL + '/handle/cart/', { id: this.state.item.id, add: true }, { headers: { 'Authorization': `token ${AUTH_TOKEN}` } })
                .then(response => {
                    this.setState({
                        isLoading: false,
                        alertVisible: true,
                        alertType: 'success',
                        messageTitle: 'Success!',
                        message: 'Successfully added into your cart'
                    })
                    window.location.replace(this.props.location.pathname)
                })
                .catch(error => {
                    this.setState({
                        isLoading: false,
                        alertVisible: true,
                        alertType: 'warning',
                        messageTitle: 'Faild',
                        message: 'Please retry'
                    })
                })
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

    removeFromCart = () => {
        if (AUTH_TOKEN) {
            axios.post(BASE_URL + '/handle/cart/', { id: this.state.item.id, add: false }, { headers: { 'Authorization': `token ${AUTH_TOKEN}` } })
                .then(response => {
                    this.setState({
                        isLoading: false,
                        alertVisible: true,
                        alertType: 'info',
                        messageTitle: 'Done!',
                        message: 'Successfully removed from your cart'
                    })
                    window.location.replace(this.props.location.pathname)
                })
                .catch(error => {
                    this.setState({
                        isLoading: false,
                        alertVisible: true,
                        alertType: 'warning',
                        messageTitle: 'Faild',
                        message: 'Please retry'
                    })
                })
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
            <main id='item-view'>
                <div style={{ marginTop: '0px', position: 'fixed', zIndex: 9999 }}>
                    <MainNav
                        cart_count={this.state.cart_count}
                        favourite_count={this.state.favourite_count}
                    />
                </div>
                {this.state.isLoading ?
                    null
                    :
                    <div id='item'>
                        <img src={BASE_URL + this.state.item.image} alt={this.state.item.name} />
                        <div id='details'>
                            <h4>{this.state.item.name}</h4>
                            <h5>Description</h5>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.item.description}</p>
                            <h5>MRP ₹ {this.state.item.rate} - {this.state.item.weight} KG</h5>
                        </div>
                        {this.state.isInCart &&
                            <button id='remove' onClick={this.removeFromCart}>REMOVE FROM CART</button>
                        }
                        {!this.state.isInCart &&
                            <button id='add' onClick={this.addToCart}>ADD TO CART</button>
                        }
                        {this.state.isInCart === null && null}
                    </div>
                }
                <div style={{ marginTop: '300px' }}>
                    <hr />
                </div>
            </main>
        )
    }
}


export default Item;