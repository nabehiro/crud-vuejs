import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from "@/common/config";

export default {
    init() {
        Vue.use(VueAxios, axios)
        Vue.axios.defaults.baseURL = API_URL;
    },

    async getTodos() {
        const response = await Vue.axios.get('todoitems');
        console.log('getTodos', response);
        return response;
    },

    async getTodo(id) {
        const response = await Vue.axios.get(`todoitems/${id}`);
        console.log(`getTodo(${id})`, response);
        return response;
    },

    async deleteTodo(id) {
        const response = await Vue.axios.delete(`todoitems/${id}`);
        console.log(`deleteTodo(${id})`, response);
        return response;
    },

    async putTodo(id, todo) {
        const response = await Vue.axios.put(`todoitems/${id}`, todo);
        console.log(`putTodo(${id}, ${todo})`, response);
        return response;
    },

    async postTodo(todo) {
        const response = await Vue.axios.post('todoitems', todo);
        console.log(`postTodo(${todo})`, response);
        return response;
    }




}
