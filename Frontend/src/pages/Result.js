import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Home, Calendar, MapPin, CreditCard, Clock, Download, Share2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
export default function Result() {
    const loc = useLocation();
    const state = loc.state || {};
    const bookings = Array.isArray(state.bookings) ? state.bookings : [];
    const [isLoading, setIsLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    useEffect(() => {
        // Simulate loading animation
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (state.success) {
                setShowConfetti(true);
                toast.success('Booking confirmed successfully!', {
                    icon: '🎉',
                    duration: 4000,
                });
                // Hide confetti after 3 seconds
                setTimeout(() => setShowConfetti(false), 3000);
            }
            else {
                toast.error(state.message || 'Booking failed. Please try again.');
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [state.success, state.message]);
    const handleShare = (booking) => {
        const text = `I just booked ${booking.experience?.title}! Booking ID: ${booking._id}`;
        navigator.clipboard.writeText(text);
        toast.success('Booking details copied to clipboard!');
    };
    const handleDownload = (booking) => {
        toast.success('Downloading receipt...', { icon: '📄' });
        // Add your download logic here
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "loading loading-spinner loading-lg text-primary mb-4" }), _jsx("p", { className: "text-lg font-medium text-base-content/70", children: "Processing your booking..." })] }) }));
    }
    if (state.success) {
        return (_jsxs("div", { className: "h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 relative overflow-hidden flex items-center justify-center", children: [showConfetti && (_jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: [...Array(50)].map((_, i) => (_jsx("div", { className: "absolute animate-confetti", style: {
                            left: `${Math.random() * 100}%`,
                            top: '-10%',
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }, children: _jsx(Sparkles, { className: "w-4 h-4 text-primary", style: { opacity: Math.random() } }) }, i))) })), _jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [_jsxs("div", { className: "text-center mb-6 animate-in fade-in slide-in-from-top duration-500", children: [_jsx("div", { className: "inline-block p-3 bg-success/10 rounded-full mb-3 animate-bounce", children: _jsx(CheckCircle, { className: "w-12 h-12 text-success" }) }), _jsx("h1", { className: "text-3xl font-bold mb-2 bg-gradient-to-r from-success to-primary bg-clip-text text-transparent", children: "Booking Confirmed! \uD83C\uDF89" }), _jsx("p", { className: "text-base-content/70", children: "Your adventure awaits! Check your email for confirmation details." })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3 mb-6 animate-in fade-in slide-in-from-bottom duration-700", children: [_jsxs("div", { className: "stat bg-base-100 shadow-lg rounded-box p-3", children: [_jsx("div", { className: "stat-figure text-primary", children: _jsx(Calendar, { className: "w-6 h-6" }) }), _jsx("div", { className: "stat-title text-xs", children: "Bookings" }), _jsx("div", { className: "stat-value text-2xl text-primary", children: bookings.length })] }), _jsxs("div", { className: "stat bg-base-100 shadow-lg rounded-box p-3", children: [_jsx("div", { className: "stat-figure text-secondary", children: _jsx(CreditCard, { className: "w-6 h-6" }) }), _jsx("div", { className: "stat-title text-xs", children: "Total Paid" }), _jsxs("div", { className: "stat-value text-2xl text-secondary", children: ["\u20B9", bookings.reduce((sum, b) => sum + (b.pricePaid || 0), 0)] })] }), _jsxs("div", { className: "stat bg-base-100 shadow-lg rounded-box p-3", children: [_jsx("div", { className: "stat-figure text-accent", children: _jsx(Clock, { className: "w-6 h-6" }) }), _jsx("div", { className: "stat-title text-xs", children: "Status" }), _jsx("div", { className: "stat-value text-xl text-accent", children: "Confirmed" })] })] }), bookings.length === 0 ? (_jsx("div", { className: "card bg-base-100 shadow-xl mb-6", children: _jsxs("div", { className: "card-body items-center text-center py-12", children: [_jsx(Calendar, { className: "w-12 h-12 text-base-content/30 mb-3" }), _jsx("h2", { className: "card-title text-xl mb-2", children: "No booking data available" }), _jsx("p", { className: "text-base-content/70 text-sm", children: "Please contact support if you believe this is an error." })] }) })) : (_jsx("div", { className: "card bg-base-100 shadow-xl mb-6 animate-in fade-in slide-in-from-bottom duration-700", children: _jsxs("div", { className: "card-body p-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [bookings[0].experience?.coverImage && (_jsxs("div", { className: "relative flex-shrink-0", children: [_jsx("img", { src: bookings[0].experience.coverImage, alt: bookings[0].experience.title, className: "w-32 h-32 object-cover rounded-lg shadow-md" }), _jsx("div", { className: "badge badge-success absolute top-2 right-2 shadow-lg badge-sm", children: "Confirmed" })] })), _jsxs("div", { className: "flex-1", children: [_jsx("h2", { className: "text-xl font-bold mb-2", children: bookings[0].experience?.title || 'Experience' }), bookings[0].experience?.location && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-base-content/70 mb-2", children: [_jsx(MapPin, { className: "w-4 h-4 text-primary" }), _jsx("span", { children: bookings[0].experience.location })] })), _jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [_jsxs("div", { className: "badge badge-outline gap-1", children: [_jsx(CreditCard, { className: "w-3 h-3" }), "ID: ", bookings[0]._id.slice(-8)] }), _jsxs("div", { className: "badge badge-success gap-1", children: ["\u20B9", bookings[0].pricePaid] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { onClick: () => handleShare(bookings[0]), className: "btn btn-outline btn-xs gap-1", children: [_jsx(Share2, { className: "w-3 h-3" }), "Share"] }), _jsxs("button", { onClick: () => handleDownload(bookings[0]), className: "btn btn-primary btn-xs gap-1", children: [_jsx(Download, { className: "w-3 h-3" }), "Receipt"] })] })] })] }), bookings.length > 1 && (_jsxs("div", { className: "text-center text-sm text-base-content/60 mt-3", children: ["+ ", bookings.length - 1, " more ", bookings.length - 1 === 1 ? 'booking' : 'bookings'] }))] }) })), _jsxs("div", { className: "flex gap-3 justify-center animate-in fade-in slide-in-from-bottom duration-1000", children: [_jsxs(Link, { to: "/", className: "btn btn-outline gap-2", children: [_jsx(Home, { className: "w-4 h-4" }), "Back to Home"] }), _jsxs(Link, { to: "/bookings", className: "btn btn-primary gap-2", children: [_jsx(Calendar, { className: "w-4 h-4" }), "View All Bookings"] })] })] }), _jsx("style", { children: `
          @keyframes confetti {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          .animate-confetti {
            animation: confetti linear forwards;
          }
        ` })] }));
    }
    else {
        return (_jsx("div", { className: "h-screen bg-gradient-to-br from-error/5 via-base-100 to-base-200 flex items-center justify-center p-4", children: _jsx("div", { className: "card w-full max-w-md bg-base-100 shadow-2xl animate-in fade-in zoom-in duration-500", children: _jsxs("div", { className: "card-body items-center text-center", children: [_jsx("div", { className: "p-3 bg-error/10 rounded-full mb-3 animate-bounce", children: _jsx(XCircle, { className: "w-12 h-12 text-error" }) }), _jsx("h2", { className: "card-title text-2xl mb-2 text-error", children: "Booking Failed" }), _jsx("div", { className: "alert alert-error shadow-lg mb-4", children: _jsxs("div", { children: [_jsx(XCircle, { className: "w-5 h-5" }), _jsx("span", { className: "text-sm", children: state.message || 'Unknown error occurred. Please try again.' })] }) }), _jsx("p", { className: "text-base-content/70 text-sm mb-4", children: "Don't worry! Your payment has not been processed. Please try booking again or contact support if the issue persists." }), _jsxs("div", { className: "card-actions flex-col sm:flex-row w-full gap-2", children: [_jsxs(Link, { to: "/", className: "btn btn-outline gap-2 flex-1", children: [_jsx(Home, { className: "w-4 h-4" }), "Back to Home"] }), _jsx("button", { onClick: () => window.history.back(), className: "btn btn-primary gap-2 flex-1", children: "Try Again" })] }), _jsxs("div", { className: "mt-4 text-sm text-base-content/60", children: ["Need help? ", _jsx("a", { href: "/support", className: "link link-primary", children: "Contact Support" })] })] }) }) }));
    }
}
