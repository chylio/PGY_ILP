function StudentDashboard({ user, onViewChange }) {
  try {
    const [ilpPlans, setIlpPlans] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadILPPlans();
    }, []);

    const loadILPPlans = async () => {
      try {
        const plans = await StorageService.getILPPlans(user.id);
        setIlpPlans(plans);
      } catch (error) {
        console.error('載入學習計畫失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('zh-TW');
    };

    if (loading) {
      return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" data-name="student-dashboard-loading" data-file="components/StudentDashboard.js">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">載入中...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" data-name="student-dashboard" data-file="components/StudentDashboard.js">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            歡迎回來，{user.name}
          </h1>
          <p className="text-[var(--text-secondary)]">
            管理您的個人化學習計畫
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--primary-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-target text-xl text-[var(--primary-color)]"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">學習計畫</h3>
            <p className="text-2xl font-bold text-[var(--primary-color)]">{ilpPlans.length}</p>
            <p className="text-sm text-[var(--text-secondary)]">已建立計畫</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--accent-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-check-circle text-xl text-[var(--accent-color)]"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">完成率</h3>
            <p className="text-2xl font-bold text-[var(--accent-color)]">
              {ilpPlans.length > 0 ? Math.round((ilpPlans.filter(p => p.status === 'completed').length / ilpPlans.length) * 100) : 0}%
            </p>
            <p className="text-sm text-[var(--text-secondary)]">計畫達成率</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--warning-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-brain text-xl text-[var(--warning-color)]"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI 分析</h3>
            <p className="text-2xl font-bold text-[var(--warning-color)]">
              {ilpPlans.filter(p => p.aiAnalysis).length}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">已分析計畫</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">我的學習計畫</h2>
          <button
            onClick={() => onViewChange('ilp-form')}
            className="btn-primary"
          >
            <div className="icon-plus text-sm mr-2"></div>
            新增計畫
          </button>
        </div>

        {ilpPlans.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-file-text text-2xl text-gray-400"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">還沒有學習計畫</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              開始建立您的第一個個人化學習計畫
            </p>
            <button
              onClick={() => onViewChange('ilp-form')}
              className="btn-primary"
            >
              建立計畫
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ilpPlans.map((plan) => (
              <div key={plan.id} className="card hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {plan.learningGoal || '學習計畫'}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    plan.status === 'completed' ? 'bg-[var(--success-color)] bg-opacity-10 text-[var(--success-color)]' :
                    plan.status === 'in-progress' ? 'bg-[var(--warning-color)] bg-opacity-10 text-[var(--warning-color)]' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.status === 'completed' ? '已完成' : 
                     plan.status === 'in-progress' ? '進行中' : '草稿'}
                  </span>
                </div>
                
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {plan.motivation || '尚未填寫學習動機'}
                </p>
                
                <div className="flex justify-between items-center text-xs text-[var(--text-secondary)]">
                  <span>建立日期：{formatDate(plan.createdAt)}</span>
                  {plan.aiAnalysis && (
                    <span className="text-[var(--accent-color)]">已分析</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('StudentDashboard component error:', error);
    return null;
  }
}