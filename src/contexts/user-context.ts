import { AnyAction, createReducer } from '@reduxjs/toolkit';
import ActionButton from 'antd/lib/modal/ActionButton';
import { stat } from 'fs';
import { createContext } from 'react';

interface IPageState {
    user: {
        id: number
        name: string
    }
    product: {
        id: number
    }
    module: {
        id: number
    }
    selectRow:{
        value: []
    }
    costDetails: any
    
    timeTracking: {
        value: number
    }
}

export const initState: IPageState = {
    user: { 
        id: Number(localStorage.getItem("user")),
        name: ""
    },
    product: {
    id: 0,  
    },
    module: {
        id: 0
    },
    selectRow:{
        value: []
    },
    costDetails: [],

    timeTracking: {
        // value: Number(localStorage.getItem("showtime")),
        value: 0,
    }

}

export const reducer = createReducer<IPageState>(initState, {
    setUser: (state: IPageState, action) => { state.user = { ...state.user, ...action.payload } },
    clearUser: (state: IPageState)=>{state.user = {...initState.user}},
    setProduct: (state: IPageState, action) => { state.product = { ...state.product, ...action.payload } },
    setModule: (state: IPageState, action) => {state.module = { ...state.module, ...action.payload} },
    setCostDetails: (state: IPageState, action) =>  { state.costDetails = { ...state.costDetails, ...action.payload } },
    setTimeTracking: (state: IPageState, action) => {
        console.log(action)
        state.timeTracking = { ...state.timeTracking, ...action.payload } },
});

interface IProjectContext {
    stateUser?: IPageState,
    dispatchUser?: React.Dispatch<AnyAction>,
    // stateProduct?: IPageState,
    // dispatchProduct?: React.Dispatch<AnyAction>
    // stateModule?: IPageState,
    // dispatchModule?: React.Dispatch<AnyAction>
    // stateCostDetails?: IPageState,
    // dispatchCostDetails?: React.Dispatch<AnyAction>,

    // stateTimeTracking?: IPageState,
    // dispatchTimeTracking?: React.Dispatch<AnyAction>,
}

export const ProjectContext = createContext<IProjectContext>({});
export const SelectRowContext = createContext<any>({});
export default ProjectContext;
