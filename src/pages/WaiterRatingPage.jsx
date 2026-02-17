import React, { useState } from 'react';
import { IoStar, IoStarOutline, IoCheckmarkCircle, IoPersonCircle } from 'react-icons/io5';
import { sendWaiterRatingToTelegram } from '../services/telegramService';

const WaiterRatingPage = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setSubmitError('Iltimos, baho tanlang');
      return;
    }
    
    if (!customerName.trim()) {
      setSubmitError('Iltimos, ismingizni kiriting');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const success = await sendWaiterRatingToTelegram({
      rating,
      comment,
      customerName: customerName.trim(),
      date: new Date().toLocaleString('uz-UZ')
    });

    setIsSubmitting(false);

    if (success) {
      setSubmitSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setRating(0);
        setComment('');
        setCustomerName('');
        setSubmitSuccess(false);
      }, 3000);
    } else {
      setSubmitError('Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => {
      const isFilled = star <= (hoveredRating || rating);
      return (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          className="transition-all duration-200 transform hover:scale-110 focus:outline-none"
          aria-label={`${star} yulduz`}
        >
          {isFilled ? (
            <IoStar className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 drop-shadow-lg" />
          ) : (
            <IoStarOutline className="w-12 h-12 md:w-16 md:h-16 text-gray-300" />
          )}
        </button>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img 
                src="/afitsant/waiter-placeholder.svg" 
                alt="Afitsant" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-2xl border-4 border-white object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-3 shadow-lg">
                <IoPersonCircle className="w-8 h-8" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
            Afitsantni Baholang
          </h1>
          <p className="text-gray-600 text-lg">
            Xizmatimizni yaxshilash uchun fikr-mulohazangiz muhim
          </p>
        </div>

        {/* Rating Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {submitSuccess ? (
            <div className="text-center py-12">
              <IoCheckmarkCircle className="w-20 h-20 text-emerald-500 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-emerald-700 mb-2">
                Rahmat!
              </h2>
              <p className="text-gray-600">
                Sizning fikr-mulohazangiz uchun tashakkur
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Name */}
              <div>
                <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Ismingiz <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ismingizni kiriting"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  disabled={isSubmitting}
                />
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Baholang <span className="text-red-500">*</span>
                </label>
                <div className="flex justify-center gap-2 mb-2">
                  {renderStars()}
                </div>
                <p className="text-center text-gray-500 text-sm">
                  {rating > 0 ? `Sizning bahongiz: ${rating} yulduz` : 'Yulduzchalarni bosing'}
                </p>
              </div>

              {/* Comment */}
              <div>
                <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">
                  Izoh (ixtiyoriy)
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Xizmatimiz haqida fikringizni yozing..."
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  {submitError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
              </button>
            </form>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
          <p className="text-emerald-800 text-sm text-center">
            <span className="font-semibold">💡 Eslatma:</span> Sizning fikringiz bizga xizmat sifatini oshirishda yordam beradi
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaiterRatingPage;
