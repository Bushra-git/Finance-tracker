import Transaction from '../models/Transaction.js';

export const getTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const { type, fromDate, toDate, minAmount, maxAmount, sort, page = 1, limit = 10 } = req.query;

    // Build filter
    const filter = { userId };

    if (type && type !== 'all') {
      filter.type = type;
    }

    if (fromDate || toDate) {
      filter.date = {};
      if (fromDate) filter.date.$gte = new Date(fromDate);
      if (toDate) {
        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);
        filter.date.$lte = endDate;
      }
    }

    if (minAmount || maxAmount) {
      filter.amount = {};
      if (minAmount) filter.amount.$gte = parseFloat(minAmount);
      if (maxAmount) filter.amount.$lte = parseFloat(maxAmount);
    }

    // Build sort
    let sortObj = { date: -1 }; // Default: newest first
    if (sort === 'oldest') sortObj = { date: 1 };
    if (sort === 'amount-high') sortObj = { amount: -1 };
    if (sort === 'amount-low') sortObj = { amount: 1 };

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * pageSize;

    // Get transactions
    const transactions = await Transaction.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(pageSize);

    // Get total count for pagination
    const total = await Transaction.countDocuments(filter);

    // Calculate totals
    const income = await Transaction.aggregate([
      { $match: { ...filter, type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const expense = await Transaction.aggregate([
      { $match: { ...filter, type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalIncome = income[0]?.total || 0;
    const totalExpense = expense[0]?.total || 0;
    const netBalance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      transactions,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / pageSize),
        limit: pageSize,
      },
      summary: {
        totalIncome,
        totalExpense,
        netBalance,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { type, description, amount } = req.body;
    const userId = req.userId;

    // Validation
    if (!type || !description || amount === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'Type must be income or expense' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be positive' });
    }

    const transaction = new Transaction({
      userId,
      type,
      description,
      amount,
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check if user owns the transaction
    if (transaction.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Transaction.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
