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
      visitedPages: [],
      maxUsersOnPage: 2,
      page: 1,

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
    this.loadUsersAmount();
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
      // this.users === [{id: 1, ...}, {id: 2, ...}, ..., {id: 5, ...}, {id: 6, ...} ]
      // this.visitedPages === [1, 2, 4, 5, 6]
      // this.page === 4
      // usersOffset === 2: [5, 6]

      let usersOffset = this.visitedPages
        .slice( this.visitedPages.indexOf(this.page) + 1 )
        .reduce( (acc, elem) => (
          acc + parseInt(this.usersPerPage[elem - 1])
        ), 0);

      return this.users
        .slice(0, this.users.length - usersOffset)
        .slice( -Math.abs(this.usersPerPage[this.page - 1]) )
    },
    cacheCurrentPage() {
      if ( this.visitedPages.includes(this.page) ) return;

      this.visitedPages = this.visitedPages
        .concat(this.page)
        .sort( (page1, page2) => (
          ( parseInt(page1) >= parseInt(page2) ) ? 1 : -1
        ) );
    },
    countUsersPerPage() {
      let pagesWithMaxUsers = Math.floor(
        this.totalUsers / this.maxUsersOnPage
      );

      if ( isNaN(pagesWithMaxUsers) || 
        !isFinite(pagesWithMaxUsers) 
      ) {
        console.log('---', 'pagesWithMaxUsers is not a number or Infinity!');
        return;
      }

      this.usersPerPage = this.usersPerPage
        .concat( 
          `${this.maxUsersOnPage}`
            .repeat(pagesWithMaxUsers)
            .split('')
        )
        .concat( `${this.totalUsers % this.maxUsersOnPage}` )
    },
    loadUsersAmount() {
      axios
        .get(this.countUrl)
        .then( (payload) => {
          this.totalUsers = payload.data[0].users;
          this.countUsersPerPage();
        } )
        .catch( (err) => {
          console.log('---', 'in loadUsersAmount, err: ', err);
        } )
    },
    loadUsers() {
      axios
        .get(this.usersUrl)
        .then((payload) => {
          this.users.push(...payload.data);
          this.loaded = true;
          this.users.sort( (elem1, elem2) => (
            ( parseInt(elem1.id) >= parseInt(elem2.id) ) ? 1 : -1
          ) );
        })
        .catch( (err) => {
          console.log('---', 'While fetching users,' 
            + ' error occured, error:', err);
        } )
    },
  },
};

</script>

<styles></styles>
