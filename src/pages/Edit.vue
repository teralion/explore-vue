<template>
  <div>
    <div v-if="!loaded">
      <i class="fa fa-refresh fa-spin"></i>
      Загрузка...
    </div>
    <user-form
      v-else 
      v-bind:user="user"
      v-on:input="value => user = value"
    />
    <button type="button" v-on:click="save" class="btn btn-success">
      Сохранить
    </button>
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
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
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
        .get('http://localhost:3000/users')
        .then((payload) => {
          this.loaded = true;
          this.user = payload.data.find((user) => user.id === parseInt(this.id));
        })
        .catch((err) => {
          console.log('---', 'err:', err);
        })
    },
    save() {
      axios
        .patch(`http://localhost:3000/users/${this.id}`, this.user)
        .then((response) => {
          this.$router.push({ path: '/list'})
        })
    }
  },
};
</script>

<styles></styles>
