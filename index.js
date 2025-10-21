
        const tabs = document.querySelectorAll('#mainTabs .nav-link');
        const pages = document.querySelectorAll('.page');

        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            pages.forEach(p => p.classList.remove('active'));
            document.getElementById(tab.dataset.page).classList.add('active');
          });
        });

        const form = document.getElementById('transactionForm');
    const descInput = document.getElementById('desc');
    const amountInput = document.getElementById('amount');
    const typeInput = document.getElementById('type');
    const dateInput = document.getElementById('date');
    const transactionList = document.getElementById('transactionList');
    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpenseEl = document.getElementById('totalExpense');
    const balanceEl = document.getElementById('balance');
    const filterType = document.getElementById('filterType');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const desc = descInput.value.trim();
      const amount = parseFloat(amountInput.value);
      const type = typeInput.value;
      const date = dateInput.value;

      if (!desc || isNaN(amount) || amount <= 0 || !date) {
        alert('Please enter valid details.');
        return;
      }

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('#mainTabs .nav-link');
  const pages = document.querySelectorAll('.page');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      pages.forEach(p => p.classList.remove('active'));
      document.getElementById(tab.dataset.page).classList.add('active');
    });
  });

  const form = document.getElementById('transactionForm');
  const descInput = document.getElementById('desc');
  const amountInput = document.getElementById('amount');
  const typeInput = document.getElementById('type');
  const dateInput = document.getElementById('date');
  const transactionList = document.getElementById('transactionList');
  const totalIncomeEl = document.getElementById('totalIncome');
  const totalExpenseEl = document.getElementById('totalExpense');
  const balanceEl = document.getElementById('balance');
  const filterType = document.getElementById('filterType');

  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const desc = descInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;
    const date = dateInput.value;

    if (!desc || isNaN(amount) || amount <= 0 || !date) {
      alert('Please enter valid details.');
      return;
    }

    const transaction = {
      id: Date.now(),
      desc,
      amount,
      type,
      date
    };

    transactions.push(transaction);
    saveAndRender();
    form.reset();
  });

  transactionList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const id = parseInt(e.target.dataset.id);
      transactions = transactions.filter(t => t.id !== id);
      saveAndRender();
    }
  });

  filterType.addEventListener('change', renderTransactions);

  const clearBtn = document.getElementById('clearTransactions');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!confirm('Clear all transactions? This cannot be undone.')) return;
      transactions = [];
      localStorage.removeItem('transactions');
      saveAndRender();
    });
  }

  function saveAndRender() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
    updateTotals();
  }

  function renderTransactions() {
    transactionList.innerHTML = '';
    const transactionTable = document.querySelector('#transactionTable tbody');
    transactionTable.innerHTML = '';

    const selected = filterType.value;
    const filtered = selected === 'All' ? transactions :
      transactions.filter(t => t.type === selected);
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    filtered.forEach(t => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <div>
          <strong>${t.desc}</strong> <br>
          <small>${t.date}</small>
        </div>
        <div>
          <span style="color:${t.type === 'Income' ? 'green' : 'red'}">
            ${t.type === 'Income' ? '+' : '-'}₹${t.amount}
          </span>
          <button class="delete btn btn-sm btn-outline-danger ms-2" data-id="${t.id}">x</button>
        </div>
      `;
      transactionList.appendChild(li);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${t.date}</td>
        <td>${t.desc}</td>
        <td style="color:${t.type === 'Income' ? 'green' : 'red'}">${t.type}</td>
        <td>${t.type === 'Income' ? '+' : '-'}${t.amount}</td>
        <td>
          <button class="btn btn-sm btn-warning update-btn" data-id="${t.id}">✏️ Update</button>
          <button class="btn btn-sm btn-danger delete-btn" data-id="${t.id}">❌ Delete</button>
        </td>
      `;
      transactionTable.appendChild(row);
    });

    updateTotals();
  }

  function updateTotals() {
    const income = transactions.filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;

    totalIncomeEl.textContent = income.toFixed(2);
    totalExpenseEl.textContent = expense.toFixed(2);

    balanceEl.textContent = `₹${balance.toFixed(2)}`;
    if (expense > income) {
      balanceEl.style.color = 'red';
      balanceEl.textContent = `-₹${Math.abs(balance).toFixed(2)}`;
      alert("⚠️ Warning: Your expenses have exceeded your income!");
    } else {
      balanceEl.style.color = 'green';
    }
  }

  renderTransactions();
});

