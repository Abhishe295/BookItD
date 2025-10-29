import React from 'react';
import { Check, Clock, IndianRupee, Users, Sparkles } from 'lucide-react';
import { TimeSlot } from '../types';

export default function SlotSelector({
  slots,
  selected,
  setSelected
}: {
  slots: TimeSlot[];
  selected: string | null;
  setSelected: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {slots.map((slot, index) => {
        const isSelected = selected === slot._id;
        const isAvailable = slot.available > 0;
        const isLowStock = slot.available <= 3 && slot.available > 0;
        
        return (
          <button
            key={slot._id}
            disabled={!isAvailable}
            onClick={() => setSelected(slot._id)}
            className={`
              group w-full text-left p-4 rounded-xl border-2 
              transition-all duration-300 ease-out
              hover:shadow-lg hover:-translate-y-0.5
              ${isSelected 
                ? 'border-primary bg-primary/5 shadow-md scale-[1.02]' 
                : isAvailable
                  ? 'border-base-300 bg-base-100 hover:border-primary/50' 
                  : 'border-base-200 bg-base-200/50 cursor-not-allowed'
              }
            `}
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'slideInUp 0.4s ease-out forwards',
              opacity: 0
            }}
          >
            <style>{`
              @keyframes slideInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                {/* Date and Time */}
                <div className="flex items-center gap-2 mb-2">
                  <Clock className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-primary' : 'text-base-content/60'}`} />
                  <div className={`font-semibold text-base ${isSelected ? 'text-primary' : 'text-base-content'} truncate`}>
                    {slot.date} — {slot.time}
                  </div>
                </div>
                
                {/* Price and Availability */}
                <div className="flex items-center gap-4 text-sm">
                  <div className={`flex items-center gap-1 font-medium ${isSelected ? 'text-primary' : 'text-base-content'}`}>
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>{slot.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Users className={`w-3.5 h-3.5 ${isLowStock ? 'text-warning' : 'text-base-content/60'}`} />
                    <span className={`${isLowStock ? 'text-warning font-semibold' : 'text-base-content/70'}`}>
                      {slot.available} {slot.available === 1 ? 'slot' : 'slots'} left
                    </span>
                  </div>
                </div>
                
                {/* Low stock warning */}
                {isLowStock && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-warning animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    <span className="font-medium">Filling fast!</span>
                  </div>
                )}
              </div>
              
              {/* Selection Indicator */}
              <div className="flex-shrink-0">
                {isSelected ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-content shadow-md">
                    <Check className="w-4 h-4 animate-in zoom-in duration-300" />
                    <span className="text-sm font-semibold">Selected</span>
                  </div>
                ) : isAvailable ? (
                  <div className="px-3 py-1.5 rounded-full border-2 border-base-300 text-base-content/50 group-hover:border-primary group-hover:text-primary transition-colors duration-300">
                    <span className="text-sm font-medium">Select</span>
                  </div>
                ) : (
                  <div className="px-3 py-1.5 rounded-full bg-base-200 text-base-content/40">
                    <span className="text-sm font-medium">Sold Out</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Selected indicator line */}
            {isSelected && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl animate-in slide-in-from-left duration-300" />
            )}
            
            {/* Hover glow effect */}
            {isAvailable && !isSelected && (
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}
          </button>
        );
      })}
      
      {slots.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-base-200 mb-4">
            <Clock className="w-8 h-8 text-base-content/40" />
          </div>
          <p className="text-base-content/60 font-medium">No slots available</p>
          <p className="text-sm text-base-content/40 mt-1">Check back later for new slots</p>
        </div>
      )}
    </div>
  );
}