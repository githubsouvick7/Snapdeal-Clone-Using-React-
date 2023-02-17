import React from 'react'
import { NavLink } from 'react-router-dom'
import './CartNavbar.css'

const CartNavbar = () => {
    return (
        <>
            <div className="cartNavbar">
                <div className='complogo'>
                    <img src="https://i3.sdlcdn.com/img/snapdeal/darwin/logo/sdLatestLogo.svg" />
                </div>
                <div></div>
            </div>
            <div className="secondnav">
                <div className="compcontainer">
                    <NavLink to='/'>
                        <i class="fa-solid fa-arrow-left"></i>
                    </NavLink>
                </div>
            </div>

        </>
    )
}

export default CartNavbar