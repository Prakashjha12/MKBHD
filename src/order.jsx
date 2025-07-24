import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Order = ({ cart = [], setCart, user }) => {
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setShowContent(true);
  }, []);

  // Group products by id for summary
  const cartMap = cart.reduce((acc, item) => {
    acc[item.id] = acc[item.id] || { ...item, quantity: 0 };
    acc[item.id].quantity += 1;
    return acc;
  }, {});
  const cartItems = Object.values(cartMap);
  const total = cartItems.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);

  // Fallback: not authenticated
  if (!user?.isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-gray-900 rounded-2xl p-10 shadow-xl text-center">
          <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
          <p className="text-gray-300 mb-6">Please sign in to place your order.</p>
          <button
            className="px-6 py-2 bg-[#E5202B] text-white rounded-full font-bold hover:bg-[#c41c24] transition"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Fallback: empty cart
  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-gray-900 rounded-2xl p-10 shadow-xl text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-300 mb-6">Add some products before placing an order.</p>
          <button
            className="px-6 py-2 bg-[#E5202B] text-white rounded-full font-bold hover:bg-[#c41c24] transition"
            onClick={() => navigate('/shop')}
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-white flex items-center justify-center transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`} ref={contentRef}>
      <div className="bg-gray-900 rounded-2xl p-10 shadow-xl w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Order Summary</h1>
        <ul className="mb-6 divide-y divide-gray-800">
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between items-center py-3">
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-400 text-sm">x{item.quantity}</div>
              </div>
              <div className="font-bold">${(item.priceValue * item.quantity).toFixed(2)}</div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center text-xl font-bold mb-8">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none" required />
          <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none" required />
          <input type="text" placeholder="Shipping Address" className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none" required />
          <button type="submit" className="w-full py-3 bg-[#E5202B] text-white rounded-full text-lg font-semibold hover:bg-[#c41c24] transition">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default Order;