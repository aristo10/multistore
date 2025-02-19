import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: null,
  returnPurchase:null,
  error: "",
  loading: false,
};
// ============ loadAllPurchaseReturn ==================
export const loadAllPurchaseReturn = createAsyncThunk(
    "purchase/purchaseReturnList",
     async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`return-purchase-invoice?${query}`)
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
)

// ==============load single purchase invoice ==============
export const loadSinglePurchaseReturnInvoice = createAsyncThunk(
    "purchase/loadSinglePurchaseReturnInvoice",
     async (id) => {
    try {
      const { data } = await axios.get(`/return-purchase-invoice/${id}`)
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
)
export const addReturnPurchase = async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `return-purchase-invoice/`,
      data: {
        ...values,
      },
    });
     return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
};


const PurchaseReturnListSlice = createSlice({
    name: "PurchaseReturnSlice",
    initialState,
    reducers: {
      clearPurchaseReturn:(state)=>{
        state.returnPurchase = null;
      },
      clearPurchaseReturnList:(state)=>{
        state.returnPurchase = [];
      }
    },
    extraReducers: (builder) => {
      
      //==================loadAllPurchaseReturn======================
      builder.addCase(loadAllPurchaseReturn.pending ,(state) => {
        state.loading = true;
      })
      builder.addCase(loadAllPurchaseReturn.fulfilled, (state,action) => {
        state.loading = false;
        state.total = action.payload?.data?.aggregations._count;
        state.list = action.payload?.data?.allPurchaseInvoice;
      })
      builder.addCase(loadAllPurchaseReturn.rejected ,(state,action) => {
        state.loading = false;
        state.error = action.payload?.message
      })


      //==================loadSinglePurchaseReturn======================
      builder.addCase(loadSinglePurchaseReturnInvoice.pending ,(state) => {
        state.loading = true;
      })
      builder.addCase(loadSinglePurchaseReturnInvoice.fulfilled, (state,action) => {
        state.loading = false;
        state.returnPurchase = action.payload?.data;
      })
      builder.addCase(loadSinglePurchaseReturnInvoice.rejected ,(state,action) => {
        state.loading = false;
        state.error = action.payload?.message
      })
        
    }
}) 

export default PurchaseReturnListSlice.reducer;
export const {clearPurchaseReturn, clearPurchaseReturnList} = PurchaseReturnListSlice.actions;