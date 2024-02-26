import {  useSelector } from "react-redux";
import s from './style.module.scss';

export default function ProductList() {
  const items = useSelector(state => state.getData.items);
  const status = useSelector(state => state.getData.status);
  //const statusItems = useSelector(state => state.getData.statusGetItems);
  //const dispatch = useDispatch();
  console.log(items);
  // useEffect(() => {
  //   if(statusItems !== 'loading' || status === 'error') {
  //     dispatch(fetchData({ action: "get_items", params: { "ids": itemsId } }))
  //   }
  // }, [dispatch, itemsId, status, statusItems])

  return ( 
    status === 'resolved' ? <div> 
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