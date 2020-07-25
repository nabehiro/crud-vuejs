<template>
  <v-alert :type="notificationType" v-show="notifications.length > 0">
    <ul>
      <li v-for="value in notifications" :key="value">{{ value }}</li>
    </ul>
  </v-alert>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState([
      'notifications',
      'notificationType']
    )
  }
};
</script>