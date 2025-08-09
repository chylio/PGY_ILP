const StorageService = {
  // 儲存 ILP 計畫
  async saveILPPlan(plan) {
    const plans = this.getILPPlans(plan.userId);
    const newPlan = {
      ...plan,
      id: Date.now().toString()
    };
    
    plans.push(newPlan);
    localStorage.setItem(`ilp_plans_${plan.userId}`, JSON.stringify(plans));
    return newPlan;
  },

  // 取得使用者的 ILP 計畫
  getILPPlans(userId) {
    const plansStr = localStorage.getItem(`ilp_plans_${userId}`);
    return plansStr ? JSON.parse(plansStr) : [];
  },

  // 儲存分析結果
  async saveAnalysis(userId, analysis) {
    localStorage.setItem(`analysis_${userId}`, JSON.stringify(analysis));
    return analysis;
  },

  // 取得分析結果
  async getAnalysis(userId) {
    const analysisStr = localStorage.getItem(`analysis_${userId}`);
    return analysisStr ? JSON.parse(analysisStr) : null;
  },

  // 更新計畫狀態
  async updatePlanStatus(userId, planId, status) {
    const plans = this.getILPPlans(userId);
    const planIndex = plans.findIndex(p => p.id === planId);
    
    if (planIndex !== -1) {
      plans[planIndex].status = status;
      plans[planIndex].updatedAt = new Date().toISOString();
      localStorage.setItem(`ilp_plans_${userId}`, JSON.stringify(plans));
    }
    
    return plans[planIndex];
  }
};