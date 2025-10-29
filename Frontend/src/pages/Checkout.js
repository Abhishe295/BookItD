import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Calendar, Clock, IndianRupee, User, Mail, Tag, CheckCircle2, XCircle, Sparkles, ArrowRight, AlertCircle, Home } from 'lucide-react';
import { api } from '../api/api';
import Loading from '../components/Loading';
export default function Checkout() {
    const loc = useLocation();
    const navigate = useNavigate();
    const payload = loc.state || {};
    const experience = payload.experience;
    const timeSlotId = payload.timeSlotId;
    if (!experience || !timeSlotId) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4 bg-base-200", children: _jsx("div", { className: "card bg-base-100 shadow-2xl max-w-md w-full", children: _jsxs("div", { className: "card-body items-center text-center", children: [_jsx(AlertCircle, { className: "w-16 h-16 text-warning mb-4" }), _jsx("h2", { className: "card-title text-2xl", children: "Selection Missing" }), _jsx("p", { className: "text-base-content/70", children: "Please select an experience and time slot before proceeding to checkout." }), _jsx("div", { className: "card-actions mt-6", children: _jsxs("a", { href: "/", className: "btn btn-primary gap-2", children: [_jsx(Home, { className: "w-5 h-5" }), "Go to Home"] }) })] }) }) }));
    }
    const slot = experience.timeSlots.find((s) => s._id === timeSlotId);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [promo, setPromo] = useState('');
    const [promoResult, setPromoResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [promoLoading, setPromoLoading] = useState(false);
    const validatePromo = async () => {
        if (!promo)
            return;
        setPromoLoading(true);
        setPromoResult(null);
        try {
            const res = await api.post('/promo/validate', { code: promo });
            setPromoResult(res.data.data);
        }
        catch (err) {
            setPromoResult({ invalid: true, message: err.response?.data?.message || 'Invalid promo code' });
        }
        finally {
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
        }
        catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || 'Booking failed';
            navigate('/result', { state: { success: false, message: msg } });
        }
        finally {
            setLoading(false);
        }
    };
    const finalPrice = promoResult && !promoResult.invalid
        ? promoResult.type === 'percentage'
            ? slot.price - (slot.price * promoResult.value / 100)
            : slot.price - promoResult.value
        : slot.price;
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-8 px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "text-center mb-8 animate-in fade-in slide-in-from-top duration-500", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4", children: _jsx(ShoppingBag, { className: "w-8 h-8 text-primary" }) }), _jsx("h1", { className: "text-3xl sm:text-4xl font-bold text-base-content mb-2", children: "Checkout" }), _jsx("p", { className: "text-base-content/60", children: "Complete your booking details" })] }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsx("div", { className: "card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow  animate-in fade-in slide-in-from-left duration-500", children: _jsxs("div", { className: "card-body", children: [_jsxs("div", { className: "flex items-start gap-3 mb-4", children: [_jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: _jsx(Sparkles, { className: "w-6 h-6 text-primary" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h2", { className: "card-title text-xl mb-2", children: experience.title }), _jsx("p", { className: "text-base-content/70 text-sm line-clamp-2", children: experience.description })] })] }), _jsx("div", { className: "divider my-2" }), _jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-base-content/80", children: [_jsx(Calendar, { className: "w-5 h-5 text-primary" }), _jsx("span", { className: "font-medium", children: slot.date })] }), _jsxs("div", { className: "flex items-center gap-2 text-base-content/80", children: [_jsx(Clock, { className: "w-5 h-5 text-primary" }), _jsx("span", { className: "font-medium", children: slot.time })] })] })] }) }), _jsx("div", { className: "card bg-base-100 shadow-xl animate-in fade-in slide-in-from-left duration-500 delay-100", children: _jsxs("div", { className: "card-body", children: [_jsx("h3", { className: "card-title text-lg mb-4", children: "Your Details" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsxs("span", { className: "label-text font-medium flex items-center gap-2", children: [_jsx(User, { className: "w-4 h-4" }), "Full Name"] }) }), _jsx("input", { type: "text", placeholder: "Enter your full name", className: "input input-bordered w-full focus:input-primary transition-colors", value: name, onChange: e => setName(e.target.value) })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsxs("span", { className: "label-text font-medium flex items-center gap-2", children: [_jsx(Mail, { className: "w-4 h-4" }), "Email Address"] }) }), _jsx("input", { type: "email", placeholder: "your.email@example.com", className: "input input-bordered w-full focus:input-primary transition-colors", value: email, onChange: e => setEmail(e.target.value) })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsxs("span", { className: "label-text font-medium flex items-center gap-2", children: [_jsx(Tag, { className: "w-4 h-4" }), "Promo Code (Optional)"] }) }), _jsxs("div", { className: "join w-full", children: [_jsx("input", { type: "text", placeholder: "Enter promo code", className: "input input-bordered join-item flex-1 focus:input-primary transition-colors", value: promo, onChange: e => setPromo(e.target.value.toUpperCase()) }), _jsx("button", { onClick: validatePromo, className: "btn btn-primary join-item", disabled: !promo || promoLoading, children: promoLoading ? (_jsx("span", { className: "loading loading-spinner loading-sm" })) : ('Apply') })] })] }), promoResult && (_jsx("div", { className: `alert ${promoResult.invalid ? 'alert-error' : 'alert-success'} animate-in fade-in slide-in-from-bottom duration-300`, children: _jsx("div", { className: "flex items-center gap-2", children: promoResult.invalid ? (_jsxs(_Fragment, { children: [_jsx(XCircle, { className: "w-5 h-5" }), _jsx("span", { children: promoResult.message })] })) : (_jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "w-5 h-5" }), _jsxs("div", { children: [_jsxs("div", { className: "font-semibold", children: ["Promo Applied: ", promoResult.code] }), _jsx("div", { className: "text-sm", children: promoResult.type === 'percentage'
                                                                                        ? `${promoResult.value}% discount`
                                                                                        : `₹${promoResult.value} off` })] })] })) }) })), error && (_jsxs("div", { className: "alert alert-error animate-in fade-in slide-in-from-bottom duration-300", children: [_jsx(AlertCircle, { className: "w-5 h-5" }), _jsx("span", { children: error })] }))] })] }) })] }), _jsx("div", { className: "lg:col-span-1", children: _jsx("div", { className: "card bg-base-100 shadow-xl sticky top-4 animate-in fade-in slide-in-from-right duration-500", children: _jsxs("div", { className: "card-body", children: [_jsx("h3", { className: "card-title text-lg mb-4", children: "Price Summary" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-base-content/70", children: "Base Price" }), _jsxs("span", { className: "flex items-center gap-1 font-semibold", children: [_jsx(IndianRupee, { className: "w-4 h-4" }), slot.price] })] }), promoResult && !promoResult.invalid && (_jsxs("div", { className: "flex justify-between items-center text-success", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Tag, { className: "w-4 h-4" }), "Discount"] }), _jsxs("span", { className: "font-semibold", children: ["- \u20B9", slot.price - finalPrice] })] })), _jsx("div", { className: "divider my-2" }), _jsxs("div", { className: "flex justify-between items-center text-lg", children: [_jsx("span", { className: "font-bold", children: "Total" }), _jsxs("span", { className: "flex items-center gap-1 font-bold text-primary text-2xl", children: [_jsx(IndianRupee, { className: "w-5 h-5" }), finalPrice.toFixed(2)] })] })] }), _jsx("div", { className: "card-actions mt-6", children: _jsx("button", { onClick: submit, className: "btn btn-primary btn-block gap-2 group", disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "loading loading-spinner" }), "Processing..."] })) : (_jsxs(_Fragment, { children: ["Confirm Booking", _jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })] })) }) }), _jsx("div", { className: "mt-4 p-3 rounded-lg bg-base-200 text-sm text-base-content/70", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-success mt-0.5 flex-shrink-0" }), _jsx("span", { children: "Secure payment processing" })] }) })] }) }) })] })] }), loading && (_jsx("div", { className: "fixed inset-0 bg-base-300/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300", children: _jsx("div", { className: "bg-base-100 p-8 rounded-2xl shadow-2xl", children: _jsx(Loading, {}) }) }))] }));
}
