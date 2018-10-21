let users = new Vue({
  el: '#users',
  data: function() {
    return {
      shouldShowUsers: null,
      showUsersText: '',
      users: [],
    }
  },
  created: function() {
    this.initMeta();
    this.initUsers();
  },
  computed: {
    usersLength: function() {
      return ( this.users.length > 0 )
        ? `Всего ${ this.users.length } пользователей`
        : `Пользователей нет`
    },
  },
  methods: {
    initMeta: function() {
      this.shouldShowUsers = true;
      this.showUsersText = 'Скрыть пользователей';
    },
    initUsers: function() {
      this.users = [
        { name: 'Pavel', lastname: 'Kudinov', patronym: 'Nazariyevich', photo: '', id: 1 },
        { name: 'Alexander', lastname: 'Kerenskiy', patronym: 'Fyodorovich', photo: '', id: 2 },
        { name: 'Lavr', lastname: 'Kornilov', patronym: 'Georgiyevich', photo: '', id: 3 },
        { name: 'Alexander', lastname: 'Kolchak', patronym: 'Vasilyevich', photo: '', id: 4 },
        { name: 'Alexander', lastname: 'Fitzhelaurov', patronym: 'Petrovich', photo: '', id: 5 },
      ];
    },
    toggleUsers: function() {
      this.showUsersText = this.shouldShowUsers
        ? 'Показать пользователей'
        : 'Скрыть пользователей';
      this.shouldShowUsers = !this.shouldShowUsers;
    },
  },
})