// ============================================================
// auth.js — AI 認知學習應用認證 帳號管理系統
// ============================================================

const ACCOUNTS_KEY = 'ai_cert_accounts_v1';
const SESSION_KEY  = 'ai_cert_session';
const SCORES_KEY   = 'ai_cert_scores_v1';

// ── 預設帳號 ─────────────────────────────────────────────
const DEFAULT_ACCOUNTS = {
  'Aa@0981737608': { password: 'Aa@0981737608', role: 'admin', displayName: '系統管理員' },
  's211262@ms.cshs.tc.edu.tw': { password: 's211262', role: 'student', displayName: 's211262', assignedTeacher: null },
  's211052@ms.cshs.tc.edu.tw': { password: 's211052', role: 'student', displayName: 's211052', assignedTeacher: null },
  's211388@ms.cshs.tc.edu.tw': { password: 's211388', role: 'student', displayName: 's211388', assignedTeacher: null },
  's211279@ms.cshs.tc.edu.tw': { password: 's211279', role: 'student', displayName: 's211279', assignedTeacher: null },
  's211280@ms.cshs.tc.edu.tw': { password: 's211280', role: 'student', displayName: 's211280', assignedTeacher: null },
  's211029@ms.cshs.tc.edu.tw': { password: 's211029', role: 'student', displayName: 's211029', assignedTeacher: null },
  's211407@ms.cshs.tc.edu.tw': { password: 's211407', role: 'student', displayName: 's211407', assignedTeacher: null },
  's211149@ms.cshs.tc.edu.tw': { password: 's211149', role: 'student', displayName: 's211149', assignedTeacher: null },
  's211186@ms.cshs.tc.edu.tw': { password: 's211186', role: 'student', displayName: 's211186', assignedTeacher: null },
  's211367@ms.cshs.tc.edu.tw': { password: 's211367', role: 'student', displayName: 's211367', assignedTeacher: null },
  's211197@ms.cshs.tc.edu.tw': { password: 's211197', role: 'student', displayName: 's211197', assignedTeacher: null },
  's211188@ms.cshs.tc.edu.tw': { password: 's211188', role: 'student', displayName: 's211188', assignedTeacher: null },
  's211250@ms.cshs.tc.edu.tw': { password: 's211250', role: 'student', displayName: 's211250', assignedTeacher: null },
  's211102@ms.cshs.tc.edu.tw': { password: 's211102', role: 'student', displayName: 's211102', assignedTeacher: null },
  's211391@ms.cshs.tc.edu.tw': { password: 's211391', role: 'student', displayName: 's211391', assignedTeacher: null },
  's211422@ms.cshs.tc.edu.tw': { password: 's211422', role: 'student', displayName: 's211422', assignedTeacher: null },
  's211067@ms.cshs.tc.edu.tw': { password: 's211067', role: 'student', displayName: 's211067', assignedTeacher: null },
  's211081@ms.cshs.tc.edu.tw': { password: 's211081', role: 'student', displayName: 's211081', assignedTeacher: null },
  's211032@ms.cshs.tc.edu.tw': { password: 's211032', role: 'student', displayName: 's211032', assignedTeacher: null },
  's211078@ms.cshs.tc.edu.tw': { password: 's211078', role: 'student', displayName: 's211078', assignedTeacher: null },
  's211289@ms.cshs.tc.edu.tw': { password: 's211289', role: 'student', displayName: 's211289', assignedTeacher: null },
  's211059@ms.cshs.tc.edu.tw': { password: 's211059', role: 'student', displayName: 's211059', assignedTeacher: null },
  's211336@ms.cshs.tc.edu.tw': { password: 's211336', role: 'student', displayName: 's211336', assignedTeacher: null },
  's211194@ms.cshs.tc.edu.tw': { password: 's211194', role: 'student', displayName: 's211194', assignedTeacher: null },
  's211224@ms.cshs.tc.edu.tw': { password: 's211224', role: 'student', displayName: 's211224', assignedTeacher: null },
  's111172@ms.cshs.tc.edu.tw': { password: 's111172', role: 'student', displayName: 's111172', assignedTeacher: null },
  's211028@ms.cshs.tc.edu.tw': { password: 's211028', role: 'student', displayName: 's211028', assignedTeacher: null },
  's211258@ms.cshs.tc.edu.tw': { password: 's211258', role: 'student', displayName: 's211258', assignedTeacher: null },
  's211096@ms.cshs.tc.edu.tw': { password: 's211096', role: 'student', displayName: 's211096', assignedTeacher: null },
  'cshs211@ms.cshs.tc.edu.tw': { password: 'cshs211', role: 'teacher', displayName: 'cshs211' },
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
    const session = {
      username,
      role: account.role,
      displayName: account.displayName,
      assignedTeacher: account.assignedTeacher || null
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true, role: account.role, assignedTeacher: account.assignedTeacher || null };
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

function requireTeacher() {
  const s = getSession();
  if (!s || s.role !== 'teacher') {
    alert('需要師長權限');
    window.location.href = 'index.html';
  }
}

// ── 帳號管理（管理員用）──────────────────────────────────
// role 可以是 'student'、'teacher'、'admin'
function addAccount(username, password, displayName, role) {
  const accounts = getAccounts();
  if (accounts[username]) return { ok: false, msg: '帳號已存在' };
  const r = role || 'student';
  accounts[username] = {
    password,
    role: r,
    displayName: displayName || username,
    assignedTeacher: r === 'student' ? null : undefined
  };
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
  if (username === 'Aa@0981737608') return { ok: false, msg: '無法刪除最高管理員帳號' };
  const accounts = getAccounts();
  delete accounts[username];
  saveAccounts(accounts);
  return { ok: true };
}

function listAccounts() {
  const accounts = getAccounts();
  return Object.entries(accounts).map(([username, data]) => ({ username, ...data }));
}

// ── 師長功能 ─────────────────────────────────────────────
// 取得所有師長清單
function getTeachers() {
  const accounts = getAccounts();
  return Object.entries(accounts)
    .filter(([, d]) => d.role === 'teacher')
    .map(([username, d]) => ({ username, displayName: d.displayName }));
}

// 取得某師長的所有學員
function getStudentsByTeacher(teacherUsername) {
  const accounts = getAccounts();
  const scores = getScores();
  return Object.entries(accounts)
    .filter(([, d]) => d.role === 'student' && d.assignedTeacher === teacherUsername)
    .map(([username, d]) => {
      const s = scores[username] || null;
      return {
        username,
        displayName: d.displayName,
        assignedTeacher: d.assignedTeacher,
        score: s ? s.score : null,
        pass: s ? s.pass : null,
        examDate: s ? s.date : null,
        studentName: s ? s.studentName : null
      };
    });
}

// 指派學員到師長（管理員 or 學員自選）
function assignStudentToTeacher(studentUsername, teacherUsername) {
  const accounts = getAccounts();
  if (!accounts[studentUsername]) return { ok: false, msg: '學員不存在' };
  if (accounts[studentUsername].role !== 'student') return { ok: false, msg: '只能指派學員' };
  if (teacherUsername && !accounts[teacherUsername]) return { ok: false, msg: '師長不存在' };
  accounts[studentUsername].assignedTeacher = teacherUsername || null;
  saveAccounts(accounts);
  // 同步更新 session
  const session = getSession();
  if (session && session.username === studentUsername) {
    session.assignedTeacher = teacherUsername || null;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return { ok: true };
}

// ── 考試成績 ─────────────────────────────────────────────
function getScores() {
  const s = localStorage.getItem(SCORES_KEY);
  return s ? JSON.parse(s) : {};
}

function saveScore(username, score, pass, studentName) {
  const scores = getScores();
  // 只保留最高分
  if (!scores[username] || score > scores[username].score) {
    scores[username] = {
      score,
      pass,
      studentName,
      date: new Date().toLocaleDateString('zh-TW')
    };
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
  }
}
