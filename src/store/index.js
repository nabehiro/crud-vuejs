import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/common/api';

Vue.use(Vuex);

async function invokeApiWithNotify(commit, promise) {
  commit('CLEAR_NOTIFICATIONS');

  const response = await promise;

  const notifications = [
    `result status:${response.status}, data:${JSON.stringify(
      response.data
    )}`
  ];

  commit('SET_NOTIFICATIONS', {
    notifications,
    notificationType: 'success'
  });

  return response;
}

export default new Vuex.Store({
  state: {
    moveCount: 0,
    notifications: [],
    notificationType: 'info'
  },
  mutations: {
    INCREMENT_MOVE(state) {
      state.moveCount += 1;
    },

    SET_NOTIFICATIONS(state, { notifications, notificationType }) {
      state.notifications = notifications;
      state.notificationType = notificationType;
    },

    CLEAR_NOTIFICATIONS(state) {
      state.notifications = [];
      state.notificationType = 'info';
    }
  },
  actions: {
    async getTodos() {
      return await api.getTodos();
    },

    async getTodo(context, id) {
      return await api.getTodo(id);
    },

    async createTodo({ commit }, todo) {
      if (!todo.name) {
        commit('SET_NOTIFICATIONS', {
          notifications: ['Name is required'],
          notificationType: 'error'
        });
        return;
      }

      return await invokeApiWithNotify(
        commit,
        api.postTodo(todo)
      );
    },

    async updateTodo({ commit }, todo) {
      if (!todo.name) {
        commit('SET_NOTIFICATIONS', {
          notifications: ['Name is required'],
          notificationType: 'error'
        });
        return;
      }

      return await invokeApiWithNotify(
        commit,
        api.putTodo(todo.id, todo)
      );
    },

    async deleteTodo({ commit }, id) {
      return await invokeApiWithNotify(
        commit,
        api.deleteTodo(id)
      );
    }
  },
  modules: {
  }
})
