<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12 lg12 xl12 pa-3>
      <v-alert
        :value="true"
        :type="type"
        :color="color[type]"
        transition="scale-transition"
      >
        {{message}}
        <ul text-md-left>
          <li v-for="(error, index) in errorsInputs"
            :key="index"> {{error.msg}}
          </li>
        </ul>
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        default: '',
      },
      errorsInputs: {
        type: Array,
        default: function () { return [] },
      },
      type: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        color: {
          success: 'green darken-3',
          error: 'red darken-3',
          warning: 'orange darken-3',
        }
      }
    },
  }
</script>
