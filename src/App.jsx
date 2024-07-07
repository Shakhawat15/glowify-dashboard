import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import the Pages
import Dashboard from "./assets/pages/Dashboard/index";
import UserList from "./assets/pages/User/index";
import UserCreate from "./assets/pages/User/add";
import UserRoleList from "./assets/pages/User/index";
import UserRoleCreate from "./assets/pages/User/add";
import BrandList from "./assets/pages/Brand/index";
import BrandCreate from "./assets/pages/Brand/add";
import CategoryList from "./assets/pages/Category/index";
import CategoryCreate from "./assets/pages/Category/add";
import ProductList from "./assets/pages/Product/index";
import ProductCreate from "./assets/pages/Product/add";
import OrderList from "./assets/pages/Order/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/user-create" element={<UserCreate />} />
        <Route path="/user-role" element={<UserRoleList />} />
        <Route path="/user-role-create" element={<UserRoleCreate />} />
        <Route path="/brands" element={<BrandList />} />
        <Route path="/brand-create" element={<BrandCreate />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/category-create" element={<CategoryCreate />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product-create" element={<ProductCreate />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
