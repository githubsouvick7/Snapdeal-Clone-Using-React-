import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
    return (
        <>
            <section className='section-navbar'>
                <div className="logo">
                    <img src="https://i3.sdlcdn.com/img/snapdeal/darwin/logo/sdLatestLogo.svg" />
                </div>
                <div className="search">
                    <input type="" className='input' placeholder='Search Here ...' />
                    <button className='onebtn'><i class="fa-solid fa-magnifying-glass"></i> Search</button>
                </div>
                <div className="extra">
                    <div className="cart">
                        <span>Cart</span>
                        <FontAwesomeIcon icon="fa-regular fa-cart-shopping" />
                    </div>
                    <div className="signin">
                        <span>Sign In</span>
                        <div className="set">
                            <i class="fa-solid fa-user"></i>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Navbar