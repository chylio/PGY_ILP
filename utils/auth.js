const AuthService = {
  // 模擬使用者資料
  users: [
    { id: '1', username: 'student1', password: '123456', role: 'student', name: '王小明' },
    { id: '2', username: 'teacher1', password: '123456', role: 'teacher', name: '陳老師' },
    { id: '3', username: 'admin1', password: '123456', role: 'admin', name: '系統管理員' }
  ],

  async login(credentials) {
    // 模擬登入延遲
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 根據選擇的角色和帳號密碼找到對應用戶
    const user = this.users.find(u => 
      u.username === credentials.username && 
      u.password === credentials.password &&
      u.role === credentials.role
    );

    if (!user) {
      throw new Error('帳號、密碼或身份選擇錯誤，請檢查輸入');
    }

    // 儲存到本地儲存
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }
};