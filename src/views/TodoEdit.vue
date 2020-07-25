<template>
  <v-container>
    <h1 class="text-h2">Edit Todo</h1>

    <v-btn text color="error" to="/Todos">Return to Todos</v-btn>

    <notify-box :values="notifications" :type="notificationType" />

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
import api from '@/common/api';

export default {
  components: {
    NotifyBox,
  },

  data() {
    return {
      id: 0,
      name: "",
      isComplete: false,
      notifications: [],
      notificationType: "info"
    };
  },

  mounted() {
    api.getTodo(this.$route.params.id)
      .then((response) => {
        this.id = response.data.id;
        this.name = response.data.name;
        this.isComplete = response.data.isComplete;
      });
  },

  methods: {
    editTodo() {
      console.log("start editTodo");

      this.notifications = [];

      if (!this.name) {
        this.notificationType = "error";
        this.notifications.push("Name is required");
        return false;
      }

      const todo = {
        id: this.id,
        name: this.name,
        isComplete: this.isComplete,
      };

      api.putTodo(this.id, todo)
        .then((response) => {
          console.log(response);

          this.notificationType = "success";
          this.notifications.push(
            `result status:${response.status}, data:${JSON.stringify(
              response.data
            )}`
          );
        });
    },
  },
};
</script>