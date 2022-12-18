import React,{useState} from 'react'
import '../../../App.css'
import { useSelector , useDispatch } from 'react-redux'
import {setIsOpen , chooseFilter, chooseOrder} from './filterSlice'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
function Filters(props) {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
   let filters = useSelector(state => state.filter.choosedFilter)
  let [filterChanges , setFilterChanges] = useState([...filters]) 
  let [addDraggingClass , setAddDraggingClass] = useState('');
  const ChoosedFiltersWithOrder = useSelector(state => state.filter.order) 
  const changeFilter =(e)=>{
    let classListLength = e.target.classList.length;
    let value = e.target.classList[classListLength - 2 ];
    let idx = filterChanges.indexOf(value);
     let newFilter = filterChanges;
    if(idx > -1){
     newFilter.splice(idx , 1)
    }
    else{ 
      newFilter.splice(e.target.classList[classListLength - 1]-1 , 0 ,value)
    }
    setFilterChanges([...newFilter])
   }
   const ApplyChanges =() =>{
    dispatch(chooseFilter([...filterChanges]))
    dispatch(setIsOpen(false));
     
    let allFilters = document.querySelectorAll('.filter');
    let arr =[];
    for(let filter of allFilters){
         
      // let idx = filter.classList[filter.classList.length -1];
      arr.push( filter.classList[filter.classList.length -2] )
    }
    dispatch(chooseOrder([...arr]));
    setSearchParams({choosedOrder:[...arr].toString(), filterChanges:[...filterChanges].toString()})
     console.log(searchParams);
   }
useEffect(() => {
  console.log(props);
}, [ ])

   const dragStartFilter =(e) =>{
     setAddDraggingClass(e.target.innerHTML.trim());
   }

   const dragEndFilter =(e) =>{
    setAddDraggingClass('')
   }

   const dragOverAllFilters = (e) =>{
    e.preventDefault()
    let container = document.querySelector('.filters')
    const afterElement = getDragAfterElement(container, e.clientX , e.clientY)
    const draggable = document.querySelector('#dragging')
    
    if(afterElement){ 
     container.insertBefore(draggable , afterElement)
    }
    else{
       container.appendChild(draggable)
     }
    
   }
   function getDragAfterElement(container , x ,y ){
        console.log(container);
        const draggableComponents =[...document.querySelectorAll('.filter:not(.dragging)')]
        console.log(draggableComponents.length);
        return draggableComponents.reduce((closest, child) => {
          
          const box = child.getBoundingClientRect()
          // console.log(box, x);
          const offsetX = x - box.left - box.width / 2
          const offsetY = y - box.top - box.height / 2
          if ((offsetX < 0 && offsetX > closest.offsetX)&&(offsetY < 0 && offsetY > closest.offsetY)) {
            return { offsetX: offsetX,offsetY:offsetY, element: child }
          } else {
            return closest
          }
        }, { offsetX: Number.NEGATIVE_INFINITY,offsetY: Number.NEGATIVE_INFINITY }).element
   }
  let isOpen = useSelector(state => state.filter.isOpen)
  if(isOpen)
  return (
    <>
     
    <div className="filter-container">
        <p>Dimensions and Metrics</p>
        <div onDragOver={dragOverAllFilters} className="filters">
           
           {
             ChoosedFiltersWithOrder.map( value =>
              <div onClick={changeFilter}  id={ addDraggingClass == value ? 'dragging': '' } onDragStart={dragStartFilter} onDragEnd={dragEndFilter} draggable='true' className={filterChanges.includes(value)? `filter custom-filter ${value} 1` : `filter ${value} 1`}  >{value}</div>
              )
           } 
                   </div>
        <div className="buttons">
            <button onClick={() => dispatch(setIsOpen(false)) }className="close">close</button>
            <button onClick={ApplyChanges} className="apply-changes">Apply Changes</button>
        </div>
    </div> 
    </>
  )
}

export default Filters