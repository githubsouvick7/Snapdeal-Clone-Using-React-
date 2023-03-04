import React, { useContext, useEffect, useState, useReducer } from 'react'
import { CartContext } from '../Context/Context'
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css'

const Cart = () => {

    const GlobalState = useContext(CartContext);
    const state = GlobalState.state;
    const dispatch = GlobalState.dispatch;


    const [totalPrice, setTotalPrice] = useState(0);
    const { isAuthenticated, user } = useAuth0();
    const [Pcount, setPcount] = useState(1);

    let count = 0;
    useEffect(() => {
        state.map((i) => {
            const gst = (i.price * 18) / 100;
            count += gst + i.price;
        })
        setTotalPrice(count);
    }, [state])


    const downCount = () => {
        if (Pcount !== 1) {
            setPcount(Pcount - 1);
        }
    }

    return (
        <>
            <div className="cartNavbar">
                <div className='complogo'>
                    <img src="https://i3.sdlcdn.com/img/snapdeal/darwin/logo/sdLatestLogo.svg" />
                </div>
            </div>
            <div className="secondnav">
                <NavLink to='/'>
                    <i class="fa-solid fa-arrow-left"></i>
                </NavLink>
            </div>
            <div className="container">
                {
                    isAuthenticated ? (
                        <>
                            <NavLink to={{ pathname: '/buyNow', state: { price: totalPrice } }}>
                                <button className='btn'>Buy Now for $ {(totalPrice * Pcount).toFixed(2)}</button>
                            </NavLink>
                        </>

                    ) : (
                        <>
                            <button className='btn' onClick={() => toast.warning('Please Login ', {
                                position: "top-center",
                                autoClose: 2000,
                                theme: "light",
                            })}>Buy Now for $ {totalPrice}</button>
                        </>
                    )
                }
            </div>
            <div className='container my-5'>
                {
                    state.map((item, index) => {
                        const gst = (item.price * 18) / 100;
                        const mainPrice = (gst + item.price) * item.quantity;

                        return (
                            <div key={index} className="onecomp">
                                <img src={item.image} alt="snapdeal" />
                                <div className="desccomp">
                                    <h4>{item.title}</h4>
                                    <p>Rating : {item.rating.rate}</p>
                                    <h4>${item.price * item.quantity}</h4>
                                    <h4> + 18 % GST, Total Price = ${mainPrice.toFixed(2)}</h4>
                                </div>
                                <div className="count">
                                    <button onClick={() => dispatch({ type: 'INCREASE', payload: item })}>+</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => {
                                        if (item.quantity > 1) {
                                            dispatch({ type: 'DECREASE', payload: item })
                                        } else {
                                            dispatch({ type: 'REMOVE', payload: item })
                                        }
                                    }}>-</button>
                                </div>
                                <h1 className='dele' onClick={() => dispatch({ type: 'REMOVE', payload: item })}>
                                    <i class="fa-solid fa-trash"></i>
                                </h1>
                            </div>
                        )
                    })
                }
            </div>
            <ToastContainer />
        </>
    )
}

export default Cart