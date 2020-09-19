import React from 'react';

import axios from 'axios';

import {BASE_URL} from '../store/actions/ActionTypes';

class ContactPopUp extends React.Component {

    state = {
        userContactRequest: {
            full_name: '',
            email: '',
            phone: '',
            details: ''
        },
        errors: {
            full_name: '',
            email: '',
            phone: '',
            details: ''
        }
    }
    openForm() {
        document.getElementById("myForm").style.display = "block";
    }

    closeForm() {
        document.getElementById("myForm").style.display = "none";
    }

    inputChanged = event => {
        const data = this.state.userContactRequest;
        data[event.target.name] = event.target.value;
        this.setState({
            userContactRequest: data,
            errors: {},
            alertVisible: false
        });
    }

    formValidation = () => {
        let formIsValid = true;
        let errors = {};
        let fields = this.state.userContactRequest;

        if (!fields["full_name"] || fields["full_name"] === '') {
            errors["full_name"] = "formError";
            formIsValid = false
        }
        if (!fields["phone"] || fields["phone"] === '') {
            errors["phone"] = "formError";
            formIsValid = false
        }
        if (!fields["email"] || fields["email"] === '') {
            errors["email"] = "formError";
            formIsValid = false
        }
        if (!fields["details"] || fields["details"] === '') {
            errors["details"] = "formError";
            formIsValid = false
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    sendRequest = (event) => {
        let is_valid = this.formValidation()
        event.preventDefault();
        let data = {
            name: this.state.userContactRequest.full_name,
            email: this.state.userContactRequest.email,
            phone: this.state.userContactRequest.phone,
            details: this.state.userContactRequest.details,
        }
        if (is_valid) {
            axios.post(BASE_URL + '/contact/', { data: data })
                .then(response => {
                    if (response.status === 200) {
                        this.setState({
                            alertVisible: true,
                            alertType: 'success',
                            messageTitle: 'Success',
                            message: 'Thank you for reaching us. We will get back with in 24 hours',
                            userContactRequest: {
                                full_name: '',
                                email: '',
                                phone: '',
                                details: ''
                            }

                        })
                    }
                })
                .catch(error => {
                    this.setState({ alertVisible: true, alertType: 'danger', messageTitle: 'Sorry', message: 'Unable to complete the process, Please retry' })
                })
        }
        else {
            this.setState({
                isLoading: false,
                message: 'Request Form is not valid, Please fill all the required fields',
                alertType: 'danger',
                alertVisible: true,
            })
        }
    }

    render() {
        return (
            <main id='contact-popup'>
                <a href='#0' className="open-button" onClick={this.openForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="36px" height="36px"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" /></svg>
                </a>

                <div className="chat-popup" id="myForm">
                    <div className="form-container">
                        <h4>We are always with you</h4>
                        <input
                            type="text"
                            name="full_name"
                            className={this.state.errors.full_name}
                            onChange={this.inputChanged}
                            value={this.state.userContactRequest.full_name}
                            maxLength='128'
                            placeholder="Full Name" required/>
                        <input
                            type="email"
                            name="email"
                            className={this.state.errors.email}
                            onChange={this.inputChanged}
                            value={this.state.userContactRequest.email}
                            placeholder="Email ID" required/>
                        <input
                            type="number"
                            name="phone"
                            className={this.state.errors.phone}
                            onChange={this.inputChanged}
                            value={this.state.userContactRequest.phone}
                            placeholder="Phone Number" required />
                        <textarea
                            name="details"
                            className={this.state.errors.details}
                            onChange={this.inputChanged}
                            value={this.state.userContactRequest.details}
                            maxLength='255'
                            placeholder="Leave a message" required/>

                        <button type="submit" className="btn" onClick={this.sendRequest}>Send</button>
                        <button type="button" className="btn cancel" onClick={this.closeForm}>Close</button>
                    </div>
                </div>
            </main>
        )
    }
}


export default ContactPopUp;