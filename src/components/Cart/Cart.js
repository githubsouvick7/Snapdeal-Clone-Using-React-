import React, { useContext } from 'react'
import { CartContext } from '../Context/Context'
import './Cart.css'
import CartNavbar from './CartNavbar';


const Cart = () => {

    const GlobalState = useContext(CartContext);
    const state = GlobalState.state;
    const dispatch = GlobalState.dispatch;


    return (
        <>
            <CartNavbar />
            <div className='container my-5'>
                {
                    state.map((item, index) => {
                        return (
                            <div className="onecomp">
                                <img src={item.image} alt="snapdeal" />
                                <div className="desccomp">
                                    <h4>{item.title}</h4>
                                    <p>Rating : {item.rating.rate}</p>
                                    <h4>${item.price}</h4>
                                </div>
                                <h1 className='dele' onClick={() => dispatch({ type: 'REMOVE', paylode: item })}>
                                    <i class="fa-solid fa-trash"></i>
                                </h1>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Cart