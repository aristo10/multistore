/* eslint-disable no-unreachable */
/* eslint-disable react-refresh/only-export-components */
import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  loadProduct,
} from "../../redux/rtk/features/product/productSlice";
import { loadAllProductBrand } from "../../redux/rtk/features/productBrand/productBrandSlice";
import { loadAllProductCategory } from "../../redux/rtk/features/productCategory/productCategorySlice";
import { loadAllProductSubCategory } from "../../redux/rtk/features/productSubCategory/productSubCategorySlice";

import ImageUploader from "@/UI/ImageUploader";
import { loadAllDiscount } from "@/redux/rtk/features/eCommerce/discount/discountSlice";
import { loadALLManufacturer } from "@/redux/rtk/features/manufacturer/manufacturerSlice";
import { loadAllVatTax } from "@/redux/rtk/features/vatTax/vatTaxSlice";
import { loadAllProductAttribute } from "../../redux/rtk/features/eCommerce/productAttribute/productAttribute";
import { loadAllUom } from "../../redux/rtk/features/uom/uomSlice";
import BigDrawer from "../Drawer/BigDrawer";
import AddManufacturer from "../Manufacturer/AddManufacturer";
import AddProductBrand from "../ProductBrand/AddProductBrand";
import AddProductCategory from "../ProductSubcategory/AddProductSubcategory";
import AddUoM from "../UoM/AddUoM";
import AddVatTax from "../VatTax/AddVatTax";
import FormProductListCard from "./FormProductListCard";
import FormSingleProductList from "./FormSingleProductList";
// Quill formats to specify allowed styles
export const textEditorModule = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

export const textEditorFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "background",
];

const AddProduct = () => {
  const { list: subCategory, loading: subCategoryLoading } = useSelector(
    (state) => state.productSubCategories
  );
  const { list: brand, loading: brandLoading } = useSelector(
    (state) => state.productBrands
  );
  const { list: uomList, loading: uomLoading } = useSelector(
    (state) => state.uom
  );
  const { list: manufacturerList, loading: manufacturerLoading } = useSelector(
    (state) => state.manufacturer
  );
  const { list: discount, loading: discountLoading } = useSelector(
    (state) => state.discount
  );
  const { list: vatTaxList, loading: vatTaxLoading } = useSelector(
    (state) => state.vatTax
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(loadAllProductCategory({ page: 1, count: 100, status: true }));
    dispatch(loadAllProductSubCategory({ page: 1, count: 100, status: true }));
    dispatch(loadAllProductBrand({ page: 1, count: 100, status: true }));
    dispatch(loadAllProductAttribute());
    dispatch(loadAllDiscount());
    dispatch(loadAllUom());
    dispatch(loadAllVatTax());
    dispatch(loadALLManufacturer());
  }, [dispatch]);

  const [galleryFileList, setGalleryFileList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [prodDescription, setProdDescription] = useState("");
  const [attributeId, setAttributeId] = useState([]);
  const [checked, setChecked] = useState(false);
  // Quill modules to add features like toolbar, image upload, etc.

  const onChange = (e) => {
    if (e.target.checked) {
      form.setFieldValue("productGroup", []);
    } else {
      form.setFieldValue("productGroup", [{}]);
    }
    setChecked(e.target.checked);
  };

  const prodDescriptionHandler = (val) => {
    setProdDescription(val);
  };

  const onFinish = async (values) => {
    setLoader(true);

    try {
      const data = {
        ...values,
        galleryImages: galleryFileList.map((item) => item.id),
        description: prodDescription,
        productGroup: checked
          ? values.productGroup
          : values.productGroup?.map((item) => ({
              ...item,
              name: values.productGroupName,
            })),
      };
      const resp = await dispatch(addProduct(data));

      if (resp.payload.message === "success") {
        form.resetFields();
        setProdDescription("");
        dispatch(loadProduct({ status: "true", page: 1, count: 10 }));
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        name='basic'
        layout='vertical'
        className='sm:mx-4'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          style={{ marginBottom: "15px" }}
          label='Group Name'
          name='productGroupName'
          rules={[
            {
              required: true,
              message: "Please input Product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className='flex flex-col sm:flex-row gap-3'>
          <Form.Item
            style={{ marginBottom: "15px" }}
            name='subCategoryId'
            className='w-full sm:w-1/2'
            label={
              <>
                Subcategory
                <BigDrawer title={"Sub Category"}>
                  <AddProductCategory drawer={true} />
                </BigDrawer>
              </>
            }
          >
            <Select
              loading={subCategoryLoading}
              showSearch
              placeholder='Select Subcategory'
            >
              {subCategory &&
                subCategory.map((subCat) => (
                  <Select.Option key={subCat.id} value={subCat.id}>
                    {subCat.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "15px" }}
            name='productBrandId'
            className='w-full sm:w-1/2'
            label={
              <>
                Brand
                <BigDrawer title='new Brand'>
                  <AddProductBrand drawer={true} />
                </BigDrawer>
              </>
            }
          >
            <Select
              name='productBrandId'
              loading={brandLoading}
              showSearch
              placeholder='Select Brand'
            >
              {brand &&
                brand.map((brandSingle) => (
                  <Select.Option key={brandSingle.id} value={brandSingle.id}>
                    {brandSingle.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
        <div className='flex flex-col sm:flex-row gap-3'>
          <Form.Item
            style={{ marginBottom: "15px" }}
            name='uomId'
            className='w-full sm:w-1/2'
            label={
              <>
                UoM
                <BigDrawer title={"UoM"}>
                  <AddUoM />
                </BigDrawer>
              </>
            }
          >
            <Select
              name='uomId'
              loading={uomLoading}
              showSearch
              placeholder='Select UoM '
            >
              {uomList &&
                uomList.map((uom) => (
                  <Select.Option key={uom} value={uom?.id}>
                    {uom?.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "15px" }}
            label='UoM Value'
            name='uomValue'
            className='w-full sm:w-1/2'
          >
            <InputNumber size='small' />
          </Form.Item>
        </div>
        <div className='flex flex-col sm:flex-row gap-3'>
          <Form.Item
            style={{ marginBottom: "15px" }}
            label={
              <>
                Purchase VAT{" "}
                <BigDrawer title={"Vat/Tax"}>
                  <AddVatTax />
                </BigDrawer>
              </>
            }
            className='w-full sm:w-1/2'
            name='productPurchaseTaxId'
          >
            <Select
              allowClear
              placeholder='Select Vat/Tax type'
              loading={vatTaxLoading}
            >
              {vatTaxList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                  <span className='italic'>@{item.percentage}%</span>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "15px" }}
            label={
              <>
                Sales VAT{" "}
                <BigDrawer title={"VAT/TAX"}>
                  <AddVatTax />
                </BigDrawer>
              </>
            }
            className='w-full sm:w-1/2'
            name='productSalesTaxId'
          >
            <Select
              allowClear
              placeholder='Select Vat/Tax type'
              loading={vatTaxLoading}
            >
              {vatTaxList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                  <span className='italic'>@{item.percentage}%</span>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className='flex flex-col sm:flex-row gap-3'>
          <Form.Item
            style={{ marginBottom: "15px" }}
            label={
              <>
                Manufacture
                <BigDrawer title={"Manufacture"}>
                  <AddManufacturer />
                </BigDrawer>
              </>
            }
            className='w-full sm:w-1/2'
            name='manufacturerId'
          >
            <Select
              allowClear
              placeholder='Select Manufacture'
              loading={manufacturerLoading}
            >
              {manufacturerList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Checkbox checked={checked} onChange={onChange} className='my-2'>
          Create multiple items with attributes and options?
        </Checkbox>
        {checked ? (
          <FormProductListCard
            setAttributeId={setAttributeId}
            form={form}
            discount={discount}
            discountLoading={discountLoading}
          />
        ) : (
          <FormSingleProductList
            form={form}
            discount={discount}
            discountLoading={discountLoading}
          />
        )}

        <div className='flex gap-3'>
          <Form.Item
            label='Gallery Images'
            valuePropName='gallery_image'
            className='w-full'
            tooltip='Maximum number of images is 4 and each image should be less than 2MB.'
          >
            <ImageUploader
              images={galleryFileList}
              setImages={setGalleryFileList}
              isMultiple={true}
              maxCount={4}
              filter={{ image: "image" }}
            />
          </Form.Item>
        </div>

        <Form.Item
          style={{ marginBottom: "25px" }}
          label='Product Description '
        >
          <ReactQuill
            value={prodDescription}
            onChange={prodDescriptionHandler}
            modules={textEditorModule}
            formats={textEditorFormats}
          />
        </Form.Item>
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
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProduct;
