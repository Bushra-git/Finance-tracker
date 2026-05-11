import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { transactionAPI } from '../api/index';

const TransactionForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    description: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await transactionAPI.createTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      toast.success('Transaction added successfully!');
      setFormData({ type: 'expense', description: '', amount: '' });
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
            <div className="flex gap-2">
              {['income', 'expense'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, type }))}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    formData.type === type
                      ? type === 'income'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.amount ? 'border-rose-500' : 'border-slate-300'
              }`}
            />
            {errors.amount && <p className="text-rose-500 text-sm mt-1">{errors.amount}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.description ? 'border-rose-500' : 'border-slate-300'
            }`}
          />
          {errors.description && <p className="text-rose-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
