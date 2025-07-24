import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProductCard = ({ product, onAddToCart, onCardClick, home }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [flyImage, setFlyImage] = useState(null);
    const [imgLoaded, setImgLoaded] = useState(false);
    const imgRef = useRef();

    const handleAdd = (e) => {
        e.stopPropagation(); // Prevent modal open
        // Get image and cart icon positions
        const imgRect = imgRef.current.getBoundingClientRect();
        const cartIcon = document.getElementById('cart-icon');
        if (!cartIcon) return;
        const cartRect = cartIcon.getBoundingClientRect();

       
        setFlyImage({
            top: imgRect.top,
            left: imgRect.left,
            width: imgRect.width,
            height: imgRect.height,
            toTop: cartRect.top,
            toLeft: cartRect.left,
        });

 
        setTimeout(() => {
            if (onAddToCart) onAddToCart(product);
            setFlyImage(null);
        }, 700);
    };

    const cardHeight = home ? 'h-[420px] md:h-[480px]' : '';

    return (
        <div 
            className={
                `relative ${home ?
                    `bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-black border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-8 flex flex-col items-center group overflow-hidden ${cardHeight}` :
                    'bg-gray-900 rounded-xl p-6 flex flex-col items-center shadow-lg'} `
            }
            onClick={onCardClick}
            style={{ cursor: onCardClick ? 'pointer' : 'default' }}
        >
       
            {flyImage && (
                <motion.img
                    src={product.image}
                    alt=""
                    initial={{
                        position: "fixed",
                        zIndex: 50,
                        top: flyImage.top,
                        left: flyImage.left,
                        width: flyImage.width,
                        height: flyImage.height,
                        borderRadius: 12,
                    }}
                    animate={{
                        top: flyImage.toTop,
                        left: flyImage.toLeft,
                        width: 32,
                        height: 32,
                        opacity: 0.7,
                        borderRadius: 999,
                    }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    style={{ pointerEvents: "none" }}
                />
            )}
            <motion.div
                className={
                    home
                        ? 'w-44 h-44 md:w-56 md:h-56 object-cover rounded-xl mb-6 bg-gray-800 shadow-lg group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-300 flex items-center justify-center relative'
                        : 'w-40 h-40 object-cover rounded-lg mb-4 bg-gray-700 flex items-center justify-center relative'
                }
                whileHover={home ? { scale: 1.07, y: -8 } : undefined}
            >
                             {!imgLoaded && (
                    <Skeleton
                        height={home ? '100%' : '100%'}
                        width={home ? '100%' : '100%'}
                        borderRadius={home ? '1rem' : '0.5rem'}
                        style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                        containerClassName="w-full h-full"
                    />
                )}
                <img
                    ref={imgRef}
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{ background: '#222' }}
                    onLoad={() => setImgLoaded(true)}
                />
            </motion.div>
   
            <h2 className={`text-2xl font-bold mb-2 text-center ${home ? 'text-white drop-shadow' : ''}`}>{product.name}</h2>
            <p className={`mb-2 text-center ${home ? 'text-gray-300' : 'text-gray-400'}`}>{product.description}</p>
            <div className={`text-lg font-semibold mb-2 ${home ? 'text-[#E5202B]' : ''}`}>{product.price}</div>
            <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05, backgroundColor: "#c41c24" }}
                className={`mt-auto px-6 py-2 rounded-full font-bold transition ${home ? 'bg-[#E5202B] text-white shadow-lg hover:bg-[#c41c24]' : 'bg-[#E5202B] text-white hover:bg-[#c41c24]'}`}
                onClick={handleAdd}
                disabled={isAdding || !!flyImage}
            >
                Add to Cart
            </motion.button>
        </div>
    );
};

export default ProductCard;