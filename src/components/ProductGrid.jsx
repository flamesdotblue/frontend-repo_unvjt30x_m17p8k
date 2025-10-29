import React from 'react';

export default function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <div key={p.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-square bg-gradient-to-br from-green-50 to-white grid place-items-center">
            <span className="text-6xl">{p.emoji}</span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.category}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-bold">${p.price.toFixed(2)}</span>
              <button
                onClick={() => onAdd(p)}
                className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
