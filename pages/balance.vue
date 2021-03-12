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

     <h3> Consultar Saldo </h3>

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
      Consultar saldo
    </v-btn>
  </v-form>
</div>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      phone: '',
      phoneRules: [
        v => !!v || 'Phone is required',
        v => (v && v.length <= 10) || 'Phone must be less than 10 characters'
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
    }),
    components: {
      Notification,
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
      async submit () {
        if(this.$refs.form.validate()) {
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