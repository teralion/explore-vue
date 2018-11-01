<template>

  <div>
    <div class="form-group">
      <label>Имя</label>
      <input 
        class="form-control" 
        type="text" 
        name="localUserName"
        v-model="localUser.firstName"
      >
    </div>

    <div class="form-group">
      <label>Фамилия</label>
      <input 
        class="form-control" 
        type="text" 
        name="localUserLastName"
        v-model="localUser.lastName"
      >
    </div>

    <div class="form-group">
      <label>Баланс</label>
      <input 
        class="form-control" 
        type="text" 
        name="localUserBalance"
        v-model="localUser.balance"
      >
    </div>

    <div class="form-group">
      <label>Телефон</label>
      <input 
        class="form-control" 
        type="text" 
        name="localUserPhone"
        v-model="localUser.phone"
      >
    </div>

    <div class="form-group">
      <label>Адрес</label>
      <input 
        class="form-control" 
        type="text" 
        name="localUserAddress"
        v-model="localUser.address"
      >
    </div>

    <div class="form-group">
      <label>Компания</label>
      <input 
        class="form-control" 
        type="text" 
        name="localUserCompany"
        v-model="localUser.company"
      >
    </div>
  </div>

</template>

<script>
import throttle from 'lodash/throttle'

export default {
  name: 'UserForm',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localUser: {}
    }
  },
  watch: {
    localUser: {
      deep: true,
      handler: function(nextVal, prevVal) {
        this.throttleInputHandler(this, nextVal);
      }
    }
  },
  created() {
    this.localUser = JSON.parse(JSON.stringify(this.user))
  },
  methods: {
    throttleInputHandler: function() {
      return throttle((self, nextVal) => {
        self.$emit('input', nextVal)
      }, 1000);
    }(),
  },
};
</script>

<style>
</style>