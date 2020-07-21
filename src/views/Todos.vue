<template>
  <div class="todos">
    <h1>This is an todos page</h1>

    <NotifyBox :values="notifications" />

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Completed</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="todo in todos" :key="todo.id">
                <td>{{ todo.id }}</td>
                <td>{{ todo.name }}</td>
                <td>{{ todo.isComplete }}</td>
                <td>
                    <router-link :to="'/todos/edit/' + todo.id">edit</router-link>
                </td>
                <td>
                    <button @click="deleteTodo(todo.id)">delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <div>
        <router-link to="/todos/create">Create</router-link>
    </div>
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
            todos: [],
            query: '',
            notifications: []
        };
    },

    mounted() {
        console.log('mounted');
        this.fetchTodos();
    },

    methods: {
        fetchTodos() {
            this.axios
                .get('https://localhost:44323/api/todoitems')
                .then(response => {
                    this.todos = response.data;
                })
        },

        deleteTodo(id) {
            console.log('delete', id);

            if (!confirm(`delete todo:${id} ?`)) {
                return;
            }

            this.axios
                .delete(`https://localhost:44323/api/todoitems/${id}`)
                .then(response => {
                    console.log(response);

                    this.notifications.push(`result status:${response.status}, data:${JSON.stringify(response.data)}`);

                    this.fetchTodos();
                })
        }
    }
}
</script>