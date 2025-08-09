/**
 * 表單驗證工具函數
 * 提供常用的驗證方法
 */
const ValidationUtils = {
  /**
   * 驗證必填欄位
   * @param {string} value - 要驗證的值
   * @param {string} fieldName - 欄位名稱
   * @returns {string|null} 錯誤訊息或 null
   */
  required(value, fieldName = '此欄位') {
    if (!value || value.trim().length === 0) {
      return `${fieldName}不能為空`;
    }
    return null;
  },

  /**
   * 驗證最小長度
   * @param {string} value - 要驗證的值
   * @param {number} minLength - 最小長度
   * @param {string} fieldName - 欄位名稱
   * @returns {string|null} 錯誤訊息或 null
   */
  minLength(value, minLength, fieldName = '此欄位') {
    if (value && value.trim().length < minLength) {
      return `${fieldName}至少需要 ${minLength} 個字元`;
    }
    return null;
  },

  /**
   * 驗證最大長度
   * @param {string} value - 要驗證的值
   * @param {number} maxLength - 最大長度
   * @param {string} fieldName - 欄位名稱
   * @returns {string|null} 錯誤訊息或 null
   */
  maxLength(value, maxLength, fieldName = '此欄位') {
    if (value && value.trim().length > maxLength) {
      return `${fieldName}不能超過 ${maxLength} 個字元`;
    }
    return null;
  },

  /**
   * 驗證電子郵件格式
   * @param {string} email - 電子郵件地址
   * @returns {string|null} 錯誤訊息或 null
   */
  email(email) {
    if (!email) return null;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return '請輸入有效的電子郵件地址';
    }
    return null;
  },

  /**
   * 清理文字輸入，移除多餘空白
   * @param {string} text - 要清理的文字
   * @returns {string} 清理後的文字
   */
  sanitizeText(text) {
    if (typeof text !== 'string') return '';
    return text.trim().replace(/\s+/g, ' ');
  },

  /**
   * 安全地截斷文字到指定長度
   * @param {string} text - 要截斷的文字
   * @param {number} maxLength - 最大長度
   * @returns {string} 截斷後的文字
   */
  truncate(text, maxLength) {
    if (typeof text !== 'string') return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
  }
};