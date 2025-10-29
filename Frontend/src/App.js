import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import Result from './pages/Result';
export default function App() {
    return (_jsxs("div", { className: "min-h-screen", "data-theme": "night", children: [_jsx(Navbar, {}), _jsx("main", { className: "container mx-auto p-4", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/experiences/:id", element: _jsx(Details, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(Checkout, {}) }), _jsx(Route, { path: "/result", element: _jsx(Result, {}) })] }) })] }));
}
