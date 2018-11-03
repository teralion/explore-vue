<template>
  <div>

    <div v-if="!loaded">
      <i class="fa fa-refresh fa-spin"></i>
      Загрузка...
    </div>

    <div
      v-else
      class="card"
    >

      <div class="card-header">
        <span class="pull-right">
          {{ user.id }}
        </span>
        {{ title }}
      </div>

      <div class="card-body">
        <user-form v-model='user'>
          <template slot='buttons'>

            <button 
              type="button" 
              v-on:click="save" 
              class="btn btn-success"
            >Сохранить изменения</button>
            &nbsp;
            <button 
              type="button" 
              v-on:click="remove" 
              class="btn btn-danger"
            >Удалить пользователя</button>

          </template>
        </user-form>
      </div>

    </div>

    <pre>{{ user }}</pre>

  </div>
</template>

<script>
import axios from 'axios'
import UserForm from '@/components/UserForm.vue'

export default {
  name: "EditUserPage",
  components: {
    'user-form': UserForm,
  },
  data() {
    return {
      user: {},
      loaded: false,
      restUrl: 'http://localhost:3000/users',
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    url() {
      return `${this.restUrl}/${this.id}`
    },
    title() {
      return !this.user.firstName && !this.user.lastName
        ? 'Пользователь'
        : [this.user.firstName, this.user.lastName, this.user.phone].join(' ')
    }
  },
  mounted() {
    this.loadUser();
  },
  watch: {
    '$route'(to, from) {
      this.loaded = false;
      this.loadUser();
    },
  },
  methods: {
    loadUser() {
      axios
        .get(this.restUrl)
        .then((payload) => {
          this.loaded = true;
          this.user = payload.data.find(
            (user) => user.id === parseInt(this.id)
          );
        })
        .catch((err) => {
          console.log('---', 'err:', err);
        })
    },
    save() {
      axios
        .patch(this.url, this.user)
        .then((response) => {
          this.$router.push({ path: '/list' })
        })
    },
    remove() {
      axios
        .delete(this.url)
        .then(() => {
          this.$router.push({ path: '/list' })
        })
    }
  },
};
</script>

<styles></styles>
