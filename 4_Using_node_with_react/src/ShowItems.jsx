// showitems.jsx
import React, { useEffect, useState } from 'react';
import Modal from './Modal';

function ShowItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/items');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

//   const openModal = (item) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedItem(null);
//     setIsModalOpen(false);
//   };

  if (loading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <p className='text-xl'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <p className='text-xl mb-4'>Items</p>
      <table className='table-auto border-collapse border border-gray-300'>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2'>ID</th>
            <th className='border border-gray-300 px-4 py-2'>Name</th>
            <th className='border border-gray-300 px-4 py-2'>Description</th>
            {/* <th className='border border-gray-300 px-4 py-2'>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className='border border-gray-300 px-4 py-2'>{item.id}</td>
              <td className='border border-gray-300 px-4 py-2'>{item.name}</td>
              <td className='border border-gray-300 px-4 py-2'>{item.description}</td>
              {/* <td className='border border-gray-300 px-4 py-2'>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => openModal(item)}
                >
                  View
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedItem && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Details for {selectedItem.name}
            </h2>
            <p><strong>ID:</strong> {selectedItem.id}</p>
            <p><strong>Name:</strong> {selectedItem.name}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        )}
      </Modal> */}
    </div>
  );
}

export default ShowItems;
