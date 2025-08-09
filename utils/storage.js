const StorageService = {
  // 驗證 ILP 計畫資料
  validateILPPlan(plan) {
    if (!plan || typeof plan !== 'object') {
      throw new Error('無效的計畫資料');
    }

    const requiredFields = ['userId', 'learningGoal', 'motivation', 'strategy'];
    for (const field of requiredFields) {
      if (!plan[field] || typeof plan[field] !== 'string' || plan[field].trim().length === 0) {
        throw new Error(`缺少必要欄位: ${field}`);
      }
    }

    // 清理和驗證資料
    return {
      userId: plan.userId.trim(),
      learningGoal: plan.learningGoal.trim().substring(0, 500), // 限制長度
      motivation: plan.motivation.trim().substring(0, 500),
      strategy: plan.strategy.trim().substring(0, 500),
      resources: (plan.resources || '').trim().substring(0, 500),
      difficulties: (plan.difficulties || '').trim().substring(0, 500),
      evaluation: (plan.evaluation || '').trim().substring(0, 500),
      timeline: (plan.timeline || '').trim().substring(0, 200),
      status: plan.status || 'draft',
      createdAt: plan.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  // 儲存 ILP 計畫
  async saveILPPlan(plan) {
    try {
      const validatedPlan = this.validateILPPlan(plan);
      const plans = this.getILPPlans(validatedPlan.userId);
      
      const newPlan = {
        ...validatedPlan,
        id: Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9) // 更安全的 ID
      };
      
      plans.push(newPlan);
      
      const storageKey = `ilp_plans_${validatedPlan.userId}`;
      localStorage.setItem(storageKey, JSON.stringify(plans));
      
      return newPlan;
    } catch (error) {
      console.error('儲存學習計畫失敗:', error);
      throw new Error('儲存學習計畫失敗: ' + error.message);
    }
  },

  // 取得使用者的 ILP 計畫
  getILPPlans(userId) {
    try {
      if (!userId || typeof userId !== 'string') {
        throw new Error('無效的使用者 ID');
      }

      const storageKey = `ilp_plans_${userId}`;
      const plansStr = localStorage.getItem(storageKey);
      
      if (!plansStr) return [];
      
      const plans = JSON.parse(plansStr);
      
      // 驗證資料格式
      if (!Array.isArray(plans)) {
        console.warn('學習計畫資料格式錯誤，重設為空陣列');
        return [];
      }
      
      // 過濾無效的計畫
      return plans.filter(plan => {
        return plan && 
               typeof plan === 'object' && 
               plan.id && 
               plan.userId === userId &&
               plan.learningGoal;
      });
    } catch (error) {
      console.error('讀取學習計畫失敗:', error);
      return [];
    }
  },

  // 儲存分析結果
  async saveAnalysis(userId, analysis) {
    try {
      if (!userId || typeof userId !== 'string') {
        throw new Error('無效的使用者 ID');
      }

      if (!analysis || typeof analysis !== 'object') {
        throw new Error('無效的分析資料');
      }

      // 清理和驗證分析資料
      const validatedAnalysis = {
        overall: (analysis.overall || '').substring(0, 1000),
        suggestions: Array.isArray(analysis.suggestions) ? 
          analysis.suggestions.slice(0, 10).map(s => String(s).substring(0, 200)) : [],
        warnings: (analysis.warnings || '').substring(0, 500),
        timestamp: new Date().toISOString(),
        userId: userId
      };

      const storageKey = `analysis_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(validatedAnalysis));
      
      return validatedAnalysis;
    } catch (error) {
      console.error('儲存分析結果失敗:', error);
      throw new Error('儲存分析結果失敗: ' + error.message);
    }
  },

  // 取得分析結果
  async getAnalysis(userId) {
    try {
      if (!userId || typeof userId !== 'string') {
        return null;
      }

      const storageKey = `analysis_${userId}`;
      const analysisStr = localStorage.getItem(storageKey);
      
      if (!analysisStr) return null;
      
      const analysis = JSON.parse(analysisStr);
      
      // 驗證分析資料格式
      if (!analysis || typeof analysis !== 'object' || analysis.userId !== userId) {
        return null;
      }
      
      return analysis;
    } catch (error) {
      console.error('讀取分析結果失敗:', error);
      return null;
    }
  },

  // 更新計畫狀態
  async updatePlanStatus(userId, planId, status) {
    try {
      if (!userId || !planId || !status) {
        throw new Error('缺少必要參數');
      }

      // 驗證狀態值
      const validStatuses = ['draft', 'active', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        throw new Error('無效的狀態值');
      }

      const plans = this.getILPPlans(userId);
      const planIndex = plans.findIndex(p => p.id === planId && p.userId === userId);
      
      if (planIndex === -1) {
        throw new Error('找不到指定的學習計畫');
      }

      plans[planIndex].status = status;
      plans[planIndex].updatedAt = new Date().toISOString();
      
      const storageKey = `ilp_plans_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(plans));
      
      return plans[planIndex];
    } catch (error) {
      console.error('更新計畫狀態失敗:', error);
      throw new Error('更新計畫狀態失敗: ' + error.message);
    }
  }
};