import { createSlice } from "@reduxjs/toolkit"
const initialState = {
   startDate:'2021-06-01',
   endDate : '2021-06-30'
}

const dateSlice = createSlice({
    name :'dateSlice',
    initialState,
    reducers:{
        setDateRange: (state , actions) =>{ 
            state.startDate= actions.payload[0] ,
            state.endDate = actions.payload[1] 
        }  
        
    }, 
})

 
export default dateSlice.reducer
export const {setDateRange} = dateSlice.actions