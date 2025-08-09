const AIAnalysisService = {
  async analyzeILP(formData) {
    try {
      // 準備 AI 分析的系統提示
      const systemPrompt = `你是一位專業的教育顧問，專門分析學生的個人化學習計畫 (ILP)。
      請根據學生提供的學習計畫內容，給出專業的分析和建議。
      
      分析重點：
      1. 學習目標是否明確且可達成
      2. 學習策略是否合理有效
      3. 資源配置是否充足
      4. 評估指標是否具體可量化
      5. 時程安排是否合理
      
      請以繁體中文回應，並提供具體的改善建議。`;

      const userPrompt = `請分析以下學習計畫：
      
      學習目標：${formData.learningGoal}
      學習動機：${formData.motivation}
      學習策略：${formData.strategy}
      學習資源：${formData.resources}
      可能困難：${formData.difficulties}
      評估指標：${formData.evaluation}
      預計時程：${formData.timeline}
      
      請提供整體評估、具體建議和需要注意的地方。`;

      // 呼叫 AI 分析
      const aiResponse = await invokeAIAgent(systemPrompt, userPrompt);
      
      // 解析 AI 回應並結構化
      return this.parseAIResponse(aiResponse);
      
    } catch (error) {
      console.error('AI 分析失敗:', error);
      
      // 提供預設分析
      return this.getDefaultAnalysis(formData);
    }
  },

  parseAIResponse(response) {
    // 簡單的回應解析，實際使用時可以更精細
    const suggestions = [
      '建議將學習目標分解為更小的階段性目標',
      '考慮增加定期的自我評估機制',
      '建立學習夥伴或尋求導師指導'
    ];

    return {
      overall: response.substring(0, 200) + '...',
      suggestions: suggestions,
      warnings: '請確保評估指標具體可量化，以便追蹤學習成效。',
      timestamp: new Date().toISOString()
    };
  },

  getDefaultAnalysis(formData) {
    return {
      overall: '您的學習計畫架構完整，顯示了明確的學習意圖。建議在執行過程中保持彈性，根據實際情況調整策略。',
      suggestions: [
        '建議將大目標分解為每週或每月的小目標',
        '考慮建立學習日誌，記錄每日學習進度',
        '定期與指導老師或同儕分享學習心得',
        '設定具體的里程碑和獎勵機制'
      ],
      warnings: '建議在評估指標中加入更多可量化的標準，例如完成特定作業數量、通過測驗分數等。',
      timestamp: new Date().toISOString()
    };
  }
};