// Waiters data
export const waiters = [
  { id: 1, firstName: "Alimardon", lastName: "Toshpo'latov", image: "/ofitsiant/1.png" },
  { id: 2, firstName: "Dilnoza", lastName: "Karimova", image: "/ofitsiant/2.png" },
  { id: 3, firstName: "Farangiz", lastName: "Toshpo'latova", image: "/ofitsiant/3.png" },
  { id: 4, firstName: "Shahzod", lastName: "Abdullayev", image: "/ofitsiant/4.png" },
  { id: 5, firstName: "Sevara", lastName: "Yo'ldosheva", image: "/ofitsiant/5.png" },
  { id: 6, firstName: "Shahzod", lastName: "Abdullayev", image: "/ofitsiant/6.png" },
  { id: 7, firstName: "Gulnora", lastName: "Sharipova", image: "/ofitsiant/7.png" },
];

export const getWaiterById = (waiterId) => {
  return waiters.find(w => w.id === waiterId) || null;
};

export const getWaiterFullName = (waiter) => {
  if (!waiter) return '';
  return `${waiter.firstName} ${waiter.lastName}`;
};