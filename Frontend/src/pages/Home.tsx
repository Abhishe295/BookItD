import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { Experience } from '../types';
import Loading from '../components/Loading';
import ExperienceCard from '../components/ExperienceCard';
import { Search, Filter, SlidersHorizontal, Grid3x3, List, TrendingUp, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Home() {
  const [exps, setExps] = useState<Experience[]>([]);
  const [filteredExps, setFilteredExps] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'name'>('recent');

  useEffect(() => {
    api.get('/experiences')
      .then(res => {
        const data = res.data.data || [];
        setExps(data);
        setFilteredExps(data);
        toast.success(`Loaded ${data.length} experiences`);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load experiences');
        toast.error('Failed to load experiences');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...exps];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(exp => 
        exp.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'name') {
      filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }

    setFilteredExps(filtered);
  }, [searchQuery, sortBy, exps]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSortBy('recent');
    toast.success('Filters cleared');
  };

  if (loading) return <Loading />;
  if (error) return (
    <div className="alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Discover Experiences
          </h1>
          <p className="text-base-content/70 mt-1">
            Explore {exps.length} amazing {exps.length === 1 ? 'experience' : 'experiences'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-2">
          <div className="stat bg-base-200 rounded-lg shadow-sm p-3 min-w-[100px]">
            <div className="stat-title text-xs">Total</div>
            <div className="stat-value text-2xl">{exps.length}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg shadow-sm p-3 min-w-[100px]">
            <div className="stat-title text-xs">Showing</div>
            <div className="stat-value text-2xl">{filteredExps.length}</div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body p-4">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            {/* Search Input */}
            <div className="form-control flex-1">
              <label className="input input-bordered flex items-center gap-2">
                <Search className="w-5 h-5 opacity-70" />
                <input
                  type="text"
                  placeholder="Search experiences by title, description, or location..."
                  className="grow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="btn btn-sm btn-circle btn-ghost"
                    onClick={() => setSearchQuery('')}
                  >
                    ✕
                  </button>
                )}
              </label>
            </div>

            {/* Sort Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-outline gap-2 h-12">
                <SlidersHorizontal className="w-4 h-4" />
                Sort: {sortBy === 'recent' ? 'Recent' : sortBy === 'popular' ? 'Popular' : 'Name'}
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2">
                <li>
                  <a onClick={() => setSortBy('recent')} className={sortBy === 'recent' ? 'active' : ''}>
                    <Clock className="w-4 h-4" />
                    Most Recent
                  </a>
                </li>
                <li>
                  <a onClick={() => setSortBy('popular')} className={sortBy === 'popular' ? 'active' : ''}>
                    <TrendingUp className="w-4 h-4" />
                    Most Popular
                  </a>
                </li>
                <li>
                  <a onClick={() => setSortBy('name')} className={sortBy === 'name' ? 'active' : ''}>
                    <Filter className="w-4 h-4" />
                    Alphabetical
                  </a>
                </li>
              </ul>
            </div>

            {/* View Mode Toggle */}
            <div className="btn-group">
              <button
                className={`btn h-12 ${viewMode === 'grid' ? 'btn-active' : 'btn-outline'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                className={`btn h-12 ${viewMode === 'list' ? 'btn-active' : 'btn-outline'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Clear Filters */}
            {(searchQuery || sortBy !== 'recent') && (
              <button 
                className="btn btn-ghost gap-2 h-12"
                onClick={handleClearFilters}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Info */}
      {searchQuery && (
        <div className="alert alert-info shadow-sm">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            <span>
              Found {filteredExps.length} {filteredExps.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </span>
          </div>
        </div>
      )}

      {/* Experiences Grid/List */}
      {filteredExps.length === 0 ? (
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body items-center text-center py-16">
            <MapPin className="w-16 h-16 text-base-content/30 mb-4" />
            <h2 className="card-title text-2xl mb-2">No experiences found</h2>
            <p className="text-base-content/70">
              {searchQuery 
                ? 'Try adjusting your search terms or filters'
                : 'No experiences available at the moment'}
            </p>
            {(searchQuery || sortBy !== 'recent') && (
              <button className="btn btn-primary mt-4" onClick={handleClearFilters}>
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col gap-4'
        }>
          {filteredExps.map(e => (
            <div
              key={e._id}
              className="transform transition-all duration-200 hover:scale-[1.02]"
            >
              <ExperienceCard exp={e} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}