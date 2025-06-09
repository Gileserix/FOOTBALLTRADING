import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage.jsx';
import Navbar from './components/layout/navbar.jsx';
import Footer from './components/layout/footer.jsx';
import Ropa from './pages/cloths.jsx';
import Cartas from './pages/cards.jsx';
import CreaTuProducto from './pages/createYourProduct.jsx';
import Accesorios from './pages/accessories.jsx';
import Register from './pages/register.jsx';
import Login from './components/login.jsx'; // Importa el componente de inicio de sesión
import Profile from './pages/profile.jsx'; // Importa el componente de perfil
import MyProducts from './pages/myProducts.jsx';
import TransactionProducts from './pages/transactionProducts.jsx';
import PaymentSuccess from './pages/paymentSuccess.jsx';
import { CartProvider } from './services/cartContext.js';
import { ProductProvider } from './services/productContext.js';
import { UserProvider } from './services/userContext.js'; // Importa el UserProvider
import Contact from './pages/contact.jsx';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <UserProvider> {/* Envuelve la aplicación con el UserProvider */}
          <div className="App">
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cloths" element={<Ropa />} />
                <Route path="/cards" element={<Cartas />} />
                <Route path="/create-your-product" element={<CreaTuProducto />} />
                <Route path="/accessories" element={<Accesorios />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> {/* Añade la ruta de inicio de sesión */}
                <Route path="/profile" element={<Profile />} /> {/* Añade la ruta de perfil */}
                <Route path="/my-products" element={<MyProducts />} /> {/* Nueva ruta */}
                <Route path="/transaction-products" element={<TransactionProducts />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/contact" element={<Contact />} /> {/* Nueva ruta */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                {/* Add other routes here */}
              </Routes>
              <Footer />
            </Router>
          </div>
        </UserProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;