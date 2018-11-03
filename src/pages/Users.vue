<template>
  <div>

    <h2>Список пользователей</h2>

    <item-list v-bind:items="usersToRender">
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

    <rows-paginator 
      v-bind:total="totalUsers"
      v-bind:perPage="usersPerPage"
      v-model="page"
    />
  </div>
</template>

<script>

import axios from 'axios'
import ItemList from '@/components/ItemList.vue'
import RowsPaginator from '@/components/RowsPaginator.vue'

export default {
  name: 'UsersPage',
  components: {
    'item-list': ItemList,
    'rows-paginator': RowsPaginator,
  },
  data: function() {
    return {
      users: [],
      usersPerPage: 5, // Initial value for development
      page: 1, // Initial value for development
    }
  },
  computed: {
    totalUsers() {
      return this.users.length;
    },
    usersToRender() {
      return this.users.slice(
        (this.page - 1) * this.usersPerPage,
        this.page * this.usersPerPage
      )
    },
  },
  watch: {
    page(nextVal, prevVal) {
      console.log('---', 'on page change, nextVal: ', nextVal);
    },
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
