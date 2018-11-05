<template>
  <div>

    <h2>Список пользователей</h2>

    <div 
      v-if="!loaded"
      class="alert alert-warning"
    >
      Загрузка...
    </div>
    <item-list
      v-else
      v-bind:items="users"
    >
      <template slot="thead">
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

      <template slot="paginator">
        <rows-paginator 
          :total="totalUsers"
          :perPage="maxUsers"
          v-model.number="page"
        />
      </template>
    </item-list>

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
      loaded: false,

      users: [],
      totalUsers: 0,
      maxUsers: 2,
      page: 1,

      baseUrl: 'http://localhost:3000',
    }
  },
  created() {
    this.loadUsers();
  },
  watch: {
    page() {
      this.loaded = false;
      this.loadUsers();
    },
  },
  methods: {
    loadUsers() {
      axios
        .get(`${this.baseUrl}/users/`, {
          params: {
            '_sort': 'id',
            '_order': 'asc',
            '_page': this.page,
            '_limit': this.maxUsers,
          }
        })
        .then( (payload) => {
          this.totalUsers = +payload.headers['x-total-count'];
          this.users = [...payload.data];
          this.loaded = true;
        } )
        .catch( (err) => {
          console.log('---', 'err: ', err);
        } )
    },
  },
};

</script>

<styles></styles>
