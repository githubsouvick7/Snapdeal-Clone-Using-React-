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

    const [state1, dispatch1] = useReducer(reducer, { count: 1 });
    const [totalPrice, setTotalPrice] = useState(0);
    const { isAuthenticated, user } = useAuth0();
    const [bugPrice, setBugPrice] = useState();



    function reducer(state, action) {
        switch (action.type) {
            case 'INCREMENT':
                return { count: state.count + 1 };
            case 'DECREMENT':
                return { count: state.count - 1 };
            default:
                throw new Error();
        }
    }
    let count = 0;
    useEffect(() => {
        state.map((i) => {
            const gst = (i.price * 18) / 100;
            count += gst + i.price;

        })
        setTotalPrice(count);
    }, [state])

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
            <div className='container my-5'>
                {
                    state.map((item) => {
                        const gst = (item.price * 18) / 100;
                        return (
                            <div className="onecomp">
                                <img src={item.image} alt="snapdeal" />
                                <div className="desccomp">
                                    <h4>{item.title}</h4>
                                    <p>Rating : {item.rating.rate}</p>
                                    <h4>${item.price}</h4>
                                    <h4> + 18 % GST, Total Price = ${gst + item.price}</h4>
                                </div>
                                <div className="count">
                                    <button onClick={() => dispatch1({ type: 'INCREMENT', payload: item })}>+</button>
                                    <span>{state1.count}</span>
                                    <button onClick={() => dispatch1({ type: 'DECREMENT', payload: item })}>-</button>
                                </div>
                                <h1 className='dele' onClick={() => dispatch({ type: 'REMOVE', payload: item })}>
                                    <i class="fa-solid fa-trash"></i>
                                </h1>
                            </div>
                        )
                    })
                }
                {
                    isAuthenticated ? (
                        <>
                            <NavLink to={{ pathname: '/buyNow', state: { price: totalPrice } }}>
                                <button className='btn'>Buy Now for $ {totalPrice}</button>
                            </NavLink>
                        </>

                    ) : (
                        <>
                            <button className='btn' onClick={() => toast.warning('Please Login ', {
                                position: "top-center",
                                autoClose: 2000,
                                theme: "dark",
                            })}>Buy Now for $ {totalPrice}</button>
                        </>
                    )
                }
            </div>
            <ToastContainer />
        </>
    )
}

export default Cart