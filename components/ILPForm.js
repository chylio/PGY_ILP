function ILPForm({ user, onSubmit, onBack }) {
  try {
    const [formData, setFormData] = React.useState({
      name: user?.name || '',
      gender: '',
      position: '',
      fillDate: new Date().toISOString().split('T')[0],
      learningGoal: '',
      motivation: '',
      strategy: '',
      resources: '',
      difficulties: '',
      evaluation: '',
      timeline: ''
    });
    const [loading, setLoading] = React.useState(false);

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        // 儲存表單資料
        const ilpPlan = {
          ...formData,
          userId: user.id,
          status: 'draft',
          createdAt: new Date().toISOString()
        };

        await StorageService.saveILPPlan(ilpPlan);

        // 產生 AI 分析
        const analysis = await AIAnalysisService.analyzeILP(formData);
        await StorageService.saveAnalysis(user.id, analysis);

        onSubmit();
      } catch (error) {
        console.error('提交表單失敗:', error);
        alert('提交失敗，請稍後再試');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8" data-name="ilp-form" data-file="components/ILPForm.js">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="btn-secondary mb-4"
          >
            <div className="icon-arrow-left text-sm mr-2"></div>
            返回
          </button>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            個人化學習計畫表單 (ILP)
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                姓名
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                性別
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">請選擇</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                職級/班級
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                填寫日期
              </label>
              <input
                type="date"
                name="fillDate"
                value={formData.fillDate}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              學習目標一：(你想學什麼？)
            </label>
            <textarea
              name="learningGoal"
              value={formData.learningGoal}
              onChange={handleInputChange}
              rows="3"
              className="input-field"
              placeholder="請描述您的學習目標..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              學習動機：(什麼事件誘發你想要學這個？)
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              rows="3"
              className="input-field"
              placeholder="請描述您的學習動機..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              學習策略：(你需要做什麼？)
            </label>
            <textarea
              name="strategy"
              value={formData.strategy}
              onChange={handleInputChange}
              rows="3"
              className="input-field"
              placeholder="請描述您的學習策略..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              學習資源：(需要誰的幫忙或什麼設備？)
            </label>
            <textarea
              name="resources"
              value={formData.resources}
              onChange={handleInputChange}
              rows="3"
              className="input-field"
              placeholder="請描述所需的學習資源..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              可能遭遇的困難：
            </label>
            <textarea
              name="difficulties"
              value={formData.difficulties}
              onChange={handleInputChange}
              rows="3"
              className="input-field"
              placeholder="請預想可能遇到的困難..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              評估內容與指標：(怎麼樣才能證明你達到你的學習目標？)
            </label>
            <textarea
              name="evaluation"
              value={formData.evaluation}
              onChange={handleInputChange}
              rows="3"
              className="input-field"
              placeholder="請描述評估方式和成功指標..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              預計時程：(這部分的學習預計多久達成？)
            </label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="input-field"
              placeholder="例如：3個月、半年..."
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="btn-secondary"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? '提交中...' : '提交計畫'}
            </button>
          </div>
        </form>
      </div>
    );
  } catch (error) {
    console.error('ILPForm component error:', error);
    return null;
  }
}
