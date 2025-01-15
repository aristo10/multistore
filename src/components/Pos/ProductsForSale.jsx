import { loadAllStoreByUser } from "@/redux/rtk/features/store/storeSlice";
import { Card, Form, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../UI/Pagination";
import SearchForm from "../../UI/Search";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import { stringShorter } from "../../utils/functions";
export default function ProductsForSale({
  form: MainForm,
  totalCalculator,
  setSelectedProduct,
  storeId,
  setStoreId,
}) {
  const dispatch = useDispatch();

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const {
    list,
    total: totalProd,
    loading,
  } = useSelector((state) => state.products);
  const {
    list: store,
    loading: storeLoading,
    defaultStore,
  } = useSelector((state) => state.store);

  const fetchData = (page, count) => {
    setPageConfig((prev) => {
      return { ...prev, page, count };
    });
  };
  useEffect(() => {
    dispatch(loadProduct(pageConfig));
    dispatch(loadAllStoreByUser());
  }, [dispatch, pageConfig]);

  const handleSelectedProds = (item) => {
    const isStoreSelected = storeId;
    if (!isStoreSelected) {
      toast.error("Please select a store first");
      return null;
    }
    const productArray = MainForm.getFieldValue("saleInvoiceProduct") || [];
    const findProduct = productArray.find((pro) => pro.productId === item.id);
    if (!findProduct) {
      // localState
      setSelectedProduct((prev) => [...prev, item]);
      // form
      MainForm.setFieldsValue({
        saleInvoiceProduct: [
          ...productArray,
          {
            productId: item.id,
            productSalePrice: item.stockInfo[0]?.productSalePrice,
            productQuantity: item?.stockInfo[0]?.productQuantity ? 1 : 0,
            productName: item.name,
            productVat: item.productGroup.salesTax?.percentage || 0,
            productDiscount: item.discount?.value
              ? parseInt(item.discount?.value)
              : 0,
            discountType: item.discount?.type || "flat",
          },
        ],
      });
      totalCalculator();
    }
  };

  const Products = ({ item, index }) => {
    const handleOnError = (e) => {
      e.target.src = "/images/default.jpg";
    };
    return (
      <Card
        style={{
          width: "100%",
          border: "none",
          height: "120px",
        }}
        bodyStyle={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "120px",
        }}
        className='relative  bg-white hover:bg-white hover:shadow-md duration-150 overflow-hidden cursor-pointer'
        onClick={() => {
          handleSelectedProds(item);
        }}
      >
        <div className='flex items-center gap-2'>
          <div className='w-[80px] h-[44px] relative'>
            <img
              alt='example'
              className='absolute object-cover w-full h-full'
              src={item.productThumbnailImageUrl || ""}
              onError={handleOnError}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className='flex-grow-1'>
            <p className='font-bold mb-0'>{stringShorter(item.name, 20)}</p>
            <p className='mb-0' style={{ fontSize: "12px" }}>
              Price : {item.stockInfo[0]?.productSalePrice}
            </p>
            <p
              className={`${
                item.stockInfo[0]?.productQuantity
                  ? "bg-violet-600"
                  : "bg-red-600"
              } text-white p-1 absolute top-0 left-0`}
              style={{ fontSize: "12px" }}
            >
              QTY: {item.stockInfo[0]?.productQuantity || 0}
            </p>
            <p style={{ fontSize: "12px" }}>
              {" "}
              SKU : {stringShorter(item.sku, 10)}
            </p>
          </div>
        </div>
      </Card>
    );
  };

  const handleSelectStore = (store) => {
    setPageConfig((prev) => {
      return { ...prev, storeId: store };
    });
    setStoreId(store);
    MainForm.setFieldsValue({
      saleInvoiceProduct: [],
    });
  };

  useEffect(() => {
    if (defaultStore?.id) {
      setStoreId(defaultStore.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultStore?.id]);

  return (
    <div className='flex flex-col max-h-[200px] lg:max-h-[calc(100vh-180px)] overflow-y-auto'>
      <div className='flex flex-col md:flex-row items-center gap-3 pb-3 lg:pb-0'>
        <SearchForm
          className='w-full mt-4 mx-2'
          form={MainForm}
          totalCalculator={totalCalculator}
          setSelectedProduct={setSelectedProduct}
        />
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please select a store",
            },
          ]}
          className='mb-0'
        >
          <Select
            className='w-[200px] mt-4 mb-0'
            loading={storeLoading}
            showSearch
            onChange={handleSelectStore}
            placeholder='Select a store'
            optionFilterProp='children'
            value={storeId}
          >
            {store?.map((store) => (
              <Select.Option key={store.id} value={store.id}>
                {store.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className='hidden lg:grid flex-grow  grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-2 mt-5'>
        {list
          ? list.map((item, index) => (
              <Products key={index} index={index} item={item} />
            ))
          : loading && (
              <div className='w-100 flex justify-center items-center'>
                <Spin size='large' />
              </div>
            )}
      </div>

      <div className='hidden lg:block'>
        {totalProd >= 11 && (
          <div className='mt-4'>
            <Pagination onChange={fetchData} total={totalProd} />
          </div>
        )}
      </div>
    </div>
  );
}
