import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchData } from './store/slices/apiSlice';
import ProductList from './components/ProductList/ProductList';

function App() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);
  const itemsId = useSelector(state => state.getData.ids)
  const itemsLength = useSelector(state => state.getData.itemsLength);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData({action: "get_ids", params: {"offset": offset, "limit": limit}}))
  }, [dispatch, itemsId, offset, limit]);

  function prevPage() {
    if(offset === 0) return;
    else setOffset((prev) => prev - 50);
    dispatch(fetchData({action: "get_ids", params: {"offset": offset, "limit": limit}}))
  }

  function nextPage() {
    setOffset((prev) => prev + 50);
    dispatch(fetchData({action: "get_ids", params: {"offset": offset, "limit": limit}}))
  }

  console.log(itemsId);

  return (
    <div className="App">
      <div>
        <button onClick={() => prevPage()}>Prev</button>
        <h3>{offset / 50 + 1}</h3>
        <button onClick={() => nextPage()}>Next</button>
      </div>
      <ProductList />
    </div>
  );
}

export default App;
