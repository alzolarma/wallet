export default {
  state: {
    data: {
      phone: null,
      document: null
    },
    balance: {
      value: null
    },
    transaction: {
      mount: null,
      type: null
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
    setTransaction(state, data) {
      state.transaction = data;
    },
    setNotification(state, data) {
      state.notification = data;
    },
    setCreated(state, data) {
      state.created = data;
    },
    setBalance(state, data) {
      state.balance = data;
    }
  },

  actions: {
    async transaction({ commit }) {
      let notification = {
        ifNotification: true,
        type: "success",
        message: "",
        errors_response: []
      };
      try {
        const resp = await this.$axios.post(
          `${process.env.API_URL}/transaction`,
          {
            phone: this.state.wallet.data.phone,
            document: this.state.wallet.data.document,
            type: this.state.wallet.transaction.type,
            mount: this.state.wallet.transaction.mount
          }
        );
        notification.type = resp.data.status ? "success" : "warning";
        notification.message = resp.data.message;
        commit("setNotification", notification);
      } catch (err) {
        notification.type = "error";
        notification.message = err.response.data.message;
        notification.errors_response = err.response.data.errors;
        commit("setNotification", notification);
      }
    },

    async paymentRequest({ commit }) {
      let notification = {
        ifNotification: true,
        type: "success",
        message: "",
        errors_response: []
      };
      try {
        const resp = await this.$axios.post(`${process.env.API_URL}/payment`, {
          phone: this.state.wallet.data.phone,
          document: this.state.wallet.data.document,
          mount: this.state.wallet.transaction.mount
        });
        notification.type = resp.data.status ? "success" : "warning";
        notification.message = resp.data.message;
        commit("setNotification", notification);
      } catch (err) {
        notification.type = "error";
        notification.message = err.response.data.message;
        notification.errors_response = err.response.data.errors;
        commit("setNotification", notification);
      }
    },

    async paymentConfirm({ commit }, token) {
      let notification = {
        ifNotification: true,
        type: "success",
        message: "",
        errors_response: []
      };
      try {
        const resp = await this.$axios.post(
          `${process.env.API_URL}/payment/confirm`,
          {
            token: token
          }
        );
        notification.type = resp.data.status ? "success" : "warning";
        notification.message = resp.data.message;
        commit("setNotification", notification);
      } catch (err) {
        notification.type = "error";
        notification.message = err.response.data.message;
        notification.errors_response = err.response.data.errors;
        commit("setNotification", notification);
      }
    },

    async balance({ commit }) {
      let notification = {
        ifNotification: true,
        type: "success",
        message: null,
        errors_response: []
      };

      try {
        const resp = await this.$axios.get(
          `${process.env.API_URL}/customer/${this.state.wallet.data.phone}/${this.state.wallet.data.document}/balance`
        );
        notification.type = resp.data.status ? "success" : "error";
        notification.message = resp.data.message;
        if (resp.data.status) {
          commit("setBalance", { value: resp.data.data });
        }
        commit("setNotification", notification);
      } catch (err) {
        notification.type = "error";
        notification.message = err.response.data.message;
        notification.errors_response = err.response.data.errors;
        commit("setNotification", notification);
        commit("setBalance", null);
      }
    }
  }
};
