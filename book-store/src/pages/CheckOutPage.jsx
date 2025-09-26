import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useCart } from '../hooks/useCart';
import { toast } from 'react-toastify';
import { useCart } from '../hooks/useCart';

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart,getCarts } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

  const handlePlaceOrder = () => {
    if (!address) {
      toast.error('Please enter shipping address');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/order-success', {
        state: { orderId: Math.floor(Math.random() * 100000), address },
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Address and Payment */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
              placeholder="Enter your delivery address"
              className="w-full p-3 border rounded-lg resize-none"
            />
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>UPI (coming soon)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4 max-h-[400px] overflow-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-pink-600">₹{item.price}</p>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="space-y-2 text-lg font-medium">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg text-lg font-semibold transition"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
