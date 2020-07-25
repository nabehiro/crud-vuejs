import * as types from './mutation_types';

export default {
  [types.INCREMENT_MOVE](state) {
    state.moveCount += 1;
  },

  [types.SET_NOTIFICATIONS](state, { notifications, notificationType }) {
    state.notifications = notifications;
    state.notificationType = notificationType;
  },

  [types.CLEAR_NOTIFICATIONS](state) {
    state.notifications = [];
    state.notificationType = 'info';
  }
}

