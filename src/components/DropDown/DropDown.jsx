import { useDispatch, useSelector } from 'react-redux';
import s from './style.module.scss';
//import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { fetchData, setStatus, setTypeRequest } from '../../store/slices/apiSlice';

const filters = [
  "none",
  "brand",
  "name",
  "price",
]

export default function DropDown() {
  const { ids, isFilterRequest, status, currentPage, filterCurrentPage, filterProductsPerPage } = useSelector(state => state.getData);
  const [choosenFilter, setChoosenFilter] = useState('none');
  const [isOpened, setIsOpened] = useState(false);
  const [filterText, setFilterText] = useState(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isFilterRequest && ((status !== "resolved" && status !== "loading")|| status === "error")) {
      dispatch(fetchData({action: "filter", params: {"price": 16500}, filter: { isFilterRequest, filterCurrentPage, filterProductsPerPage }}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterRequest, status])

  function openList() {
    setIsOpened((prev) => !prev);
  }

  function chooseFilter(filter) {
    setChoosenFilter(filter);
    setIsOpened(false);
    switch(filter) {
      case 'none': 
        dispatch(setTypeRequest(false));
        dispatch(setStatus(null));
        break;
      case 'brand':
        setFilterText('Enter brand...');
        break;
      case 'name':
        setFilterText('Enter name...');
        break;
      case 'price':
        setFilterText('Enter value...');
        break;
      default: setFilterText(null);
    }
  }

  function filterRequest() {
    dispatch(setTypeRequest(true));
    dispatch(setStatus(null));
  }

  console.log(filterCurrentPage, filterProductsPerPage)

  return(
    <div className={s.dropdown}>
      <h3>
        Фильтровать по:
        <span className={s.dropdown__selected} onClick={() => openList()}>{choosenFilter}</span>
      </h3>
      {
        isOpened ?
        <ul className={s.dropdown__select}>
          {
            filters.map((item, index) => {
              return (
                <li className={s.dropdown__option} onClick={() => chooseFilter(item)} key={index}>{item}</li>  
              )
            })
          }
        </ul>
        : ''
      }
      {
        choosenFilter !== 'none' 
          ? <div>
              <input ref={inputRef} className={s.dropdown__input} type="text" placeholder={filterText}/>
              <button onClick={() => filterRequest()}>Отправить</button>
            </div>
          : ''
      }
    </div>
  )
}