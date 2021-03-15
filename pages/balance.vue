<template>
 <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="10">
      <Notification
        v-if="notification.ifNotification"
        :type="notification.type"
        :message="notification.message"
        :errorsInputs="notification.errors_response"
      />
      <v-card>
        <v-card-title class="headline">
           Consultar Saldo
        </v-card-title>
        <v-card-text>
            <v-layout row >
              <v-flex xs12 sm12 md6 lg6 xl6 pa-3>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >

                  <v-divider></v-divider>

                  <v-text-field
                    v-model="document"
                    :rules="documentRules"
                    :counter="15"
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
      pay: null
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
        }
      );
      this.$store.watch(
        state => state.wallet.balance,
        data => {
          if(data) {
            this.pay = data.value;
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
          this.$store.dispatch('wallet/balance');
        }
      }
    }
  }
</script>