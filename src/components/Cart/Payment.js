import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/Context';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css'

const Payment = () => {
    const { isAuthenticated } = useAuth0();
    const GlobalState = useContext(CartContext);
    const state = GlobalState.state;

    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [gstPrice, setgstPrice] = useState(0);

    useEffect(() => {
        let count = 0;
        let gst = 0
        state.map((i) => {
            count += i.price * i.quantity;
            gst = (count * 18) / 100;
        })
        setFinalPrice(count + gst);
        setTotalPrice(count);
        setgstPrice(gst);
    }, [state])
    return (
        <>
            <div className='payment'>
                <div className="coupon">
                    <h5> <i class="fa-solid fa-tag"></i>Apply Coupons</h5>
                    <h5>Apply</h5>
                </div>
                <div className="paydetails">
                    <h5>Products Details {state.length}</h5>
                    <div className="mrp">
                        <h6>Total MRP</h6>
                        <h6 className='p'>${totalPrice.toFixed(2)}</h6>
                    </div>
                    <div className="mrp">
                        <h6>18% GST</h6>
                        <h6 className='p'>${gstPrice.toFixed(2)}</h6>
                    </div>
                    <div className="mrp">
                        <h6>Delivery Charge</h6>
                        <h6 className='p'>FREE</h6>
                    </div>
                    <div className="Final">
                        <h6>Final Amount</h6>
                        <h6 className='p'>${finalPrice.toFixed(2)}</h6>
                    </div>
                </div>
                <div className="order">
                    {
                        state.length > 0 ? (
                            <NavLink to={{ pathname: '/buyNow' }}>
                                <button className='bt'>Place Order</button>
                            </NavLink>
                        ) : (
                            <button className='bt' onClick={() => {
                                toast.warning('Please add item on Cart . .  ', {
                                    position: "top-center",
                                    autoClose: 2000,
                                    theme: "light",
                                })
                            }}>Place Order</button>
                        )
                    }

                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Payment