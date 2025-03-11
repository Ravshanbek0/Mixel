import React from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { FaBalanceScale } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { SlBasket } from "react-icons/sl";
import { Link } from 'react-router-dom';

function ToolCard({ isActive, item,handleLike }) {
    return (
        <div>
            <div className={isActive ? 'gar-card tool active' : 'gar-card tool'}>
                <Link to={`/card/${item?.id}`}><img src={`https://ecommerce0003.pythonanywhere.com/${item?.img_main}`} alt="" /></Link>
                <div>
                    <h3>{Math.floor((item?.price / 12) * 1.3).toLocaleString()}  сум/мес</h3>
                    <p>{item?.price?.toLocaleString()} сум</p>
                    <h1>{item?.name?.slice(0,50)}...</h1>
                </div>

                <div className="gar-icons tool-top">
                    <span><SlBasket className='gar-iconb red' /></span>
                    <span onClick={()=>{
                        handleLike(item?.id)
                    }} ><FaRegHeart className='gar-iconb' /></span>
                    <span><FaBalanceScale className='gar-iconb' /></span>
                </div>
            </div>
        </div>
    )
}

export default ToolCard