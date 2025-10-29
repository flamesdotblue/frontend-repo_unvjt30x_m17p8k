import React from 'react';

export default function CartDrawer({ open, items, onClose, onInc, onDec, onRemove, onCheckout }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-2xl p-4 flex flex-col transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button className="text-gray-500 hover:text-gray-900" onClick={onClose}>Close</button>
        </div>
        <div className="mt-4 flex-1 overflow-y-auto space-y-3">
          {items.length === 0 && (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-3 border border-gray-200 rounded-lg p-3">
              <div className="w-12 h-12 grid place-items-center rounded-md bg-green-50">{it.emoji}</div>
              <div className="flex-1">
                <div className="font-medium text-sm">{it.name}</div>
                <div className="text-xs text-gray-500">${it.price.toFixed(2)} each</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded bg-gray-100" onClick={() => onDec(it.id)}>-</button>
                <span className="w-6 text-center">{it.qty}</span>
                <button className="px-2 py-1 rounded bg-gray-100" onClick={() => onInc(it.id)}>+</button>
              </div>
              <button className="text-red-600 text-xs" onClick={() => onRemove(it.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 mt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={onCheckout}
            className="mt-3 w-full py-2.5 rounded-lg bg-green-600 text-white font-medium disabled:opacity-50"
          >
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}
