import React, { useEffect } from 'react';

const Popup = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); 
    
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    message && (
      <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
        {message}
      </div>
    )
  );
}

export default Popup;
