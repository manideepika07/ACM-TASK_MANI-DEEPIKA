const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const filterCategory = document.getElementById('filter-category');
const totalExpenses = document.getElementById('total-expenses');


let expenses = JSON.parse(localStorage.getItem('expenses')) || [];


function updateUI() {
  expenseList.innerHTML = '';
  const selectedCategory = filterCategory.value;

  let total = 0;
  expenses.forEach((expense, index) => {
    if (selectedCategory === 'all' || expense.category === selectedCategory) {
      total += Number(expense.amount);

      const li = document.createElement('li');
      li.innerHTML = `
        $${expense.amount} - ${expense.category} - ${expense.description}
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      expenseList.appendChild(li);
    }
  });

  totalExpenses.textContent = total;


  const categories = [...new Set(expenses.map(exp => exp.category))];
  filterCategory.innerHTML = '<option value="all">All</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    if (category === selectedCategory) option.selected = true;
    filterCategory.appendChild(option);
  });
}

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;

  expenses.push({ amount, category, description });
  localStorage.setItem('expenses', JSON.stringify(expenses));

  updateUI();
  expenseForm.reset();
});


expenseList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.getAttribute('data-index');
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateUI();
  }
});

filterCategory.addEventListener('change', updateUI);


updateUI();