import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('userLogin', async (args, { rejectWithValue }) => {
    try {
        const auth = {
            email: args.email,
            password: args.password
        }
        try {
            const { data } = await axios.post('/api/users/login', auth);
            return data;
        } catch (error) {
            return rejectWithValue('Invalid Email or Password');
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const userInfoFromStorage = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : null;

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        userLogin: userInfoFromStorage,
        status: 'idle',
        error: null,
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
            });
    }
});

export default userSlice.reducer;