import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Home, Calendar, MapPin, CreditCard, Clock, Download, Share2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Result() {
  const loc = useLocation();
  const state = (loc.state as any) || {};
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
      } else {
        toast.error(state.message || 'Booking failed. Please try again.');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [state.success, state.message]);

  const handleShare = (booking: any) => {
    const text = `I just booked ${booking.experience?.title}! Booking ID: ${booking._id}`;
    navigator.clipboard.writeText(text);
    toast.success('Booking details copied to clipboard!');
  };

  const handleDownload = (booking: any) => {
    toast.success('Downloading receipt...', { icon: '📄' });
    // Add your download logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-lg font-medium text-base-content/70">Processing your booking...</p>
        </div>
      </div>
    );
  }

  if (state.success) {
    return (
      <div className="h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 relative overflow-hidden flex items-center justify-center">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Sparkles className="w-4 h-4 text-primary" style={{ opacity: Math.random() }} />
              </div>
            ))}
          </div>
        )}

        <div className="container mx-auto px-4 max-w-5xl">
          {/* Success Header */}
          <div className="text-center mb-6 animate-in fade-in slide-in-from-top duration-500">
            <div className="inline-block p-3 bg-success/10 rounded-full mb-3 animate-bounce">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
              Booking Confirmed! 🎉
            </h1>
            <p className="text-base-content/70">
              Your adventure awaits! Check your email for confirmation details.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="stat bg-base-100 shadow-lg rounded-box p-3">
              <div className="stat-figure text-primary">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="stat-title text-xs">Bookings</div>
              <div className="stat-value text-2xl text-primary">{bookings.length}</div>
            </div>
            <div className="stat bg-base-100 shadow-lg rounded-box p-3">
              <div className="stat-figure text-secondary">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="stat-title text-xs">Total Paid</div>
              <div className="stat-value text-2xl text-secondary">
                ₹{bookings.reduce((sum: number, b: any) => sum + (b.pricePaid || 0), 0)}
              </div>
            </div>
            <div className="stat bg-base-100 shadow-lg rounded-box p-3">
              <div className="stat-figure text-accent">
                <Clock className="w-6 h-6" />
              </div>
              <div className="stat-title text-xs">Status</div>
              <div className="stat-value text-xl text-accent">Confirmed</div>
            </div>
          </div>

          {/* Bookings Summary */}
          {bookings.length === 0 ? (
            <div className="card bg-base-100 shadow-xl mb-6">
              <div className="card-body items-center text-center py-12">
                <Calendar className="w-12 h-12 text-base-content/30 mb-3" />
                <h2 className="card-title text-xl mb-2">No booking data available</h2>
                <p className="text-base-content/70 text-sm">Please contact support if you believe this is an error.</p>
              </div>
            </div>
          ) : (
            <div className="card bg-base-100 shadow-xl mb-6 animate-in fade-in slide-in-from-bottom duration-700">
              <div className="card-body p-4">
                <div className="flex items-center gap-4">
                  {bookings[0].experience?.coverImage && (
                    <div className="relative flex-shrink-0">
                      <img
                        src={bookings[0].experience.coverImage}
                        alt={bookings[0].experience.title}
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                      />
                      <div className="badge badge-success absolute top-2 right-2 shadow-lg badge-sm">
                        Confirmed
                      </div>
                    </div>
                  )}

                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">
                      {bookings[0].experience?.title || 'Experience'}
                    </h2>

                    {bookings[0].experience?.location && (
                      <div className="flex items-center gap-2 text-sm text-base-content/70 mb-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{bookings[0].experience.location}</span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <div className="badge badge-outline gap-1">
                        <CreditCard className="w-3 h-3" />
                        ID: {bookings[0]._id.slice(-8)}
                      </div>
                      <div className="badge badge-success gap-1">
                        ₹{bookings[0].pricePaid}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShare(bookings[0])}
                        className="btn btn-outline btn-xs gap-1"
                      >
                        <Share2 className="w-3 h-3" />
                        Share
                      </button>
                      <button
                        onClick={() => handleDownload(bookings[0])}
                        className="btn btn-primary btn-xs gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Receipt
                      </button>
                    </div>
                  </div>
                </div>
                {bookings.length > 1 && (
                  <div className="text-center text-sm text-base-content/60 mt-3">
                    + {bookings.length - 1} more {bookings.length - 1 === 1 ? 'booking' : 'bookings'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex gap-3 justify-center animate-in fade-in slide-in-from-bottom duration-1000">
            <Link to="/" className="btn btn-outline gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link to="/bookings" className="btn btn-primary gap-2">
              <Calendar className="w-4 h-4" />
              View All Bookings
            </Link>
          </div>
        </div>

        <style>{`
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
        `}</style>
      </div>
    );
  } else {
    return (
      <div className="h-screen bg-gradient-to-br from-error/5 via-base-100 to-base-200 flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="card-body items-center text-center">
            {/* Error Icon */}
            <div className="p-3 bg-error/10 rounded-full mb-3 animate-bounce">
              <XCircle className="w-12 h-12 text-error" />
            </div>

            {/* Error Message */}
            <h2 className="card-title text-2xl mb-2 text-error">Booking Failed</h2>
            <div className="alert alert-error shadow-lg mb-4">
              <div>
                <XCircle className="w-5 h-5" />
                <span className="text-sm">{state.message || 'Unknown error occurred. Please try again.'}</span>
              </div>
            </div>

            {/* Help Text */}
            <p className="text-base-content/70 text-sm mb-4">
              Don't worry! Your payment has not been processed. Please try booking again or contact support if the issue persists.
            </p>

            {/* Actions */}
            <div className="card-actions flex-col sm:flex-row w-full gap-2">
              <Link to="/" className="btn btn-outline gap-2 flex-1">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
              <button 
                onClick={() => window.history.back()} 
                className="btn btn-primary gap-2 flex-1"
              >
                Try Again
              </button>
            </div>

            {/* Support Link */}
            <div className="mt-4 text-sm text-base-content/60">
              Need help? <a href="/support" className="link link-primary">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}