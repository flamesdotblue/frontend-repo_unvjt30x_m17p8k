import React from 'react';

export default function Navbar({ route, cartCount, onNavigate }) {
  const Link = ({ href, children }) => (
    <button
      onClick={() => onNavigate(href)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        route === href ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-600 text-white grid place-items-center font-bold">G</div>
          <span className="font-semibold text-lg">GrocerEase</span>
        </div>
        <nav className="flex items-center gap-1">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/admin">Admin</Link>
          <button
            onClick={() => onNavigate('/checkout')}
            className="ml-2 relative px-3 py-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-black"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
