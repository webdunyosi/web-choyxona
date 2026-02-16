import waitersData from './waitersData.json';

export const waiters = waitersData;

export const getWaiterById = (waiterId) => {
  return waiters.find(w => w.id === waiterId) || null;
};

export const getWaiterFullName = (waiter) => {
  if (!waiter) return '';
  return `${waiter.firstName} ${waiter.lastName}`;
};
