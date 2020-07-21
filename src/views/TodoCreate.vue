<template>
    <div class="todoCreate">
        <h1>Create Todo</h1>

        <p><router-link to="/Todos">Return to Todos</router-link></p>

        <NotifyBox :values="notifications" />
        <form @submit.prevent="createTodo">
            <div>
                <label name="todo_name">Name</label>:
                <input type="text" v-model="name" />
            </div>

            <div>
                <label name="todo_complete">Complete</label>:
                <input type="checkbox" v-model="isComplete" />
            </div>

            <button>Create</button>
        </form>
        
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
            name: '',
            isComplete: false,
            notifications: []
        };
    },

    methods: {
        createTodo() {
            console.log('start createTodo');

            this.notifications = [];

            if (!this.name) {
                this.notifications.push("Name is required");
                return false;
            }

            const todo = { name: this.name, isComplete: this.isComplete };

            this.axios
                .post('https://localhost:44323/api/todoitems', todo)
                .then(response => {
                    console.log(response);

                    this.notifications.push(`result status:${response.status}, data:${JSON.stringify(response.data)}`);
                });
        }
    }
}
</script>