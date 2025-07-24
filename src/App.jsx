import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Nav';
import Hero from './Hero';
import GlitchTitle from './Glitch';
import Shop from './Shop';
import { mockProducts } from './Shop';
import ProductCard from './Product-Card';
import Cart from './Cart';
import LatestContent from './LatestContent';
import Order from './order';
import { motion } from 'framer-motion';
import Post from './post';
import AboutTimeline from './about';
import MKBHDFooter from './footer';
import Loader from './Loader';
import VideoPage from './VideoPage';
const productVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const Home = ({ onAddToCart }) => (
  <>
    <Hero />
    <LatestContent />
    <GlitchTitle />
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-white">Featured Products</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.18 }
          }
        }}
      >
        {mockProducts.slice(0, 3).map(product => (
          <motion.div
            key={product.id}
            variants={productVariants}
          >
            <ProductCard product={product} onAddToCart={onAddToCart} home />
          </motion.div>
        ))}
      </motion.div>
    </div>
    <Post />
    <AboutTimeline />
    <MKBHDFooter />
  </>
);

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const getInitialUser = () => {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : { isAuthenticated: false, name: '' };
  } catch {
    return { isAuthenticated: false, name: '' };
  }
};

const App = () => {
  const [cart, setCart] = useState(getInitialCart());
  const [user, setUser] = useState(getInitialUser());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <Loader>
      <Router>
        <Nav cart={cart} />
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/order" element={<Order cart={cart} setCart={setCart} user={user} />} />
          <Route path="/video" element={<VideoPage />} />
        </Routes>
      </Router>
    </Loader>
  );
};

export default App
