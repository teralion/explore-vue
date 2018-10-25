import Vue from 'vue'
import { VTooltip } from 'v-tooltip'
import Copy from 'v-copy'
import _ from 'lodash'
import asyncProducer from './asyncProducer.js'

import TitleComponent from './title.html.vue'
import LoadingComponent from './loading.html.vue'

new Vue({
  el: '#users',
  components: {
    'title-component': () => ({
      component: asyncProducer(TitleComponent),
      loading: LoadingComponent,
    }),
  },
  data: function() {
    return {
      shiftsCounter: 1,
      currentComponentName: '',
      shouldShowUsers: true,
      showUsersText: 'Скрыть пользователей',
      users: [
        { name: 'Pavel', lastname: 'Kudinov', patronym: 'Nazariyevich', photo: '', id: 1 },
        { name: 'Alexander', lastname: 'Kerenskiy', patronym: 'Fyodorovich', photo: '', id: 2 },
        { name: 'Lavr', lastname: 'Kornilov', patronym: 'Georgiyevich', photo: '', id: 3 },
        { name: 'Alexander', lastname: 'Kolchak', patronym: 'Vasilyevich', photo: '', id: 4 },
        { name: 'Alexander', lastname: 'Fitzhelaurov', patronym: 'Petrovich', photo: '', id: 5 },
      ],
    }
  },
  created: function() {
    this.getDebouncedAnswer = _.debounce(this.getAnswer, 500);
  },
  computed: {
    usersLength: function() {
      return ( this.users.length > 0 )
        ? `Всего ${ this.users.length } пользователей`
        : `Пользователей нет`
    },
  },
  methods: {
    shiftComponentName() {
      console.log('---', 'this.currentComponentName:', this.currentComponentName);
      if ( this.shiftsCounter % 2 ) this.currentComponentName = 'title-component'
      else this.currentComponentName = ''

      this.shiftsCounter++;
      return;
    },
    getTitle(...props) {
      console.log('---', 'props:', props);
    },
    getAnswer() {
      console.log("---", "Get answer!");
    },
    toggleUsers: function() {
      this.showUsersText = this.shouldShowUsers
        ? 'Показать пользователей'
        : 'Скрыть пользователей';
      this.shouldShowUsers = !this.shouldShowUsers;
    },
  },
})