import * as types from './mutation_types';
import api from '@/common/api';

async function invokeApiWithNotify(commit, promise) {
  commit(types.CLEAR_NOTIFICATIONS);

  const response = await promise;

  const notifications = [
    `result status:${response.status}, data:${JSON.stringify(
      response.data
    )}`
  ];

  commit(types.SET_NOTIFICATIONS, {
    notifications,
    notificationType: 'success'
  });

  return response;
}

export async function getTodos() {
  return await api.getTodos();
}

export async function getTodo(context, id) {
  return await api.getTodo(id);
}

export async function createTodo({ commit }, todo) {
  if (!todo.name) {
    commit(types.SET_NOTIFICATIONS, {
      notifications: ['Name is required'],
      notificationType: 'error'
    });
    return;
  }

  return await invokeApiWithNotify(
    commit,
    api.postTodo(todo)
  );
}

export async function updateTodo({ commit }, todo) {
  if (!todo.name) {
    commit(types.SET_NOTIFICATIONS, {
      notifications: ['Name is required'],
      notificationType: 'error'
    });
    return;
  }

  return await invokeApiWithNotify(
    commit,
    api.putTodo(todo.id, todo)
  );
}

export async function deleteTodo({ commit }, id) {
  return await invokeApiWithNotify(
    commit,
    api.deleteTodo(id)
  );
}