import React from 'react';
import Link from 'next/link';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void; // Function to handle login action
}


const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const handleLogin = () => {
    onLogin(); // Execute the login action
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#FBF8F3] bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h4 className="text-lg font-semibold mb-4">Log In Required</h4>
        <p>You need to log in before adding a product to your cart.</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={handleLogin} className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700">
            <Link href="/login">Log In</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
