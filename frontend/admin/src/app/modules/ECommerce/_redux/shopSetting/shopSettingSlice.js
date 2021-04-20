import {createSlice} from "@reduxjs/toolkit";

const initialSettingState = {
    loading: false,
    error: null,
    setting: {}
};

export const shopSettingSlice = createSlice({
    name: "setting",
    initialState: initialSettingState,
    reducers:{
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            state.loading = false
        },
        startCall: (state, action) => {
            state.error = null;
            state.loading = true;
        },
        settingFetched: (state, action) =>{
            state.error = null;
            state.loading = false;
            state.setting = action.payload.setting;
        },
        settingCreate: (state, action) => {
            state.error = null;
            state.loading = false;
            state.setting = action.payload.setting;
        },
        settingUpdate: (state, action) => {
            state.error = null;
            state.loading = false;
            state.setting = action.payload.setting;
        },
    }
})
