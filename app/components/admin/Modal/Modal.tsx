import React from 'react';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-y-auto">
    <div className="bg-white p-5 rounded-lg max-w-lg w-full mx-4 my-10 relative overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-900 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        aria-label="Close">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="max-h-[80vh] overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
  );
};

export default Modal;
