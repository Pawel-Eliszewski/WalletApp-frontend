import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Notify} from "notiflix";

export const instance = axios.create({
    baseURL: "https://wallet-app-18x3.onrender.com",
});

const setAuthHeader = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    instance.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
    "session/register",
    async (credentials, thunkAPI) => {
        try {
            const response = await instance.post("/user/register", credentials);
            Notify.success("Registration successful.");
            return response.data;
        } catch (error) {
            error.response.data.message === "Email in use"
                ? Notify.failure("The provided email is already in use.")
                : Notify.failure("Registration failed.");
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    "session/login",
    async (credentials, thunkAPI) => {
        try {
            const response = await instance.post("/user/login", credentials);
            setAuthHeader(response.data.data.token);
            Notify.success("Logged in successfully.");
            return response.data;
        } catch (error) {
            Notify.failure("Invalid email or password.");
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    "session/logout",
    async (_, thunkAPI) => {
        try {
            await instance.get("/user/logout");
            Notify.success("Logged out successfully.");
            clearAuthHeader();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const refreshUser = createAsyncThunk(
    "session/refresh",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.session.token;

        if (persistedToken === null) {
            return thunkAPI.rejectWithValue("Unable to fetch user");
        }

        try {
            setAuthHeader(persistedToken);
            const response = await instance.get("/user/current");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
