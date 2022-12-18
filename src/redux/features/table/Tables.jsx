import React, { useEffect } from 'react'
import { FaFilter } from 'react-icons/fa'
import '../../../App.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from './tableSlice'
import { chooseRange, setOpenFilter } from '../filters/filterSlice'
import RangeFilter from '../filters/RangeFilter'
import { useState } from 'react'


function Attribute({row , akey}){

      if(akey == 'Date'){
        return <td> {row.date.substring(0 ,10)}</td>  
      }
      else 
      if(akey == 'App'){
         return <td>{row.app_id}</td>
      }
      else 
      if(akey == 'Clicks'){
         return <td>{row.clicks}</td>
      }
      else 
      if(akey == 'Requests'){
         return <td>{row.requests}</td>
      }
      else 
      if(akey == 'Response'){
         return <td>{row.responses}</td>
      }
      else 
      if(akey == 'Impressions'){
         return <td>{row.impressions }</td>
        
      }
      else 
      if(akey == 'Revenue'){
         return <td>{row.revenue?.toFixed(2)}</td>
      }
      else 
      if(akey == 'FillRate'){
         return <td>{((row.requests / row.responses) * 100)?.toFixed(2)}</td>
      }
      else if(akey == 'CTR'){
         return <td>{((row.clicks / row.impressions ) * 100)?.toFixed(2)}</td>
       }
       else return <td></td>
}
function Row({ChoosedFilterswithOrder ,ChoosedFilters , row}){
    
    return   ChoosedFilterswithOrder.filter( key => ChoosedFilters.includes(key)  ).map( (key) =>
         <Attribute akey={key} row={row} />
       )
    
    
}
function checkRangeStatus( selectedFilterRangeWithName , row){
    let rowKeys = Object.keys(row);
    // console.log(selectedFilterRangeWithName);
    if(selectedFilterRangeWithName == null || selectedFilterRangeWithName == undefined ) return true;
    else{
    let selectedFilterRangeWithNameKey = Object.keys(selectedFilterRangeWithName);
    // console.log(selectedFilterRangeWithName);
    for(let akey of selectedFilterRangeWithNameKey){ 
        if(akey == 'Date'){
            // if(selectedFilterRangeWithName.Date[0])   
          }
          else 
          if(akey == 'App'){
            if(selectedFilterRangeWithName.App[0]<row.app_id) return false;
          }
          else 
          if(akey == 'Clicks'){
            if(selectedFilterRangeWithName.Clicks[0]<row.clicks) return false;
          }
          else 
          if(akey == 'Requests'){
            if(selectedFilterRangeWithName.Requests[0]<row.requests) return false;
          }
          else 
          if(akey == 'Response'){
            if(selectedFilterRangeWithName.Response[0]<row.response) return false;
          }
          else 
          if(akey == 'Impressions'){
            if(selectedFilterRangeWithName.Impressions[0]<row.impressions) return false;
     
          }
          else 
          if(akey == 'Revenue'){
            if(selectedFilterRangeWithName.Revenue[0]<row.revenue) return false;
          }
          else 
          if(akey == 'FillRate'){
            if(selectedFilterRangeWithName.FillRate[0]<((row.clicks / row.impressions)*100).toFixed(2)) return false;
          }
          else if(akey == 'CTR'){
            if(selectedFilterRangeWithName.App[0]<((row.clicks / row.impressions)*100).toFixed(2)) return false;
           }
           else return true;
    }
    return true;
}
}
function TableData({tableInfo ,ChoosedFilters, ChoosedFilterswithOrder, selectedFilterRangeWithName}){
     
     return tableInfo.data.filter(row => checkRangeStatus(selectedFilterRangeWithName  , row)).map( (row) => 
            <tr> 
            <Row ChoosedFilterswithOrder ={ChoosedFilterswithOrder } selectedFilterRangeWithName={  selectedFilterRangeWithName} ChoosedFilters={ChoosedFilters} row={row} /> 
           </tr> 
     
      
)}
 function Tables() {

    const dispatch = useDispatch()
    const startDate = useSelector(state => state.date.startDate)
    const endDate = useSelector(state => state.date.endDate)
    const tableInfo = useSelector(state => state.table)
    const selectedRange = useSelector(state => state.filter.filters)
    const ChoosedFilters = useSelector(state => state.filter.choosedFilter)
    const ChoosedFilterswithOrder = useSelector(state => state.filter.order)
    const selectedFilterRangeWithName = useSelector( state => state.filter.filterRanges)
    // const [selectedRangeFilter , setSelectedRangeFilter] = useState(null);
    const selectedRangeFilter = useSelector(state => state.filter.openFilter )
   
    useEffect(() => {
        let url = `https://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`
        dispatch(fetchData(url))

    }, [startDate])

    useEffect(() => {
        // console.log(selectedRange);
    }, [selectedRange])
    
    const applyRangeFilter =(e)=>{
         
        let min = Number.MAX_VALUE;
        let max =  Number.MIN_VALUE;
        let key  = e.target.innerHTML.trim()
         
             if(key == 'Date'){
                if(selectedRange.dateOrder ==1)
                dispatch(chooseRange([-1]));
                else
                dispatch(chooseRange([1]));

                
             }
             else 
             if(key == 'App'){
                for(let row of tableInfo.data){
                    
                    min = Math.min(min,Number( row.app_id));
                    max = Math.max(max ,Number( row.app_id));
                }
                console.log(min , max);
                dispatch(chooseRange([key , [min ,max]]))
             }
             else 
             if(key == 'Clicks'){
                for(let row of tableInfo.data){
                    min = Math.min(min, row.clicks);
                    max = Math.max(max , row.clicks);
                }
                dispatch(chooseRange([key , [min ,max]]))
             }
             else 
             if(key == 'Requests'){
                for(let row of tableInfo.data){
                    min = Math.min(min, row.requests);
                    max = Math.max(max , row.requests);
                }
                dispatch(chooseRange([key , [min ,max]]))
             }
             else 
             if(key == 'Response'){
                for(let row of tableInfo.data){
                    min = Math.min(min, row.responses);
                    max = Math.max(max , row.responses);
                }
                dispatch(chooseRange([key , [min ,max]]))
             }
             else 
             if(key == 'Impressions'){
                 
                 for(let row of tableInfo.data){
                    min = Math.min(min, row.impressions);
                    max = Math.max(max , row.impressions);
                }
                dispatch(chooseRange([key , [min ,max]]))
             }
             else 
             if(key == 'Revenue'){
                for(let row of tableInfo.data){
                    min = Math.min(min, row.revenue);
                    max = Math.max(max , row.revenue);
                }
                dispatch(chooseRange([key , [min ,max]]))
             }
             else 
             if(key == 'FillRate'){
                for(let row of tableInfo.data){
                    min = Math.min(min, ((row.requests / row.responses)*100).toFixed(2));
                    max = Math.max(max , ((row.requests / row.responses)*100).toFixed(2));
                }
                dispatch(chooseRange([key , [min ,max]]))
             }
             else if(key == 'CTR'){
                for(let row of tableInfo.data){
                    min = Math.min(min, ((row.clicks / row.impressions)*100).toFixed(2));
                    max = Math.max(max ,((row.clicks / row.impressions)*100).toFixed(2));
                }
                dispatch(chooseRange([key , [min ,max]]))
             }
         
        //  console.log(selectedFilterRangeWithName);
        dispatch(setOpenFilter(e.target.innerHTML.trim()));
        }
     
    return (
        <>
            <div className="table-container flipped">
                <table className='data-table'>   
                    <tr className='table-headings'>
                        {
                            ChoosedFilterswithOrder.filter(row => ChoosedFilters.includes(row)).map(row =>
                                <div className="t-heading-container">
                                    <th onClick={applyRangeFilter}> <FaFilter  /> <p> {row}     </p> </th>
                                    {selectedRangeFilter===row && <RangeFilter filterName={row} range={selectedRange[row]}/>} 
                                </div>

                                )
                        }
                        </tr>
                    {tableInfo.loading && <div>Loading...</div>}
                    {!tableInfo.loading && tableInfo.error ? <div>Error: {tableInfo.error}</div> : null}
                    {!tableInfo.loading && tableInfo.data.length ? 
                        <TableData tableInfo ={tableInfo } ChoosedFilters={ChoosedFilters} ChoosedFilterswithOrder={ChoosedFilterswithOrder} selectedFilterRangeWithName={selectedFilterRangeWithName}/> 
                    : null
                    }
                    
                </table>
            </div>
        </>
    )
}

export default Tables