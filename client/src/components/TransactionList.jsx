import React from 'react';
import toast from 'react-hot-toast';
import { transactionAPI } from '../api/index';

const TransactionList = ({ transactions, pagination, summary, onTransactionDeleted, filters }) => {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;

    setLoading(true);
    try {
      await transactionAPI.deleteTransaction(id);
      toast.success('Transaction deleted successfully');
      onTransactionDeleted?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete transaction');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return '₹' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
          <p className="text-emerald-700 text-sm font-medium mb-2">Total Income</p>
          <p className="text-3xl font-bold text-emerald-600">{formatCurrency(summary?.totalIncome || 0)}</p>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-6">
          <p className="text-rose-700 text-sm font-medium mb-2">Total Expense</p>
          <p className="text-3xl font-bold text-rose-600">{formatCurrency(summary?.totalExpense || 0)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
          <p className="text-blue-700 text-sm font-medium mb-2">Net Balance</p>
          <p className={`text-3xl font-bold ${summary?.netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {formatCurrency(summary?.netBalance || 0)}
          </p>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
        </div>

        {transactions && transactions.length > 0 ? (
          <div className="divide-y divide-slate-200">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="px-6 py-4 hover:bg-slate-50 transition flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        transaction.type === 'income'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {transaction.type.toUpperCase()}
                    </span>
                    <span className="text-slate-900 font-medium">{transaction.description}</span>
                  </div>
                  <p className="text-sm text-slate-500">{formatDate(transaction.date)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-lg font-bold ${
                      transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </span>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    disabled={loading}
                    className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-lg transition disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-slate-500">
            <p>No transactions found. Start by adding one!</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <p className="text-sm text-slate-600">
              Page {pagination.page} of {pagination.pages} ({pagination.total} total)
            </p>
            <div className="flex gap-2">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 rounded transition ${
                    page === pagination.page
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
