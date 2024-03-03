import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { 
  fetchData,
  setCurrentPage,
  setStatus,
  setProductPerPage,
  setFilterCurrentPage,
  setFilterProductsPerPage
} from './store/slices/apiSlice';
import ProductList from './components/ProductList/ProductList';
import DropDown from './components/DropDown/DropDown';

function App() {
  const { 
    items,
    currentPage,
    productsPerPage,
    status,
    isFilterRequest,
    filterCurrentPage,
    filterProductsPerPage 
  } = useSelector(state => state.getData);
  const dispatch = useDispatch();

  useEffect(() => {
    if((status === 'error' || (status !== 'loading' && status !== 'resolved')) && !isFilterRequest) {
      dispatch(fetchData({action: "get_ids", params: {"offset": currentPage, "limit": productsPerPage}, filter: isFilterRequest}))
    }
    if(items.length < 50 && status === 'resolved' && !isFilterRequest) {
      dispatch(setProductPerPage(productsPerPage + 1));
      dispatch(fetchData({action: "get_ids", params: {"offset": currentPage, "limit": productsPerPage}, filter: isFilterRequest}));
    } else if(items.length === 50 && status === 'resolved' && !isFilterRequest) {
      dispatch(setCurrentPage(currentPage + (productsPerPage - 50)))
      dispatch(setProductPerPage(50));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, status, items]);

  function nextPage() {
    if(!isFilterRequest) {
      if(currentPage === 8050) return;
      dispatch(setCurrentPage(currentPage + 50));
      dispatch(setStatus(null));
    } else {
      dispatch(setFilterCurrentPage(filterCurrentPage + 50));
      dispatch(setFilterProductsPerPage(filterProductsPerPage + 50));
      dispatch(setStatus(null));
    }
  }

  function prevPage() {
    //if(currentPage - 50 < 0) return;
    if(!isFilterRequest) {
      if((currentPage - 50)/50 < 1) {
        dispatch(setCurrentPage(0))
        dispatch(setStatus(null));
        return;
      }  
      dispatch(setCurrentPage(currentPage - 50));
      dispatch(setStatus(null));
    } else {
      dispatch(setFilterCurrentPage(filterCurrentPage - 50));
      dispatch(setFilterProductsPerPage(filterProductsPerPage - 50));
      dispatch(setStatus(null));
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => prevPage()}>Prev</button>
        <h3>{!isFilterRequest ? Math.floor(currentPage / 50 + 1) : (filterCurrentPage / 50 + 1)}</h3>
        <button onClick={() => nextPage()}>Next</button>
      </div>
      <DropDown />
      <ProductList />
    </div>
  );
}

export default App;
