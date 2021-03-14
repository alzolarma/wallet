<template>
<div>

    <Notification
    v-if="notification.ifNotification"
    :type="notification.type"
    :message="notification.message"
    :errorsInputs="notification.errors_response"
  />

  <v-layout row >
    <v-flex xs12 sm12 md6 lg6 xl6 pa-3>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >

        <h3> Consultar Saldo </h3>

        <v-divider></v-divider>

        <v-text-field
          v-model="document"
          :counter="10"
          label="Documento"
          required
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :counter="10"
          :rules="phoneRules"
          label="Teléfono"
          required
        ></v-text-field>

        <v-btn
          color="error"
          :disabled="dialog"
          @click="reset"
        >
          Limpiar
        </v-btn>

        <v-btn
          color="primary"
          @click="submit"
          :disabled="dialog"
          :loading="dialog"
        >
          Consultar saldo
        </v-btn>
      </v-form>
    </v-flex>
    <v-flex xs12 sm12 md6 lg6 xl6 pa-3>
        <v-progress-linear :indeterminate="dialog"></v-progress-linear>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Saldo disponible</h3>
              <div> {{ pay }} </div>
            </div>
          </v-card-title>
        </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
  import Notification from '~/components/utils/Notification.vue'

  export default {
    data: () => ({
      valid: true,
      phone: '34',
      phoneRules: [
        v => !!v || 'Phone is required',
        v => (v && v.length <= 10) || 'Phone must be less than 10 characters'
      ],
      document: '34',
      documentRules: [
        v => !!v || 'Document is required',
        v => (v && v.length <= 10) || 'Document must be less than 10 characters'
      ],
      notification: {
        ifNotification: false,
        type: '',
        message: '',
        errors_response:null
      },
      dialog: false,
      pay: null
    }),
    components: {
      Notification,
    },
    // watch: {
    //   dialog (val) {
    //     if (!val) return
    //     setTimeout(() => (this.dialog = false), 4000)
    //   }
    // },
    mounted() {
      this.$store.watch(
        state => state.wallet.notification,
        notification => {
          this.notification = notification;
          this.dialog = false;
        }
      );
      this.$store.watch(
        state => state.wallet.data,
        data => {
          this.pay = data.pay;
        }
      );
    },
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      submit () {
        if(this.$refs.form.validate()) {
          this.dialog = true;
          let data = { 
            document: this.document,
            phone: this.phone,
          };
          this.$store.commit('wallet/setData', data);
          this.$store.dispatch('wallet/balance');
        }
      }
    }
  }
</script>