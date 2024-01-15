import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import CartPage from '../pages/CartPage/CartPage';
import SearchPage from '../pages/SearchPage';
import SigninPage from '../pages/SigninPage/SigninPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import ShippingAddressPage from '../pages/ShippingAddress/ShippingAddressPage';
import PaymentPage from '../pages/PaymentPage/PaymentPage';
import ProductAdminPage from '../pages/ProductPage/ProductPage';
import ProductControl from '../pages/admin-pages/ProductAdminPage';
import AdminRoute from './AdminRoute';
import ProductCategory from '../components/admin/ProductCategory/ProductCategory';
import ProductOrders from '../components/admin/ProductOrder/ProductOrders';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/shipping" element={<ShippingAddressPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/product/:slug" element={<ProductAdminPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin/product-control"
        element={
          <AdminRoute>
            <ProductControl />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/product-category"
        element={
          <AdminRoute>
            <ProductCategory />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/product-orders"
        element={
          <AdminRoute>
            <ProductOrders />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
