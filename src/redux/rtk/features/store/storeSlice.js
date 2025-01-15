import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  allList: null,
  store: null,
  error: "",
  loading: false,
  edit: false,
  total: 0,
  defaultStore: null,
};

// ADD_VAT_TAX
export const addStore = createAsyncThunk("store/addStore", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `store/`,
      data: values,
    });
    return successHandler(data, "Store Created Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// UPDATE_VAT_TAZ
export const updateStore = createAsyncThunk(
  "store/UpdateStore",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `store/${id}`,
        data: values,
      });
      return successHandler(data, "Store Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
// UPDATE_VAT_TAZ
export const updateDefaultStore = createAsyncThunk(
  "store/updateDefaultStore",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `store/user/${id}`,
        data: values,
      });

      if (data?.token) {
        localStorage.setItem("access-token", data.token);
      }
      return successHandler(data, "Switched store successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_VAT_TAZ
export const deleteStore = createAsyncThunk(
  "store/DeleteStore",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `store/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Store ${status === "true" ? "Show" : "Hide"} Successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// VAT_TAZ_DETAILS
export const loadSingleStore = createAsyncThunk(
  "store/loadSingleStore",
  async (id) => {
    try {
      const { data } = await axios.get(`store/${id}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);
// VAT_TAZ_DETAILS
export const loadAllStoreByUser = createAsyncThunk(
  "store/loadAllStoreByUser",
  async () => {
    try {
      const { data } = await axios.get(`store/user`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

// Load all VAT_TAX
export const loadAllStore = createAsyncThunk("store/loadAllStore", async () => {
  try {
    const { data } = await axios.get(`store?query=all`);
    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});
//Load All VAT_TAX for Paginated
export const loadAllStorePaginated = createAsyncThunk(
  "store/loadAllStorePaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`store?${query}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    editStore: (state, action) => {
      if (action.payload) {
        state.edit = action.payload;
      } else {
        state.edit = false;
      }
    },
    clearStore: (state) => {
      state.brand = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllStore ======

    builder.addCase(loadAllStore.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllStore.fulfilled, (state, action) => {
      state.loading = false;
      state.allList = action.payload?.data;
    });

    builder.addCase(loadAllStore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadAllStorePaginated ======

    builder.addCase(loadAllStorePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllStorePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllStore;
      state.total = action.payload?.data?.totalStore;
    });

    builder.addCase(loadAllStorePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addStore ======

    builder.addCase(addStore.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addStore.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action?.payload?.data);
      state.list = list;
    });

    builder.addCase(addStore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 3) ===== builders for update Vat Tax ===========
    builder.addCase(updateStore.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateStore.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateStore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 4) ====== builders for loadSingleStore ======

    builder.addCase(loadSingleStore.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleStore.fulfilled, (state, action) => {
      state.loading = false;
      state.store = action?.payload?.data;
    });

    // 4) ====== builders for  ======

    builder.addCase(loadAllStoreByUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllStoreByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action?.payload?.data?.allStore;
      state.total = action?.payload?.data?.totalStore;
      state.defaultStore = action?.payload?.data?.defaultStore;
    });

    // 6) ====== builders for deleteStore ======

    builder.addCase(deleteStore.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteStore.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteStore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 6) ====== builders for updateDefaultStore ======

    builder.addCase(updateDefaultStore.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateDefaultStore.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export default storeSlice.reducer;
export const { clearStore, editStore } = storeSlice.actions;
