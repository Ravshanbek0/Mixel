import React, { useEffect } from 'react'
import './Laptop.css'
import { AiOutlineUser } from "react-icons/ai";
import { FaBalanceScale } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { SlBasket } from "react-icons/sl";
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function Laptop({ setLoader }) {

    const [mainImg, setMainImg] = useState(null)
    const [laptopItem, setLaptopItem] = useState([])
    const [readMore, setReadMore] = useState(false)


    const { id } = useParams()

    ///GEt///////

    async function singleGet(params) {
        await setLoader(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        await fetch(`https://ecommerce0003.pythonanywhere.com/main/products/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                setLaptopItem(result)
                setMainImg(result?.img_main)

            })
            .catch((error) => console.error(error));
        await setLoader(false)
    }
    useEffect(() => {
        singleGet();
    }, [id])
    return (
        <div onLoad={
            window.scrollTo({
                top: 51
            })
        }>

            <div className="container">
                <div className="laptop">
                    <div className="laptop-left">
                        <div className="laptop-main-box">
                            <img src={`https://ecommerce0003.pythonanywhere.com/${mainImg}`} alt="" />
                        </div>
                        <div className="laptop-imgs">
                            {laptopItem.img_sub?.map((item) => {
                                return <img onClick={() => {
                                    window.scrollTo({
                                        top: 51
                                    })
                                    setMainImg(item)
                                }} src={`https://ecommerce0003.pythonanywhere.com/${item}`} alt="" />
                            })}
                        </div>
                    </div>
                    <div className="laptop-right">
                        <div className="laptop-right-left">
                            <h1>{laptopItem.product?.name?.slice(0,50)}... <br /> </h1>
                            <div className="laptop-sum">
                                <h2>{laptopItem.product?.price} cум</h2>
                                <div className="laptop-sum-icons">
                                    <span><SlBasket /></span>
                                    <span ><FaRegHeart /></span>
                                    <span><FaBalanceScale /></span>
                                </div>
                            </div>
                            <p> VIP скидки для VIP клиентов</p>
                            <div className="laptop-buttons">
                                <button className='laptop-button1' >Купить сейчас</button>
                                <button className='laptop-button2' >Купить в рассрочку сейчас</button>
                            </div>
                            <div className="laptop-top-infos">
                                <p>Название для договора</p>
                                <h5>{ readMore ? laptopItem.product?.description  : laptopItem.product?.description?.slice(0,200) } ..<br />{laptopItem.product?.description.length > 200 ? <span onClick={()=>{
                                    setReadMore(!readMore)
                                   
                                }}>{readMore ? "Read less" : "Read more "}</span> : ""}</h5>
                                
                            </div>
                        </div>
                        <div className="laptop-right2">
                            <div className="right2-extras">
                                <h1>30 дней на обмен и возврат.</h1>
                                <p>Если купите товар сегодня, до 06 мая можете вернуть или обменять.</p>
                                <a href="#">Подробнее о программе.</a>
                            </div>
                            <div className="right2-extras">
                                <h1>30 дней на обмен и возврат.</h1>
                                <p>Если купите товар сегодня, до 06 мая можете вернуть или обменять.</p>
                                <a href="#">Подробнее о программе.</a>
                            </div>
                            <div className="right2-extras">
                                <h1>30 дней на обмен и возврат.</h1>
                                <p>Если купите товар сегодня, до 06 мая можете вернуть или обменять.</p>
                                <a href="#">Подробнее о программе.</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Laptop