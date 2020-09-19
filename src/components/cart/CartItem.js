import React from 'react';

import {BASE_URL} from '../../store/actions/ActionTypes';


const CartItem = ({ id, name, weight, count, image, weeks, rate_per_bottle, rate_per_week, count_per_week, discount, discount_type, changeFunc, removeFunc }) => (
    <main id='cart-container'>
        <div className='card'>
            <div>
                <div>
                    {console.log(BASE_URL + '/images/' + image)}
                    <img src={BASE_URL + '/images/' + image} alt={BASE_URL + '/images/' + image} />
                </div>
                <div className='card'>
                    <h4> SUBSCRIPTIONS - {name} ({count_per_week} X {weight} X {weeks} WEEKS)</h4>
                    <div id='cart-count-box'><span id='qty'>QTY</span>
                        <button onClick={() => changeFunc({ id, rate_per_week, weeks, add: false })}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 13H5v-2h14v2z" /></svg>
                        </button>
                        <span id='cart-count'>{count}</span>
                        <button onClick={() => changeFunc({ id, rate_per_week, weeks, add: true })}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                        </button>
                    </div>
                        <button id='remove' onClick={() => removeFunc({ id, count, rate_per_week, weeks })}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg></button>
                    <div>
                        <h6>Duration : <strong>{weeks} WEEKS</strong></h6>
                        <h6>Size : <strong>{weight}</strong></h6>
                        <h6>total : <strong> ₹ {weeks * count * rate_per_week}.00</strong></h6>
                    </div>
                </div>
            </div>
        </div>
    </main>
)

export default CartItem;