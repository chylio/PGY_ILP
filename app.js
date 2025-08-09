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
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
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