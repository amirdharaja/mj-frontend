import axios from 'axios';
import * as ActionTypes from './ActionTypes';


export const authStart = () => ({ type: ActionTypes.AUTH_START })

export const authSuccess = token => ({ type: ActionTypes.AUTH_SUCCESS, token: token })

export const authFail = error => ({ type: ActionTypes.AUTH_FAIL, error: error })

export const authLogout = () => ({ type: ActionTypes.AUTH_LOGOUT })

export const offMessage = () => ({ type: ActionTypes.MESSAGE })

export const homeData = data => ({ type: ActionTypes.HOME_DATA, data: data })

export const ordersData = data => ({ type: ActionTypes.ORDERS_DATA, data: data })

export const checkout = data => ({ type: ActionTypes.CHECKOUT, data: data })

export const handleOtp = data => ({ type: ActionTypes.OTP, data: data })
export const handleResendOtp = data => ({ type: ActionTypes.RESEND_OTP, data: data })

export const handleRegister = data => ({ type: ActionTypes.REGISTER, data: data })
export const handleLoginModel = () => ({ type: ActionTypes.LOGIN_MODAL })
export const handleRegisterModel = () => ({ type: ActionTypes.REGISTER_MODAL })
export const handleOtpModel = () => ({ type: ActionTypes.OTP_MODAL })


export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('mother_juice_token');
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('user_id')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('phone')
        dispatch(authLogout());
    }
}

export const message = () => {
    return dispatch => { dispatch(offMessage()); }
}

export const verifyOtp = (otp, username) => {
    if (!username || username === null) {
        username = localStorage.getItem('phone')
    }
    return dispatch => {
        axios.post(ActionTypes.BASE_URL + '/validate/otp/', { otp: otp, phone: username })
            .then(response => {
                dispatch(handleOtp(response.status));
            })
            .catch(error => {
                dispatch(handleOtp(error.response.status));
            })
    }
}

export const authLogin = (username, password) => {
    if (username === '' || password === '') {
        let fieldError = 'Username and password can not be empty'
        localStorage.setItem('phone', username)
        return dispatch => {
            dispatch(authFail(fieldError));
        }
    }

    return dispatch => {
        dispatch(authStart());
        axios.post(ActionTypes.BASE_URL + '/login/', {
            username: username,
            password: password,
        })
            .then(response => {
                const token = response.data.token;
                const expirationDate = new Date(new Date().getTime() + 1296000000)
                localStorage.setItem('mother_juice_token', token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('user_id', response.data.data.id);
                localStorage.setItem('isAuthenticated', true);
                dispatch(authSuccess(response.data));
                window.location.replace("/");
            })
            .catch(error => {
                dispatch(authFail(error));
            })
    }

}


export const resendOtp = (username) => {
    alert(username)
    return dispatch => {
        axios.post(ActionTypes.BASE_URL + '/resend/otp/', {username: username})
            .then(response => {
                dispatch(handleResendOtp(response.status));
            })
            .catch(error => {
                dispatch(handleResendOtp(error.response.status));
            })
    }
}

export const authSignup = (data) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(ActionTypes.BASE_URL + '/register/', { data: data })
            .then(response => {
                localStorage.setItem('phone', data['phone'])
                dispatch(handleRegister(response.status));
            })
            .catch(error => {
                dispatch(handleRegister(error.response.status))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = ActionTypes.AUTH_TOKEN;
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

export const getHome = () => {
    return dispatch => {
        const url = ActionTypes.BASE_URL + '/home/'
        if (ActionTypes.AUTH_TOKEN) {
            axios.get(url, { headers: { 'Authorization': `token ${ActionTypes.AUTH_TOKEN}` } })
                .then(response => {
                    dispatch(homeData(response.data.data));
                });
        }
        else {
            axios.get(url)
                .then(response => { dispatch(homeData(response.data.data)) });
        }
    }
}

export const getOrders = () => {
    return dispatch => {
        const url = ActionTypes.BASE_URL + '/orders/'
        if (ActionTypes.AUTH_TOKEN) {
            axios.get(url, { headers: { 'Authorization': `token ${ActionTypes.AUTH_TOKEN}` } })
                .then(response => {
                    dispatch(ordersData(response.data.data))
                });
        }
    }
}

export const checkoutData = () => {
    return dispatch => {
        const url = ActionTypes.BASE_URL + '/checkout/'
        if (ActionTypes.AUTH_TOKEN) {
            axios.get(url, { headers: { 'Authorization': `token ${ActionTypes.AUTH_TOKEN}` } })
                .then(response => {
                    dispatch(checkout(response.data.data))
                });
        }
    }
}

export const loginModal = () => {
    return dispatch => {
        dispatch(handleLoginModel())
    }
}

export const registerModal = () => {
    return dispatch => {
        dispatch(handleRegisterModel())
    }
}

export const otpModal = () => {
    return dispatch => {
        dispatch(handleOtpModel())
    }
}