import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import { 
  FiX, FiTruck, FiCreditCard, FiCheckCircle, FiMapPin, 
  FiPhone, FiMail, FiUser, FiPackage, FiCalendar, FiShield 
} from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard, FaPaypal, FaGem } from 'react-icons/fa';

const CheckoutModal = ({ isOpen, onClose, totalAmount, items, finalTotal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address) {
        toast.error('Please fill in all required fields');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (paymentInfo.method === 'credit-card') {
        if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
          toast.error('Please fill in all card details');
          return;
        }
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    dispatch(clearCart());
    toast.success('🎉 Order confirmed! Thank you for your purchase.');
    onClose();
    navigate('/');
    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-md z-[2000] animate-in fade-in duration-300"
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] max-w-[90vw] max-h-[85vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-3xl rounded-3xl border border-gold/30 dark:border-gold/50 shadow-2xl z-[2001] flex flex-col overflow-hidden animate-in slide-in-from-top-4 duration-300">
        
        {/* Header */}
        <div className="text-center pt-7 pb-5 px-7 border-b border-gold/20 dark:border-gold/30 relative">
          <div className="w-14 h-14 bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl text-gray-900">
            <FaGem />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent mb-1">
            Complete Your Order
          </h2>
          <p className="text-sm text-text-muted dark:text-gray-300">Luxury shopping experience</p>
          <button 
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-text-secondary dark:text-gray-300 hover:bg-gold/20 hover:text-gold hover:rotate-90 transition-all duration-200"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center px-7 pt-5 gap-2">
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              currentStep >= 1 
                ? 'bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 shadow-md shadow-gold/40' 
                : 'bg-black/10 dark:bg-white/20 text-text-muted dark:text-gray-400'
            }`}>
              1
            </div>
            <div className={`text-xs flex items-center gap-1 ${currentStep >= 1 ? 'text-gold font-semibold' : 'text-text-muted dark:text-gray-400'}`}>
              <FiTruck /> Shipping
            </div>
          </div>
          
          {/* Line 1 */}
          <div className={`w-10 h-0.5 transition-all duration-300 ${currentStep >= 2 ? 'bg-gradient-to-r from-[#c4a43c] to-[#e0c460]' : 'bg-black/10 dark:bg-white/20'}`} />
          
          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              currentStep >= 2 
                ? 'bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 shadow-md shadow-gold/40' 
                : 'bg-black/10 dark:bg-white/20 text-text-muted dark:text-gray-400'
            }`}>
              2
            </div>
            <div className={`text-xs flex items-center gap-1 ${currentStep >= 2 ? 'text-gold font-semibold' : 'text-text-muted dark:text-gray-400'}`}>
              <FiCreditCard /> Payment
            </div>
          </div>
          
          {/* Line 2 */}
          <div className={`w-10 h-0.5 transition-all duration-300 ${currentStep >= 3 ? 'bg-gradient-to-r from-[#c4a43c] to-[#e0c460]' : 'bg-black/10 dark:bg-white/20'}`} />
          
          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              currentStep >= 3 
                ? 'bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 shadow-md shadow-gold/40' 
                : 'bg-black/10 dark:bg-white/20 text-text-muted dark:text-gray-400'
            }`}>
              3
            </div>
            <div className={`text-xs flex items-center gap-1 ${currentStep >= 3 ? 'text-gold font-semibold' : 'text-text-muted dark:text-gray-400'}`}>
              <FiCheckCircle /> Confirm
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-7 py-5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-black/10 dark:[&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gold [&::-webkit-scrollbar-thumb]:rounded-full">
          
          {/* Step 1: Shipping Details */}
          {currentStep === 1 && (
            <div className="animate-in fade-in duration-300">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-text-primary dark:text-white mb-6">
                <FiMapPin /> Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-text-secondary dark:text-gray-300 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                    <FiUser /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleShippingChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-2xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-800/50 backdrop-blur-md font-inherit text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary dark:text-gray-300 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                    <FiMail /> Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-2xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-800/50 backdrop-blur-md font-inherit text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary dark:text-gray-300 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                    <FiPhone /> Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    placeholder="+1 234 567 8900"
                    className="w-full px-4 py-3 rounded-2xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-800/50 backdrop-blur-md font-inherit text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-text-secondary dark:text-gray-300 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                    <FiMapPin /> Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    placeholder="123 Luxury Street"
                    className="w-full px-4 py-3 rounded-2xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-800/50 backdrop-blur-md font-inherit text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary dark:text-gray-300 uppercase tracking-wide mb-2 block">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    placeholder="New York"
                    className="w-full px-4 py-3 rounded-2xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-800/50 backdrop-blur-md font-inherit text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary dark:text-gray-300 uppercase tracking-wide mb-2 block">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleShippingChange}
                    placeholder="10001"
                    className="w-full px-4 py-3 rounded-2xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-800/50 backdrop-blur-md font-inherit text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && (
            <div className="animate-in fade-in duration-300">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-text-primary dark:text-white mb-6">
                <FiCreditCard /> Payment Method
              </h3>
              
              <div className="flex flex-col gap-4 mb-6">
                <label className={`cursor-pointer flex-1 ${paymentInfo.method === 'credit-card' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="method"
                    value="credit-card"
                    checked={paymentInfo.method === 'credit-card'}
                    onChange={handlePaymentChange}
                    className="hidden"
                  />
                  <div className={`p-4 border-2 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all duration-300 backdrop-blur-md bg-white/10 dark:bg-gray-800/50 ${
                    paymentInfo.method === 'credit-card' 
                      ? 'border-gold bg-gold/15 text-gold' 
                      : 'border-gold/20 dark:border-gold/40 bg-white/10 dark:bg-gray-800/50 text-text-primary dark:text-gray-200'
                  }`}>
                    <FaCcVisa /> <FaCcMastercard />
                    <span>Credit / Debit Card</span>
                  </div>
                </label>
                
                <label className={`cursor-pointer flex-1 ${paymentInfo.method === 'paypal' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="method"
                    value="paypal"
                    checked={paymentInfo.method === 'paypal'}
                    onChange={handlePaymentChange}
                    className="hidden"
                  />
                  <div className={`p-4 border-2 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all duration-300 backdrop-blur-md bg-white/10 dark:bg-gray-800/50 ${
                    paymentInfo.method === 'paypal' 
                      ? 'border-gold bg-gold/15 text-gold' 
                      : 'border-gold/20 dark:border-gold/40 bg-white/10 dark:bg-gray-800/50 text-text-primary dark:text-gray-200'
                  }`}>
                    <FaPaypal />
                    <span>PayPal</span>
                  </div>
                </label>
              </div>

              {paymentInfo.method === 'credit-card' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-text-secondary dark:text-gray-300 uppercase tracking-wide mb-2 block">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-2xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-800/50 backdrop-blur-md font-inherit text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-300"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-text-secondary dark:text-gray-300 uppercase tracking-wide mb-2 block">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="**** **** **** 1234"
                      className="w-full px-4 py-3 rounded-2xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-800/50 backdrop-blur-md font-inherit text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-300"
                      maxLength="19"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text-secondary dark:text-gray-300 uppercase tracking-wide mb-2 block">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 rounded-2xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-800/50 backdrop-blur-md font-inherit text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-300"
                      maxLength="5"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text-secondary dark:text-gray-300 uppercase tracking-wide mb-2 block">
                      CVV
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                      placeholder="***"
                      className="w-full px-4 py-3 rounded-2xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-800/50 backdrop-blur-md font-inherit text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-300"
                      maxLength="4"
                    />
                  </div>
                </div>
              )}

              <div className="mt-5 p-3 text-center bg-gold/10 dark:bg-gold/20 backdrop-blur-md rounded-full text-xs text-gold flex items-center justify-center gap-2">
                <FiShield /> Secure Payment - 256-bit SSL Encryption
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="animate-in fade-in duration-300">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-text-primary dark:text-white mb-6">
                <FiCheckCircle /> Order Confirmation
              </h3>
              
              <div className="flex flex-col gap-5">
                {/* Order Summary Card */}
                <div className="p-5 rounded-2xl bg-gold/5 dark:bg-gold/10 backdrop-blur-lg border border-gold/20 dark:border-gold/30">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gold mb-4">
                    <FiPackage /> Order Summary
                  </h4>
                  <div className="max-h-[150px] overflow-y-auto space-y-3">
                    {items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex gap-3 pb-3 border-b border-gold/10 dark:border-gold/20">
                        <img src={item.image} alt={item.title} className="w-10 h-10 object-contain" />
                        <div className="flex-1">
                          <p className="text-sm text-text-primary dark:text-gray-200">{item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title}</p>
                          <span className="text-xs text-gold">{item.quantity} x ${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <div className="p-2 text-center text-xs text-text-muted dark:text-gray-400">+ {items.length - 3} more items</div>
                    )}
                  </div>
                </div>

                {/* Shipping Details Card */}
                <div className="p-5 rounded-2xl bg-gold/5 dark:bg-gold/10 backdrop-blur-lg border border-gold/20 dark:border-gold/30">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gold mb-4">
                    <FiTruck /> Shipping Details
                  </h4>
                  <div className="space-y-1 text-sm text-text-secondary dark:text-gray-300">
                    <p><strong className="dark:text-white">{shippingInfo.fullName}</strong></p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city} {shippingInfo.postalCode}</p>
                    <p className="flex items-center gap-2"><FiMail className="text-gold" /> {shippingInfo.email}</p>
                    <p className="flex items-center gap-2"><FiPhone className="text-gold" /> {shippingInfo.phone}</p>
                  </div>
                </div>

                {/* Payment Method Card */}
                <div className="p-5 rounded-2xl bg-gold/5 dark:bg-gold/10 backdrop-blur-lg border border-gold/20 dark:border-gold/30">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gold mb-4">
                    <FiCreditCard /> Payment Method
                  </h4>
                  <div className="flex items-center gap-2 text-text-secondary dark:text-gray-300">
                    {paymentInfo.method === 'credit-card' ? (
                      <><FaCcVisa className="dark:text-white" /> Credit Card ending in {paymentInfo.cardNumber.slice(-4)}</>
                    ) : (
                      <><FaPaypal className="dark:text-white" /> PayPal Account</>
                    )}
                  </div>
                </div>

                {/* Total Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900">
                  <div className="flex justify-between py-2 text-sm">
                    <span>Subtotal:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between py-3 mt-2 text-lg font-extrabold border-t border-white/30">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 px-7 py-5 border-t border-gold/20 dark:border-gold/30">
          {currentStep > 1 && (
            <button 
              className="flex-1 py-3.5 rounded-full bg-black/10 dark:bg-white/20 backdrop-blur-md text-text-secondary dark:text-gray-200 font-semibold cursor-pointer transition-all duration-300 hover:bg-black/20 dark:hover:bg-white/30"
              onClick={handlePrevStep}
            >
              ← Back
            </button>
          )}
          {currentStep < 3 ? (
            <button 
              className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/40"
              onClick={handleNextStep}
            >
              Continue →
            </button>
          ) : (
            <button 
              className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 font-semibold cursor-pointer transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/40"
              onClick={handleConfirmOrder}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>⏳ Processing Order...</>
              ) : (
                <>✨ Confirm & Pay ${finalTotal.toFixed(2)}</>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;