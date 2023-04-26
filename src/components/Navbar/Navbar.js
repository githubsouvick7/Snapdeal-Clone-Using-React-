import React, { useContext } from 'react'
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
    const dispatch = globalstate.dispatch;

    return (
        <>
            <section className='section-navbar'>
                <div className="logo">
                    <NavLink to='/'>
                        <img src="https://i3.sdlcdn.com/img/snapdeal/darwin/logo/sdLatestLogo.svg" alt="snapdeal" />
                    </NavLink>
                </div>
                <div className="allmenu">
                    <div className="search">
                        <input type="" className='input' placeholder='Search Here ...' />
                        <button className='onebtn'><i class="fa-solid fa-magnifying-glass"></i> Search</button>
                    </div>
                    <div className="extra">
                        {
                            isAuthenticated ? (
                                <>
                                    <div className="cart">
                                        <NavLink to='./cart'>
                                            <div className="cartcomp">
                                                <div className="c">
                                                    <i class="fa-solid fa-cart-shopping"></i>
                                                    <h5>{state.length}</h5>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                    <button className='set' onClick={() => {
                                        logout({ logoutParams: { returnTo: window.location.origin } })
                                        toast("Logout Successful");
                                        dispatch({ type: "REMOVEALL" })
                                    }}>
                                        Log Out
                                    </button>
                                    <Tippy content={<User />}>
                                        <div className="setuser">
                                            <img src={user.picture} width={50} alt='user' />
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