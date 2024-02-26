import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchData, setCurrentPage, setStatus } from './store/slices/apiSlice';
import ProductList from './components/ProductList/ProductList';
import DropDown from './components/DropDown/DropDown';

function App() {
  const offset = useSelector(state => state.getData.currentPage);
  const limit = useSelector(state => state.getData.productsPerPage);
  const status = useSelector(state => state.getData.status)
  const dispatch = useDispatch();

  useEffect(() => {
    if(status === 'error' || ( status !== 'loading' && status !== 'resolved')) {
      dispatch(fetchData({action: "get_ids", params: {"offset": offset, "limit": limit}}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, status]);

  function nextPage() {
    if(offset === 8050) return;
    dispatch(setCurrentPage(offset + 50));
    dispatch(setStatus(null));
  }

  function prevPage() {
    if(offset === 0) return;  
    dispatch(setCurrentPage(offset - 50));
    dispatch(setStatus(null));
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => prevPage()}>Prev</button>
        <h3>{offset / 50 + 1}</h3>
        <button onClick={() => nextPage()}>Next</button>
      </div>
      <DropDown />
      <ProductList />
    </div>
  );
}

export default App;
