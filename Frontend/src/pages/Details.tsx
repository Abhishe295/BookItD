import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Star, Users, Sparkles, ChevronRight, AlertCircle } from 'lucide-react';
import { api } from '../api/api';
import { Experience } from '../types';
import Loading from '../components/Loading';
import SlotSelector from '../components/SlotSelector';

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const [exp, setExp] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/experiences/${id}`)
      .then(res => setExp(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  
  if (!exp) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-in fade-in duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-error/10 mb-6">
            <AlertCircle className="w-10 h-10 text-error" />
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-3">Experience Not Found</h2>
          <p className="text-base-content/60 mb-6">
            The experience you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleProceed = () => {
    navigate('/checkout', { state: { experience: exp, timeSlotId: selectedSlot } });
  };

  const selectedSlotData = exp.timeSlots?.find(slot => slot._id === selectedSlot);

  return (
    <div className="min-h-screen bg-base-200/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 py-8">
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm gap-2 mb-6 group hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="animate-in slide-in-from-bottom duration-700">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-base-content mb-2 leading-tight">
                  {exp.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
                  {exp.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                  {exp.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{exp.duration}</span>
                    </div>
                  )}
                  {exp.rating && (
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="font-semibold">{exp.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Description Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-lg animate-in slide-in-from-left duration-500">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  About This Experience
                </h2>
                <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
                  {exp.longDescription}
                </p>
              </div>
            </div>

            {/* Available Slots Section */}
            <div className="card bg-base-100 shadow-lg animate-in slide-in-from-left duration-500" style={{ animationDelay: '100ms' }}>
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-secondary rounded-full"></div>
                  <Calendar className="w-5 h-5 text-secondary" />
                  Available Time Slots
                </h2>
                
                {exp.timeSlots && exp.timeSlots.length > 0 ? (
                  <SlotSelector 
                    slots={exp.timeSlots} 
                    selected={selectedSlot} 
                    setSelected={setSelectedSlot} 
                  />
                ) : (
                  <div className="text-center py-12 px-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-base-200 mb-4">
                      <Calendar className="w-8 h-8 text-base-content/40" />
                    </div>
                    <p className="text-base-content/60 font-medium">No slots available</p>
                    <p className="text-sm text-base-content/40 mt-1">Check back later for new availability</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              {/* Selection Summary Card */}
              <div className="card bg-base-100 shadow-lg border-2 border-base-300 animate-in slide-in-from-right duration-500">
                <div className="card-body">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-accent rounded-full"></div>
                    Booking Summary
                  </h3>
                  
                  {selectedSlot && selectedSlotData ? (
                    <div className="space-y-4 animate-in zoom-in duration-300">
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-2 text-sm text-base-content/60 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>Selected Slot</span>
                        </div>
                        <p className="font-semibold text-base-content">
                          {selectedSlotData.date}
                        </p>
                        <p className="text-sm text-base-content/70">
                          {selectedSlotData.time}
                        </p>
                      </div>
                      
                      <div className="divider my-2"></div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-base-content/70">Price per person</span>
                        <span className="text-2xl font-bold text-primary">
                          ₹{selectedSlotData.price}
                        </span>
                      </div>
                      
                      {selectedSlotData.available <= 3 && (
                        <div className="alert alert-warning shadow-sm py-2">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">Only {selectedSlotData.available} spots left!</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-base-200 mb-3">
                        <Clock className="w-6 h-6 text-base-content/40" />
                      </div>
                      <p className="text-sm text-base-content/60">
                        Select a time slot to continue
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Proceed Button */}
              <button 
                disabled={!selectedSlot} 
                onClick={handleProceed} 
                className={`
                  btn btn-lg w-full gap-2 group
                  transition-all duration-300
                  ${selectedSlot 
                    ? 'btn-primary shadow-lg hover:shadow-xl hover:scale-[1.02] animate-in zoom-in duration-300' 
                    : 'btn-disabled'
                  }
                `}
              >
                <span className="text-lg font-semibold">Proceed to Checkout</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {!selectedSlot && (
                <p className="text-xs text-center text-base-content/50 animate-pulse">
                  Please select a time slot above
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}