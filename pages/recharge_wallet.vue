<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <Notification
        v-if="notification.ifNotification"
        :type="notification.type"
        :message="notification.message"
        :errorsInputs="notification.errors_response"
      />
      <v-card>
        <v-card-title class="headline">
           Recargar Billetera
        </v-card-title>
        <v-card-text>

          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >

            <v-divider></v-divider>

            <v-text-field
              v-model="document"
              :counter="10"
              :rules="documentRules"
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

            <v-text-field
              v-model="mount"
              :counter="10"
              :rules="mountRules"
              label="Monto a recargar"
              required
            ></v-text-field>

            <v-btn
              color="error"
              @click="reset"
              :disabled="dialog"
            >
              Limpiar
            </v-btn>

            <v-btn
              color="primary"
              @click="submit"
              :disabled="dialog"
              :loading="dialog"
            >
              Recargar
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import Notification from '~/components/utils/Notification.vue'

  export default {
    data: () => ({
      valid: true,
      phone: '',
      phoneRules: [
        v => !!v || 'Phone is required',
        v => (v && v.length <= 10) || 'Phone must be less than 10 characters'
      ],
      mount: '',
      mountRules: [
        v => !!v || 'Monto is required',
        v => (v && v.length <= 10) || 'Document must be less than 10 characters'
      ],
      document: '',
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
    }),
    components: {
      Notification,
    },
    mounted() {
      this.$store.watch(
        state => state.wallet.notification,
        notification => {
          this.notification = notification;
          this.dialog = false;
          if(notification.type == 'success') {
            this.reset();
          }
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
          this.$store.commit('wallet/setTransaction', {
            mount: this.mount,
            type : 'credit'
          });
          this.$store.dispatch('wallet/transaction');
        }
      }
    }
  }
</script>