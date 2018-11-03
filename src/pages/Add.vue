<template>
  <div>
    <user-form 
      v-model='newUser'
    />
    <button 
      type="button" 
      v-on:click="addUser" 
      class="btn btn-success"
    >Добавить пользователя</button>
    <pre>{{ newUser }}</pre>
  </div>
</template>

<script>

import UserForm from '@/components/UserForm.vue'
import axios from 'axios'

const defaultUser = {
  firstName: '',
  lastName: '',
  company: '',
  isActive: false,
  balance: null,
  phone: '',
  address: '',
}

export default {
  name: 'AddUserPage',
  components: {
    'user-form': UserForm,
  },
  data() {
    return {
      newUser: defaultUser,
      url: 'http://localhost:3000/users/'
    }
  },
  methods: {
    addUser() {
      axios
        .post(this.url, this.newUser)
        .then(() => {
          this.$router.push({ path: '/list' })
        })
    }
  }
};
</script>

<style>
</style>
