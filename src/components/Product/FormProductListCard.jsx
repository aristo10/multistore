/* eslint-disable react-refresh/only-export-components */
import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useSelector } from "react-redux";
import Card from "../../UI/Card";
import BigDrawer from "../Drawer/BigDrawer";
import AddProductAttribute from "../eComErp/ProductAttribute/AddProductAttribute";
import AddProductAttributeValue from "../eComErp/ProductAttributeValue/AddProductAttributeValue";
import AttributeValueDropdown from "./AttributeValueDropdown";
import AttributesDropdown from "./AttributesDropDown";
import SkuField from "./SkuField";
import UploadVariantImage from "./UploadVariantImage";

export default function FormProductListCard({
  discount,
  discountLoading,
  setAttributeId,
  form,
  productGroupName,
}) {
  const attribute = useSelector((state) => state.productAttribute?.list);
  const attributeValueCalculated = getAttributeValue(attribute);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attributeValue, setAttributeValue] = useState({});

  const makeAttributeIdArray = (val) => {
    const arrays = Object.values(val);
    const combinedArray = arrays.reduce((acc, curr) => [...acc, ...curr], []);
    setAttributeId(combinedArray);
  };

  const attributesHandler = (selectedAttributesFromDropDown) => {
    const selectedAttributeDetails = selectedAttributesFromDropDown.map(
      (selectedAttributeSingle) => {
        const foundAttributeDetails = attribute.find(
          (item) => item.name === selectedAttributeSingle
        );

        return foundAttributeDetails;
      }
    );
    setSelectedAttributes(selectedAttributeDetails);
  };

  const attributeValueHandler = (name, val) => {
    const attributeObjKey = Object.keys(attributeValue);
    const foundAttributeObjKey = attributeObjKey.find((item) => item === name);
    if (foundAttributeObjKey) {
      const newAttributeObj = {
        ...attributeValue,
        [foundAttributeObjKey]: val,
      };
      const modifiedAttributeObj = filterAttributeValues(
        attributeValueCalculated,
        newAttributeObj
      );

      const variants = generateVariants(modifiedAttributeObj);
      const variantNames = generateVariantName(
        variants,
        form,
        productGroupName
      );

      form.setFieldsValue({ productGroup: variantNames });
      setAttributeValue(newAttributeObj);
      makeAttributeIdArray(newAttributeObj);
    } else {
      const newAttributeObj = { ...attributeValue, [name]: val };
      const modifiedAttributeObj = filterAttributeValues(
        attributeValueCalculated,
        newAttributeObj
      );
      const variants = generateVariants(modifiedAttributeObj);
      const variantNames = generateVariantName(
        variants,
        form,
        productGroupName
      );
      form.setFieldsValue({ productGroup: variantNames });
      setAttributeValue(newAttributeObj);
      makeAttributeIdArray(newAttributeObj);
    }
  };

  useEffect(() => {
    if (attribute?.length) {
      const selectedAttributeDetails = selectedAttributes.map(
        (selectedAttributeSingle) => {
          const foundAttributeDetails = attribute.find(
            (item) => item.name === selectedAttributeSingle.name
          );

          return foundAttributeDetails;
        }
      );
      setSelectedAttributes(selectedAttributeDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attribute]);

  return (
    <>
      {attribute?.length && (
        <Form.Item
          style={{ marginBottom: "15px" }}
          label={
            <>
              Attribute{" "}
              <BigDrawer title={"Attribute"}>
                <AddProductAttribute />
              </BigDrawer>
            </>
          }
        >
          <AttributesDropdown
            data={attribute}
            attributes={selectedAttributes}
            attributesHandler={attributesHandler}
          />
        </Form.Item>
      )}
      <div className='border-l border-blue-300'>
        {selectedAttributes?.map((item) => (
          <Form.Item
            key={item.id}
            style={{ marginBottom: "15px", marginLeft: "20px" }}
            label={
              <>
                {item.name}{" "}
                <BigDrawer title={item.name}>
                  <AddProductAttributeValue
                    id={item.id}
                    fromProductCreate={true}
                  />
                </BigDrawer>
              </>
            }
            name={item.name.toLowerCase()}
          >
            <AttributeValueDropdown
              name={item.name}
              data={item.productAttributeValue}
              attributeValueHandler={attributeValueHandler}
              attributeValue={attributeValue}
            />
          </Form.Item>
        ))}
      </div>
      <div>
        <Form.List
          name='productGroup'
          initialValue={[{}]}
          rules={[
            {
              required: true,
              message: "Product is required",
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              <div className='overflow-auto'>
                <div className='w-full flex gap-4 flex-wrap'>
                  {fields.map(({ key, name, ...restField }, index) => {
                    return (
                      <Card key={key} className=''>
                        <div className='flex gap-2 justify-between'>
                          <Form.Item className='mb-1 max-w-[200px]'>
                            <UploadVariantImage form={form} index={index} />
                          </Form.Item>
                          <Form.Item className='mb-0'>
                            <button
                              shape='circle'
                              className='flex justify-center items-center hover:bg-black/40 rounded-md'
                              onClick={() => {
                                remove(name);
                              }}
                            >
                              <CiCircleRemove size={25} />
                            </button>
                          </Form.Item>
                        </div>

                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          label='Product Name'
                          className='mb-1 max-w-full'
                          rules={[
                            {
                              required: true,
                              message: "Product name is required",
                            },
                          ]}
                        >
                          <Input size='small' placeholder='Enter item name' />
                        </Form.Item>

                        <div className='flex gap-2'>
                          <SkuField
                            restField={restField}
                            name={name}
                            key={index}
                            form={form}
                            isMultiple={true}
                            index={index}
                          />
                          <Form.Item
                            {...restField}
                            name={[name, "discountId"]}
                            label={
                              <>
                                Discount
                                {index === 0 && (
                                  <span
                                    onClick={() =>
                                      copyToAllCol("discountId", form)
                                    }
                                    className='cursor-pointer font-semibold text-xs text-blue-500 ml-1'
                                  >
                                    Copy to all
                                  </span>
                                )}
                              </>
                            }
                            className='mb-1 w-1/2'
                          >
                            <Select
                              showSearch
                              className='w-full'
                              placeholder='Select discount'
                              optionFilterProp='children'
                              allowClear
                              loading={discountLoading}
                            >
                              {discount?.map((discountSingle) => (
                                <Select.Option
                                  key={discountSingle.id}
                                  value={discountSingle.id}
                                >
                                  {`${
                                    discountSingle.type == "percentage"
                                      ? `${discountSingle.value}%`
                                      : `Flat ${discountSingle.value}`
                                  }`}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>

                        <div className='flex gap-2'>
                          <Form.Item
                            {...restField}
                            label='UPC No'
                            name={[name, "upcNo"]}
                            className='mb-1 w-full'
                          >
                            <Input size='small' placeholder='Enter UPC No' />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "eanNo"]}
                            label='EAN No'
                            className='mb-1 w-full'
                          >
                            <Input size='small' placeholder='Enter EAN No' />
                          </Form.Item>
                        </div>
                        <div className='flex gap-2'>
                          <Form.Item
                            {...restField}
                            name={[name, "isbnNo"]}
                            label='ISBN No'
                            className='mb-1 w-full'
                          >
                            <Input size='small' placeholder='Enter ISBN No' />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "partNo"]}
                            label='Part No'
                            className='mb-1 w-full'
                          >
                            <Input
                              size='small'
                              placeholder='Enter part number'
                            />
                          </Form.Item>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
              {fields.length === 0 && (
                <div className='text-center py-10'>
                  Please select attribute and attribute value
                </div>
              )}
            </>
          )}
        </Form.List>
      </div>
    </>
  );
}

function getAttributeValue(attribute) {
  const attributeValue =
    attribute?.reduce((acc, curr) => {
      return [...acc, ...curr.productAttributeValue];
    }, []) || [];
  return attributeValue;
}

function filterAttributeValues(attributeValues, attributeValueSelected) {
  const result = {};

  for (const attributeName in attributeValueSelected) {
    const selectedIds = attributeValueSelected[attributeName];
    result[attributeName] = [];

    selectedIds.forEach((selectedId) => {
      const foundValue = attributeValues.find(
        (value) => value.id === selectedId
      );
      if (foundValue) {
        result[attributeName].push(foundValue);
      }
    });
  }

  return result;
}

function generateVariants(attributeValue) {
  const keys = Object.keys(attributeValue);
  const values = keys.map((key) => attributeValue[key]);

  const combinations = cartesianProduct(...values);

  return combinations.map((combination) => {
    const variant = {};
    keys.forEach((key, index) => {
      variant[key] = combination[index];
    });
    return variant;
  });
}

function cartesianProduct(...arrays) {
  return arrays.reduce(
    (acc, curr) => {
      return acc?.flatMap((a) => curr?.map((b) => a.concat(b)));
    },
    [[]]
  );
}

function generateVariantName(input, form, productGroupName) {
  return input.map((variant) => {
    const name =
      ((form.getFieldValue("productGroupName") &&
        form.getFieldValue("productGroupName") + "-") ||
        (productGroupName && productGroupName + "-") ||
        "") +
      Object.keys(variant)
        .map((key) => variant[key].name)
        .join("/");
    const productAttributeValueId = Object.keys(variant).map(
      (key) => variant[key].id
    );
    return { name, productAttributeValueId };
  });
}

function copyToAllCol(fieldName, form) {
  const productGroup = form.getFieldValue("productGroup");
  const firstFiledValue = productGroup[0][fieldName] || "";
  if (!firstFiledValue) return;
  const updatedProductGroup = productGroup.map((item) => {
    return { ...item, [fieldName]: firstFiledValue };
  });

  form.setFieldsValue({ productGroup: updatedProductGroup });
}

function randomString() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)]
  );
}

export function skuGenerator(form) {
  const productGroup = form.getFieldValue("productGroup");
  const firstSku = productGroup[0]?.sku || "";
  if (!firstSku) return;
  const updatedProductGroup = productGroup.map((item, index) => {
    return { ...item, sku: firstSku + randomString() };
  });
  form.setFieldsValue({ productGroup: updatedProductGroup });
}
