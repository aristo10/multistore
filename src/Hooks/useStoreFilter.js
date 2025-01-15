import {
  loadAllStore,
  loadAllStoreByUser,
} from "@/redux/rtk/features/store/storeSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UseStoreFilter(arg) {
  const { all, mode } = arg || {};
  const dispatch = useDispatch();
  const { list: store, allList } = useSelector((state) => state.store);

  useEffect(() => {
    if (all) {
      dispatch(loadAllStore());
    } else {
      dispatch(loadAllStoreByUser());
    }
  }, [all, dispatch]);

  if (all) {
    return {
      storeFilter: {
        key: "storeId",
        label: "Store",
        type: "select",
        mode: mode ? mode : "multiple",
        options: allList?.map((item) => ({
          label: item?.name,
          value: item?.id,
        })),
        className: "min-w-[123px] max-w-[150px]",
        popupClassName: "w-[200px]",
      },
    };
  }

  return {
    storeFilter: {
      key: "storeId",
      label: "Store",
      type: "select",
      mode: mode ? mode : "multiple",
      options: store?.map((item) => ({
        label: item?.name,
        value: item?.id,
      })),
      className: "min-w-[123px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  };
}
