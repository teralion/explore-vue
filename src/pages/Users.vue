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
      v-bind:items="getUsersToRender()"
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
          v-bind:perPage="maxUsersOnPage"
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
      usersPerPage: [],
      maxUsersOnPage: 2,
      page: 1,
      visitedPages: [],

      baseUrl: 'http://localhost:3000',
    }
  },
  computed: {
    query() {
      let p = {
        sort: `_sort=id`,
        order: `_order=asc`,
        page: `_page=${this.page}`,
        limit: `_limit=${this.maxUsersOnPage}`,
      };
      return `?${p.sort}&${p.order}&${p.page}&${p.limit}`
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
    getUsersToRender() {
      console.log('---', 'this.users: ', this.users);
      let currentPageIndexInCash = this.visitedPages.indexOf(this.page);
      let nextPageIndexInCash = currentPageIndexInCash + 1;
      let usersOffset = this.visitedPages
        .slice(nextPageIndexInCash)
        .reduce((acc, elem) => {
          let res = acc + this.usersPerPage[elem - 1];
          return res;
        }, 0);
      let usersOnCurrentPage = this.usersPerPage[this.page - 1] // First page on 0 index
      let users = this.users
        .slice(0, this.users.length - usersOffset)
        .slice(-usersOnCurrentPage);
      return users;
    },
    cacheCurrentPage() {
      if ( this.visitedPages.includes(this.page) ) return;
      this.visitedPages.push(this.page);
      this.visitedPages.sort((page1, page2) => {
        if ( parseInt(page1) >= parseInt(page2) ) return 1;
        return -1;
      });
    },
    sliceUsersOnPages() {
      let pagesWithMaxUsers = Math.floor(this.totalUsers / this.maxUsersOnPage);
      let usersOnLastPage = this.totalUsers % this.maxUsersOnPage;

      for ( let i = 0; i < pagesWithMaxUsers; i++ ) {
        // First page starts from 0 array index so far
        this.usersPerPage.push(this.maxUsersOnPage);
      }
      this.usersPerPage.push(usersOnLastPage);
    },
    loadUsersCount() {
      axios
        .get(this.countUrl)
        .then((payload) => {
          this.totalUsers = payload.data[0].users;
          this.sliceUsersOnPages();
        })
        .catch((err) => {
          console.log('---', 'in loadUsersCount, err: ', err);
        })
    },
    loadUsers() {
      axios
        .get(this.usersUrl)
        .then((payload) => {
          this.users.push(...payload.data);
          this.users.sort((elem1, elem2) => {
            if ( parseInt(elem1.id) >= parseInt(elem2.id) ) return 1
            return -1
          });
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
