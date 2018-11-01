<template>
  <div>
    <div 
      v-if="!this.total"
      class="alert alert-warning" 
    >
      Загрузка...
    </div>
    <table
      v-else
      class="table table-hover"
    >
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
      <tbody>
        <tr 
          v-for="user in users"
          v-bind:key="user._id"
        >
          <td>
            <router-link
              v-bind:to="'/edit/' + user.index"
            >
              # {{ user.index }}
            </router-link>
          </td>
          <td>{{ user.name.first }}</td>
          <td>{{ user.name.last }}</td>
          <td>{{ user.isActive }}</td>
          <td>{{ user.balance }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.registered }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="8">
            Всего пользователей: {{ this.total }}
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UsersList',
  props: {
    users: {
      type: Array,
      required: true,
      default: []
    }
  },
  computed: {
    total: function() {
      return this.users.length
    },
  }
};
</script>

<style>
</style>