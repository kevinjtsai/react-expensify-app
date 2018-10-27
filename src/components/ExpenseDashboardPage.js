import React from 'react';
import ExpenseSummary from './ExpensesSummary';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = () => (
    <div>
      <ExpenseSummary />
      <ExpenseListFilters />
      <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;