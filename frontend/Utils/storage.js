/**
 * Local Storage Helpers
 */

export const local = {
  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);

      return value
        ? JSON.parse(value)
        : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};

/**
 * Session Storage Helpers
 */

export const session = {
  get(key, defaultValue = null) {
    try {
      const value =
        sessionStorage.getItem(key);

      return value
        ? JSON.parse(value)
        : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      sessionStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  }
};

/**
 * Authentication Helpers
 */

export const authStorage = {
  getToken() {
    return localStorage.getItem("token");
  },

  setToken(token) {
    localStorage.setItem(
      "token",
      token
    );
  },

  removeToken() {
    localStorage.removeItem("token");
  },

  getUser() {
    try {
      return JSON.parse(
        localStorage.getItem("user")
      );
    } catch {
      return null;
    }
  },

  setUser(user) {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  },

  clear() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};