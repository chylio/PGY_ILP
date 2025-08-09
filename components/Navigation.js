function Navigation({ user, currentView, onViewChange, onLogout }) {
  try {
    return (
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-[var(--border-color)] z-50" data-name="navigation" data-file="components/Navigation.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gradient">ILP 學習平台</h1>
              </div>
              
              <div className="ml-10 flex items-baseline space-x-4">
                {user?.role === 'student' && (
                  <>
                    <button
                      onClick={() => onViewChange('dashboard')}
                      className={`nav-item ${currentView === 'dashboard' ? 'nav-item-active' : 'nav-item-inactive'}`}
                    >
                      我的計畫
                    </button>
                    <button
                      onClick={() => onViewChange('analysis')}
                      className={`nav-item ${currentView === 'analysis' ? 'nav-item-active' : 'nav-item-inactive'}`}
                    >
                      分析報告
                    </button>
                  </>
                )}
                
                {user?.role === 'teacher' && (
                  <>
                    <button
                      onClick={() => onViewChange('teacher-dashboard')}
                      className={`nav-item ${currentView === 'teacher-dashboard' ? 'nav-item-active' : 'nav-item-inactive'}`}
                    >
                      學生管理
                    </button>
                    <button
                      onClick={() => onViewChange('teacher-analysis')}
                      className={`nav-item ${currentView === 'teacher-analysis' ? 'nav-item-active' : 'nav-item-inactive'}`}
                    >
                      分析統計
                    </button>
                  </>
                )}
                
                {user?.role === 'admin' && (
                  <>
                    <button
                      onClick={() => onViewChange('admin-dashboard')}
                      className={`nav-item ${currentView === 'admin-dashboard' ? 'nav-item-active' : 'nav-item-inactive'}`}
                    >
                      系統概覽
                    </button>
                    <button
                      onClick={() => onViewChange('admin-users')}
                      className={`nav-item ${currentView === 'admin-users' ? 'nav-item-active' : 'nav-item-inactive'}`}
                    >
                      用戶管理
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-[var(--text-secondary)]">
                歡迎，{user?.name}
              </span>
              <button
                onClick={onLogout}
                className="btn-secondary text-sm"
              >
                登出
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  } catch (error) {
    console.error('Navigation component error:', error);
    return null;
  }
}