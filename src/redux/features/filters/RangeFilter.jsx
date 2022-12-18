import React,{ useState , useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { setFilterRange, setOpenFilter } from './filterSlice';
import '../../../App.css'
function RangeFilter(props) {
    console.log(props.range);
    const dispatch = useDispatch();
    const flRange =useSelector(state => state.filter.filterRanges)
    const [Range, setRange] = useState(props.range[1])
    useEffect(() => {
      console.log(Range);
    }, [Range])
    
    const pushRange =(e)=>{
         if(e.target.innerHTML.trim() == 'reset')
         {
             dispatch(setFilterRange([props.filterName , props.range[1]]))
         }
         else{
            dispatch(setFilterRange([props.filterName , Range]))
         } 
         dispatch(setOpenFilter(''))
    }
return (
    <>
      <div className="filter-modal">
           <input onChange={(e)=>setRange(e.target.value)} type="range" name="" id="" value={flRange[props.filterName]} min={props.range[0]} max={props.range[1]}/>   
           <p style={{color:'black' ,zIndex:'11'}}>{Range}</p>                         
            <div className="buttons">
                <button onClick={pushRange} className="reset">reset</button>
                <button onClick={pushRange} className='submit'>Apply</button>
            </div>
      </div> 
    </>
)
}
export default RangeFilter

