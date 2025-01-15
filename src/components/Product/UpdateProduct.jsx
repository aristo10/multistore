import { Button, Card, Checkbox, DatePicker, Form, Input, Select } from "antd";
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSingleProduct,
  updateProduct,
} from "../../redux/rtk/features/product/productSlice";

import ImageUploader from "@/UI/ImageUploader";
import { loadAllProductAttribute } from "@/redux/rtk/features/eCommerce/productAttribute/productAttribute";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { loadAllDiscount } from "../../redux/rtk/features/eCommerce/discount/discountSlice";
import { groupByAttribute } from "../../utils/functions";
import Loader from "../Loader/Loader";
import AttributeValueUpdateDropDown from "./AttributeValueUpdateDropDown";
import AttributesDropdown from "./AttributesDropDown";
import SkuField from "./SkuField";
import UpdateGroup from "./UpdateGroup";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams();

  const { product } = useSelector((state) => state.products);
  const attribute = useSelector((state) => state.productAttribute?.list);
  const discount = useSelector((state) => state.discount?.list);
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);

  const [description, setDescription] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attributeValue, setAttributeValue] = useState({});
  const [attributeId, setAttributeId] = useState([]);
  const [isAttribute, setIsAttribute] = useState();
  const [checked, setChecked] = useState(false);
  const descriptionHandler = (val) => {
    setDescription(val);
  };

  const handelThumbImageChange = (fileList) => {
    setImages(fileList);
  };

  const onFinish = async (values) => {
    setLoader(true);
    try {
      let data = {
        ...values,
        productThumbnailImage: images[0]?.id || null,
        productAttributeValueId: attributeId,
      };
      if (checked && description) {
        data["description"] = description;
      }

      const resp = await dispatch(updateProduct({ values: data, id }));
    } catch (error) {
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const makeAttributeIdArray = (val) => {
    // Extract all values (arrays) from the object
    const arrays = Object.values(val);

    // Combine arrays into a single array
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
      setAttributeValue(newAttributeObj);
      makeAttributeIdArray(newAttributeObj);
    } else {
      const newAttributeObj = { ...attributeValue, [name]: val };
      setAttributeValue(newAttributeObj);
      makeAttributeIdArray(newAttributeObj);
    }
  };

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  //useEffect for loading category list from redux
  useEffect(() => {
    dispatch(loadSingleProduct(id));
    dispatch(loadAllDiscount());
    dispatch(loadAllProductAttribute());
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setDescription(product?.description);
      if (product?.productThumbnailImage) {
        setImages([{ id: product?.productThumbnailImage }]);
      }
    }
  }, [product]);
  useEffect(() => {
    if (product && attribute) {
      const groupBy = groupByAttribute(product?.productProductAttributeValue);
      let fff = {};

      groupBy.forEach((item) => {
        fff[item[0].productAttributeValue.productAttribute?.name] = item.map(
          (i) => i.productAttributeValueId
        );
      });

      const attributeU = groupBy.map((item) => {
        return item[0].productAttributeValue.productAttribute.id;
      });
      const at = attribute.filter((item) => attributeU.includes(item.id));
      setSelectedAttributes(at);
      setAttributeValue(fff);
      setIsAttribute(true);
    }
  }, [attribute, product]);

  return (
    <>
      {product ? (
        <Card
          className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
          bodyStyle={{ padding: 0 }}
          bordered={false}
        >
          <h1 className='text-lg font-bold text-center my-4'>Update Product</h1>
          <Form
            form={form}
            name='basic'
            className='mx-4'
            initialValues={{
              ...product,
              ...product.productGroup,
              expDate: product.expDate && dayjs(product.expDate),
            }}
            onFinish={onFinish}
            layout='vertical'
          >
            <Form.Item
              style={{ marginBottom: "15px" }}
              label='Name'
              name='name'
              required
            >
              <Input />
            </Form.Item>

            <div className='flex flex-col sm:flex-row gap-3'>
              <SkuField
                name={"sku"}
                className='w-full sm:w-1/2'
                isUpdate
                initialSku={product.sku}
              />
              <Form.Item
                style={{ marginBottom: "15px" }}
                label='Discount'
                name='discountId'
                className='w-full sm:w-1/2'
              >
                <Select
                  loading={!discount}
                  showSearch
                  placeholder='Select discount'
                  optionFilterProp='children'
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

            <div className='flex flex-col sm:flex-row gap-3'>
              <Form.Item
                label='UPC No'
                name='upcNo'
                className='w-full sm:w-1/2'
              >
                <Input size='small' placeholder='Universal product code' />
              </Form.Item>
              <Form.Item
                label='EAN No'
                name='eanNo'
                className='w-full sm:w-1/2'
              >
                <Input
                  size='small'
                  placeholder='International article number'
                />
              </Form.Item>
            </div>
            <div className='flex flex-col sm:flex-row gap-3'>
              <Form.Item
                label='ISBN No'
                name='isbnNo'
                className='w-full sm:w-1/2'
              >
                <Input
                  size='small'
                  placeholder='International standard book number'
                />
              </Form.Item>
              <Form.Item
                label='Part No'
                name='partNo'
                className='w-full sm:w-1/2'
              >
                <Input size='small' placeholder='Part number' />
              </Form.Item>
            </div>

            {attribute?.length && isAttribute && (
              <Form.Item style={{ marginBottom: "15px" }} label='Attributes'>
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
                  style={{
                    marginBottom: "15px",
                    marginLeft: "20px",
                  }}
                  label={item.name}
                  name={item.name.toLowerCase()}
                >
                  <AttributeValueUpdateDropDown
                    name={item.name}
                    data={item.productAttributeValue}
                    attributeValueHandler={attributeValueHandler}
                    attributeValue={attributeValue}
                  />
                </Form.Item>
              ))}
            </div>
            <Form.Item
              label='Thumbnail Image'
              valuePropName='gallery_image'
              className='w-full'
              tooltip='Image size should be less than 2MB.'
            >
              <ImageUploader
                images={images}
                setImages={handelThumbImageChange}
                filter={{ image: "image" }}
              />
            </Form.Item>
            <Checkbox checked={checked} onChange={onChange} className='my-2'>
              Want to update group info?
            </Checkbox>
            {checked && (
              <UpdateGroup
                description={description}
                descriptionHandler={descriptionHandler}
              />
            )}
            <Form.Item
              style={{ marginBottom: "15px" }}
              className='flex justify-center mt-[24px]'
            >
              <Button
                type='primary'
                htmlType='submit'
                shape='round'
                loading={loader}
              >
                Update Product
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UpdateProduct;
