function LoginForm({ onLogin }) {
  try {
    const [formData, setFormData] = React.useState({
      username: '',
      password: '',
      role: 'student'
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
        // 前端驗證
        validateForm();
        
        const user = await AuthService.login(formData);
        onLogin(user);
      } catch (err) {
        setError(err.message || '登入失敗，請稍後重試');
      } finally {
        setLoading(false);
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value.trim() // 自動去除前後空白
      });
      
      // 清除錯誤訊息
      if (error) {
        setError('');
      }
    };

    const validateForm = () => {
      if (!formData.username || formData.username.length < 3) {
        throw new Error('帳號至少需要 3 個字元');
      }
      
      if (!formData.password || formData.password.length < 6) {
        throw new Error('密碼至少需要 6 個字元');
      }
      
      if (!formData.role) {
        throw new Error('請選擇身份');
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" data-name="login-form" data-file="components/LoginForm.js">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gradient mb-2">ILP 學習平台</h2>
            <p className="text-[var(--text-secondary)]">個人化學習計畫管理系統</p>
          </div>
          
          <form className="card space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                身份
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="input-field"
                aria-describedby="role-help"
                required
              >
                <option value="student">學生</option>
                <option value="teacher">教師</option>
                <option value="admin">管理者</option>
              </select>
              <p id="role-help" className="mt-1 text-xs text-[var(--text-secondary)]">
                請選擇您的身份角色
              </p>
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                帳號
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="input-field"
                placeholder="請輸入帳號 (至少 3 個字元)"
                aria-describedby="username-help"
                required
                minLength="3"
                autoComplete="username"
              />
              <p id="username-help" className="mt-1 text-xs text-[var(--text-secondary)]">
                帳號至少需要 3 個字元
              </p>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                密碼
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
                placeholder="請輸入密碼 (至少 6 個字元)"
                aria-describedby="password-help"
                required
                minLength="6"
                autoComplete="current-password"
              />
              <p id="password-help" className="mt-1 text-xs text-[var(--text-secondary)]">
                密碼至少需要 6 個字元
              </p>
            </div>
            </div>
            
            {error && (
              <div 
                className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-center">
                  <span className="text-red-600 mr-2">⚠️</span>
                  {error}
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              aria-describedby={loading ? "loading-status" : undefined}
            >
              {loading ? '登入中...' : '登入'}
            </button>
            
            {loading && (
              <p id="loading-status" className="sr-only">
                正在處理登入請求，請稍候
              </p>
            )}
            
            <div className="text-center text-sm text-[var(--text-secondary)] space-y-1">
              <p>測試帳號：</p>
              <p>學生: student1 / 123456</p>
              <p>教師: teacher1 / 123456</p>
              <p>管理員: admin1 / 123456</p>
            </div>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LoginForm component error:', error);
    return null;
  }
}