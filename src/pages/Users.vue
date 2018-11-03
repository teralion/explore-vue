<template>
  <div>

    <h2>Список пользователей</h2>

    <item-list v-bind:items="users">
      <template slot="thead">
        <thead>

          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Активен</th>
            <th>Баланс</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Зарегистрирован</th>
          </tr>

        </thead>
      </template>

      <template 
        slot="trCells" 
        slot-scope="{ item }"
      >
        <td>
          <router-link
            v-bind:to="'/edit/' + item.id"
          >
            # {{ item.id }}
          </router-link>
        </td>
        <td>{{ item.firstName }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.isActive }}</td>
        <td>{{ item.balance }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.registered }}</td>
      </template>
    </item-list>

  </div>
</template>

<script>
import axios from 'axios'
import ItemList from '@/components/ItemList.vue'

export default {
  name: 'UsersPage',
  components: {
    'item-list': ItemList,
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
