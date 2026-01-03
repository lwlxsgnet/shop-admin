import { createStore } from "vuex";
import { getInfo } from "@/api/manager";
import { login } from "@/api/manager";
import { setToken, removeToken } from "@/composables/auth";

// 组件之间共享用户信息
const store = createStore({
  state() {
    return {
      user: {},
      // 侧边栏宽度
      asideWidth: "250px",
      menus: [],
      ruleNames: [],
    };
  },
  mutations: {
    // 登录成功后，设置用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
    // 展开/缩起侧边
    hideAsideWidth(state) {
      state.asideWidth = state.asideWidth === "250px" ? "64px" : "250px";
    },
    SET_MENUS(state, menus) {
      state.menus = menus;
    },
    SET_RULENAMES(state, ruleNames) {
      state.ruleNames = ruleNames;
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password).then((res) => {
            setToken(res.token);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // get current user info
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            commit("SET_USERINFO", res);
            commit("SET_MENUS", res.menus);
            commit("SET_RULENAMES", res.ruleNames);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // log out
    logout({ commit }) {
      // remove token from cookie
      removeToken();
      // remove user info
      commit("SET_USERINFO", {});
    },
  },
});

export default store;
