<template>
    <div class="todoEdit">
        <h1>Edit Todo</h1>

        <p><router-link to="/Todos">Return to Todos</router-link></p>

        <NotifyBox :values="notifications" />
        <form @submit.prevent="editTodo">
            <div>
                <label name="todo_id">Id</label>:
                <span>{{ id }}</span>
            </div>

            <div>
                <label name="todo_name">Name</label>:
                <input type="text" v-model="name" />
            </div>

            <div>
                <label name="todo_complete">Complete</label>:
                <input type="checkbox" v-model="isComplete" />
            </div>

            <button>Edit</button>
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
            id: 0,
            name: '',
            isComplete: false,
            notifications: []
        };
    },

    mounted() {
        this.axios
            .get(`https://localhost:44323/api/todoitems/${this.$route.params.id}`)
            .then(response => {
                this.id = response.data.id;
                this.name = response.data.name;
                this.isComplete = response.data.isComplete;
            });
    },

    methods: {
        editTodo() {
            console.log('start editTodo');

            this.notifications = [];

            if (!this.name) {
                this.notifications.push("Name is required");
                return false;
            }

            const todo = { id: this.id, name: this.name, isComplete: this.isComplete };

            this.axios
                .put(`https://localhost:44323/api/todoitems/${this.id}`, todo)
                .then(response => {
                    console.log(response);

                    this.notifications.push(`result status:${response.status}, data:${JSON.stringify(response.data)}`);
                });
        }
    }

    
}
</script>