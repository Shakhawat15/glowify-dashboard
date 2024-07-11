import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import the Pages
import FullscreenLoader from "./components/MasterLayout/FullscreenLoader";
import BrandList from "./pages/Brand/BrandPage";
import CategoryList from "./pages/Category/CategoryPage";
import Dashboard from "./pages/Dashboard/DashboardPage";
import OrderList from "./pages/Order/OrderPage";
import ProductCreate from "./pages/Product/AddProductPage";
import ProductList from "./pages/Product/ProductPage";
import UserList from "./pages/User/UserPage";
import UserRoleList from "./pages/UserRole/UserRolePage";
import HeaderSettingPage from "./pages/Setting/HeaderSettingPage";
import FooterSettingPage from "./pages/Setting/FooterSettingPage";
import MenuPage from "./pages/Menu/MenuPage";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user-roles" element={<UserRoleList />} />
          <Route path="/brands" element={<BrandList />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product-create" element={<ProductCreate />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/header-setting" element={<HeaderSettingPage />} />
          <Route path="/footer-setting" element={<FooterSettingPage />} />
          <Route path="/create-menu" element={<MenuPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      <FullscreenLoader />
    </Fragment>
  );
}

export default App;
