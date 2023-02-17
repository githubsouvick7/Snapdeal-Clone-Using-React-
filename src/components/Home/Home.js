import React from 'react'
import Categories from '../Catagories/Categories'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Image from '../OfferPage/Image'
import Product from '../Product/Product'
import './Home.css'


const Home = () => {
    return (
        <>
            <Header />
            <Navbar />
            <div className="maincomp">
                {/* <Categories /> */}
                <Product />
            </div>

        </>
    )
}

export default Home