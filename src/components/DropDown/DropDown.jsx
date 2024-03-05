import { useDispatch, useSelector } from 'react-redux';
import s from './style.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { fetchData, setStatus, setTypeRequest } from '../../store/slices/apiSlice';

const filters = [
  "none",
  "brand",
  "product",
  "price",
]

export default function DropDown() {
  const {  isFilterRequest, status, filterCurrentPage, filterProductsPerPage } = useSelector(state => state.getData);
  const [choosenFilter, setChoosenFilter] = useState('none');
  const [isOpened, setIsOpened] = useState(false);
  const [filterText, setFilterText] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if(isFilterRequest && ((status !== "resolved" && status !== "loading")|| status === "error")) {
      dispatch(fetchData({
        action: "filter",
        params: {[choosenFilter]: choosenFilter === "price" ? +inputValue : inputValue},
        filter: { isFilterRequest, filterCurrentPage, filterProductsPerPage }
      }))
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
    if(inputValue.length !== 0) {
      dispatch(setTypeRequest(true));
      dispatch(setStatus(null));
    }
  }

  return(
    <div className={s.dropdown}>
      <div className={s.dropdown__main}>
        <h3 className={s.dropdown__title}>
          Фильтровать по:
          <span className={s.dropdown__selected} onClick={() => openList()}>{choosenFilter}</span>
        </h3>
        {
          isOpened ?
          <ul className={cn( !isOpened ? s.dropdown__list : s.dropdown__list_opened)}>
            {
              filters.map((item, index) => {
                return (
                  <li className={s.dropdown__item} onClick={() => chooseFilter(item)} key={index}>{item}</li>  
                )
              })
            }
          </ul>
          : ''
        }
      </div>
      
      {
        choosenFilter !== 'none' 
          ? <div className={s.dropdown__actions}>
              <input
                className={s.dropdown__input}
                type="text"
                placeholder={filterText}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className={s.dropdown__btn}
                onClick={() => filterRequest()
              }>
                send
              </button>
            </div>
          : ''
      }
    </div>
  )
}