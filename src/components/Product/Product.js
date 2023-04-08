import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { CartContext } from '../Context/Context';
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Product.css'


const api = `https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products`;

const Product = () => {
    const [eData, seteData] = useState([]);
    const { isAuthenticated } = useAuth0();

    const getData = () => {
        fetch(api)
            .then(res => res.json())
            .then(data => {
                data.forEach(element => {
                    element.quantity = 1;
                });
                console.log(data);
                seteData(data)
            })

    }
    useEffect(() => {
        getData();
    }, [])

    const GlobalState = useContext(CartContext);
    const state = GlobalState.state;
    const disp = GlobalState.dispatch;
    console.log(GlobalState);

    return (
        <>
            <div className="main">
                <div className="dispproduct">
                    {
                        eData.map((item) => {
                            const { title, price, image, id } = item;
                            const fullName = title.substring(0, 20);
                            const Added = () => {
                                disp({ type: 'ADD', payload: item })
                                toast.success("Added . . .", {
                                    position: "top-center",
                                    autoClose: 2000,
                                    theme: "light",
                                })
                            }
                            const Remove = () => {
                                disp({ type: 'REMOVE', payload: item })
                                toast.success("Removed . . .", {
                                    position: "top-center",
                                    autoClose: 2000,
                                    theme: "light",
                                })
                            }

                            return (
                                <>
                                    <div className='compcard'>
                                        <NavLink to={`product/${id}`} key={id}>
                                            <img width={150} src={image} />
                                        </NavLink>
                                        <div className="desc">
                                            <hr />
                                            <h5>{fullName}</h5>
                                            <p>RS : ${price}</p>
                                            {
                                                isAuthenticated ? (
                                                    <>
                                                        {
                                                            state.some((i) => i.id === item.id) ? (
                                                                <button className="btn" onClick={Remove}>
                                                                    Remove from Cart <i class="fa-solid fa-xmark"></i>
                                                                </button>
                                                            ) : (
                                                                <button className="btn" onClick={Added}>
                                                                    Add To Cart <i class="fa-solid fa-cart-shopping"></i>
                                                                </button>
                                                            )
                                                        }
                                                    </>
                                                ) : (
                                                    <button className="btn" onClick={() => {
                                                        toast.warning('Please Login ', {
                                                            position: "top-center",
                                                            autoClose: 2000,
                                                            theme: "light",
                                                        });
                                                    }}>
                                                        Add To Cart <i class="fa-solid fa-cart-shopping"></i>
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Product
