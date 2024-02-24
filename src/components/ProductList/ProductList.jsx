import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from '../../store/slices/apiSlice';

export default function ProductList() {
  //const [uniqueIds, setUniqueIds] = useState([]);
  const itemsId = useSelector(state => state.getData.ids);
  const items = useSelector(state => state.getData.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData({ action: "get_items", params: { "ids": itemsId } }))
  }, [dispatch, itemsId])

  console.log(items)

  return ( 
    <div> 
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
  )
}