import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchData } from './store/slices/apiSlice';
import ProductList from './components/ProductList/ProductList';

function App() {
  const offset = useSelector(state => state.getData.currentPage);
  const limit = useSelector(state => state.getData.productsPerPage);
  const itemsId = useSelector(state => state.getData.ids)
  const status = useSelector(state => state.getData.status)
  const statusGetIds = useSelector(state => state.getData.statusGetIds);
  const dispatch = useDispatch();

  useEffect(() => {
    if(statusGetIds !== 'resolved' && status !== 'loading') {
      dispatch(fetchData({action: "get_ids", params: {"offset": offset, "limit": limit}}))
    }
  }, [dispatch, statusGetIds, offset, limit]);

  // function prevPage() {
  //   if(offset === 0) return;
  //   else setOffset((prev) => prev - 50);
  //   dispatch(setStatus(null));
  // }

  // function nextPage() {
  //   setOffset((prev) => prev + 50);
  //   dispatch(setStatus(null));
  // }

  return (
    <div className="App">
      <div>
        <button >Prev</button>
        <h3>{offset /*/ 50 + 1*/}</h3>
        <button>Next</button>
      </div>
      <ProductList />
    </div>
  );
}

export default App;
