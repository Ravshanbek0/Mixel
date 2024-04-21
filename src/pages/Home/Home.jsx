import React, { useEffect, useState } from 'react'
import './Home.css'
import GarCard from '../../components/gar-card/GarCard'
import ToolCard from '../../components/tool-card/ToolCard'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from "react-icons/fa";
//Swipper

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import './styles.css';
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';


import { Swiper, SwiperSlide } from 'swiper/react';

function Home({ setLoader }) {
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  async function getData(params) {
    await setLoader(true)
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    await fetch("https://ecommerce0003.pythonanywhere.com/main/products/", requestOptions)

      .then((response) => response.json())
      .then((result) => {
        const products = result.filter((item) => {
          return item.discount != null
        })
        const products2 = result.filter((item) => {
          return item.price < 3500000
        })
        setData1(products)
        setData2(products2)
      })
      .catch((error) => {
        setLoader(false)
      });
    await setLoader(false)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <div className="header">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <div className="container">
            <SwiperSlide><img src="/public/imgs/header.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/public/imgs/header.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/public/imgs/header.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/public/imgs/header.png" alt="" /></SwiperSlide>
          </div>
        </Swiper>

      </div>
      <div className="container">
        <div className="garyashei">
          <div className="gar-info">
            <h1>Горящие предложения</h1>
            <a href="">Посмотреть все <FaLongArrowAltRight /></a>
          </div>
          <div className="gar-cards">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              // centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, FreeMode, Pagination]}
              className="mySwiper"
            >
              {data1 && data1.map((item) => {
                return <SwiperSlide><GarCard item={item} /></SwiperSlide>
              })}


            </Swiper>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="category-title">Популярные категории</h1>
        <div className="category">
          <div>
            <h1>Компьютеры</h1>
            <img src="/public/imgs/laptop.png" alt="" />
          </div>
          <div>
            <h1>Телефоны, <br />
              планшеты</h1>
            <img src="/public/imgs/phone.png" alt="" />
          </div>
          <div>
            <h1>Ноутбуки</h1>
            <img src="/public/imgs/laptops2.png" alt="" />
          </div>
          <div>
            <h1>Товары для офиса</h1>
            <img src="/public/imgs/camera.png" alt="" />
          </div>

        </div>
      </div>

   
      <div className="sell">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <div className="container">

            <SwiperSlide>
              <div className="sell-boxes">
                <div className='sell-left'>
                  <h1>Apple iPhone X 64 ГБ</h1>
                  <p>Совершенно новый дисплей Super Retina с диагональю 5,8 дюйма, который удобно лежит в руке и потрясающие выглядит, — это и есть iPhone X.</p>
                </div>
                <div className='sell-between'>
                  <img className='sell-img' src="../public/imgs/sell.png" alt="" />
                </div>
                <div className='sell-right'>
                  <h1>1 250 900 Сум</h1>
                  <p>2 220  900 Сум</p>
                  <a href="">Показать еще</a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="sell-boxes">
                <div className='sell-left'>
                  <h1>Apple iPhone X 64 ГБ</h1>
                  <p>Совершенно новый дисплей Super Retina с диагональю 5,8 дюйма, который удобно лежит в руке и потрясающие выглядит, — это и есть iPhone X.</p>
                </div>
                <div className='sell-between'>
                  <img className='sell-img' src="../public/imgs/sell.png" alt="" />
                </div>
                <div className='sell-right'>
                  <h1>1 250 900 Сум</h1>
                  <p>2 220  900 Сум</p>
                  <a href="">Показать еще</a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="sell-boxes">
                <div className='sell-left'>
                  <h1>Apple iPhone X 64 ГБ</h1>
                  <p>Совершенно новый дисплей Super Retina с диагональю 5,8 дюйма, который удобно лежит в руке и потрясающие выглядит, — это и есть iPhone X.</p>
                </div>
                <div className='sell-between'>
                  <img className='sell-img' src="./public/imgs/sell.png" alt="" />
                </div>
                <div className='sell-right'>
                  <h1>1 250 900 Сум</h1>
                  <p>2 220  900 Сум</p>
                  <a href="">Показать еще</a>
                </div>
              </div></SwiperSlide>
            <SwiperSlide>
              <div className="sell-boxes">
                <div className='sell-left'>
                  <h1>Apple iPhone X 64 ГБ</h1>
                  <p>Совершенно новый дисплей Super Retina с диагональю 5,8 дюйма, который удобно лежит в руке и потрясающие выглядит, — это и есть iPhone X.</p>
                </div>
                <div className='sell-between'>
                  <img className='sell-img' src="./public/imgs/sell.png" alt="" />
                </div>
                <div className='sell-right'>
                  <h1>1 250 900 Сум</h1>
                  <p>2 220  900 Сум</p>
                  <a href="">Показать еще</a>
                </div>
              </div>
            </SwiperSlide>
          </div>

        </Swiper>


      </div>
      <div className="container">
        <div className="gar-info">
          <h1>Товары дешевле:</h1>
          <a href="">Посмотреть все <FaLongArrowAltRight /></a>
        </div>
        <div className="gar-cards">
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, FreeMode, Pagination]}
            className="mySwiper"
          >
            {data2 && data2.map((item) => {
              return <SwiperSlide><ToolCard item={item} /></SwiperSlide>
            })}


          </Swiper>

        </div>

        <div className="gar-info">
          <h1>Бренды</h1>
          <a href=""></a>
        </div>
        <div className="brend">
          <div className="brend-box">
            <img src="/public/imgs/brend.png" alt="" />
          </div>
          <div className="brend-box">
            <img src="/public/imgs/mi.png" alt="" />
          </div>
          <div className="brend-box">
            <img src="/public/imgs/lg.png" alt="" />
          </div>
          <div className="brend-box">
            <img src="https://images.samsung.com/is/image/samsung/assets/uz_ru/about-us/brand/logo/mo/256_144_1.png?$512_N_PNG$" alt="" />
            <img src="/public/imgs/brend.png" alt="" />
          </div>
          <div className="brend-box">
            <img src="/public/imgs/mi.png" alt="" />
          </div>
          <div className="brend-box">
            <img src="/public/imgs/lg.png" alt="" />
          </div>
          <div className="brend-box">
            <img src="/public/imgs/samsung.png" alt="" />
          </div>
          <div className="brend-box">
            <img src="/public/imgs/artel.png" alt="" />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home
