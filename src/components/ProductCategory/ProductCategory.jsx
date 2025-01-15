import { Navigate } from "react-router-dom";
import GetAllProductCategory from "./GetAllProductCategory";

const ProductCategory = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <>
      <GetAllProductCategory />
    </>
  );
};

export default ProductCategory;
