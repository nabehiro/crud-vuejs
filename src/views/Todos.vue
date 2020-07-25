<template>
  <div class="todos">
    <v-container>
      <h1 class="text-h2">Todo List</h1>

      <NotifyBox />

      <v-data-table dense :headers="tableHeaders" :items="todos">
        <template v-slot:item.actions="{ item }">
          <router-link class="text-decoration-none" :to="`/todos/edit/${item.id}`">
            <v-icon small class="mr-2">mdi-pencil</v-icon>
          </router-link>
          
          <v-icon small @click="onDeleteTodo(item.id)">mdi-delete</v-icon>
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
import { mapActions } from 'vuex';

export default {
  components: {
    NotifyBox,
  },
  data() {
    return {
      todos: [],
      query: "",
      tableHeaders: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Completed", value: "isComplete" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  mounted() {
    this.fetchTodos();
  },

  methods: {
    ...mapActions(['deleteTodo', 'getTodos']),

    async fetchTodos() {
      const response = await this.getTodos();
      this.todos = response.data;
    },

    async onDeleteTodo(id) {
      if (!confirm(`delete todo:${id} ?`)) {
        return;
      }

      await this.deleteTodo(id);
      await this.fetchTodos();
    },
  },
};
</script>