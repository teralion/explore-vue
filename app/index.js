import Vue from 'vue'
import { VTooltip } from 'v-tooltip'
import Copy from 'v-copy'

let users = new Vue({
  el: '#users',
  data: function() {
    return {
      shouldShowUsers: true,
      showUsersText: 'Скрыть пользователей',
      users: [
        { name: 'Pavel', lastname: 'Kudinov', patronym: 'Nazariyevich', photo: '', id: 1 },
        { name: 'Alexander', lastname: 'Kerenskiy', patronym: 'Fyodorovich', photo: '', id: 2 },
        { name: 'Lavr', lastname: 'Kornilov', patronym: 'Georgiyevich', photo: '', id: 3 },
        { name: 'Alexander', lastname: 'Kolchak', patronym: 'Vasilyevich', photo: '', id: 4 },
        { name: 'Alexander', lastname: 'Fitzhelaurov', patronym: 'Petrovich', photo: '', id: 5 },
      ];
    }
  },
  computed: {
    usersLength: function() {
      return ( this.users.length > 0 )
        ? `Всего ${ this.users.length } пользователей`
        : `Пользователей нет`
    },
  },
  methods: {
    toggleUsers: function() {
      this.showUsersText = this.shouldShowUsers
        ? 'Показать пользователей'
        : 'Скрыть пользователей';
      this.shouldShowUsers = !this.shouldShowUsers;
    },
  },
})