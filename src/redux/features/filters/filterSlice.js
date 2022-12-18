import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    choosedFilter :['Date' , 'App' , 'Clicks' , 'Requests' , 'Response' , 'Impressions' , 'Revenue' , 'FillRate'  , 'CTR'],
    order:['Date' , 'App' , 'Clicks' , 'Requests' , 'Response' , 'Impressions' , 'Revenue' , 'FillRate'  , 'CTR'] ,
    isOpen:true,
    filters:{
         
    },
    filterRanges:{

    },
    openFilter: ''
}

const filterSlice = createSlice({
    name :'filterSlice',
    initialState,
    reducers:{
        chooseFilter: (state , actions) =>{
             state.choosedFilter=actions.payload  
        } 
        ,
        chooseOrder:(state , actions)=>{
            state.order = actions.payload
        }
        ,
        setIsOpen:(state , actions)=>{
            state.isOpen = actions.payload
        },
        chooseRange:(state , actions)=>{
            if(actions.payload.length ==1 ){
                state.filters = {...state.filters , dateOrder:actions.payload[0] }
            }
            else
            state.filters ={...state.filters ,[actions.payload[0]]: [...actions.payload[1]] } 
        },
        setFilterRange :(state , actions)=>{
            
            state.filterRanges ={...state.filterRanges ,[actions.payload[0]]: [actions.payload[1]] } 
      
        },
        setOpenFilter : (state , actions)=>{
            state.openFilter = actions.payload
        }
    }, 
})

 
 export default filterSlice.reducer
 export const {chooseFilter, setOpenFilter ,setFilterRange, chooseOrder,chooseRange, setIsOpen} = filterSlice.actions