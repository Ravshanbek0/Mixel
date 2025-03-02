import React, { useState } from 'react'
import './GarCard.css'
import { AiOutlineUser } from "react-icons/ai";
import { FaBalanceScale } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { SlBasket } from "react-icons/sl";
import { Link } from 'react-router-dom';

function GarCard({ item }) {

    return (
        <>

            <div className='gar-card'>
                <div className="discount">-{item?.discount?.amount}%</div>
                <Link to={`/card/${item?.id}`}><img src={`https://ecommerce0003.pythonanywhere.com/${item?.img_main}`} alt="" /></Link>
                <h3><span>{item?.price} сум</span>  {item?.price - (item?.price * (item?.discount?.amount / 100))} сум</h3>
                <h1>{item?.name?.slice(0, 40)}... </h1>
                <p>Предложение заканчивается через:</p>
                <div className="minutes">
                    <h4><span id="minute-num">27</span> <span className='minute-text' >ДНЕЙ</span> </h4>
                    <h4><span id="minute-num">21</span> <span className='minute-text' >ЧАСОВ</span> </h4>
                    <h4><span id="minute-num">10</span> <span className='minute-text' >МИНУТ</span> </h4>
                    <h4><span id="minute-num">05</span> <span className='minute-text' >СЕКУНД</span> </h4>
                </div>
                <div className="gar-icons">
                    <span><SlBasket className='gar-iconb red' /></span>
                    <span ><FaRegHeart className='gar-iconb' /></span>
                    <span><FaBalanceScale className='gar-iconb' /></span>
                </div>
            </div>

        </>
    )
}

export default GarCard