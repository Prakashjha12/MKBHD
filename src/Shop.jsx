import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './Product-Card';

export const mockProducts = [
	{
		id: '1',
		name: 'MKBHD Black T-Shirt',
		price: '$29.99',
		priceValue: 29.99,
		popularity: 90,
		image: 'https://picsum.photos/400/400?random=1',
		category: 'Apparel',
		description: 'Premium cotton tee with signature MKBHD logo',
	},
	{
		id: '2',
		name: 'MKBHD  Hoodie',
		price: '$59.99',
		priceValue: 59.99,
		popularity: 120,
		image: 'https://picsum.photos/400/400?random=2',
		category: 'Apparel',
		description: 'Comfortable hoodie for tech enthusiasts',
	},
	{
		id: '3',
		name: 'MKBHD Tech Desk Mat',
		price: '$24.99',
		priceValue: 24.99,
		popularity: 70,
		image: 'https://picsum.photos/400/400?random=3',
		category: 'Accessories',
		description: 'Large desk mat perfect for your setup',
	},
	{
		id: '4',
		name: 'MKBHD Coffee Mug',
		price: '$14.99',
		priceValue: 14.99,
		popularity: 60,
		image: 'https://picsum.photos/400/400?random=4',
		category: 'Lifestyle',
		description: 'Start your day with quality coffee',
	},
	{
		id: '5',
		name: 'MKBHD Phone Case',
		price: '$19.99',
		priceValue: 19.99,
		popularity: 80,
		image: 'https://picsum.photos/400/400?random=5',
		category: 'Accessories',
		description: 'Protect your phone in style',
	},
	{
		id: '6',
		name: 'MKBHD Poster Set',
		price: '$34.99',
		priceValue: 34.99,
		popularity: 50,
		image: 'https://picsum.photos/400/400?random=6',
		category: 'Lifestyle',
		description: 'Decorate your space with tech vibes',
	},
];


const categories = ['All', 'Apparel', 'Accessories', 'Lifestyle'];

const sortOptions = [
	{ value: 'default', label: 'Default' },
	{ value: 'priceLowHigh', label: 'Price: Low to High' },
	{ value: 'priceHighLow', label: 'Price: High to Low' },
	{ value: 'popularity', label: 'Popularity' },
	{ value: 'nameAZ', label: 'Name: A-Z' },
	{ value: 'nameZA', label: 'Name: Z-A' },
];

const shopTitleVariants = {
	hidden: { opacity: 0, y: 40, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: 'spring', stiffness: 80, damping: 12, delay: 0.2 },
	},
};

const shimmerVariants = {
	animate: {
		backgroundPosition: ['-200% 0', '200% 0'],
		transition: {
			repeat: Infinity,
			repeatType: 'loop',
			duration: 2,
			ease: 'linear',
		},
	},
};

const Shop = ({ onAddToCart }) => {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [sortBy, setSortBy] = useState('default');
	const [products] = useState(mockProducts);
	const [modalProduct, setModalProduct] = useState(null);

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	const handleSortChange = (e) => {
		setSortBy(e.target.value);
	};

	let filteredProducts =
		selectedCategory === 'All'
			? products
			: products.filter((product) => product.category === selectedCategory);

	// Add sorting logic if you want

	return (
		<div  className="min-h-screen bg-black text-white">
			{/* Header Section */}
			<header className="pt-20 pb-16 px-6">
				<div className="max-w-7xl mx-auto text-center">
					<motion.h1
						className="text-6xl md:text-8xl font-bold mb-6 relative inline-block"
						variants={shopTitleVariants}
						initial="hidden"
						animate="visible"
						style={{ overflow: 'hidden' }}
					>
						<motion.span
							style={{
								background:
									'linear-gradient(90deg, #E5202B 20%, #fff 50%, #E5202B 80%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundSize: '200% 100%',
								display: 'inline-block',
							}}
							animate={{
								backgroundPosition: ['200% 0', '-200% 0'],
							}}
							transition={{
								repeat: Infinity,
								repeatType: 'loop',
								duration: 3,
								ease: 'linear',
							}}
						>
							MKBHD SHOP
						</motion.span>
					</motion.h1>
					<motion.p
						className="text-xl text-gray-300 max-w-2xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7, duration: 0.7, ease: 'easeOut' }}
					>
						Premium merchandise for tech enthusiasts. Quality products, crisp
						designs.
					</motion.p>
				</div>
			</header>

			{/* Filter Section */}
			<section className="px-6 mb-12">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-wrap justify-center gap-4 mb-8">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => handleCategoryChange(category)}
								className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
									selectedCategory === category
										? 'bg-[#E5202B] text-white shadow-lg'
										: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
								}`}
							>
								{category}
							</button>
						))}
						{/* Sort Dropdown */}
						<select
							value={sortBy}
							onChange={handleSortChange}
							className="ml-6 px-4 py-3 rounded-full bg-gray-800 text-gray-300 font-semibold outline-none border-none"
						>
							{sortOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>
			</section>

			{/* Products Grid */}
			<section className="px-6 pb-20">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<AnimatePresence mode="wait">
							{filteredProducts.length === 0 ? (
								<motion.div
									key="empty"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="col-span-full text-center text-gray-400 py-12"
								>
									No products found.
								</motion.div>
							) : (
								filteredProducts.map((product) => (
									<motion.div
										key={product.id}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -30 }}
										transition={{ duration: 0.35, ease: 'easeInOut' }}
										layout
									>
										<ProductCard product={product} onAddToCart={onAddToCart} onCardClick={() => setModalProduct(product)} />
									</motion.div>
								))
							)}
						</AnimatePresence>
					</div>
				</div>
			</section>
 		{/* Product Modal */}
 		<AnimatePresence>
 			{modalProduct && (
 				<motion.div
 					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
 					initial={{ opacity: 0 }}
 					animate={{ opacity: 1 }}
 					exit={{ opacity: 0 }}
 				>
 					<motion.div
 						className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
 						initial={{ scale: 0.85, y: 60, opacity: 0 }}
 						animate={{ scale: 1, y: 0, opacity: 1 }}
 						exit={{ scale: 0.85, y: 60, opacity: 0 }}
 						transition={{ type: 'spring', stiffness: 200, damping: 22 }}
 					>
 						<button
 							onClick={() => setModalProduct(null)}
 							className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
 							aria-label="Close"
 						>
 							&times;
 						</button>
 						<img
 							src={modalProduct.image}
 							alt={modalProduct.name}
 							className="w-64 h-64 object-cover rounded-xl mx-auto mb-6 bg-gray-800"
 						/>
 						<h2 className="text-3xl font-bold mb-2 text-center">{modalProduct.name}</h2>
 						<p className="text-gray-300 mb-4 text-center">{modalProduct.description}</p>
 						<div className="flex justify-center gap-6 mb-4">
 							<span className="bg-gray-800 text-gray-200 px-4 py-1 rounded-full text-sm">{modalProduct.category}</span>
 							<span className="bg-[#E5202B] text-white px-4 py-1 rounded-full text-sm font-semibold">{modalProduct.price}</span>
 						</div>
 						<motion.button
 							whileTap={{ scale: 0.95 }}
 							whileHover={{ scale: 1.05, backgroundColor: "#c41c24" }}
 							className="w-full mt-2 px-6 py-3 bg-[#E5202B] text-white rounded-full text-lg font-bold hover:bg-[#c41c24] transition"
 							onClick={() => { onAddToCart(modalProduct); setModalProduct(null); }}
 						>
 							Add to Cart
 						</motion.button>
 					</motion.div>
 				</motion.div>
 			)}
 		</AnimatePresence>
		</div>
	);
};

export default Shop;
