import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import the Pages
import FullscreenLoader from "./components/MasterLayout/FullscreenLoader";
import BrandList from "./pages/Brand/BrandPage";
import CategoryCreate from "./pages/Category/add";
import CategoryList from "./pages/Category/index";
import Dashboard from "./pages/Dashboard/index";
import OrderList from "./pages/Order/index";
import ProductCreate from "./pages/Product/add";
import ProductList from "./pages/Product/index";
import UserCreate from "./pages/User/add";
import UserList from "./pages/User/index";
import UserRoleCreate from "./pages/UserRole/add";
import UserRoleList from "./pages/UserRole/index";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user-create" element={<UserCreate />} />
          <Route path="/user-roles" element={<UserRoleList />} />
          <Route path="/user-role-create" element={<UserRoleCreate />} />
          <Route path="/brands" element={<BrandList />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/category-create" element={<CategoryCreate />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product-create" element={<ProductCreate />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      <FullscreenLoader />
    </Fragment>
  );
}

export default App;
