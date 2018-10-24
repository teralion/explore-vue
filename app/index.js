import Vue from 'vue'
import { VTooltip } from 'v-tooltip'
import Copy from 'v-copy'
import _ from 'lodash'

let titleComponent = {
  props: ['title'],
  template: `
    <div>
      <div>
        {{ title }}
      </div>
      <button 
        type="button" 
        v-on:click="$emit('get-title', $event, title)"
      >
        Показать title
      </button>
    </div>
  `,
}

let users = new Vue({
  el: '#users',
  components: {
    'title-component': titleComponent,
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