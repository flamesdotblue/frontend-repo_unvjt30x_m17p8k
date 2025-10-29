import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import LoginForm from './components/LoginForm.jsx';
import AdminPanel from './components/AdminPanel.jsx';

const initialProducts = [
  { id: '1', name: 'Banana', category: 'Fruits', price: 0.59, emoji: '🍌' },
  { id: '2', name: 'Apple', category: 'Fruits', price: 0.79, emoji: '🍎' },
  { id: '3', name: 'Milk', category: 'Dairy', price: 1.99, emoji: '🥛' },
  { id: '4', name: 'Bread', category: 'Bakery', price: 2.49, emoji: '🍞' },
  { id: '5', name: 'Tomato', category: 'Vegetables', price: 0.99, emoji: '🍅' },
  { id: '6', name: 'Chips', category: 'Snacks', price: 1.49, emoji: '🥔' },
];

function App() {
  const [route, setRoute] = useState('/');
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#', '') || '/';
      setRoute(h);
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setRoute(path);
  };

  // Cart helpers
  const addToCart = (product) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === product.id);
      if (existing) return c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const changeQty = (id, delta) => setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  const total = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart]);

  const handleLogin = ({ email, password }) => {
    // Demo credentials
    if (email === 'admin@shop.com' && password === 'admin123') {
      setIsAuthed(true);
      setLoginError('');
      navigate('/admin');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const addProduct = ({ name, category, price, emoji }) => {
    const id = String(Date.now());
    setProducts((p) => [{ id, name, category, price, emoji }, ...p]);
  };
  const deleteProduct = (id) => setProducts((p) => p.filter((x) => x.id !== id));

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchesCat = category === 'All' || p.category === category;
      return matchesQuery && matchesCat;
    });
  }, [products, query, category]);

  const PageHome = (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-500 text-white p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">Fresh groceries delivered to your door</h1>
          <p className="text-white/90 mb-4">Shop fresh produce, pantry staples, and daily essentials at great prices.</p>
          <div className="flex gap-3">
            <button onClick={() => navigate('/shop')} className="px-4 py-2 rounded-lg bg-white text-green-700 font-medium hover:bg-white/90">Start shopping</button>
            <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-lg bg-green-800/40 border border-white/20 font-medium">Admin login</button>
          </div>
        </div>
        <div className="text-7xl">🛒</div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Popular categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {['Fruits','Vegetables','Dairy','Bakery','Snacks','Beverages'].map((c) => (
            <button key={c} onClick={() => { setCategory(c); navigate('/shop'); }} className="px-3 py-2 rounded-xl border border-gray-200 bg-white hover:border-green-400">
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const PageShop = (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <h2 className="text-xl font-semibold">Shop</h2>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search groceries..."
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300">
            <option>All</option>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Dairy</option>
            <option>Bakery</option>
            <option>Snacks</option>
            <option>Beverages</option>
          </select>
        </div>
      </div>
      <ProductGrid products={filteredProducts} onAdd={addToCart} />
    </div>
  );

  const PageCheckout = (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>
      {cart.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <button onClick={() => navigate('/shop')} className="mt-4 px-4 py-2 rounded-lg bg-green-600 text-white">Browse products</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-5">
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => changeQty(item.id, -1)} className="px-2.5 py-1.5 rounded-lg border">-</button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} className="px-2.5 py-1.5 rounded-lg border">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="px-2.5 py-1.5 rounded-lg border border-red-300 text-red-600">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Delivery</span>
              <span>$2.00</span>
            </div>
            <div className="my-3 h-px bg-gray-100" />
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>${(total + 2).toFixed(2)}</span>
            </div>
            <button onClick={() => { alert('Order placed!'); setCart([]); navigate('/'); }} className="mt-4 w-full py-2.5 rounded-lg bg-green-600 text-white font-medium">
              Place order
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const PageAdmin = (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Admin panel</h2>
        <div className="text-sm text-gray-600">Status: <span className={`font-medium ${isAuthed ? 'text-green-600' : 'text-red-600'}`}>{isAuthed ? 'Authenticated' : 'Guest'}</span></div>
      </div>
      {!isAuthed ? (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-4">You must sign in to manage products.</div>
      ) : null}
      {isAuthed ? (
        <AdminPanel products={products} onAddProduct={addProduct} onDeleteProduct={deleteProduct} />
      ) : (
        <LoginForm onLogin={handleLogin} error={loginError} />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar route={route} cartCount={cart.reduce((n, i) => n + i.qty, 0)} onNavigate={navigate} />
      {route === '/' && PageHome}
      {route === '/shop' && PageShop}
      {route === '/checkout' && PageCheckout}
      {route === '/admin' && PageAdmin}
      {route === '/login' && (
        <div className="max-w-6xl mx-auto px-4 py-6">
          <LoginForm onLogin={handleLogin} error={loginError} />
        </div>
      )}
      <footer className="mt-12 py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} GrocerEase. Freshness delivered.</footer>
    </div>
  );
}

export default App;
