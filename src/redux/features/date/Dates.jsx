import React,{useState,useEffect} from 'react'
import { DateRangePicker  } from 'rsuite'; 
 import {GoSettings } from 'react-icons/go'
import '../../../App.css'
import {useSelector , useDispatch} from 'react-redux'
import { setDateRange } from './dateSlice';
import { setIsOpen } from '../filters/filterSlice';
function Dates() {
  const [value, setValue] =  useState([new Date('2021-06-01') , new Date('2021-06-30')])
  
  const dispatch = useDispatch();
 
  useEffect(() => {
     let year1 = value[0].getFullYear()
     let month1 = (value[0].getMonth()+1)<=9 ? '0'+(value[0].getMonth()+1):(value[0].getMonth()+1)
     let days1 = value[0].getDate()<=9? '0'+value[0].getDate():value[0].getDate()
     let date1 = ""+year1+"-"+month1 +"-"+ days1+"";

     let year2 = value[1].getFullYear()
     let month2 =( value[1].getMonth()+1)<=9 ? '0'+(value[1].getMonth()+1):(value[1].getMonth()+1)
     let days2 = value[1].getDate()<=9? '0'+value[1].getDate() : value[1].getDate()
     let date2 = ""+year2+"-"+month2 +"-"+ days2+"";
     dispatch(setDateRange([date1, date2]))
    
  }, [value])
  
  return (
     <>
      <div className="upper-div-container">
        <h2>Analytics</h2>
        <div className="calender-container"> 
          <DateRangePicker value={value} onChange={setValue} /> 
          <button onClick={()=>dispatch(setIsOpen(true))} className='settings-button'> <GoSettings size={15}  className='setting-icon' /> Settings</button>
        </div>
      </div>
     </>
  ) 
}

export default Dates