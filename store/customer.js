import Wallet from "./wallet";

export default {
  state: {
    data: {
      name: null,
      phone: null,
      document: null,
      email: null
    },
    created: false,
    notification: {
      ifNotification: false,
      type: "",
      message: null,
      errors_response: []
    }
  },

  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setNotification(state, data) {
      state.notification = data;
    },
    setCreated(state, data) {
      state.created = data;
    }
  },

  actions: {
    async store({ commit }, data) {
      let notification = {
        ifNotification: true,
        type: null,
        message: null,
        errors_response: []
      };
      try {
        const resp = await this.$axios.post(
          `${process.env.API_URL}/customer`,
          data
        );
        notification.type = resp.data.status ? 'success' : 'warning';
        notification.message = resp.data.message;
        commit("setNotification", notification);
      } catch (err) {
        notification.type = "error";
        notification.message = err.response.data.message;
        notification.errors_response = err.response.data.errors;
        commit("setNotification", notification);
      }
    }
  }
};
