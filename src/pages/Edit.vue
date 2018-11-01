<template>
  <div>
    <user-form />
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
      userId: '',
    }
  },
  created() {
    console.dir(this);
  },
};
</script>

<styles></styles>
