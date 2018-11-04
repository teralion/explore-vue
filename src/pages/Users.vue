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
      let startId = (this.page - 1) * this.usersPerPage;
      let endId = this.page * this.usersPerPage;

      return this.users.reduce((acc, elem, index) => {
        if ( ( parseInt(elem.id) >= startId ) && 
          ( parseInt(elem.id) <= endId )
        ) return acc.concat(elem);

        // To borrow items further if there is a gap between them
        if ( ( acc.length < this.usersPerPage ) && 
          ( elem.id >= endId )
        ) return acc.concat(elem);

        return acc;
      }, [])
    },
    query() {
      let p = {
        sort: `_sort=id`,
        order: `_order=asc`,
        page: `_page=${this.page}`,
        limit: `_limit=${this.usersPerPage}`,
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
