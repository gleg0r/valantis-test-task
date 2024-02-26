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
    const ids = await fetch('https://api.valantis.store:41000/', options)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .catch(err => console.log(err.status, errorHandler(err.status)));
    const items = await fetch('https://api.valantis.store:41000/', {
      method: 'POST',
      headers: options.headers,
      body: JSON.stringify({
        action: "get_items",
        params: {"ids": ids.result}
      })
    }).then(res => res.ok ? res.json() : Promise.reject(res))
      .catch(err => console.log(err.status, errorHandler(err.status)))
      
    return items.result;
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
    setProductPerPage(state, action) {
      state.productsPerPage = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
        const newData = filterData(action.payload)
        state.items = newData;
        state.status = 'resolved';
      }
    );
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    })
  }
})

export const {
  setStatus,
  setCurrentPage,
  setProductPerPage
} = apiSlice.actions;

export default apiSlice.reducer;