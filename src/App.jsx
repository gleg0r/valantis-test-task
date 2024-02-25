import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchData, setCurrentPage, setStatusGetItems, setStatus } from './store/slices/apiSlice';
import ProductList from './components/ProductList/ProductList';
import DropDown from './components/DropDown/DropDown';

function App() {
  const offset = useSelector(state => state.getData.currentPage);
  const limit = useSelector(state => state.getData.productsPerPage);
  const status = useSelector(state => state.getData.status)
  const statusGetIds = useSelector(state => state.getData.statusGetIds);
  const isCountFifty = useSelector(state => state.getData.isCountFifty);
  const dispatch = useDispatch();

  useEffect(() => {
    if(statusGetIds !== 'resolved' && status !== 'loading' ) {
      dispatch(fetchData({action: "get_ids", params: {"offset": offset, "limit": limit}}))
      dispatch(setStatusGetItems('loading'))
    }
  }, [dispatch, statusGetIds, status, offset, limit, isCountFifty]);

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
