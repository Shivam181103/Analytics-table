import { configureStore } from "@reduxjs/toolkit";
import filterReducer from './features/filters/filterSlice'
import dataReducer from './features/date/dateSlice'
import tableReducer from './features/table/tableSlice'

const store = configureStore({
    reducer :{
        filter : filterReducer,
        date: dataReducer,
        table: tableReducer
    }
})

export default store