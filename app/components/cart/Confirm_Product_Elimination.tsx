import React from 'react';

// Este es el componente que muestra el pop up para confirmar la elimación del producto
// Contiene una interfaz aquí mismo creada para los tipos de datos que va a recibir como parametros.

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h4 className="text-lg font-semibold mb-4">Confirm Removal</h4>
        <p>Are you sure you want to remove this product from your cart?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600">
            No
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
