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
import EmailConfirmation from './pages/EmailConfirmation.jsx';
import Profile from './pages/profile.jsx'; // Importa el componente de perfil
import { CartProvider } from './services/cartContext.js';
import { ProductProvider } from './services/productContext.js';
import { UserProvider } from './services/userContext.js';
 // Importa el UserProvider

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
                <Route path="/verify-email" element={<EmailConfirmation />} /> {/* Añade la ruta de confirmación de correo electrónico */}
                <Route path="/login" element={<Login />} /> {/* Añade la ruta de inicio de sesión */}
                <Route path="/profile" element={<Profile />} /> {/* Añade la ruta de perfil */}
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