import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Calendar, 
  Clock, 
  IndianRupee, 
  User, 
  Mail, 
  Tag, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  ArrowRight,
  AlertCircle,
  Home
} from 'lucide-react';
import { api } from '../api/api';
import Loading from '../components/Loading';

export default function Checkout() {
  const loc = useLocation();
  const navigate = useNavigate();
  const payload = (loc.state as any) || {};
  const experience = payload.experience;
  const timeSlotId = payload.timeSlotId;

  if (!experience || !timeSlotId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
        <div className="card bg-base-100 shadow-2xl max-w-md w-full">
          <div className="card-body items-center text-center">
            <AlertCircle className="w-16 h-16 text-warning mb-4" />
            <h2 className="card-title text-2xl">Selection Missing</h2>
            <p className="text-base-content/70">
              Please select an experience and time slot before proceeding to checkout.
            </p>
            <div className="card-actions mt-6">
              <a href="/" className="btn btn-primary gap-2">
                <Home className="w-5 h-5" />
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const slot = experience.timeSlots.find((s: any) => s._id === timeSlotId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [promo, setPromo] = useState('');
  const [promoResult, setPromoResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);

  const validatePromo = async () => {
    if (!promo) return;
    setPromoLoading(true);
    setPromoResult(null);
    try {
      const res = await api.post('/promo/validate', { code: promo });
      setPromoResult(res.data.data);
    } catch (err: any) {
      setPromoResult({ invalid: true, message: err.response?.data?.message || 'Invalid promo code' });
    } finally {
      setPromoLoading(false);
    }
  };

  const submit = async () => {
    setError(null);
    if (!name || !email) {
      setError('Please provide name and valid email');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/bookings', {
        experienceId: experience._id,
        timeSlotId,
        user: { name, email },
        promoCode: promo || null
      });
      navigate('/result', {
  state: {
    success: true,
    bookings: res.data.data // ✅ append new booking
  }
});
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || 'Booking failed';
      navigate('/result', { state: { success: false, message: msg } });
    } finally {
      setLoading(false);
    }
  };

  const finalPrice = promoResult && !promoResult.invalid 
    ? promoResult.type === 'percentage' 
      ? slot.price - (slot.price * promoResult.value / 100)
      : slot.price - promoResult.value
    : slot.price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-500">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-base-content mb-2">Checkout</h1>
          <p className="text-base-content/60">Complete your booking details</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experience Summary Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow  animate-in fade-in slide-in-from-left duration-500">
              <div className="card-body">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="card-title text-xl mb-2">{experience.title}</h2>
                    <p className="text-base-content/70 text-sm line-clamp-2">{experience.description}</p>
                  </div>
                </div>
                
                <div className="divider my-2"></div>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-base-content/80">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-medium">{slot.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base-content/80">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">{slot.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Details Form */}
            <div className="card bg-base-100 shadow-xl animate-in fade-in slide-in-from-left duration-500 delay-100">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Your Details</h3>
                
                <div className="space-y-4">
                  {/* Name Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </span>
                    </label>
                    <input 
                      type="text"
                      placeholder="Enter your full name" 
                      className="input input-bordered w-full focus:input-primary transition-colors" 
                      value={name} 
                      onChange={e => setName(e.target.value)}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </span>
                    </label>
                    <input 
                      type="email"
                      placeholder="your.email@example.com" 
                      className="input input-bordered w-full focus:input-primary transition-colors" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Promo Code */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Promo Code (Optional)
                      </span>
                    </label>
                    <div className="join w-full">
                      <input 
                        type="text"
                        placeholder="Enter promo code" 
                        className="input input-bordered join-item flex-1 focus:input-primary transition-colors" 
                        value={promo} 
                        onChange={e => setPromo(e.target.value.toUpperCase())}
                      />
                      <button 
                        onClick={validatePromo} 
                        className="btn btn-primary join-item"
                        disabled={!promo || promoLoading}
                      >
                        {promoLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          'Apply'
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Promo Result */}
                  {promoResult && (
                    <div className={`alert ${promoResult.invalid ? 'alert-error' : 'alert-success'} animate-in fade-in slide-in-from-bottom duration-300`}>
                      <div className="flex items-center gap-2">
                        {promoResult.invalid ? (
                          <>
                            <XCircle className="w-5 h-5" />
                            <span>{promoResult.message}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            <div>
                              <div className="font-semibold">Promo Applied: {promoResult.code}</div>
                              <div className="text-sm">
                                {promoResult.type === 'percentage' 
                                  ? `${promoResult.value}% discount` 
                                  : `₹${promoResult.value} off`}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="alert alert-error animate-in fade-in slide-in-from-bottom duration-300">
                      <AlertCircle className="w-5 h-5" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-4 animate-in fade-in slide-in-from-right duration-500">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Price Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/70">Base Price</span>
                    <span className="flex items-center gap-1 font-semibold">
                      <IndianRupee className="w-4 h-4" />
                      {slot.price}
                    </span>
                  </div>

                  {promoResult && !promoResult.invalid && (
                    <div className="flex justify-between items-center text-success">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        Discount
                      </span>
                      <span className="font-semibold">
                        - ₹{slot.price - finalPrice}
                      </span>
                    </div>
                  )}

                  <div className="divider my-2"></div>

                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold">Total</span>
                    <span className="flex items-center gap-1 font-bold text-primary text-2xl">
                      <IndianRupee className="w-5 h-5" />
                      {finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="card-actions mt-6">
                  <button 
                    onClick={submit} 
                    className="btn btn-primary btn-block gap-2 group"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-base-200 text-sm text-base-content/70">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-base-300/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-base-100 p-8 rounded-2xl shadow-2xl">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
}