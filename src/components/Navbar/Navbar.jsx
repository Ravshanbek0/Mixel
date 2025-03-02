import React, { useState } from 'react'
import './Navbar.css'
import { HiOutlineMicrophone } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { FaBalanceScale } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { SlBasket } from "react-icons/sl";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MdMenu } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

function Navbar({ setLoader, setInputValue, setModal, user, setToken }) {
    const navigate = useNavigate()
    const [navModal, setNavModal] = useState(false)
    const { pathname } = useLocation()

    function shared(e) {
        navigate(e.target.value);
    }
    return (
        <>

            {navModal &&
                <div className="modal-nav">
                    <div className="modal-box">
                        <p onClick={() => {
                            setNavModal(false)
                        }} >X</p>
                        <label htmlFor="">Username: <span>{user?.username}</span> </label>
                        <label htmlFor="">Password: <span>{user?.password}</span> </label>
                        <label htmlFor="">Email: <span>{user?.email}</span> </label>
                        <label htmlFor="">First name: <span>{user?.first_name}</span> </label>
                        <label htmlFor="">Last name: <span>{user?.last_name}</span> </label>
                        <label htmlFor="">Phone number: <span>{user?.phone_number}</span> </label>
                        <label htmlFor="">City: <span>{user?.city?.name}</span> </label>
                        <label htmlFor="">Address: <span>{user?.address}</span> </label>

                    </div>
                </div>}
            <div className="red-nav">
                <div className="container">
                    <div className="nav-red">
                        <h1><FaLocationDot /> Ташкент</h1>
                        <ul>
                            <li>Наши магазины</li>
                            <li>B2B продажи</li>
                            <li>Покупка в рассрочку</li>
                            <li>Способы оплаты</li>
                            <li>Гарантия на товары</li>
                        </ul>
                        <div>
                            <p><BsFillTelephoneFill /> +998 95 123 55 88  </p>
                            <p>Рус</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container' >

                <nav className="nav-bar">
                    <div><Link to={'/'}><img src="../imgs/logo.png" alt="" className="logo-img" /></Link></div>
                    <div className="nav-search">
                        <select value={pathname} onChange={shared} name="" id="select">
                            <option value="/filter/all">Все категории</option>
                            <option value="/filter/equipments">Моноблоки</option>
                            <option value="/filter/phones">Телефоны, планшеты</option>
                            <option value="/filter/Laptops">Ноутбуки</option>
                            <option value="/filter/accessories">Комплектующие</option>
                            <option value="/filter/obord">Сетевое оборудование</option>
                            <option value="/filter/status">Оргтехника</option>
                        </select>
                        <input onChange={(e) => {
                            if (pathname == "/") {
                                navigate("/filter/all")
                            }
                            setInputValue(e.target.value)
                        }} type="text" placeholder='Телефоны и бытовая' />
                        <span className="micro-scan"><HiOutlineMicrophone /></span>
                        <button>
                            <span><CiSearch /></span>
                            Поиск
                        </button>
                    </div>
                    <div className="extras">
                        {!user?.username ? <div onClick={() => {
                            setModal(true)
                        }}>
                            <span className="icons-extra"><AiOutlineUser /></span> Войти
                        </div> :
                            <div onClick={() => {
                                setLoader(true)
                                setNavModal(true)
                                setLoader(false)
                            }}>
                                <span className="icons-extra"><AiOutlineUser /></span> Profile
                            </div>

                        }

                        <div>
                            <h4 className="red-cirlce">12</h4>
                            <span className="icons-extra"><FaBalanceScale /></span> Сравнение
                        </div>
                        <div>
                            <h4 className="red-cirlce">12</h4>
                            <span className="icons-extra"><FaRegHeart /></span> Избранное
                        </div>
                        <div>
                            <h4 className="red-cirlce">12</h4>
                            <span className="icons-extra"><SlBasket /></span> Корзина
                        </div>
                        {user?.username && <p><div onClick={() => {
                            setLoader(true)
                            localStorage.clear()
                            setToken(null)
                            setLoader(false)

                        }} >
                            Log Out
                        </div></p>}
                    </div>
                </nav>
                <div className="header">
                    <ul className="infos">
                        <p><span><MdMenu /></span>  Категории</p>
                        <li><NavLink to={'/filter/all'}>Наши магазины</NavLink></li>
                        <li><NavLink to={'/filter/equipments'} > Моноблоки</NavLink></li>
                        <li><NavLink to={'/filter/phones'} >Телефоны, планшеты</NavLink></li>
                        <li><NavLink to={'/filter/Laptops'} >Ноутбуки</NavLink></li>
                        <li><NavLink to={'/filter/accessories'} >Комплектующие</NavLink></li>
                        <li><NavLink to={'/filter/obord'} >Сетевое оборудование</NavLink></li>
                        <li><NavLink to={'/filter/status'} >Оргтехника</NavLink></li>
                    </ul>

                </div>

            </div>

        </>
    )
}

export default Navbar