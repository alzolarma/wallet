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
            <v-row justify="center" align="center">
              <h3>Confirmación de pago</h3>
            </v-row>
        </v-card-title>
        <v-card-text>
        </v-card-text>
      </v-card>
    </v-col>
 </v-row>
</template>

<script>
  import Notification from '~/components/utils/Notification.vue'

  export default {
    data: () => ({
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
    async created () {
      this.$store.dispatch('wallet/paymentConfirm', this.token.id);
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
    },
  }
</script>