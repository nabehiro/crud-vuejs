<template>
  <v-container>
    <h1 class="text-h2">Edit Todo</h1>

    <v-btn text color="error" to="/Todos">Return to Todos</v-btn>

    <notify-box />

    <form @submit.prevent="editTodo">
      <v-text-field
        readonly
          v-model="id"
          label="Id"
        ></v-text-field>

      <v-text-field v-model="name" label="Name"></v-text-field>

      <v-switch v-model="isComplete" label="Complete"></v-switch>

      <v-btn color="primary" type="submit" x-large>Edit</v-btn>
    </form>
  </v-container>
</template>

<script>
import NotifyBox from "@/components/NotifyBox.vue";
import { mapActions } from 'vuex';

export default {
  components: {
    NotifyBox,
  },

  data() {
    return {
      id: 0,
      name: "",
      isComplete: false
    };
  },

  async mounted() {
    const response = await this.getTodo(this.$route.params.id);

    this.id = response.data.id;
    this.name = response.data.name;
    this.isComplete = response.data.isComplete;
  },

  methods: {
    ...mapActions(['getTodo', 'updateTodo']),

    async editTodo() {
      const todo = {
        id: this.id,
        name: this.name,
        isComplete: this.isComplete,
      };

      await this.updateTodo(todo);
    },
  },
};
</script>