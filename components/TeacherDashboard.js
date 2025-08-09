function TeacherDashboard({ user, onViewChange }) {
  try {
    const [students, setStudents] = React.useState([]);
    const [stats, setStats] = React.useState({
      totalStudents: 0,
      activePlans: 0,
      completedPlans: 0,
      needsReview: 0
    });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadTeacherData();
    }, []);

    const loadTeacherData = async () => {
      try {
        // 模擬載入學生資料
        const mockStudents = [
          { id: '1', name: '王小明', class: '三年一班', plansCount: 3, lastActive: '2024-01-15' },
          { id: '2', name: '李小華', class: '三年一班', plansCount: 2, lastActive: '2024-01-14' },
          { id: '3', name: '張小美', class: '三年二班', plansCount: 4, lastActive: '2024-01-16' },
          { id: '4', name: '陳小強', class: '三年二班', plansCount: 1, lastActive: '2024-01-13' }
        ];
        
        setStudents(mockStudents);
        setStats({
          totalStudents: mockStudents.length,
          activePlans: 8,
          completedPlans: 2,
          needsReview: 3
        });
      } catch (error) {
        console.error('載入教師資料失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" data-name="teacher-dashboard-loading" data-file="components/TeacherDashboard.js">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">載入中...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" data-name="teacher-dashboard" data-file="components/TeacherDashboard.js">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            教師儀表板
          </h1>
          <p className="text-[var(--text-secondary)]">
            管理學生的個人化學習計畫
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--primary-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-users text-xl text-[var(--primary-color)]"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">學生總數</h3>
            <p className="text-2xl font-bold text-[var(--primary-color)]">{stats.totalStudents}</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--warning-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-clock text-xl text-[var(--warning-color)]"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">進行中計畫</h3>
            <p className="text-2xl font-bold text-[var(--warning-color)]">{stats.activePlans}</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--accent-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-check-circle text-xl text-[var(--accent-color)]"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">已完成計畫</h3>
            <p className="text-2xl font-bold text-[var(--accent-color)]">{stats.completedPlans}</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-[var(--error-color)] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-alert-circle text-xl text-[var(--error-color)]"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">待審核</h3>
            <p className="text-2xl font-bold text-[var(--error-color)]">{stats.needsReview}</p>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">學生列表</h2>
            <div className="flex space-x-2">
              <select className="input-field text-sm">
                <option>所有班級</option>
                <option>三年一班</option>
                <option>三年二班</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-3 px-4 font-medium text-[var(--text-primary)]">學生姓名</th>
                  <th className="text-left py-3 px-4 font-medium text-[var(--text-primary)]">班級</th>
                  <th className="text-left py-3 px-4 font-medium text-[var(--text-primary)]">計畫數量</th>
                  <th className="text-left py-3 px-4 font-medium text-[var(--text-primary)]">最後活動</th>
                  <th className="text-left py-3 px-4 font-medium text-[var(--text-primary)]">操作</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-[var(--border-color)] hover:bg-gray-50">
                    <td className="py-3 px-4 text-[var(--text-primary)]">{student.name}</td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">{student.class}</td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">{student.plansCount}</td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">
                      {new Date(student.lastActive).toLocaleDateString('zh-TW')}
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-[var(--primary-color)] hover:underline text-sm mr-3">
                        查看計畫
                      </button>
                      <button className="text-[var(--accent-color)] hover:underline text-sm">
                        發送訊息
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('TeacherDashboard component error:', error);
    return null;
  }
}