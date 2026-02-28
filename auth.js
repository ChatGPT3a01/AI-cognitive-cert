// ============================================================
// auth.js — AI 認知學習應用認證 帳號管理系統
// ============================================================

const ACCOUNTS_KEY = 'ai_cert_accounts_v1';
const SESSION_KEY  = 'ai_cert_session';

// ── 預設帳號 ─────────────────────────────────────────────
const DEFAULT_ACCOUNTS = {
  'Aa': { password: 'Aa@0981737608', role: 'admin', displayName: '系統管理員' },
  's211262@ms.cshs.tc.edu.tw': { password: 's211262', role: 'student', displayName: 's211262' },
  's211052@ms.cshs.tc.edu.tw': { password: 's211052', role: 'student', displayName: 's211052' },
  's211388@ms.cshs.tc.edu.tw': { password: 's211388', role: 'student', displayName: 's211388' },
  's211279@ms.cshs.tc.edu.tw': { password: 's211279', role: 'student', displayName: 's211279' },
  's211280@ms.cshs.tc.edu.tw': { password: 's211280', role: 'student', displayName: 's211280' },
  's211029@ms.cshs.tc.edu.tw': { password: 's211029', role: 'student', displayName: 's211029' },
  's211407@ms.cshs.tc.edu.tw': { password: 's211407', role: 'student', displayName: 's211407' },
  's211149@ms.cshs.tc.edu.tw': { password: 's211149', role: 'student', displayName: 's211149' },
  's211186@ms.cshs.tc.edu.tw': { password: 's211186', role: 'student', displayName: 's211186' },
  's211367@ms.cshs.tc.edu.tw': { password: 's211367', role: 'student', displayName: 's211367' },
  's211197@ms.cshs.tc.edu.tw': { password: 's211197', role: 'student', displayName: 's211197' },
  's211188@ms.cshs.tc.edu.tw': { password: 's211188', role: 'student', displayName: 's211188' },
  's211250@ms.cshs.tc.edu.tw': { password: 's211250', role: 'student', displayName: 's211250' },
  's211102@ms.cshs.tc.edu.tw': { password: 's211102', role: 'student', displayName: 's211102' },
  's211391@ms.cshs.tc.edu.tw': { password: 's211391', role: 'student', displayName: 's211391' },
  's211422@ms.cshs.tc.edu.tw': { password: 's211422', role: 'student', displayName: 's211422' },
  's211067@ms.cshs.tc.edu.tw': { password: 's211067', role: 'student', displayName: 's211067' },
  's211081@ms.cshs.tc.edu.tw': { password: 's211081', role: 'student', displayName: 's211081' },
  's211032@ms.cshs.tc.edu.tw': { password: 's211032', role: 'student', displayName: 's211032' },
  's211078@ms.cshs.tc.edu.tw': { password: 's211078', role: 'student', displayName: 's211078' },
  's211289@ms.cshs.tc.edu.tw': { password: 's211289', role: 'student', displayName: 's211289' },
  's211059@ms.cshs.tc.edu.tw': { password: 's211059', role: 'student', displayName: 's211059' },
  's211336@ms.cshs.tc.edu.tw': { password: 's211336', role: 'student', displayName: 's211336' },
  's211194@ms.cshs.tc.edu.tw': { password: 's211194', role: 'student', displayName: 's211194' },
  's211224@ms.cshs.tc.edu.tw': { password: 's211224', role: 'student', displayName: 's211224' },
  's111172@ms.cshs.tc.edu.tw': { password: 's111172', role: 'student', displayName: 's111172' },
  's211028@ms.cshs.tc.edu.tw': { password: 's211028', role: 'student', displayName: 's211028' },
  's211258@ms.cshs.tc.edu.tw': { password: 's211258', role: 'student', displayName: 's211258' },
  's211096@ms.cshs.tc.edu.tw': { password: 's211096', role: 'student', displayName: 's211096' },
};

// ── 帳號讀寫 ─────────────────────────────────────────────
function getAccounts() {
  const saved = localStorage.getItem(ACCOUNTS_KEY);
  if (!saved) {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
    return DEFAULT_ACCOUNTS;
  }
  return JSON.parse(saved);
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

// ── 登入 / 登出 / 驗證 ───────────────────────────────────
function authLogin(username, password) {
  const accounts = getAccounts();
  const account = accounts[username.trim()];
  if (account && account.password === password.trim()) {
    const session = { username, role: account.role, displayName: account.displayName };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true, role: account.role };
  }
  return { ok: false };
}

function authLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = 'login.html';
}

function getSession() {
  const s = sessionStorage.getItem(SESSION_KEY);
  return s ? JSON.parse(s) : null;
}

function requireAuth() {
  if (!getSession()) {
    window.location.href = 'login.html';
  }
}

function requireAdmin() {
  const s = getSession();
  if (!s || s.role !== 'admin') {
    alert('需要管理員權限');
    window.location.href = 'index.html';
  }
}

// ── 帳號管理（管理員用）──────────────────────────────────
function addAccount(username, password, displayName) {
  const accounts = getAccounts();
  if (accounts[username]) return { ok: false, msg: '帳號已存在' };
  accounts[username] = { password, role: 'student', displayName: displayName || username };
  saveAccounts(accounts);
  return { ok: true };
}

function editAccount(username, newPassword, newDisplayName) {
  const accounts = getAccounts();
  if (!accounts[username]) return { ok: false, msg: '帳號不存在' };
  if (newPassword) accounts[username].password = newPassword;
  if (newDisplayName) accounts[username].displayName = newDisplayName;
  saveAccounts(accounts);
  return { ok: true };
}

function deleteAccount(username) {
  if (username === 'Aa') return { ok: false, msg: '無法刪除最高管理員帳號' };
  const accounts = getAccounts();
  delete accounts[username];
  saveAccounts(accounts);
  return { ok: true };
}

function listAccounts() {
  const accounts = getAccounts();
  return Object.entries(accounts).map(([username, data]) => ({ username, ...data }));
}
