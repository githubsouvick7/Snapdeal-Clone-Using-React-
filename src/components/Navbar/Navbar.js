import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from 'react-toastify';
import { CartContext } from '../Context/Context';
import User from './User';
import Tippy from '@tippyjs/react';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import './Navbar.css'


const Navbar = () => {
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { isAuthenticated, user } = useAuth0();

    const globalstate = useContext(CartContext);
    const state = globalstate.state;

    return (
        <>
            <section className='section-navbar'>
                <div className="logo">
                    <img src="https://i3.sdlcdn.com/img/snapdeal/darwin/logo/sdLatestLogo.svg" alt="snapdeal" />
                </div>
                <div className="allmenu">
                    <div className="search">
                        <input type="" className='input' placeholder='Search Here ...' />
                        <button className='onebtn'><i class="fa-solid fa-magnifying-glass"></i> Search</button>
                    </div>
                    <div className="extra">
                        <div className="cart">
                            <NavLink to='./cart'>
                                <Tippy content={<p>Cart</p>}>
                                    <div className="cartcomp">
                                        <div className="c">
                                            <i class="fa-solid fa-cart-shopping"></i>
                                            <h5>{state.length}</h5>
                                        </div>
                                    </div>
                                </Tippy>
                            </NavLink>
                        </div>
                        {
                            isAuthenticated ? (
                                <>
                                    <button className='set' onClick={() => {
                                        logout({ logoutParams: { returnTo: window.location.origin } })
                                        toast("Logout Successful");
                                    }}>
                                        Log Out
                                    </button>
                                    <Tippy content={<User />}>
                                        <div className="setuser">
                                            <img src={user.picture} width={50} />
                                        </div>
                                    </Tippy>
                                </>
                            ) : (
                                <>
                                    <button className='set' onClick={() => {
                                        loginWithRedirect();
                                    }
                                    }>
                                        Login
                                    </button>
                                    <Tippy content={<p>No User Found</p>}>
                                        <div className="setuser">
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                    </Tippy>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="menu">
                    <i class="fa-solid fa-bars"></i>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default Navbar