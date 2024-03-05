import {  useSelector } from "react-redux";
import s from './style.module.scss';

export default function ProductList() {
  const { items, status } = useSelector(state => state.getData);

  return ( 
    status === 'resolved' ? <div className={s.products}> 
      {
       items.length !== 0 ? items.map((item) => {
          return (
          <ul className={s.products__list} key={item.id}>
            <li className={s.products__item}>{item.id}</li>
            <li className={s.products__item}>{item.product}</li>
            <li className={s.products__item}>{item.price} ₽</li>
            <li className={s.products__item}>{item.brand !== null ? item.brand : "This product doesn't have brand"}</li>
          </ul>
          )
        })
        : <h2>404 not found</h2>
      }
    </div>
    :
    <div className={s.loading}>

    </div>
  )
}