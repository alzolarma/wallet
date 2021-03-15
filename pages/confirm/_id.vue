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
           
        </v-card-title>
        <v-card-text>
            {{token}}
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
    async created () {

    },
    asyncData ({ params }) {
        return {
            token: params
        }
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
          let data = { 
            token: this.token,
          };
          this.$store.commit('wallet/setData', data);
          this.$store.dispatch('wallet/balance');
        }
      }
    }
  }
</script>