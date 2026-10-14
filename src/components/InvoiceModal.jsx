export default function InvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
        <div className="flex justify-between items-start border-b pb-3 mb-3">
          <div>
            <h3 className="text-sm font-bold text-indigo-600">GadgetStore</h3>
            <p className="text-[10px] text-gray-500">Official Order Invoice</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-bold text-gray-900">{invoice.id}</p>
            <p className="text-gray-500">{invoice.date}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
          {invoice.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs border-b border-gray-100 pb-2">
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-[10px] text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
              </div>
              <p className="font-bold text-gray-800">${(item.quantity * item.price).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between text-xs font-bold text-gray-900">
          <span>Total Paid:</span>
          <span className="text-indigo-600">₹{invoice.total.toFixed(2)}</span>
        </div>

        <div className="flex space-x-2">
          <button onClick={() => window.print()} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-xs font-medium transition">Print</button>
          <button onClick={onClose} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-xs font-medium transition">Close</button>
        </div>
      </div>
    </div>
  );
}