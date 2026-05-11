import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { transactionAPI } from '../api/index';
import toast from 'react-hot-toast';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    fromDate: '',
    toDate: '',
    minAmount: '',
    maxAmount: '',
    sort: 'newest',
    page: 1,
  });

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = {
        type: filters.type === 'all' ? undefined : filters.type,
        fromDate: filters.fromDate || undefined,
        toDate: filters.toDate || undefined,
        minAmount: filters.minAmount || undefined,
        maxAmount: filters.maxAmount || undefined,
        sort: filters.sort,
        page: filters.page,
        limit: 10,
      };

      const response = await transactionAPI.getTransactions(params);
      setTransactions(response.data.transactions);
      setPagination(response.data.pagination);
      setSummary(response.data.summary);
    } catch (error) {
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to page 1 on filter change
    }));
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Add Transaction Section */}
        <TransactionForm onSuccess={fetchTransactions} />

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Filters & Sort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
              <div className="flex gap-2">
                {['all', 'income', 'expense'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange('type', type)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                      filters.type === type
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Amount (High to Low)</option>
                <option value="amount-low">Amount (Low to High)</option>
              </select>
            </div>

            {/* From Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">From Date</label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">To Date</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => handleFilterChange('toDate', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Min Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Min Amount</label>
              <input
                type="number"
                value={filters.minAmount}
                onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                placeholder="0"
                step="0.01"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Max Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Max Amount</label>
              <input
                type="number"
                value={filters.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                placeholder="0"
                step="0.01"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() =>
              setFilters({
                type: 'all',
                fromDate: '',
                toDate: '',
                minAmount: '',
                maxAmount: '',
                sort: 'newest',
                page: 1,
              })
            }
            className="mt-4 px-6 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Transactions List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500"></div>
          </div>
        ) : (
          <TransactionList
            transactions={transactions}
            pagination={pagination}
            summary={summary}
            onTransactionDeleted={fetchTransactions}
            filters={filters}
          />
        )}

        {/* Pagination Controls */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, filters.page - 1))}
              disabled={filters.page === 1}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white rounded-lg transition"
            >
              Previous
            </button>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition ${
                  page === filters.page
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(pagination.pages, filters.page + 1))}
              disabled={filters.page === pagination.pages}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white rounded-lg transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
