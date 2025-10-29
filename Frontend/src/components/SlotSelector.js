import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Clock, IndianRupee, Users, Sparkles } from 'lucide-react';
export default function SlotSelector({ slots, selected, setSelected }) {
    return (_jsxs("div", { className: "space-y-3", children: [slots.map((slot, index) => {
                const isSelected = selected === slot._id;
                const isAvailable = slot.available > 0;
                const isLowStock = slot.available <= 3 && slot.available > 0;
                return (_jsxs("button", { disabled: !isAvailable, onClick: () => setSelected(slot._id), className: `
              group w-full text-left p-4 rounded-xl border-2 
              transition-all duration-300 ease-out
              hover:shadow-lg hover:-translate-y-0.5
              ${isSelected
                        ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                        : isAvailable
                            ? 'border-base-300 bg-base-100 hover:border-primary/50'
                            : 'border-base-200 bg-base-200/50 cursor-not-allowed'}
            `, style: {
                        animationDelay: `${index * 50}ms`,
                        animation: 'slideInUp 0.4s ease-out forwards',
                        opacity: 0
                    }, children: [_jsx("style", { children: `
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
            ` }), _jsxs("div", { className: "flex justify-between items-start gap-4", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Clock, { className: `w-4 h-4 flex-shrink-0 ${isSelected ? 'text-primary' : 'text-base-content/60'}` }), _jsxs("div", { className: `font-semibold text-base ${isSelected ? 'text-primary' : 'text-base-content'} truncate`, children: [slot.date, " \u2014 ", slot.time] })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsxs("div", { className: `flex items-center gap-1 font-medium ${isSelected ? 'text-primary' : 'text-base-content'}`, children: [_jsx(IndianRupee, { className: "w-3.5 h-3.5" }), _jsx("span", { children: slot.price })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: `w-3.5 h-3.5 ${isLowStock ? 'text-warning' : 'text-base-content/60'}` }), _jsxs("span", { className: `${isLowStock ? 'text-warning font-semibold' : 'text-base-content/70'}`, children: [slot.available, " ", slot.available === 1 ? 'slot' : 'slots', " left"] })] })] }), isLowStock && (_jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-xs text-warning animate-pulse", children: [_jsx(Sparkles, { className: "w-3 h-3" }), _jsx("span", { className: "font-medium", children: "Filling fast!" })] }))] }), _jsx("div", { className: "flex-shrink-0", children: isSelected ? (_jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-content shadow-md", children: [_jsx(Check, { className: "w-4 h-4 animate-in zoom-in duration-300" }), _jsx("span", { className: "text-sm font-semibold", children: "Selected" })] })) : isAvailable ? (_jsx("div", { className: "px-3 py-1.5 rounded-full border-2 border-base-300 text-base-content/50 group-hover:border-primary group-hover:text-primary transition-colors duration-300", children: _jsx("span", { className: "text-sm font-medium", children: "Select" }) })) : (_jsx("div", { className: "px-3 py-1.5 rounded-full bg-base-200 text-base-content/40", children: _jsx("span", { className: "text-sm font-medium", children: "Sold Out" }) })) })] }), isSelected && (_jsx("div", { className: "absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl animate-in slide-in-from-left duration-300" })), isAvailable && !isSelected && (_jsx("div", { className: "absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" }))] }, slot._id));
            }), slots.length === 0 && (_jsxs("div", { className: "text-center py-12 px-4", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-base-200 mb-4", children: _jsx(Clock, { className: "w-8 h-8 text-base-content/40" }) }), _jsx("p", { className: "text-base-content/60 font-medium", children: "No slots available" }), _jsx("p", { className: "text-sm text-base-content/40 mt-1", children: "Check back later for new slots" })] }))] }));
}
