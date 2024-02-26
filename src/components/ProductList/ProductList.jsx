import {  useSelector } from "react-redux";
import s from './style.module.scss';

export default function ProductList() {
  const items = useSelector(state => state.getData.items);
  const status = useSelector(state => state.getData.status);

  return ( 
    status === 'resolved' ? <div> 
      {
        items.map((item, index) => {
          return <ul key={index}>
            <li>{index}</li>
            <li>{item.brand !== null ? item.brand : "This product doesn't have brand"}</li>
            <li>{item.id}</li>
            <li>{item.price}</li>
            <li>{item.product}</li>
          </ul>
        })
      }
    </div>
    :
    <div className={s.loading}>

    </div>
  )
}