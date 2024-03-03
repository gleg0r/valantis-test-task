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
    let items;
    let ids;

      ids = await fetch('https://api.valantis.store:41000/', options)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .catch(err => {console.log(err.status, errorHandler(err.status))});
      items = await fetch('https://api.valantis.store:41000/', {
      method: 'POST',
      headers: options.headers,
      body: JSON.stringify({
        action: "get_items",
        params: {"ids": !params.filter.isFilterRequest ? ids.result : ids.result.slice(params.filter.filterCurrentPage, params.filter.filterProductsPerPage)}
      })
    }).then(res => res.ok ? res.json() : Promise.reject(res))
      .catch(err => {console.log(err.status, errorHandler(err.status))})


    
      
    return { ids, items }
  }
)

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    ids: [],
    items: [],
    status: null,
    currentPage: 0,
    productsPerPage: 50,
    error: null,
    isFilterRequest: false,
    filterCurrentPage: 0,
    filterProductsPerPage: 50,
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
    }, 
    setTypeRequest(state, action) {
      state.isFilterRequest = action.payload;
    },
    setFilterCurrentPage(state, action) {
      state.filterCurrentPage = action.payload;
    },
    setFilterProductsPerPage(state, action) {
      state.filterProductsPerPage = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
        state.ids = action.payload.ids.result;
        const newData = filterData(action.payload.items.result);
        state.items = newData;
        state.status = 'resolved';
        console.log(action)
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
  setProductPerPage,
  setTypeRequest,
  setFilterCurrentPage,
  setFilterProductsPerPage
} = apiSlice.actions;

export default apiSlice.reducer;