import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from '../../store/slices/apiSlice';
import s from './style.module.scss';

export default function ProductList() {
  const itemsId = useSelector(state => state.getData.ids);
  const items = useSelector(state => state.getData.items);
  const status = useSelector(state => state.getData.status);
  const statusItems = useSelector(state => state.getData.statusGetItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if(statusItems !== 'loading') {
      dispatch(fetchData({ action: "get_items", params: { "ids": itemsId } }))
      console.log('hi')
    }
  }, [dispatch, itemsId, status, statusItems])

  return ( 
    statusItems === 'resolved' ? <div> 
      {
        items.map((item, index) => {

          return <ul key={index}>
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