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
           Registrar Usuario 
        </v-card-title>
        <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-divider></v-divider>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="10"
                label="Nombre"
                required
              ></v-text-field>

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
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-form>
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
              Enviar
            </v-btn>
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
      name: '',
      nameRules: [
        v => !!v || 'Nombre es requerido',
        v => (v && v.length <= 10) || 'Nombre debe ser menos de 10 caracteres'
      ],
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
      email: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+/.test(v) || 'E-mail debe ser válido'
      ],
      dialog: false,
      notification: {
        ifNotification: false,
        type: '',
        message: '',
        errors_response:null
      },
    }),

    components: {
      Notification,
    },
    mounted() {
      this.$store.watch(
        state => state.customer.notification,
        notification => {
          this.notification = notification;
          this.dialog = false;
          if(notification.type == 'success') {
            this.reset();
          }
        }
      )
    },
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true;
          return true;
        }
        return false;
      },
      reset () {
        this.$refs.form.reset()
      },
      setNotification(visibility, type, message, errors) {
        this.notification.ifNotification = visibility;
        this.notification.type = type;
        this.notification.message = message;
        this.notification.errors_response = errors;
      },
      submit () {
        if(this.$refs.form.validate()) {
          this.dialog = true;
          let data = { 
            name: this.name,
            phone: this.phone,
            document: this.document,
            email: this.email,
          };
          this.$store.dispatch('customer/store', data);
        }
      }
    }
}
</script>
