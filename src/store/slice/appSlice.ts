
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    Theme:"light",
}

let appSlice = createSlice({
    name:"app",
    initialState,
    reducers:{
       setReduxTheme:(state,actions)=>{    
        console.log(actions.payload);
            
        state.Theme = actions.payload
       },
    }
})

export let {setReduxTheme} = appSlice.actions
export default appSlice.reducer