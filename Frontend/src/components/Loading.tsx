import { Loader2, Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative">
        {/* Spinning outer ring */}
        <div className="absolute inset-0 animate-spin">
          <Loader2 className="w-16 h-16 text-primary opacity-30" />
        </div>
        
        {/* Pulsing inner icon */}
        <div className="relative animate-pulse">
          <Sparkles className="w-16 h-16 text-primary" />
        </div>
        
        {/* Animated dots backdrop */}
        <div className="absolute -inset-8 opacity-20">
          <div className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '0ms', animationDuration: '1.5s' }}></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '300ms', animationDuration: '1.5s' }}></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-accent rounded-full animate-ping" style={{ animationDelay: '600ms', animationDuration: '1.5s' }}></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '900ms', animationDuration: '1.5s' }}></div>
        </div>
      </div>
      
      {/* Loading text with gradient animation */}
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
          Loading
        </h3>
        <div className="flex gap-1 justify-center mt-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-64 mt-6">
        <progress className="progress progress-primary w-full"></progress>
      </div>
    </div>
  );
}