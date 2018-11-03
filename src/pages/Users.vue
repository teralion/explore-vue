<template>
  <div>
    <h2>Список пользователей</h2>
    <users-list 
      v-bind:users="users"
    />
  </div>
</template>

<script>
import axios from 'axios'
import UsersList from '@/components/UsersList.vue'

export default {
  name: 'UsersPage',
  components: {
    'users-list': UsersList,
  },
  data: function() {
    return {
      users: [],
    }
  },
  created() {
    this.loadUsers();
  },
  methods: {
    loadUsers() {
      axios
        .get('http://localhost:3000/users')
        .then((payload) => {
          this.users = payload.data;
        })
        .catch((err) => {
          console.log('---', 'While fetching users,' 
            + ' error occured, error:', err);
        })
    },
  },
};
</script>

<styles></styles>
