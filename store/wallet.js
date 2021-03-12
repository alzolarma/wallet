export default {
  state: {
    data: {
      phone: "null",
      document: null
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
      console.log("data wallet", data);
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

      let wallet_id = 1;

      let res = await this.$axios.put(
        `${process.env.API_URL}/wallet/${wallet_id}`,
        data
      );
      if (res.status === 200) {
        commit("setNotification", res.data);
      }
    },

    async balance({ commit }) {
      let notification = {
        ifNotification: true,
        type: "success",
        message: "Mensaje desde el axios",
        errors_response: []
      };

      commit("setNotification", notification);

      let res = await this.$axios.get(
        `${process.env.API_URL}/wallet/${this.state.wallet.data.phone}/${this.state.wallet.data.document}/balance`
      );
      if (res.status === 200) {
        commit("setNotification", res.data);
      }
    }
  }
};
