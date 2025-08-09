function AnalysisView({ user, onBack }) {
  try {
    const [analysis, setAnalysis] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadAnalysis();
    }, []);

    const loadAnalysis = async () => {
      try {
        const analysisData = await StorageService.getAnalysis(user.id);
        setAnalysis(analysisData);
      } catch (error) {
        console.error('載入分析失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return (
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8" data-name="analysis-loading" data-file="components/AnalysisView.js">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">正在分析您的學習計畫...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8" data-name="analysis-view" data-file="components/AnalysisView.js">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="btn-secondary mb-4"
          >
            <div className="icon-arrow-left text-sm mr-2"></div>
            返回
          </button>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            AI 學習計畫分析報告
          </h1>
        </div>

        {analysis ? (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[var(--accent-color)] bg-opacity-10 rounded-lg flex items-center justify-center mr-3">
                  <div className="icon-brain text-lg text-[var(--accent-color)]"></div>
                </div>
                <h2 className="text-xl font-semibold">整體評估</h2>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {analysis.overall || '您的學習計畫整體結構完整，目標明確。建議在執行過程中定期檢視進度。'}
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[var(--primary-color)] bg-opacity-10 rounded-lg flex items-center justify-center mr-3">
                  <div className="icon-lightbulb text-lg text-[var(--primary-color)]"></div>
                </div>
                <h2 className="text-xl font-semibold">AI 建議</h2>
              </div>
              <div className="space-y-3">
                {analysis.suggestions && analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-[var(--text-secondary)]">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[var(--warning-color)] bg-opacity-10 rounded-lg flex items-center justify-center mr-3">
                  <div className="icon-alert-triangle text-lg text-[var(--warning-color)]"></div>
                </div>
                <h2 className="text-xl font-semibold">需要注意的地方</h2>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {analysis.warnings || '建議設定更具體的評估指標，以便追蹤學習成效。'}
              </p>
            </div>
          </div>
        ) : (
          <div className="card text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="icon-file-search text-2xl text-gray-400"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">尚未有分析報告</h3>
            <p className="text-[var(--text-secondary)]">
              請先完成學習計畫表單，系統將自動產生分析報告
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('AnalysisView component error:', error);
    return null;
  }
}