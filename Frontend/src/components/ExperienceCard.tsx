import { Experience } from '../types/index';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Users, ArrowRight, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ExperienceCard({ exp }: { exp: Experience }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.origin + `/experiences/${exp._id}`);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
      {/* Image Container with Overlay */}
      <figure className="relative h-52 overflow-hidden">
        <img 
          src={imageError ? 'https://via.placeholder.com/400x300?text=Experience' : (exp.coverImage || 'https://via.placeholder.com/400x300')} 
          alt={exp.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
          <button 
            onClick={handleLike}
            className={`btn btn-circle btn-sm ${isLiked ? 'btn-error' : 'btn-ghost bg-white/90 hover:bg-white'}`}
            aria-label="Like"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleShare}
            className="btn btn-circle btn-sm btn-ghost bg-white/90 hover:bg-white"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Rating Badge */}
        {exp.rating && (
          <div className="absolute top-3 left-3 badge badge-warning gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            <span className="font-semibold">{exp.rating}</span>
          </div>
        )}

        {/* Category Badge */}
        {exp.category && (
          <div className="absolute bottom-3 left-3 badge badge-primary badge-lg shadow-lg">
            {exp.category}
          </div>
        )}
      </figure>

      <div className="card-body p-5">
        {/* Title */}
        <h2 className="card-title text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {exp.title}
          {exp.featured && <div className="badge badge-secondary">Featured</div>}
        </h2>

        {/* Description */}
        <p className="text-sm text-base-content/70 line-clamp-2 flex-grow">
          {exp.shortDescription || exp.description || 'No description available'}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {exp.location && (
            <div className="flex items-center gap-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="truncate text-base-content/70">{exp.location}</span>
            </div>
          )}
          
          {exp.duration && (
            <div className="flex items-center gap-1.5 text-xs">
              <Clock className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
              <span className="text-base-content/70">{exp.duration}</span>
            </div>
          )}
          
          {exp.groupSize && (
            <div className="flex items-center gap-1.5 text-xs">
              <Users className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="text-base-content/70">{exp.groupSize} people</span>
            </div>
          )}
          
          {exp.price && (
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-success">₹{exp.price}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="divider my-2"></div>

        {/* Footer Actions */}
        <div className="card-actions justify-between items-center">
          {/* Availability Status */}
          {exp.availability !== undefined && (
            <div className={`badge ${exp.availability ? 'badge-success' : 'badge-error'} badge-sm gap-1`}>
              <div className={`w-1.5 h-1.5 rounded-full ${exp.availability ? 'bg-success-content' : 'bg-error-content'}`}></div>
              {exp.availability ? 'Available' : 'Sold Out'}
            </div>
          )}
          
          <div className="flex-grow"></div>

          {/* View Details Button */}
          <Link 
            to={`/experiences/${exp._id}`} 
            className="btn btn-primary btn-sm gap-2 group/btn"
          >
            View Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}