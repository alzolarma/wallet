import Vuex from "vuex";
import Customer from "./customer";

new Vuex.Store({
  modules: {
    Customer
  }
});

// eslint-disable-next-line import/prefer-default-export
export const strict = false;
