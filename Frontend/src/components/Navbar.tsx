import { Link } from 'react-router-dom';
import { Palette, Home, Calendar } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="flex-1">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 active:scale-95"
          >
            BookIt
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex-none flex items-center gap-3">
          {/* Home Button */}
          {/* <Link 
            to="/" 
            className="btn btn-ghost btn-circle btn-md hover:bg-base-200 transition-all duration-300 active:scale-90"
          >
            <Home className="w-5 h-5" />
          </Link> */}

          {/* Theme Toggle Palette */}
          {/* <button 
            className="btn btn-ghost btn-circle btn-md hover:bg-base-200 transition-all duration-300 active:scale-90 group"
          >
            <Palette className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button> */}

          {/* User Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <label 
              tabIndex={0} 
              className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/30 transition-all duration-300 active:scale-90"
            >
              <div className="w-9 h-9 rounded-full ring-1 ring-primary/20">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="User Avatar" />
              </div>
            </label>
            <ul 
              tabIndex={0} 
              className="menu dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-48 z-[1] border border-base-300"
            >
              <li>
                <Link 
                  to="/result" 
                  className="gap-3 py-3 hover:bg-base-200 transition-all duration-200 active:scale-95"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">My Bookings</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}