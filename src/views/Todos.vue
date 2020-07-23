<template>
  <div class="todos">
    <v-container>
      <h1 class="text-h2">Todo List</h1>

      <NotifyBox :values="notifications" :type="notificationType" />

      <v-data-table dense :headers="tableHeaders" :items="todos">
        <template v-slot:item.actions="{ item }">
          <router-link class="text-decoration-none" :to="`/todos/edit/${item.id}`">
            <v-icon small class="mr-2">mdi-pencil</v-icon>
          </router-link>
          
          <v-icon small @click="deleteTodo(item.id)">mdi-delete</v-icon>
        </template>
        <template v-slot:item.isComplete="{ item }">
          <v-checkbox v-model="item.isComplete" readonly></v-checkbox>
        </template>
      </v-data-table>

      <div>
        <v-btn color="info" to="/todos/create">Create</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import NotifyBox from "@/components/NotifyBox.vue";

export default {
  components: {
    NotifyBox,
  },
  data() {
    return {
      todos: [],
      query: "",
      notifications: [],
      notificationType: "info",
      tableHeaders: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Completed", value: "isComplete" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  mounted() {
    console.log("mounted");
    this.fetchTodos();
  },

  methods: {
    fetchTodos() {
      this.axios
        .get("https://localhost:44323/api/todoitems")
        .then((response) => {
          this.todos = response.data;
        });
    },

    deleteTodo(id) {
      console.log("delete", id);

      if (!confirm(`delete todo:${id} ?`)) {
        return;
      }

      this.axios
        .delete(`https://localhost:44323/api/todoitems/${id}`)
        .then((response) => {
          console.log(response);

          this.notificationType = "success";
          this.notifications.push(
            `result status:${response.status}, data:${JSON.stringify(
              response.data
            )}`
          );

          this.fetchTodos();
        });
    },
  },
};
</script>