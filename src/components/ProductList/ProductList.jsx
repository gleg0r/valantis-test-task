import {  useSelector } from "react-redux";
import s from './style.module.scss';

export default function ProductList() {
  const { items, status } = useSelector(state => state.getData);

  return ( 
    status === 'resolved' ? <div> 
      {
       items.length !== 0 ? items.map((item, index) => {
          return (
          <ul key={index}>
            <li>{index}</li>
            <li>{item.brand !== null ? item.brand : "This product doesn't have brand"}</li>
            <li>{item.id}</li>
            <li>{item.price}</li>
            <li>{item.product}</li>
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