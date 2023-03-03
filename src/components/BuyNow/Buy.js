import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Buy.css'
import { useAuth0 } from "@auth0/auth0-react";

const Buy = () => {
    const { isAuthenticated, user } = useAuth0();
    const [show, setShow] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setShow(true)
    }

    const Msg = () => {
        return (
            <>
                <div className="model-wrapper"></div>
                <div className="model">
                    <img className='zoom-in-out-box' src="/Image/success.png" alt="image" width={100} />
                    <div>
                        <h5>Your order done successfully .</h5>
                        <NavLink to='/'>
                            <button className='btn' onClick={() => setShow(false)}>Go Home</button>
                        </NavLink>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="cartNavbar">
                <div className='complogo'>
                    <img src="https://i3.sdlcdn.com/img/snapdeal/darwin/logo/sdLatestLogo.svg" />
                </div>
            </div>
            <div className="home">
                <div className="divhome">
                    <NavLink to='/'>
                        <i class="fa-solid fa-house"></i>
                    </NavLink>
                </div>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    {
                        isAuthenticated ? (
                            <>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input type="text" placeholder='Enter Name. . . ' value={user.name} required />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" placeholder='Enter Email. . . ' value={user.email} required />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input type="text" placeholder='Enter Name. . . ' required />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" placeholder='Enter Email. . . ' required />
                                </div>
                            </>
                        )
                    }
                    <div className="form-group">
                        <label>Address:</label>
                        <input type="text" placeholder='Enter Address . . .' required />
                    </div>
                    <div className="form-group">
                        <label>Pincode:</label>
                        <input type="text" placeholder='Enter Pin Code . . .' required />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input type="phone" placeholder='Enter Phone Number . . .' required />
                    </div>
                    <button className='btn' type="submit">Order Now</button>
                    {show && <Msg />}
                </form>
            </div>
        </>
    )
}

export default Buy