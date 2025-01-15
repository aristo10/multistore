import Button from "@/UI/Button";
import { PlusOutlined } from "@ant-design/icons";
import { Form, InputNumber, Select } from "antd";
import { CiCircleRemove } from "react-icons/ci";
import Card from "../../UI/Card";
import SearchForm from "./SearchForm";

export default function ProductAdd({
  form,
  productList,
  productLoading,
  totalCalculator,
  subTotal,
}) {
  const handleSetInitial = (product, serial) => {
    const productArray = form.getFieldValue("purchaseInvoiceProduct");
    const findProduct = productList.find((pro) => pro.id === product);
    const newArray = productArray.map((product, index) => {
      if (index === serial) {
        return {
          ...product,
          productQuantity: findProduct.productQuantity ? 1 : 0,
          productSalePrice: findProduct.stockInfo[0]?.productSalePrice || 0,
          productPurchasePrice:
            findProduct.stockInfo[0]?.productPurchasePrice || 0,
          tax: findProduct.productGroup.productPurchaseTax?.percentage || 0,
        };
      } else {
        return product;
      }
    });

    form.setFieldsValue({
      purchaseInvoiceProduct: newArray,
    });
    totalCalculator(serial);
  };

  const render = (index) => {
    const findId = form
      .getFieldValue("purchaseInvoiceProduct")
      ?.find((_, i) => i === index)?.productId;
    const findProduct = productList?.find((item) => findId === item.id);

    let attributes = null;
    if (findProduct?.productProductAttributeValue) {
      attributes = findProduct.productProductAttributeValue.map(
        (item, index) => (
          <span key={item.id} className='text-xs'>
            <span className='mr-1'>
              {item.productAttributeValue?.productAttribute?.name}:{" "}
            </span>
            {/* coma separator  */}
            <span>{item.productAttributeValue?.name}</span>
            {index < findProduct.productProductAttributeValue.length - 1 && (
              <span>, </span>
            )}
          </span>
        )
      );
    }

    let uom = null;
    if (findProduct?.productGroup?.uom?.name) {
      uom = (
        <span className='text-xs'>
          <span className='mr-1'>UoM: </span>
          <span>{`${findProduct?.productGroup?.uomValue}/${findProduct?.productGroup?.uom?.name}`}</span>
        </span>
      );
    }

    return { uom, attributes };
  };

  return (
    <Card
      className='h-[calc(100vh-100px)]'
      headClass=''
      bodyClass='p-0'
      title={
        <>
          <SearchForm
            form={form}
            totalCalculator={totalCalculator}
            isPurchase={true}
          />
        </>
      }
    >
      <Form.List
        name='purchaseInvoiceProduct'
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
                    <th className='py-2 pl-2 text-left'>Quantity</th>
                    <th className='py-2 pl-2 text-left'>Purchase price</th>
                    <th className='py-2 pl-2 text-left'>Selling price</th>
                    <th className='py-2 pl-2 text-left'>Amount</th>
                    <th className='py-2 pl-2 text-left'>Tax%</th>
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
                        <td className='py-2 pl-2 align-top'>{index + 1}</td>
                        <td className='py-2 pl-2 align-top'>
                          <Form.Item
                            {...restField}
                            className='mb-0  max-w-[250px]'
                            name={[name, "productId"]}
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
                          <div className='px-2'>
                            {indexedProduct.attributes}
                          </div>
                          <div className='px-2'>{indexedProduct.uom}</div>
                        </td>

                        <td className='py-2 pl-2 align-top'>
                          <Form.Item
                            {...restField}
                            className='mb-0 max-w-[100px]'
                            name={[name, "productQuantity"]}
                            rules={[
                              {
                                required: true,
                                message: "quantity is required",
                              },
                            ]}
                          >
                            <InputNumber
                              type='number'
                              size={"small"}
                              placeholder='Quantity'
                              onChange={() => totalCalculator(index)}
                            />
                          </Form.Item>
                        </td>
                        <td className='py-2 pl-2 align-top'>
                          <Form.Item
                            {...restField}
                            className='mb-0 max-w-[150px]'
                            name={[name, "productPurchasePrice"]}
                            rules={[
                              {
                                required: true,
                                message: "Price is required",
                              },
                            ]}
                          >
                            <InputNumber
                              size='small'
                              type='number'
                              // className="w-full text-sm xxs:p-0 md:p-2"
                              placeholder='50000'
                              onChange={() => totalCalculator(index)}
                            />
                          </Form.Item>
                        </td>
                        <td className='py-2 pl-2 align-top'>
                          <Form.Item
                            {...restField}
                            className='mb-0 max-w-[150px]'
                            name={[name, "productSalePrice"]}
                            rules={[
                              {
                                required: true,
                                message: "Price is required",
                              },
                            ]}
                          >
                            <InputNumber
                              size='small'
                              type='number'
                              // className="w-full text-sm xxs:p-0 md:p-2"
                              placeholder='50000'
                              onChange={() => totalCalculator(index)}
                            />
                          </Form.Item>
                        </td>
                        <td className='py-2 pl-2 align-top min-w-[80px]'>
                          <div className='font-weight-bold totalMargin'>
                            {subTotal[index]?.subPrice?.toFixed(2) || 0}
                          </div>
                        </td>
                        <td className='py-2 pl-2 align-top min-w-[80px]'>
                          <Form.Item
                            {...restField}
                            name={[name, "tax"]}
                            initialValue={0}
                            className='mb-0 max-w-[100px]'
                            rules={[
                              {
                                required: true,
                                message: "Tax is required",
                              },
                            ]}
                          >
                            <InputNumber
                              size='small'
                              type='number'
                              style={{ width: "100%" }}
                              onChange={() => totalCalculator(index)}
                            />
                          </Form.Item>
                          <div className='text-xs'>
                            Total: {subTotal[index]?.totalVat?.toFixed(2) || 0}
                          </div>
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
            {fields.length === 0 && (
              <div className='text-center py-10'>No product selected yet</div>
            )}
            <div className='flex items-center justify-center mt-2'>
              <Button
                onClick={() => add()}
                className='flex items-center justify-center w-48'
                block
                icon={<PlusOutlined />}
              >
                Add Product
              </Button>
            </div>
          </>
        )}
      </Form.List>
    </Card>
  );
}
