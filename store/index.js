import Vuex from "vuex";
import Customer from "./customer";
import Wallet from "./wallet";

new Vuex.Store({
  modules: {
    Customer,
    Wallet
  }
});

// eslint-disable-next-line import/prefer-default-export
export const strict = false;
