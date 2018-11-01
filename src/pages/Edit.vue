<template>
  <div>
    <user-form />
    <router-link 
      v-bind:to="'/edit/' + ( this.nextUserId )"
      tag="div"
    >
      <a>#{{ this.nextUserId }}</a>
    </router-link>
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
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
    nextUserId() {
      return Number.parseInt(this.userId) + 1
    },
  },
  mounted() {
    console.log('---', 'Edit page mounted!');
  },
  methods: {
    loadUser() {

    }
  }
};
</script>

<styles></styles>
