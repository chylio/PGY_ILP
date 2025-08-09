class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center card max-w-md">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">系統發生錯誤</h1>
            <p className="text-gray-600 mb-4">
              很抱歉，應用程式遇到了未預期的錯誤。請嘗試重新載入頁面。
            </p>
            <div className="space-y-2">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary w-full"
              >
                重新載入頁面
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="btn-secondary w-full text-sm"
              >
                清除資料並重新載入
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  錯誤詳情 (開發模式)
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 text-xs text-red-600 rounded overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentView, setCurrentView] = React.useState('login');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      // 檢查本地儲存的登入狀態
      const savedUser = AuthService.getCurrentUser();
      if (savedUser) {
        setCurrentUser(savedUser);
        setCurrentView(savedUser.role === 'student' ? 'dashboard' : 'teacher-dashboard');
      }
      setLoading(false);
    }, []);

    const handleLogin = (user) => {
      setCurrentUser(user);
      if (user.role === 'student') {
        setCurrentView('dashboard');
      } else if (user.role === 'teacher') {
        setCurrentView('teacher-dashboard');
      } else if (user.role === 'admin') {
        setCurrentView('admin-dashboard');
      }
    };

    const handleLogout = () => {
      AuthService.logout();
      setCurrentUser(null);
      setCurrentView('login');
    };

    const handleViewChange = (view) => {
      setCurrentView(view);
    };

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center" data-name="loading" data-file="app.js">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">載入中...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50" data-name="app" data-file="app.js">
        {currentUser && (
          <Navigation 
            user={currentUser} 
            currentView={currentView}
            onViewChange={handleViewChange}
            onLogout={handleLogout}
          />
        )}
        
        <main className={currentUser ? "pt-16" : ""}>
          {currentView === 'login' && (
            <LoginForm onLogin={handleLogin} />
          )}
          
          {currentView === 'dashboard' && currentUser?.role === 'student' && (
            <StudentDashboard 
              user={currentUser} 
              onViewChange={handleViewChange}
            />
          )}
          
          {currentView === 'teacher-dashboard' && currentUser?.role === 'teacher' && (
            <TeacherDashboard 
              user={currentUser} 
              onViewChange={handleViewChange}
            />
          )}
          
          {currentView === 'admin-dashboard' && currentUser?.role === 'admin' && (
            <AdminDashboard 
              user={currentUser} 
              onViewChange={handleViewChange}
            />
          )}
          
          {currentView === 'ilp-form' && (
            <ILPForm 
              user={currentUser}
              onSubmit={() => handleViewChange('analysis')}
              onBack={() => handleViewChange('dashboard')}
            />
          )}
          
          {currentView === 'analysis' && (
            <AnalysisView 
              user={currentUser}
              onBack={() => handleViewChange('dashboard')}
            />
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);