import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Buy.css'


const Buy = (props) => {
    const [msg, setMsg] = useState('');
    const showMsg = () => {
        setMsg("Your Order successfully Done . . .")
    }

    return (
        <>
            <div className="cartNavbar">
                <div className='complogo'>
                    <img src="https://i3.sdlcdn.com/img/snapdeal/darwin/logo/sdLatestLogo.svg" />
                </div>
            </div>
            <div className="totalall">
                <div className="total">
                    <div className="secondnav">
                        <NavLink to='/'>
                            <i class="fa-solid fa-house"></i>
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="container">
                <from className='from'>
                    <div className='pin'>
                        <label htmlFor="Pincode">Pincode :- </label>
                        <input type="text" placeholder='Enter Pincode . . ' />
                        <span>Check delivery available or not</span>
                    </div>
                    <div className='name'>
                        <label htmlFor="Name">Name :- </label>
                        <input type="text" placeholder='Enter Name . . ' />
                    </div>
                    <div className='name'>
                        <label htmlFor="Email">Email :- </label>
                        <input type="text" placeholder='Enter Email . . ' />
                    </div>
                    <div className='name'>
                        <label htmlFor="Address">Address :- </label>
                        <textarea type="text" placeholder='Enter Address . . ' className='add' />
                    </div>
                    <div className="name">
                        <button className="btn" onClick={showMsg}>Order Now</button>
                        <span>{msg}</span>
                    </div>
                </from>
            </div>
        </>
    )
}

export default Buy