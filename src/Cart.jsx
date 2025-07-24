import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [qtyAnim, setQtyAnim] = useState({});
  const [totalAnim, setTotalAnim] = useState(false);
  const prevTotal = useRef(0);

  // Group products by id for quantity
  const cartMap = cart.reduce((acc, item) => {
    acc[item.id] = acc[item.id] || { ...item, quantity: 0 };
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const cartItems = Object.values(cartMap);

  const handleRemove = (id) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === id);
      if (idx !== -1) {
        const newCart = [...prev];
        newCart.splice(idx, 1);
        return newCart;
      }
      return prev;
    });
  };

  const handleAdd = (item) => {
    setCart(prev => [...prev, item]);
    setQtyAnim(a => ({ ...a, [item.id]: true }));
  };

  const handleQtyRemove = (item) => {
    handleRemove(item.id);
    setQtyAnim(a => ({ ...a, [item.id]: true }));
  };

  const total = cartItems.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);

  // Animate total price change
  useEffect(() => {
    if (prevTotal.current !== total) {
      setTotalAnim(true);
      const timer = setTimeout(() => setTotalAnim(false), 300);
      prevTotal.current = total;
      return () => clearTimeout(timer);
    }
  }, [total]);

  // Reset quantity animation
  useEffect(() => {
    const timers = Object.keys(qtyAnim).map(id =>
      setTimeout(() => setQtyAnim(a => ({ ...a, [id]: false })), 200)
    );
    return () => timers.forEach(clearTimeout);
  }, [qtyAnim]);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Your Cart
        </motion.h1>
        {cartItems.length === 0 ? (
          <motion.div
            className="text-gray-400 text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Your cart is empty.
          </motion.div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              <AnimatePresence>
                {cartItems.map(item => (
                  <motion.div
                    key={item.id}
                    className="flex items-center gap-6 bg-gray-900 rounded-lg p-4 shadow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{item.name}</div>
                      <div className="text-gray-400">{item.description}</div>
                      <div className="font-bold mt-1">{item.price}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        className="px-3 py-1 bg-gray-800 rounded text-lg"
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleQtyRemove(item)}
                      >-</motion.button>
                      <motion.span
                        className="px-2"
                        animate={qtyAnim[item.id] ? { scale: 1.3, color: '#22d3ee' } : { scale: 1, color: '#fff' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        {item.quantity}
                      </motion.span>
                      <motion.button
                        className="px-3 py-1 bg-gray-800 rounded text-lg"
                        whileTap={{ scale: 1.15, backgroundColor: '#22d3ee' }}
                        onClick={() => handleAdd(item)}
                      >+</motion.button>
                    </div>
                    <motion.button
                      className="ml-4 text-[#E5202B] hover:underline"
                      whileHover={{ scale: 1.1, color: '#fff' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCart(prev => prev.filter(p => p.id !== item.id))}
                    >
                      Remove
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <motion.div
              className="flex justify-between items-center text-xl font-bold mb-8"
              animate={totalAnim ? { scale: 1.1, color: '#22d3ee' } : { scale: 1, color: '#fff' }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </motion.div>
            <motion.button
              className="w-full py-3 bg-[#E5202B] text-white rounded-full text-lg font-semibold hover:bg-[#c41c24] transition"
              whileHover={{ scale: 1.03, boxShadow: '0 4px 24px #E5202B55' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/order')}
            >
              Proceed to Order
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;