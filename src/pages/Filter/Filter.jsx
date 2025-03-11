import React, { useEffect, useState } from 'react'
import './Telephones.css'
import { FaCoins } from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoGridOutline } from "react-icons/io5";
import { CiGrid2H } from "react-icons/ci";
import ToolCard from '../../components/tool-card/ToolCard';
import { VscSettings } from "react-icons/vsc";
// import ContinuousSlider from '../../components/range/RangeSlider';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { FaAngleDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

//Slider/////////////////////////////////

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

/////Check===///
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router-dom';
import { Modal } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Filter({ setLoader, inputValue ,handleLike}) {
    const { type } = useParams()
    ////////////////////////////////////Get//////////////////////////////////////////////////
    const [product, setProduct] = useState([])
    const [product2, setProduct2] = useState([])
    const [data, setData] = useState([]);
    const [filterModal, setFilterModal] = useState(false);

    async function getData(link) {
        await setLoader(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        await fetch(link, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setData(result)
                setProduct(result)
                setProduct2(result)
            })
            .catch((error) => {
                setLoader(false)
            });
        await setLoader(false)

    }

    useEffect(() => {
        if (type == 'phones') {
            getData('https://ecommerce0003.pythonanywhere.com/main/products/?subCategory_id=5')
        } else if (type == 'Laptops') {
            getData('https://ecommerce0003.pythonanywhere.com/main/products/?subCategory_id=1')
        }
        else if (type == 'accessories') {
            getData('https://ecommerce0003.pythonanywhere.com/main/products/?subCategory_id=4')
        }
        else if (type == 'equipments') {
            getData('https://ecommerce0003.pythonanywhere.com/main/products/?subCategory_id=6')
        }
        else if (type == 'obord') {
            getData('https://ecommerce0003.pythonanywhere.com/main/products/?subCategory_id=7')
        }
        else if (type == 'status') {
            getData('https://ecommerce0003.pythonanywhere.com/main/products/?subCategory_id=8')
        }
        else if (type == 'all') {
            getData('https://ecommerce0003.pythonanywhere.com/main/products')
        }
    }, [type])


    /////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////Label values//////////////////////////////////////////////////
    const [value, setValue] = useState([300000, 30000000]);
    const [brand, setBrand] = useState([]);
    const [country, setCountry] = useState([]);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isActive, setIsActive] = useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function valuetext(value) {
        return `${value}`;
    }

    function filtered() {
        var newData = []
        var filter_brand, filter_country, filter_price;

        if (brand.length > 0) {
            filter_brand = product2.filter((item) => {
                return brand.includes(item.brand)
            })
        } else {
            filter_brand = product2
        }

        if (country.length > 0) {
            filter_country = product2.filter((item) => {
                return country.includes(item.country?.toLowerCase())
            })
        } else {
            filter_country = product2
        }

        filter_price = product2.filter((item) => {
            return item.price > value[0] && item.price < value[1];
        });

        var newObj = filter_brand.filter((item) => {
            return filter_country.includes(item) && filter_price.includes(item)
        })
        setProduct(newObj)
    }

    ///////////////////////////////////////////////Search////////////////////////////////////////////////////////////

    useEffect(() => {
        if (inputValue) {
            const inputProduct = product2.filter((item) => {
                return item?.name.toLowerCase().includes(inputValue.toLowerCase())
            })
            setProduct(inputProduct);
        } else if (inputValue == "") {
            setProduct(product2)
        }
    }, [inputValue])

    return (
        <div>
            {filterModal && <div className='filter-modal'>
                <h1 onClick={()=>{setFilterModal(false)}} className='filter-x'>x</h1>
                <div className="telephones-left-box filter-modal2">
                    <Accordion style={{ margin: "0px 0px 30px 0px" }}>
                        <AccordionSummary
                            expandIcon={<FaAngleDown />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <p>Цена (cум)</p>

                        </AccordionSummary>
                        <AccordionDetails className='tel-box1'>
                            <div style={{ margin: "0px 0px 15px 0px" }}>
                                <input value={`от ${value[0]}`} type="text" placeholder='от 300 000' />
                                <input value={`до ${value[1]}`} type="text" placeholder='до 103 300 000' />


                            </div>
                            <Box sx={{ width: 300, }}>
                                <Slider style={{ color: "#ED3729" }}
                                    getAriaLabel={() => 'Temperature range'}
                                    value={value}
                                    onChange={handleChange}
                                    min={300000}
                                    max={30000000}
                                    getAriaValueText={valuetext}
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <p className='zabrat-p'>Наличие</p>
                    <label style={{ display: 'flex', margin: '20px auto' }} className="zabrat">
                        <Checkbox style={{ color: "#ED3927" }} {...label} />
                        <p >Забрать сегодня</p>
                    </label>
                    <Accordion style={{ margin: "0px 0px 30px 0px" }}>
                        <AccordionSummary
                            expandIcon={<FaAngleDown />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <p>Бренд</p>

                        </AccordionSummary>
                        <AccordionDetails onChange={(e) => {
                            if (!brand.includes(e.target.value)) {
                                brand.push(e.target.value)
                                setBrand(brand)
                            } else {
                                const filterBrand = brand.filter((item) => {
                                    return item != e.target.value
                                })
                                setBrand(filterBrand)
                            }

                        }} className='tel-box1'>
                            <label className="zabrat red-none-border">
                                <Checkbox value={"LG"} style={{ color: "#ED3927" }} {...label} />
                                <label htmlFor="">LG (30)</label>
                            </label>
                            <label className="zabrat red-none-border">
                                <Checkbox value={"Apple"} style={{ color: "#ED3927" }} {...label} />
                                <label htmlFor="">Apple (30)</label>
                            </label>
                            <label className="zabrat red-none-border">
                                <Checkbox value={"Artel"} style={{ color: "#ED3927" }} {...label} />
                                <label htmlFor="">Artel (7)</label>
                            </label>

                            <label className="zabrat red-none-border">
                                <Checkbox value={"Hp"} style={{ color: "#ED3927" }} {...label} />
                                <label htmlFor="">Hp (30)</label>
                            </label>
                            <label className="zabrat red-none-border">
                                <Checkbox value={"Acer"} style={{ color: "#ED3927" }} {...label} />
                                <label htmlFor="">Acer (30)</label>
                            </label>
                            <label className="zabrat red-none-border">
                                <Checkbox value={"Lenova"} style={{ color: "#ED3927" }} {...label} />
                                <label htmlFor="">Lenova (30)</label>
                            </label>



                        </AccordionDetails>
                    </Accordion>

                    <Accordion style={{ margin: "0px 0px 30px 0px" }}>
                        <AccordionSummary
                            expandIcon={<FaAngleDown />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <p>Страна производитель</p>

                        </AccordionSummary>
                        <AccordionDetails onChange={(e) => {
                            if (!country.includes(e.target.value)) {
                                country.push(e.target.value)
                                setCountry(country)
                            } else {
                                const filterCOuntry = country.filter((item) => {
                                    return item != e.target.value
                                })
                                setCountry(filterCOuntry)
                            }
                        }} className='tel-box1'>
                            <label className="zabrat red-none-border">
                                <Checkbox value={"usa"} style={{ color: "#ED3927" }} {...label} />
                                <label htmlFor="">USA</label>
                            </label>
                            <label className="zabrat red-none-border">
                                <Checkbox value={"china"} style={{ color: "#ED3927" }} {...label} />
                                <label htmlFor="">Китай</label>
                            </label>
                            <label className="zabrat red-none-border">
                                <Checkbox value={"uzbekistan"} style={{ color: "#ED3927" }} {...label} />
                                <label htmlFor="">Uzb </label>
                            </label>
                            <label className="zabrat red-none-border">
                                <Checkbox value={"korea"} style={{ color: "#ED3927" }} {...label} />
                                <label htmlFor="">Korea</label>
                            </label>

                        </AccordionDetails>
                    </Accordion>

                    <div className="tel-box12">
                        <button onClick={() => {
                            filtered()
                            window.scrollTo({
                                top: 51
                            })
                            setFilterModal(false)
                        }}  >Показать</button>
                    </div>
                </div>
            </div>}
            <div className="container">
                <div className="telephones-nav">
                    <h1>Смартфоны в Ташкенте
                        <span onClick={()=>{setFilterModal(true)}} className='filter-btn'><VscSettings /></span>
                    </h1>

                    <div className="boxe-icon">
                        <span style={isActive ? { color: "black" } : { color: "red" }} onClick={() => { setIsActive(false) }} ><IoGridOutline /></span>
                        <span style={isActive ? { color: "red" } : { color: "black" }} onClick={() => { setIsActive(true) }}><CiGrid2H /></span>
                    </div>
                </div>
                <div className="telephones-cards">
                    <div className="telephones-left-box">
                        <Accordion style={{ margin: "0px 0px 30px 0px" }}>
                            <AccordionSummary
                                expandIcon={<FaAngleDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p>Цена (cум)</p>

                            </AccordionSummary>
                            <AccordionDetails className='tel-box1'>
                                <div style={{ margin: "0px 0px 15px 0px" }}>
                                    <input value={`от ${value[0]}`} type="text" placeholder='от 300 000' />
                                    <input value={`до ${value[1]}`} type="text" placeholder='до 103 300 000' />


                                </div>
                                <Box sx={{ width: 300, }}>
                                    <Slider style={{ color: "#ED3729" }}
                                        getAriaLabel={() => 'Temperature range'}
                                        value={value}
                                        onChange={handleChange}
                                        min={300000}
                                        max={30000000}
                                        getAriaValueText={valuetext}
                                    />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <p className='zabrat-p'>Наличие</p>
                        <label style={{ display: 'flex', margin: '20px auto' }} className="zabrat">
                            <Checkbox style={{ color: "#ED3927" }} {...label} />
                            <p >Забрать сегодня</p>
                        </label>
                        <Accordion style={{ margin: "0px 0px 30px 0px" }}>
                            <AccordionSummary
                                expandIcon={<FaAngleDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p>Бренд</p>

                            </AccordionSummary>
                            <AccordionDetails onChange={(e) => {
                                if (!brand.includes(e.target.value)) {
                                    brand.push(e.target.value)
                                    setBrand(brand)
                                } else {
                                    const filterBrand = brand.filter((item) => {
                                        return item != e.target.value
                                    })
                                    setBrand(filterBrand)
                                }

                            }} className='tel-box1'>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"LG"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">LG (30)</label>
                                </label>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"Apple"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">Apple (30)</label>
                                </label>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"Artel"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">Artel (7)</label>
                                </label>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"Huawei"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">Huawei (30)</label>
                                </label>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"Hp"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">Hp (30)</label>
                                </label>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"Acer"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">Acer (30)</label>
                                </label>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"Lenova"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">Lenova (30)</label>
                                </label>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"Philips"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">Philips (30)</label>
                                </label>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"HyperX"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">HyperX (30)</label>
                                </label>

                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ margin: "0px 0px 30px 0px" }}>
                            <AccordionSummary
                                expandIcon={<FaAngleDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p>Страна производитель</p>

                            </AccordionSummary>
                            <AccordionDetails onChange={(e) => {
                                if (!country.includes(e.target.value)) {
                                    country.push(e.target.value)
                                    setCountry(country)
                                } else {
                                    const filterCOuntry = country.filter((item) => {
                                        return item != e.target.value
                                    })
                                    setCountry(filterCOuntry)
                                }
                            }} className='tel-box1'>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"usa"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">USA</label>
                                </label>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"china"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">Китай</label>
                                </label>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"uzbekistan"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">Uzb </label>
                                </label>
                                <label className="zabrat red-none-border">
                                    <Checkbox value={"korea"} style={{ color: "#ED3927" }} {...label} />
                                    <label htmlFor="">Korea</label>
                                </label>

                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ margin: "0px 0px 5px 0px" }}>
                            <AccordionSummary
                                expandIcon={<FaAngleDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p>Количество ядер</p>

                            </AccordionSummary>
                            <AccordionDetails className='tel-box1'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore amet quos non eos repellat ipsum.
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ margin: "0px 0px  5px 0px" }}>
                            <AccordionSummary
                                expandIcon={<FaAngleDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p>Фотокамера</p>

                            </AccordionSummary>
                            <AccordionDetails className='tel-box1'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore amet quos non eos repellat ipsum.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ margin: "0px 0px  5px 0px" }}>
                            <AccordionSummary
                                expandIcon={<FaAngleDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p>Версия ОС</p>

                            </AccordionSummary>
                            <AccordionDetails className='tel-box1'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore amet quos non eos repellat ipsum.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ margin: "0px 0px  5px 0px" }}>
                            <AccordionSummary
                                expandIcon={<FaAngleDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p>Разъем для наушников</p>

                            </AccordionSummary>
                            <AccordionDetails className='tel-box1'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore amet quos non eos repellat ipsum.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ margin: "0px 0px 5px 0px" }}>
                            <AccordionSummary
                                expandIcon={<FaAngleDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p>MIcsuyb</p>

                            </AccordionSummary>
                            <AccordionDetails className='tel-box1'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore amet quos non eos repellat ipsum.
                            </AccordionDetails>
                        </Accordion>
                        <div className="tel-box12">
                            <button onClick={() => {
                                filtered()
                                window.scrollTo({
                                    top: 51
                                })
                            }}  >Показать</button>
                        </div>
                    </div>
                    <div className="telephones-right-box">
                        <div className={isActive ? "telephones-right-main-box active" : "telephones-right-main-box"}>
                            {product?.map((item) => {
                                return <ToolCard handleLike={handleLike} item={item} isActive={isActive} />
                            })}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Filter