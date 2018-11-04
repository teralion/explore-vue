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
      v-bind:items="usersToRender"
    >
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

      <template slot="paginator">
        <rows-paginator 
          v-bind:total="totalUsers"
          v-bind:perPage="usersPerPage"
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
      usersPerPage: 5,
      page: 1,
      visitedPages: [],

      baseUrl: 'http://localhost:3000',
    }
  },
  computed: {
    usersToRender() {
      let startIndex = (this.page - 1) * this.usersPerPage;
      let endIndex = this.page * this.usersPerPage;
      return this.users.slice(
        startIndex,
        endIndex
      );
    },
    query() {
      let p = {
        start: `_start=0`,
        end: `_end=${this.page * this.usersPerPage}`
      };

      return `?${p.start}&${p.end}`
    },
    usersUrl() {
      return `${this.baseUrl}/users/${this.query}`
    },
    countUrl() {
      return `${this.baseUrl}/count`
    }
  },
  created() {
    this.cacheCurrentPage();
    this.loadUsersCount();
    this.loadUsers();
  },
  watch: {
    page() {
      if ( this.visitedPages.includes(this.page) ) return;
      this.loaded = false;
      this.cacheCurrentPage();
      this.loadUsers();
    },
  },
  methods: {
    cacheCurrentPage() {
      if ( this.visitedPages.includes(this.page) ) return;
      this.visitedPages.push(this.page);
    },
    loadUsersCount() {
      axios
        .get(this.countUrl)
        .then((payload) => {
          this.totalUsers = payload.data[0].users;
        })
        .catch((err) => {
          console.log('---', 'in loadUsersCount, err: ', err);
        })
    },
    loadUsers() {
      axios
        .get(this.usersUrl)
        .then((payload) => {
          this.users = [...payload.data];
          if ( !this.loaded ) this.loaded = true;
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
