function AdminDashboard({ user, onViewChange }) {
  try {
    const [systemStats, setSystemStats] = React.useState({
      totalUsers: 0,
      totalStudents: 0,
      totalTeachers: 0,
      totalPlans: 0,
      activeUsers: 0,
      systemHealth: 'good'
    });
    const [recentActivity, setRecentActivity] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadSystemData();
    }, []);

    const loadSystemData = async () => {
      try {
        // 模擬載入系統資料
        setSystemStats({
          totalUsers: 156,
          totalStudents: 142,
          totalTeachers: 12,
          totalPlans: 284,
          activeUsers: 89,
          systemHealth: 'good'
        });

        setRecentActivity([
          { id: 1, type: 'login', user: '王小明', time: '2024-01-16 14:30', description: '學生登入系統' },
          { id: 2, type: 'plan_created', user: '李小華', time: '2024-01-16 14:25', description: '建立新學習計畫' },
          { id: 3, type: 'analysis', user: 'AI系統', time: '2024-01-16 14:20', description: '完成計畫分析' },
          { id: 4, type: 'login', user: '陳老師', time: '2024-01-16 14:15', description: '教師登入系統' },
          { id: 5, type: 'plan_updated', user: '張小美', time: '2024-01-16 14:10', description: '更新學習計畫' }
        ]);
      } catch (error) {
        console.error('載入系統資料失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    const getActivityIcon = (type) => {
      switch (type) {
        case 'login': return 'icon-log-in';
        case 'plan_created': return 'icon-plus-circle';
        case 'plan_updated': return 'icon-edit';
        case 'analysis': return 'icon-brain';
        default: return 'icon-activity';
      }
    };

    if (loading) {
      return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" data-name="admin-dashboard-loading" data-file="components/AdminDashboard.js">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">載入中...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" data-name="admin-dashboard" data-file="components/AdminDashboard.js">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            系統管理儀表板
          </h1>
          <p className="text-[var(--text-secondary)]">
            監控系統狀態和用戶活動
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--primary-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-users text-xl text-[var(--primary-color)]"></div>
            </div>
            <h3 className="text-sm font-medium mb-1">總用戶數</h3>
            <p className="text-xl font-bold text-[var(--primary-color)]">{systemStats.totalUsers}</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--accent-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-graduation-cap text-xl text-[var(--accent-color)]"></div>
            </div>
            <h3 className="text-sm font-medium mb-1">學生數量</h3>
            <p className="text-xl font-bold text-[var(--accent-color)]">{systemStats.totalStudents}</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--warning-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-user-check text-xl text-[var(--warning-color)]"></div>
            </div>
            <h3 className="text-sm font-medium mb-1">教師數量</h3>
            <p className="text-xl font-bold text-[var(--warning-color)]">{systemStats.totalTeachers}</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--secondary-color)] rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-file-text text-xl text-[var(--primary-color)]"></div>
            </div>
            <h3 className="text-sm font-medium mb-1">學習計畫</h3>
            <p className="text-xl font-bold text-[var(--primary-color)]">{systemStats.totalPlans}</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--success-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-activity text-xl text-[var(--success-color)]"></div>
            </div>
            <h3 className="text-sm font-medium mb-1">活躍用戶</h3>
            <p className="text-xl font-bold text-[var(--success-color)]">{systemStats.activeUsers}</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--success-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-shield-check text-xl text-[var(--success-color)]"></div>
            </div>
            <h3 className="text-sm font-medium mb-1">系統狀態</h3>
            <p className="text-sm font-bold text-[var(--success-color)]">正常</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">最近活動</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <div className={`${getActivityIcon(activity.type)} text-sm text-[var(--primary-color)]`}></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{activity.description}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">快速操作</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-lg border border-[var(--border-color)] hover:bg-gray-50 text-center">
                <div className="w-8 h-8 bg-[var(--primary-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="icon-user-plus text-lg text-[var(--primary-color)]"></div>
                </div>
                <p className="text-sm font-medium">新增用戶</p>
              </button>
              
              <button className="p-4 rounded-lg border border-[var(--border-color)] hover:bg-gray-50 text-center">
                <div className="w-8 h-8 bg-[var(--accent-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="icon-settings text-lg text-[var(--accent-color)]"></div>
                </div>
                <p className="text-sm font-medium">系統設定</p>
              </button>
              
              <button className="p-4 rounded-lg border border-[var(--border-color)] hover:bg-gray-50 text-center">
                <div className="w-8 h-8 bg-[var(--warning-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="icon-download text-lg text-[var(--warning-color)]"></div>
                </div>
                <p className="text-sm font-medium">匯出資料</p>
              </button>
              
              <button className="p-4 rounded-lg border border-[var(--border-color)] hover:bg-gray-50 text-center">
                <div className="w-8 h-8 bg-[var(--error-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="icon-bar-chart text-lg text-[var(--error-color)]"></div>
                </div>
                <p className="text-sm font-medium">分析報告</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminDashboard component error:', error);
    return null;
  }
}