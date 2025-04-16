import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AactivityFilterStatus {
    highActivityCount: number;
    midActivityCount: number;
    lowActivityCount: number;
    highSelected: boolean;
    midSelected: boolean;
    lowSelected: boolean;


}


const initialState: AactivityFilterStatus = {
    highActivityCount: 0,
    midActivityCount: 0,
    lowActivityCount: 0,
    highSelected: false,
    midSelected: false,
    lowSelected: false,
}


export const activityAmountFilterSlise = createSlice({
    name: 'activityFilter',
    initialState: initialState,
    reducers: {
        setHighActivityCount: (state: any, action: PayloadAction<number>) => {
            state.highActivityCount = action.payload
        },
        setMidActivityCount: (state: any, action: PayloadAction<number>) => {
            state.midActivityCount = action.payload
        },
        setLowActivityCount: (state: any, action: PayloadAction<number>) => {
            state.lowActivityCount = action.payload
        },
        setHighSelected: (state: any) => {
            state.highSelected = !state.highSelected
        },
        setMidSelected: (state: any) => {
            state.midSelected = !state.midSelected
        },
        setLowSelected: (state: any) => {
            state.lowSelected = !state.lowSelected
        },


    }
})


export const { setHighActivityCount, setMidActivityCount, setLowActivityCount, setHighSelected, setMidSelected, setLowSelected } = activityAmountFilterSlise.actions;

export default activityAmountFilterSlise.reducer;