import Card from "@/UI/Card";
import { loadProduct } from "@/redux/rtk/features/product/productSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
const userId = localStorage.getItem("id");

export default function ProductAdd({
  form,
  productList,
  productLoading,
  totalCalculator,
  subTotal,
  type,
}) {
  const {
    list: store,
    loading: storeLoading,
    defaultStore,
  } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const handleSetInitial = (product, serial) => {
    const productArray = form.getFieldValue("adjustInvoiceProduct");
    const findProduct = productList.find((pro) => pro.id === product);
    const newArray = productArray.map((product, index) => {
      if (index === serial) {
        return {
          ...product,
          productPurchasePrice: findProduct.stockInfo[0]?.productPurchasePrice,
        };
      } else {
        return product;
      }
    });

    form.setFieldsValue({
      adjustInvoiceProduct: newArray,
    });
    totalCalculator(serial);
  };
  const render = (index) => {
    const findId = form
      .getFieldValue("adjustInvoiceProduct")
      ?.find((_, i) => i === index)?.productId;
    const findProduct = productList?.find((item) => findId === item.id);

    let stock = null;
    if (findProduct?.stockInfo[0]?.productQuantity) {
      stock = (
        <span>
          <span className='mr-1'>Stock: </span>
          <span>{findProduct.stockInfo[0]?.productQuantity}</span>
        </span>
      );
    }

    let uom = null;
    if (findProduct?.uom?.name) {
      uom = (
        <span>
          <span className='mr-1'>UoM: </span>
          <span>{`${findProduct?.uomValue}/${findProduct?.uom?.name}`}</span>
        </span>
      );
    }

    return { stock, uom };
  };
  const handleSelectStore = (store) => {
    dispatch(loadProduct({ page: 1, count: 1000, storeId: store }));
    form.setFieldsValue({
      adjustInvoiceProduct: [{}],
    });
  };

  useEffect(() => {
    if (defaultStore) {
      form.setFieldValue("storeId", defaultStore.id);
    }
  }, [defaultStore, form]);

  return (
    <Card
      className='h-[calc(100vh-100px)]'
      headClass=''
      bodyClass='p-0'
      title={
        <Search
          className='w-[450px]'
          form={form}
          totalCalculator={totalCalculator}
        />
      }
      extra={
        <Form.Item
          className='mb-0'
          name='storeId'
          rules={[
            {
              required: true,
              message: "Store is required",
            },
          ]}
        >
          <Select
            className='w-[150px]'
            loading={storeLoading}
            showSearch
            onChange={handleSelectStore}
            placeholder='Select a store'
            optionFilterProp='children'
          >
            {store?.map((store) => (
              <Select.Option key={store.id} value={store.id}>
                {store.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      }
    >
      <Form.List
        name='adjustInvoiceProduct'
        rules={[
          {
            required: true,
            message: "Product is required",
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            <div className='max-h-[calc(100vh-220px)] overflow-auto'>
              <table className='w-full'>
                <thead
                  className={
                    "font-Popins text-black bg-tableHeaderBg border-gray-200 sticky top-0 z-10"
                  }
                >
                  <tr>
                    <th className='py-2 pl-2 text-left'>SL</th>
                    <th className='py-2 pl-2 text-left'>Product</th>
                    <th className='py-2 pl-2 text-left'>Price</th>
                    <th className='py-2 pl-2 text-left'>Adjust QTY</th>
                    <th className='py-2 pl-2 text-left'>Total</th>
                    <th className='py-2 pl-2 text-left'></th>
                  </tr>
                </thead>
                <tbody className='bg-tableBg'>
                  {fields.map(({ key, name, ...restField }, index) => {
                    const indexedProduct = render(index);
                    return (
                      <tr
                        key={key}
                        className={`hover:bg-slate-900/10 py-1 ${
                          index === fields.length - 1 ? "" : "border-b"
                        }`}
                      >
                        <td className='py-2 pl-2  align-top'>{index + 1}</td>
                        <td className='py-2 pl-2 align-top min-w-[200px]'>
                          <Form.Item
                            {...restField}
                            name={[name, "productId"]}
                            className='mb-0 max-w-[250px]'
                            rules={[
                              {
                                required: true,
                                message: "Product is required",
                              },
                            ]}
                          >
                            <Select
                              placeholder='Select Product'
                              showSearch
                              loading={productLoading}
                              optionFilterProp='children'
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              onChange={(product) => {
                                handleSetInitial(product, index);
                              }}
                            >
                              {productList?.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <div className='px-2'>{indexedProduct.uom}</div>
                        </td>

                        <td className='py-2 pl-2 align-top min-w-[80px]'>
                          <Form.Item
                            {...restField}
                            name={[name, "productPurchasePrice"]}
                            className='mb-0 max-w-[150px]'
                            rules={[
                              {
                                required: true,
                                message: "Price is required",
                              },
                            ]}
                          >
                            <InputNumber
                              type='number'
                              size='small'
                              style={{ width: "100%" }}
                              placeholder='50000'
                              onChange={() => totalCalculator(index)}
                            />
                          </Form.Item>
                        </td>

                        <td className='py-2 pl-2 align-top min-w-[80px]'>
                          <Form.Item
                            {...restField}
                            name={[name, "adjustQuantity"]}
                            rules={[
                              {
                                required: true,
                                message: "Adjust Quantity is required",
                              },
                            ]}
                            className='mb-0'
                          >
                            <InputNumber
                              size='small'
                              placeholder='50'
                              onChange={() => totalCalculator(index)}
                            />
                          </Form.Item>
                          <div>{indexedProduct.stock}</div>
                        </td>

                        <td className='py-2 pl-2 align-top min-w-[80px]'>
                          <Form.Item>
                            <span>
                              {`${type === "Increment" ? "+" : "-"}${
                                subTotal[index]?.total || 0
                              }`}
                            </span>
                          </Form.Item>
                        </td>

                        <td className='py-2 pl-2 align-top'>
                          <Form.Item>
                            <button
                              shape='circle'
                              className='flex justify-center items-center hover:bg-black/40 rounded-md'
                              onClick={() => {
                                remove(name);
                                totalCalculator(index);
                              }}
                            >
                              <CiCircleRemove size={25} />
                            </button>
                          </Form.Item>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className='flex items-center justify-center mt-2'>
              <Button
                onClick={() => add()}
                className='flex items-center justify-center w-48'
                block
                icon={<PlusOutlined />}
              >
                Add Item
              </Button>
            </div>
          </>
        )}
      </Form.List>
    </Card>
  );
}
