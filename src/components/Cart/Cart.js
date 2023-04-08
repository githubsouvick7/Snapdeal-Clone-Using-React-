import React, { useContext } from 'react'
import { CartContext } from '../Context/Context'
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Payment from './Payment';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css'

const Cart = () => {
    const GlobalState = useContext(CartContext);
    const state = GlobalState.state;
    const dispatch = GlobalState.dispatch;
    console.log(state);

    return (
        <>
            <div className="cartNavbar">
                <div className='complogo'>
                    <img src="https://i3.sdlcdn.com/img/snapdeal/darwin/logo/sdLatestLogo.svg" />
                </div>
            </div>
            <div className="container d-flex my-4">
                <div className="secondnav">
                    <NavLink to='/'>
                        <i class="fa-solid fa-arrow-left"></i>
                    </NavLink>
                </div>
                <button className='btn w-2' onClick={() => {
                    dispatch({ type: "REMOVEALL" })
                    toast.success('All product are removed . .  ', {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "light",
                    })
                }}>Remove All</button>
            </div>
            <div className='cartpage'>
                {
                    state.map((item, index) => {
                        const gst = (item.price * 18) / 100;
                        return (
                            <div key={index} className="onecomp">
                                <img src={item.image} alt="snapdeal" />
                                <div className="desccomp">
                                    <h6>{item.title}</h6>
                                    <p>Rating : {item.rating.rate}</p>
                                    <select name="Size" id="size">
                                        <option value="">Select Size</option>
                                        <option value="">S</option>
                                        <option value="">M</option>
                                        <option value="">L</option>
                                        <option value="">XL</option>
                                        <option value="">XXL</option>
                                    </select>
                                    <h6 className='my-2'><i class="fa-solid fa-rotate-left"></i> 14 days return available</h6>
                                    <h5 className='my-2'>Price : ${item.price} X {item.quantity} Item</h5>
                                </div>
                                <div className="count">
                                    <button onClick={() => dispatch({ type: 'INCREASE', payload: item })}><i class="fa-solid fa-plus"></i></button>
                                    <span style={{ fontSize: '20px' }}>{item.quantity}</span>
                                    <button onClick={() => {
                                        if (item.quantity > 1) {
                                            dispatch({ type: 'DECREASE', payload: item })
                                        } else {
                                            dispatch({ type: 'REMOVE', payload: item })
                                        }
                                    }}><i class="fa-solid fa-minus"></i></button>
                                </div>
                                <h1 className='dele' onClick={() => dispatch({ type: 'REMOVE', payload: item })}>
                                    <i class="fa-solid fa-trash"></i>
                                </h1>
                            </div>
                        )
                    })
                }
            </div>
            <div className="paym"><Payment /></div>
            <ToastContainer />
        </>
    )
}

export default Cart