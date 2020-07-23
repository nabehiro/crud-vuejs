<template>
  <div class="todoCreate">
    <v-container>
      <h1 class="text-h2">Create Todo</h1>

      <v-btn text color="error" to="/Todos">Return to Todos</v-btn>

      <notify-box :values="notifications" :type="notificationType" />

      <form @submit.prevent="createTodo">
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

export default {
    components: {
        NotifyBox
    },

  data() {
    return {
      name: "",
      isComplete: false,
      notifications: [],
      notificationType: "info"
    };
  },

  methods: {
    createTodo() {
      console.log("start createTodo");

      this.notifications = [];

      if (!this.name) {
        this.notificationType = "error";
        this.notifications.push("Name is required");
        return false;
      }

      const todo = { name: this.name, isComplete: this.isComplete };

      this.axios
        .post("https://localhost:44323/api/todoitems", todo)
        .then(response => {
          console.log(response);

          this.notificationType = "success";
          this.notifications.push(
            `result status:${response.status}, data:${JSON.stringify(
              response.data
            )}`
          );
        });
    }
  }
};
</script>