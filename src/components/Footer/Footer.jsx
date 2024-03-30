import React from 'react'
import "./Footer.css"

function Footer() {
  return (
    <div className='footer' >
      <div className="container">
        <div className="footer-div">
          <div className='footer-1'>
            <img src="/public/imgs/logoWhite.png" alt="" />
            <p>График работы колл-центра
              Понедельник - Суббота: 9:00–18:00</p>
            <p>Колл-центр:
              + 998 (71) 205-93-93</p>
          </div>
          <div>
            <p>Категории</p>
            <p>Ноутбуки</p>
            <p>Телефоны</p>
            <p>Моноблоки</p>
            <p>Модули памяти</p>
          </div>
          <div>
            <p>Общее</p>
            <p>Новости</p>
            <p>О нас</p>
            <p>Наши магазины</p>
            <p>Политика конфиденциальности</p>
            <p>Правила программы лояльности</p>
          </div>
          <div>
            <p>Покупателям</p>
            <p>Покупка в рассрочку</p>
            <p>Правила покупок с cashback</p>
            <p>Возврат / Обмен</p>
            <p>Правила пользования купонами</p>
            <p>Доставка и оплата</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer