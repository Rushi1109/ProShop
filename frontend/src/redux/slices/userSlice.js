import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('userLogin', async (args, { rejectWithValue }) => {
    try {
        const auth = {
            email: args.email,
            password: args.password,
        }
        const { data } = await axios.post('/api/users/login', auth);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.err);
    }
});

export const register = createAsyncThunk('userRegister', async (args, { rejectWithValue }) => {
    try {
        const auth = {
            name: args.name,
            email: args.email,
            password: args.password,
        }
        const { data } = await axios.post('/api/users', auth);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.err);
    }
})

const userInfoFromStorage = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : null;

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        userLogin: userInfoFromStorage,
        status: 'idle',
        error: null,
    },
    reducers: {
        userLogout: (state, action) => {
            window.localStorage.removeItem('userInfo');
            state.userLogin = userInfoFromStorage;
        }
    },
    extraReducers: function (builder) {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.error = null;
                state.status = 'success';
                state.userLogin = action.payload;
                window.localStorage.setItem('userInfo', JSON.stringify(state.userLogin));
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(register.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'success';
                state.error = null;
                state.userLogin = action.payload;
                window.localStorage.setItem('userInfo', JSON.stringify(state.userLogin));
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;