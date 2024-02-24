import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchData } from './store/slices/apiSlice';
import ProductList from './components/ProductList/ProductList';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData({action: "get_ids", params: {"offset": 0, "limit": 50}}))
  }, [dispatch]);

  return (
    <div className="App">
      <ProductList />
    </div>
  );
}

export default App;
