import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { api } from '../api/api';
import Loading from '../components/Loading';
import ExperienceCard from '../components/ExperienceCard';
import { Search, Filter, SlidersHorizontal, Grid3x3, List, TrendingUp, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
export default function Home() {
    const [exps, setExps] = useState([]);
    const [filteredExps, setFilteredExps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('recent');
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
            filtered = filtered.filter(exp => exp.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exp.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exp.location?.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Sort
        if (sortBy === 'name') {
            filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        }
        else if (sortBy === 'popular') {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }
        else if (sortBy === 'recent') {
            filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        }
        setFilteredExps(filtered);
    }, [searchQuery, sortBy, exps]);
    const handleClearFilters = () => {
        setSearchQuery('');
        setSortBy('recent');
        toast.success('Filters cleared');
    };
    if (loading)
        return _jsx(Loading, {});
    if (error)
        return (_jsx("div", { className: "alert alert-error shadow-lg", children: _jsxs("div", { children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "stroke-current flex-shrink-0 h-6 w-6", fill: "none", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsx("span", { children: error })] }) }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Discover Experiences" }), _jsxs("p", { className: "text-base-content/70 mt-1", children: ["Explore ", exps.length, " amazing ", exps.length === 1 ? 'experience' : 'experiences'] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("div", { className: "stat bg-base-200 rounded-lg shadow-sm p-3 min-w-[100px]", children: [_jsx("div", { className: "stat-title text-xs", children: "Total" }), _jsx("div", { className: "stat-value text-2xl", children: exps.length })] }), _jsxs("div", { className: "stat bg-base-200 rounded-lg shadow-sm p-3 min-w-[100px]", children: [_jsx("div", { className: "stat-title text-xs", children: "Showing" }), _jsx("div", { className: "stat-value text-2xl", children: filteredExps.length })] })] })] }), _jsx("div", { className: "card bg-base-200 shadow-lg", children: _jsx("div", { className: "card-body p-4", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-3 lg:items-center", children: [_jsx("div", { className: "form-control flex-1", children: _jsxs("label", { className: "input input-bordered flex items-center gap-2", children: [_jsx(Search, { className: "w-5 h-5 opacity-70" }), _jsx("input", { type: "text", placeholder: "Search experiences by title, description, or location...", className: "grow", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }), searchQuery && (_jsx("button", { className: "btn btn-sm btn-circle btn-ghost", onClick: () => setSearchQuery(''), children: "\u2715" }))] }) }), _jsxs("div", { className: "dropdown dropdown-end", children: [_jsxs("label", { tabIndex: 0, className: "btn btn-outline gap-2 h-12", children: [_jsx(SlidersHorizontal, { className: "w-4 h-4" }), "Sort: ", sortBy === 'recent' ? 'Recent' : sortBy === 'popular' ? 'Popular' : 'Name'] }), _jsxs("ul", { tabIndex: 0, className: "dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2", children: [_jsx("li", { children: _jsxs("a", { onClick: () => setSortBy('recent'), className: sortBy === 'recent' ? 'active' : '', children: [_jsx(Clock, { className: "w-4 h-4" }), "Most Recent"] }) }), _jsx("li", { children: _jsxs("a", { onClick: () => setSortBy('popular'), className: sortBy === 'popular' ? 'active' : '', children: [_jsx(TrendingUp, { className: "w-4 h-4" }), "Most Popular"] }) }), _jsx("li", { children: _jsxs("a", { onClick: () => setSortBy('name'), className: sortBy === 'name' ? 'active' : '', children: [_jsx(Filter, { className: "w-4 h-4" }), "Alphabetical"] }) })] })] }), _jsxs("div", { className: "btn-group", children: [_jsx("button", { className: `btn h-12 ${viewMode === 'grid' ? 'btn-active' : 'btn-outline'}`, onClick: () => setViewMode('grid'), children: _jsx(Grid3x3, { className: "w-4 h-4" }) }), _jsx("button", { className: `btn h-12 ${viewMode === 'list' ? 'btn-active' : 'btn-outline'}`, onClick: () => setViewMode('list'), children: _jsx(List, { className: "w-4 h-4" }) })] }), (searchQuery || sortBy !== 'recent') && (_jsx("button", { className: "btn btn-ghost gap-2 h-12", onClick: handleClearFilters, children: "Clear" }))] }) }) }), searchQuery && (_jsx("div", { className: "alert alert-info shadow-sm", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Search, { className: "w-5 h-5" }), _jsxs("span", { children: ["Found ", filteredExps.length, " ", filteredExps.length === 1 ? 'result' : 'results', " for \"", searchQuery, "\""] })] }) })), filteredExps.length === 0 ? (_jsx("div", { className: "card bg-base-200 shadow-lg", children: _jsxs("div", { className: "card-body items-center text-center py-16", children: [_jsx(MapPin, { className: "w-16 h-16 text-base-content/30 mb-4" }), _jsx("h2", { className: "card-title text-2xl mb-2", children: "No experiences found" }), _jsx("p", { className: "text-base-content/70", children: searchQuery
                                ? 'Try adjusting your search terms or filters'
                                : 'No experiences available at the moment' }), (searchQuery || sortBy !== 'recent') && (_jsx("button", { className: "btn btn-primary mt-4", onClick: handleClearFilters, children: "Clear All Filters" }))] }) })) : (_jsx("div", { className: viewMode === 'grid'
                    ? 'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'flex flex-col gap-4', children: filteredExps.map(e => (_jsx("div", { className: "transform transition-all duration-200 hover:scale-[1.02]", children: _jsx(ExperienceCard, { exp: e }) }, e._id))) }))] }));
}
