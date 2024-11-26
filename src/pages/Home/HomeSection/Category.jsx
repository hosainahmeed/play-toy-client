import { useEffect, useState } from 'react';
import { Modal, Popover, Pagination } from 'antd';
import { motion } from 'framer-motion';
import {
  ShoppingCartOutlined,
  EyeOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { IoCloseCircle } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

function Category() {
  const [toysData, setToysData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedToy, setSelectedToy] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isTapped, setIsTapped] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const location = useLocation();

  useEffect(() => {
    fetch('toys.json')
      .then((res) => res.json())
      .then((data) => {
        setToysData(data);

        const categories = [...new Set(data.map((toy) => toy.category))];
        setUniqueCategories(categories);

        if (categories.length > 0) setSelectedCategory('');
      });
  }, []);

  const handleQuickView = (toy) => {
    setSelectedToy(toy);
    setQuantity(1);
    setIsModalVisible(true);
  };

  const handleAddToCart = (toy, quantity) => {
    const cartItem = { ...toy, quantity };
    console.log('Added to Cart:', cartItem);
    setIsModalVisible(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredToys = toysData.filter((toy) =>
    selectedCategory ? toy.category === selectedCategory : true
  );

  const paginatedToys = filteredToys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='py-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-4'>Categories</h2>
        <div className='block lg:hidden mb-4'>
          <button
            onClick={() => setIsFilterVisible((prev) => !prev)}
            className='px-4 py-2 bg-black text-white hover:bg-gray-800 transition'
          >
            {isFilterVisible ? <IoCloseCircle /> : 'Filter'}
          </button>
        </div>

        <div
          className={`flex flex-wrap gap-4 ${
            isFilterVisible || window.innerWidth >= 1024 ? 'block' : 'hidden'
          } lg:flex`}
        >
          {uniqueCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedCategory(category);
                setIsFilterVisible(false);
                setCurrentPage(1); // Reset to the first page
              }}
              className={`px-4 py-2 ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-800'
              } hover:bg-black hover:text-white transition`}
            >
              {category}
            </button>
          ))}
        </div>

        {location.pathname.includes('shop') && (
          <button
            onClick={() => {
              setSelectedCategory('');
              setCurrentPage(1); // Reset to the first page
            }}
            className='mt-4 px-4 py-2 bg-black text-white rounded hover:bg-zinc-800 transition'
          >
            All toys
          </button>
        )}
      </div>

      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {paginatedToys.map((toy) => (
            <div key={toy.id} className='p-4 relative overflow-hidden group'>
              <motion.div whileHover={{ scale: 1.1 }} className='w-full h-96'>
                <img
                  src={toy.image}
                  alt={toy.name}
                  className='w-full h-full object-contain md:object-cover'
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                onClick={() => setIsTapped(!isTapped)}
                animate={
                  isTapped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                className='absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100'
              >
                <Popover content='Add to Cart' placement='top'>
                  <button className='bg-white p-3 rounded-full hover:bg-black hover:text-white'>
                    <ShoppingCartOutlined />
                  </button>
                </Popover>
                <Popover content='Quick View' placement='top'>
                  <button
                    className='bg-white p-3 rounded-full hover:bg-black hover:text-white'
                    onClick={() => handleQuickView(toy)}
                  >
                    <EyeOutlined />
                  </button>
                </Popover>
                <Popover content='Add to Wishlist' placement='top'>
                  <button className='bg-white p-3 rounded-full hover:bg-black hover:text-white'>
                    <HeartOutlined />
                  </button>
                </Popover>
              </motion.div>

              <h4 className='text-lg font-bold mt-2'>{toy.name}</h4>
              <p className='text-gray-600 mt-1'>Price: ${toy.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-6 flex justify-center'>
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredToys.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      <Modal
        title={selectedToy?.name}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedToy && (
          <div>
            <img
              src={selectedToy.image}
              alt={selectedToy.name}
              className='w-full h-64 object-contain mb-4'
            />

            <p>
              <strong>Category:</strong> {selectedToy.category}
            </p>
            <p>
              <strong>Description:</strong> {selectedToy.description}
            </p>
            <p>
              <strong>Price:</strong> ${selectedToy.price}
            </p>

            <div className='mt-4 flex items-center gap-4'>
              <p>
                <strong>Quantity:</strong>
              </p>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                  className='px-3 py-1 bg-gray-200 hover:bg-gray-300 transition'
                >
                  -
                </button>
                <span className='px-4 py-2 border'>{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className='px-3 py-1 bg-gray-200 hover:bg-gray-300 transition'
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => handleAddToCart(selectedToy, quantity)}
              className='mt-6 px-6 py-2 bg-black text-white hover:bg-gray-800 transition'
            >
              Add to Cart
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Category;
