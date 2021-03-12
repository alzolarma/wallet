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
        type: "success",
        message: "Mensaje desde el axios",
        errors_response: []
      };

      commit("setNotification", notification);

      let res = await this.$axios.post(`${process.env.API_URL}/customer`, data);
      if (res.status === 200) {
        commit("setNotification", res.data);
      }
    }
  }
};
