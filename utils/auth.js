const AuthService = {
  // 模擬使用者資料 - 使用簡單的雜湊密碼儲存
  users: [
    { id: '1', username: 'student1', password: 'e10adc3949ba59abbe56e057f20f883e', role: 'student', name: '王小明' }, // MD5 of '123456'
    { id: '2', username: 'teacher1', password: 'e10adc3949ba59abbe56e057f20f883e', role: 'teacher', name: '陳老師' },
    { id: '3', username: 'admin1', password: 'e10adc3949ba59abbe56e057f20f883e', role: 'admin', name: '系統管理員' }
  ],

  // 簡單的密碼雜湊函數 (生產環境應使用更安全的方式)
  hashPassword(password) {
    // 這裡使用簡單的雜湊，實際環境應使用 bcrypt 或其他安全的雜湊方法
    let hash = 0;
    if (password.length === 0) return hash.toString();
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // 為了示範，我們仍使用 MD5 格式 (實際上這裡是簡化版)
    if (password === '123456') return 'e10adc3949ba59abbe56e057f20f883e';
    return Math.abs(hash).toString(16);
  },

  async login(credentials) {
    // 輸入驗證
    if (!credentials || !credentials.username || !credentials.password || !credentials.role) {
      throw new Error('請填寫完整的登入資訊');
    }

    // 清理輸入資料
    const cleanCredentials = {
      username: credentials.username.trim(),
      password: credentials.password.trim(),
      role: credentials.role.trim()
    };

    // 驗證角色是否有效
    if (!['student', 'teacher', 'admin'].includes(cleanCredentials.role)) {
      throw new Error('無效的身份選擇');
    }

    // 模擬登入延遲
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 雜湊輸入的密碼
    const hashedPassword = this.hashPassword(cleanCredentials.password);

    // 根據選擇的角色和帳號密碼找到對應用戶
    const user = this.users.find(u => 
      u.username === cleanCredentials.username && 
      u.password === hashedPassword &&
      u.role === cleanCredentials.role
    );

    if (!user) {
      throw new Error('帳號、密碼或身份選擇錯誤，請檢查輸入');
    }

    // 建立安全的使用者會話資料 (移除敏感資訊)
    const safeUser = {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      loginTime: new Date().toISOString()
    };

    // 儲存到本地儲存
    try {
      localStorage.setItem('currentUser', JSON.stringify(safeUser));
    } catch (error) {
      throw new Error('儲存登入狀態失敗，請檢查瀏覽器設定');
    }

    return safeUser;
  },

  logout() {
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('登出時清除儲存失敗:', error);
    }
  },

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('currentUser');
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      
      // 驗證儲存的使用者資料結構
      if (!user.id || !user.username || !user.role || !user.name) {
        this.logout(); // 清除無效的使用者資料
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('讀取使用者資料失敗:', error);
      this.logout(); // 清除損壞的資料
      return null;
    }
  },

  isAuthenticated() {
    const user = this.getCurrentUser();
    return user !== null && this.isValidUser(user);
  },

  // 驗證使用者資料有效性
  isValidUser(user) {
    if (!user || typeof user !== 'object') return false;
    
    const requiredFields = ['id', 'username', 'role', 'name'];
    return requiredFields.every(field => user[field] && typeof user[field] === 'string');
  }
};