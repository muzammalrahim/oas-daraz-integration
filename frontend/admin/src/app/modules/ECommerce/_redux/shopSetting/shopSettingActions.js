import * as requestFromServer from "./shopSettingCrud";
import {shopSettingSlice} from "./shopSettingSlice";

const {actions} = shopSettingSlice;

export const fetchSetting = () => dispatch => {
    dispatch(actions.startCall());

    return requestFromServer
    .getSetting()
    .then(response => {
        dispatch(actions.settingFetched({'setting': response.data}))
    })
    .catch(error=>{
        console.log("setting error ", error.response)
        return dispatch(actions.catchError(error))
    })
}

export const createSetting = setting => dispatch => {
    dispatch(actions.startCall());

    return requestFromServer
    .createSetting(setting)
    .then(response => {
        dispatch(actions.settingCreate({'setting': response.data}))
    })
    .catch(error=>{
        // console.log("setting error ", error)
        return dispatch(actions.catchError(error))
    })
}

export const updateSetting = setting => dispatch => {
    dispatch(actions.startCall());

    return requestFromServer
    .updateSetting(setting)
    .then(response => {
        dispatch(actions.settingUpdate({'setting': response.data}))
    })
    .catch(error=>{
        // console.log("setting error ", error)
        return dispatch(actions.catchError(error))
    })
}