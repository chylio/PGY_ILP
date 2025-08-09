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
        const user = await AuthService.login(formData);
        onLogin(user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
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
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                身份
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="student">學生</option>
                <option value="teacher">教師</option>
                <option value="admin">管理者</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                帳號
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="input-field"
                placeholder="請輸入帳號"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                密碼
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
                placeholder="請輸入密碼"
                required
              />
            </div>
            
            {error && (
              <div className="text-[var(--error-color)] text-sm text-center">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? '登入中...' : '登入'}
            </button>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LoginForm component error:', error);
    return null;
  }
}