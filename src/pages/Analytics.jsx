import React, {useState} from 'react';
import '../App.css'
import Filters from '../redux/features/filters/Filters';
import Tables from '../redux/features/table/Tables';
import Dates from '../redux/features/date/Dates'
 function Analytics() { 
  return (
     <>
        <Dates/>
        <Filters/>
        <Tables/>
     </>
  )
}

export default Analytics