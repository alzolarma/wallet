<template>

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

     <h3> Registrar usuario </h3>

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
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
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
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
    }),

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
        this.$refs.form.submit()
      }
    }
  }
</script>