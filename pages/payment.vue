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
           Pagar
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
              :counter="15"
              :rules="documentRules"
              label="Documento"
              required
            ></v-text-field>

            <v-text-field
              v-model="phone"
              :counter="15"
              :rules="phoneRules"
              label="Teléfono"
              required
            ></v-text-field>

            <v-text-field
              v-model="mount"
              :counter="10"
              :rules="mountRules"
              label="Monto a pagar"
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
              Pagar
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
        v => !!v || 'Teléfono es requerido',
        v => (v && v.length <= 15) || 'Teléfono debe ser menos de 15 caracteres'
      ],
      mount: '',
      mountRules: [
        v => !!v || 'Monto es requerido',
        v => (v && v.length <= 10) || 'Monto debe ser menos de 10 caracteres'
      ],
      document: '',
      documentRules: [
        v => !!v || 'Documento es requerido',
        v => (v && v.length <= 15) || 'Documento debe ser menos de 15 caracteres'
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
          });
          this.$store.dispatch('wallet/paymentRequest');
        }
      }
    }
  }
</script>