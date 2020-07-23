<template>
  <v-alert :type="type" v-show="values.length > 0">
    <ul>
      <li v-for="value in values" :key="value">{{ value }}</li>
    </ul>
  </v-alert>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    values: {
      type: Array
    },
    type: {
      type: String
    }
  }
};
</script>