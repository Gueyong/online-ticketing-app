import { useState, useContext } from 'react';
import { CartContext } from '@/components/AppContext';
import toast from 'react-hot-toast';
import QRCode from 'qrcode.react';

export default function TicketItem({ _id, type, basePrice, numberOfPlaces, qrCode, key }) {
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  async function handleAddToCartButtonClick() {
    console.log('add to cart');
    addToCart({ _id, type, basePrice, numberOfPlaces, qrCode, key });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('hiding popup');
    setShowPopup(false);
    toast.success('Added to cart');
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md"
          >
            <div className="text-center">
              <QRCode value={qrCode} size={300} />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-lg font-bold">{type}</h2>
              <p className="text-gray-700">Price: ${basePrice}</p>
              <p className="text-gray-700">Number of Places: {numberOfPlaces}</p>
              <button
                className="mt-2 primary bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleAddToCartButtonClick}
              >
                Add to cart
              </button>
              <button className="mt-2 text-gray-700" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
        onClick={() => setShowPopup(true)}
      >
        <div className="text-center">
          <QRCode value={qrCode} size={96} />
        </div>
        <h4 className="font-semibold text-xl my-3">{type}</h4>
        <p className="text-gray-500 text-sm">Price: ${basePrice}</p>
        <p className="text-gray-500 text-sm">Number of Places: {numberOfPlaces}</p>
      </div>
    </>
  );
}