import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface uiState {
    loginIsOpen: boolean,
    registerIsOpen: boolean,
}

const initialState: uiState = {
    loginIsOpen: false,
    registerIsOpen: false,
}

export const uiSlice = createSlice({
    name:'uiState',
    initialState,
    reducers: {
        openLogin: state => {
            state.loginIsOpen = true
        },
        closeLogin: state => {
            state.loginIsOpen = false
        },
        openRegister: state => {
            state.registerIsOpen = true
        },
        closeRegister: state => {
            state.registerIsOpen = false
        }
    }
});

export const {openLogin, closeLogin, openRegister, closeRegister} = uiSlice.actions;
export const uiLoginState = (state: RootState) => state.uiState.loginIsOpen;
export const uiRegisterState = (state: RootState) => state.uiState.registerIsOpen;
export default uiSlice.reducer