import { Card, Typography } from "antd";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import UploadMany from "../Card/UploadMany";

const ImportFromCSV = ({ urlPath, title }) => {
  return (
    <>
      <center>
        <Card className={`h-full max-w-[720px] py-4`}>
          <Typography.Title level={3} className='m-2 text-center'>
            Import {title} From CSV
          </Typography.Title>
          <UploadMany
            urlPath={urlPath}
            demoData={[
              ["name", "sku"],
              ["Demo Product 1", "569992"],
              ["Demo Product 2", "569993"],
              ["Demo Product 3", "569994"],
            ]}
            loadAllThunk={loadProduct}
            query={{ status: "true", page: 1, count: 10 }}
            title={"Demo Product"}
          />
        </Card>
      </center>
    </>
  );
};

export default ImportFromCSV;
