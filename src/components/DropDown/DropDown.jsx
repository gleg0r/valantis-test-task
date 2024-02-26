import s from './style.module.scss';
import cn from 'classnames';
import { useState } from 'react';

const filters = [
  'None',
  'Brand',
  'Name',
  'Price',
]

export default function DropDown() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [isDropDownOpened, setIsDropDownOpened] = useState(true)

  function handleClick() {
    setIsDropDownOpened((prev) => !prev);
  }

  function setFilter(index) {
    [filters[index], filters[activeFilter]] = [filters[activeFilter], filters[index]]
  }

  return(
    <div className={s.dropdown}>
      <ul onClick={() => handleClick()} className={s.dropdown__list}>
        {
          filters.map((item, index) => {
            return <li key={index} onClick={() => setFilter(index)} className={cn(
              isDropDownOpened 
                ? s.dropdown__item_active
                : activeFilter === index
                  ? s.dropdown__item_active
                  : s.dropdown__item
            )}>
              {item}
            </li>
          })
        }

      </ul>
      <input className={s.dropdown__input} type="text" placeholder='s'/>
    </div>
  )
}