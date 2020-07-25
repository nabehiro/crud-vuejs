<template>
  <div class="todoCreate">
    <v-container>
      <h1 class="text-h2">Create Todo</h1>

      <v-btn text color="error" to="/Todos">Return to Todos</v-btn>

      <notify-box />

      <form @submit.prevent="addTodo">
        <v-text-field
          v-model="name"
          label="Name"
        ></v-text-field>

        <v-switch
          v-model="isComplete"
          label="Complete"
        ></v-switch>

        <v-btn color="primary" type="submit" x-large>Create</v-btn>
      </form>
    </v-container>
  </div>
</template>

<script>
import NotifyBox from '@/components/NotifyBox.vue'
import { mapActions } from 'vuex';

export default {
    components: {
        NotifyBox
    },

  data() {
    return {
      name: "",
      isComplete: false
    };
  },

  methods: {
    ...mapActions(['createTodo']),

    async addTodo() {
      const todo = { 
        name: this.name,
        isComplete: this.isComplete
      };

      await this.createTodo(todo);
    }
  }
};
</script>