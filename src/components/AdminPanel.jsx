import React, { useMemo, useState } from 'react';

export default function AdminPanel({ products, onAddProduct, onDeleteProduct }) {
  const [form, setForm] = useState({ name: '', category: 'Fruits', price: '', emoji: '🛒' });
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return products;
    return products.filter(p => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
  }, [products, search]);

  const submit = (e) => {
    e.preventDefault();
    const priceNum = parseFloat(form.price);
    if (!form.name || Number.isNaN(priceNum)) return;
    onAddProduct({
      name: form.name,
      category: form.category,
      price: priceNum,
      emoji: form.emoji || '🛒',
    });
    setForm({ name: '', category: 'Fruits', price: '', emoji: '🛒' });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Add new product</h3>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Banana"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Fruits</option>
                <option>Vegetables</option>
                <option>Dairy</option>
                <option>Bakery</option>
                <option>Snacks</option>
                <option>Beverages</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.99"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
            <input
              value={form.emoji}
              onChange={(e) => setForm({ ...form, emoji: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="🍎"
            />
          </div>
          <button type="submit" className="w-full py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700">Add product</button>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Products</h3>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="divide-y divide-gray-100 max-h-[420px] overflow-auto">
          {filtered.map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <div className="font-medium text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.category} · ${p.price.toFixed(2)}</div>
                </div>
              </div>
              <button
                onClick={() => onDeleteProduct(p.id)}
                className="text-sm px-2.5 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-500">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
