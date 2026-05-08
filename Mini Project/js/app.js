// ===== STORAGE HELPERS =====
const Storage = {
  getUsers: () => JSON.parse(localStorage.getItem('et_users') || '[]'),
  saveUsers: (u) => localStorage.setItem('et_users', JSON.stringify(u)),
  getCurrentUser: () => localStorage.getItem('et_current_user'),
  setCurrentUser: (u) => localStorage.setItem('et_current_user', u),
  clearCurrentUser: () => localStorage.removeItem('et_current_user'),
  getExpenses: () => JSON.parse(localStorage.getItem('et_expenses') || '{}'),
  saveExpenses: (e) => localStorage.setItem('et_expenses', JSON.stringify(e)),

  getUserExpenses(username) {
    const all = this.getExpenses();
    return all[username] || {};
  },

  saveUserExpenses(username, data) {
    const all = this.getExpenses();
    all[username] = data;
    this.saveExpenses(all);
  },

  addExpense(username, date, items) {
    const data = this.getUserExpenses(username);
    if (!data[date]) data[date] = [];
    data[date] = data[date].concat(items);
    this.saveUserExpenses(username, data);
  },

  getExpensesForDate(username, date) {
    const data = this.getUserExpenses(username);
    return data[date] || [];
  },

  getTotalForDate(username, date) {
    const items = this.getExpensesForDate(username, date);
    return items.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);
  },

  getExpensesInRange(username, startDate, endDate) {
    const data = this.getUserExpenses(username);
    const result = [];
    Object.keys(data).forEach(date => {
      if (date >= startDate && date <= endDate) {
        data[date].forEach(item => result.push({ ...item, date }));
      }
    });
    return result;
  }
};

// ===== AUTH HELPERS =====
const Auth = {
  isLoggedIn() {
    return !!Storage.getCurrentUser();
  },
  requireLogin() {
    if (!this.isLoggedIn()) {
      window.location.href = getPath('index.html');
      return false;
    }
    return true;
  },
  requireGuest() {
    if (this.isLoggedIn()) {
      window.location.href = getPath('pages/dashboard.html');
    }
  },
  logout() {
    Storage.clearCurrentUser();
    window.location.href = getPath('index.html');
  },
  getCurrentUser() {
    const uname = Storage.getCurrentUser();
    if (!uname) return null;
    return Storage.getUsers().find(u => u.username === uname) || null;
  }
};

// ===== PATH HELPER =====
function getPath(p) {
  const isInPages = window.location.pathname.includes('/pages/');
  if (isInPages) {
    if (p.startsWith('pages/')) return p.replace('pages/', '');
    if (p === 'index.html') return '../index.html';
    return p;
  }
  return p;
}

// ===== TOAST =====
function showToast(msg, type = 'info') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.innerHTML = '<span class="dot"></span><span class="msg"></span>';
    document.body.appendChild(toast);
  }
  toast.className = type;
  toast.querySelector('.msg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== DATE HELPERS =====
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function getMondayOfWeek(d = new Date()) {
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  const mon = new Date(d);
  mon.setDate(d.getDate() + diff);
  return mon.toISOString().split('T')[0];
}

function getJan1() {
  return new Date().getFullYear() + '-01-01';
}

function formatDate(str) {
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatCurrency(n) {
  return '₹' + parseFloat(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ===== CATEGORY DETECTION =====
const CATEGORIES = {
  'Food': ['food', 'lunch', 'dinner', 'breakfast', 'snack', 'restaurant', 'cafe', 'coffee', 'tea', 'biryani', 'dosa', 'idli', 'pizza', 'burger', 'eat', 'meal', 'tiffin', 'hotel', 'swiggy', 'zomato'],
  'Transport': ['uber', 'ola', 'auto', 'bus', 'train', 'metro', 'petrol', 'fuel', 'cab', 'taxi', 'travel', 'flight', 'ticket', 'transport'],
  'Shopping': ['shop', 'amazon', 'flipkart', 'clothes', 'shirt', 'dress', 'shoes', 'buy', 'purchase', 'mall', 'market'],
  'Entertainment': ['movie', 'netflix', 'spotify', 'game', 'concert', 'show', 'outing', 'fun', 'party', 'pub', 'bar'],
  'Health': ['medicine', 'doctor', 'hospital', 'pharmacy', 'gym', 'fitness', 'health', 'clinic', 'medical'],
  'Bills': ['electricity', 'water', 'rent', 'internet', 'wifi', 'mobile', 'bill', 'recharge', 'subscription', 'emi'],
  'Education': ['book', 'course', 'fee', 'tuition', 'school', 'college', 'study', 'class'],
  'Groceries': ['grocery', 'vegetables', 'fruits', 'milk', 'rice', 'dal', 'oil', 'supermarket', 'bigbasket']
};

function detectCategory(text) {
  const lower = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some(k => lower.includes(k))) return cat;
  }
  return 'Others';
}

const CATEGORY_COLORS = {
  'Food': '#fb923c',
  'Transport': '#4f9cf9',
  'Shopping': '#a78bfa',
  'Entertainment': '#f472b6',
  'Health': '#34d399',
  'Bills': '#facc15',
  'Education': '#38bdf8',
  'Groceries': '#4ade80',
  'Others': '#94a3b8'
};
