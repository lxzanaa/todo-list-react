import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [itemsArray, setItemsArray] = useState(() => {
    const savedItems = localStorage.getItem('itemsArray');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [newItemText, setNewItemText] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  useEffect(() => {
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
  }, [itemsArray]);

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: `item-${Date.now()}`,
      quantity: newItemQuantity,
      text: newItemText,
      checked: false,
    };
    setItemsArray([...itemsArray, newItem]);
    setNewItemText('');
  };

  const handleDeleteItem = (id) => {
    setItemsArray(itemsArray.filter(item => item.id !== id));
  };

  const handleCheckItem = (id) => {
    setItemsArray(itemsArray.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleClearItems = () => {
    setItemsArray([]);
  };

  const handleSortItems = (e) => {
    const value = e.target.value;
    const sortedItems = [...itemsArray];
    if (value === 'order') {
      sortedItems.sort((a, b) => a.id.localeCompare(b.id));
    } else if (value === 'description') {
      sortedItems.sort((a, b) => a.text.localeCompare(b.text));
    } else if (value === 'status') {
      sortedItems.sort((a, b) => a.checked - b.checked);
    }
    setItemsArray(sortedItems);
  };

  const checkedCount = itemsArray.filter(item => item.checked).length;

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <header className="p-6 bg-[#f4a226] text-center">
        <h1 className="text-black font__">🏝️ FAR AWAY 🧳</h1>
      </header>
      <section className="bg-[#e5771f] p-7 flex items-center justify-center gap-10">
        <h3 className="text-2xl font-bold">What do you need for your trip?</h3>
        <form onSubmit={handleAddItem} className="flex items-center gap-4">
          <select
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e.target.value)}
            className="py-3 px-8 bg-[#ffebb3] rounded-full outline-none border-none"
          >
            {[...Array(20).keys()].map(num => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Item..."
            required
            className="outline-none border-none bg-[#ffebb3] rounded-full max-w-[257px] py-3 px-8"
          />
          <button
            type="submit"
            className="font-bold text-lg bg-[#76c7ad] text-[#5a3e2b] py-3 px-8 rounded-full uppercase border-none outline-none"
          >
            Add
          </button>
        </form>
      </section>
      <section className="p-10 bg-[#5a3e2b] flex-grow">
        <div className="max-w-[1100px] w-full mx-auto min-h-[288px] flex flex-col">
          {itemsArray.length === 0 ? (
            <h2 id="no-item" className="text-[#ffebb3] text-3xl">No item...</h2>
          ) : (
            <ul className="grid grid-cols-4 gap-5">
              {itemsArray.map(item => (
                <li key={item.id} className="flex items-center justify-between bg-[#ffebb3] rounded-full px-6 py-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckItem(item.id)}
                    className="mr-3"
                  />
                  <label className={`font-bold text-lg text-[#5a3e2b] ${item.checked ? 'line-through' : ''}`}>
                    {item.quantity} {item.text}
                  </label>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-500 mr-3"
                  >
                    <i className="fas fa-times text-2xl"></i>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-5 justify-center mt-auto pt-4">
            <select
              onChange={handleSortItems}
              className="bg-[#ffebb3] text-[#5a3e2b] outline-none border-none py-2 px-6 rounded-full uppercase font-bold"
            >
              <option value="order">Sort by input order</option>
              <option value="description">Sort by description</option>
              <option value="status">Sort by packet status</option>
            </select>
            <button
              onClick={handleClearItems}
              className="text-[#5a3e2b] py-2 px-6 bg-[#ffebb3] uppercase font-bold rounded-full"
            >
              Clear
            </button>
          </div>
        </div>
      </section>
      <footer className="bg-[#76c7ad] p-8 text-center">
        <i className="text-black text-2xl font-semibold">
          You have <span className="bg-[#ffff00]">{itemsArray.length}</span> items on your list, and you already packed <span>{checkedCount}</span> items.
        </i>
      </footer>
    </div>
  );
}

export default App;
