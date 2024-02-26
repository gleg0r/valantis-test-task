import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filterData from "../helpers/filterData";
import dateHelper from "../helpers/dateHelper";
import md5 from "md5";
import errorHandler from "../helpers/errorHandler";

export const fetchData = createAsyncThunk(
  'api/fetchData',
  async function(params) {
    const options = {
      method: 'POST',
      headers: {
        "X-Auth": md5(`Valantis_${dateHelper()}`),
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        action: params.action,
        params: params.params
      })
    }
    const data = await fetch('https://api.valantis.store:41000/', options)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .catch(err => console.log(err.status, errorHandler(err.status)));
    return { data: data.result, type: params.action };
  }
)

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    items: [],
    status: null,
    currentPage: 0,
    productsPerPage: 50,
    error: null,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      switch (action.payload.type) {
        case "get_items":
          const newData = filterData(action.payload.data)
          state.items = newData;
          state.status = 'resolved';
          break;
        default: state.error = 'error type'
      }
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    })
  }
})

export const {
  setStatus,
  setCurrentPage,
} = apiSlice.actions;

export default apiSlice.reducer;