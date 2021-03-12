<template>
<div>
  <Notification
    v-if="notification.ifNotification"
    :type="notification.type"
    :message="notification.message"
    :errorsInputs="notification.errors_response"
  />

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

     <h3> Registrar Usuario </h3>

    <v-divider></v-divider>

    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Nombre"
      required
    ></v-text-field>

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
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      Validar
    </v-btn>

    <v-btn
      color="error"
      @click="reset"
    >
      Limpiar
    </v-btn>

    <v-btn
      color="primary"
      @click="submit"
    >
      Enviar
    </v-btn>
  </v-form>
</div>
</template>

<script>

  import Notification from '~/components/utils/Notification.vue'
  
  export default {
    data: () => ({
      valid: true,
      name: 'maria',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      phone: '042455566',
      phoneRules: [
        v => !!v || 'Phone is required',
        v => (v && v.length <= 10) || 'Phone must be less than 10 characters'
      ],
      document: '454545',
      documentRules: [
        v => !!v || 'Document is required',
        v => (v && v.length <= 10) || 'Document must be less than 10 characters'
      ],
      email: 'alzolarma@gmail.com',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
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
      async submit () {
        if(this.$refs.form.validate()) {
          let data = { 
            name: this.name,
            document: this.document,
            phone: this.phone,
            email: this.email,
          };
          this.$store.dispatch('customer/store', data);
        }
      }
    }
  }
</script>