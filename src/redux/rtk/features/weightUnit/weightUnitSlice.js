import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";

const initialState = {
  list: null,
  total: null,
  error: "",
  info:null,
  loading: false,
  edit:false
};

// 1 .======================= loadALLWeightUnit ==========================
export const loadALLWeightUnit = createAsyncThunk(
  "payment/loadALLWeightUnit",
  async (arg) => {
    try {
      const { data } = await axios.get(`/weight-unit`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// 2 .======================= AddWeightUnit ==========================
export const addWeightUnit = createAsyncThunk(
  "payment/AddWeightUnit",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `weight-unit`,
        data: values,
      });

      return successHandler(data, "WeightUnit Added Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
// 3 .======================= updateWeightUnit ==========================
export const updateWeightUnit = createAsyncThunk(
  "payment/updateWeightUnit",
  async ({id,values}) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `weight-unit/${id}`,
        data: values,
      });

      return successHandler(data, "WeightUnit Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
// 4 .======================= deleteWeightUnit ==========================
export const deleteWeightUnit = createAsyncThunk(
  "payment/deleteWeightUnit",
  async ({id, status}) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `weight-unit/${id}`,
         data: {
                status: status ? status : "false",
        },
      });
      return successHandler(data, `WeightUnit deleted successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const WeightUnitSlice = createSlice({
  name: "WeightUnit",
    initialState,
   reducers: {
    editWeightUnit: (state, action) => {
      if (action.payload) {
        state.edit = action.payload;
      } else {
        state.edit = false;
      }
    },
    clearWeightList:(state)=>{
      state.list = [];
    }
  },
  extraReducers: (builder) => {
    // 1 .======================= loadALLWeightUnit ==========================
    builder.addCase(loadALLWeightUnit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadALLWeightUnit.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data
    });

    builder.addCase(loadALLWeightUnit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

   
    // 2 .======================= AddWeightUnit ==========================
    builder.addCase(addWeightUnit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addWeightUnit.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addWeightUnit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 .======================= updateManualPayment ==========================
    builder.addCase(updateWeightUnit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateWeightUnit.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateWeightUnit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 .======================= deleteManualPayment ==========================
    builder.addCase(deleteWeightUnit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteWeightUnit.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteWeightUnit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
   
  },
});

export default WeightUnitSlice.reducer;
export const { editWeightUnit,clearWeightList } = WeightUnitSlice.actions;
