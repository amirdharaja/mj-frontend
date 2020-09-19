import React, { useState } from 'react';

import riteImg from '../resources/icons/rite.png';
import {BASE_URL} from '../store/actions/ActionTypes';

const Product = ({
    id,
    name,
    weight,
    slug,
    image,
    count_per_week,
    rate_per_bottle,
    rate_per_week,
    discount_type,
    is_available,
    discount,
    addFunc,
}) => {

    const [weeks, setWeeks] = useState(2)
    const [rite1, setRite1] = useState('rite')
    const [rite2, setRite2] = useState('')
    const [rite3, setRite3] = useState('')
    const [button1, setButton1] = useState('button')
    const [button2, setButton2] = useState('')
    const [button3, setButton3] = useState('')
    const buttonHandle1 = () => {
        setWeeks(2)
        setRite1('rite')
        setRite2('')
        setRite3('')
        setButton1('button')
        setButton2('')
        setButton3('')
    }
    const buttonHandle2 = () => {
        setWeeks(4)
        setRite1('')
        setRite2('rite')
        setRite3('')
        setButton1('')
        setButton2('button')
        setButton3('')
    }
    const buttonHandle3 = () => {
        setWeeks(8)
        setRite1('')
        setRite2('')
        setRite3('rite')
        setButton1('')
        setButton2('')
        setButton3('button')
    }

    return (
        <main className='product'>

            <div className="card" id={id}>
                <h5 id='offer'>
                    {discount_type !== 0 && discount > 0 &&
                        <div>
                            <svg fill="green" width="36px" height="26px"><g>
                                <path d="M23,12l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,12l2.44,2.79l-0.34,3.7 l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,12z M10.09,16.72l-3.8-3.81l1.48-1.48l2.32,2.33 l5.85-5.87l1.48,1.48L10.09,16.72z" />
                            </g></svg>
                            {discount_type === '₹'
                                ? <span>{discount_type + ' ' + discount} OFF</span>
                                : <span>{discount + ' ' + discount_type} OFF</span>
                            }
                        </div>
                    }
                </h5>
                <a href={name}><img id='product-image' src={BASE_URL + image} alt={name} title={name} /></a>
                <h5>{name} [ {weight} X {count_per_week} ]</h5>
                <h6>{count_per_week} Bottles / Week - Home Delivered</h6>

                <h6 id='rate'>₹ {rate_per_bottle}.00 / Bottle</h6>
                <h6 id='quantity'>{weight}</h6>

                <div id='buttons'>
                    <button id={button1} name='button1' value='2' onClick={buttonHandle1}><img id={rite1} src={riteImg} alt='rite' /><h5>2 WEEKS</h5><h6>₹{rate_per_week * 2}.00</h6></button>
                    <button id={button2} name='button2' value='4' onClick={buttonHandle2}><img id={rite2} src={riteImg} alt='rite' /><h5>4 WEEKS</h5><h6>₹{rate_per_week * 4}.00</h6></button>
                    <button id={button3} name='button3' value='8' onClick={buttonHandle3}><img id={rite3} src={riteImg} alt='rite' /><h5>8 WEEKS</h5><h6>₹{rate_per_week * 8}.00</h6></button>
                </div>

                <div id='card-count'>
                </div>
                {is_available
                    ? <button id='cart-button' onClick={() => addFunc({ id, weeks })}> Add to cart </button>
                    : <h6 id='not-available'>Currently not available</h6>
                }
            </div>
        </main>

    )
}

export default Product;