import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filterData from "../helpers/filterData";
import dateHelper from "../helpers/dateHelper";
import md5 from "md5";

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
      .catch(err => console.log(err.status, err.statusText));
    return { data: data.result, type: params.action };
  }
)

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    ids: [],
    items: [],
    status: null,
    statusGetIds: null,
    statusGetItems: null,
    currentPage: 0,
    productsPerPage: 50,
    error: null,
  },
  reducers: {
    setStatus(state, action) {
      state.statusGetIds = action.payload;
      state.statusGetItems = action.payload;
      state.status = action.payload;
    },
    setStatusGetItems(state, action) {
      state.statusGetItems = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      switch (action.payload.type) {
        case 'get_ids': 
          state.ids = action.payload.data;
          state.statusGetIds = 'resolved';
          break;
        case "get_items":
          const newData = filterData(action.payload.data)
          state.items = newData;
          state.statusGetItems = 'resolved';
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
  setStatusGetItems
} = apiSlice.actions;

export default apiSlice.reducer;