<!-- Компонент формы пользователя (для редактирования, добавления) -->

<template>
  <div>

    <div 
      class="form-group"
      :class=" errors.has('firstName')
        ? 'has-error'
        : '' "
    >
      <label>Имя</label>
      <input 
        class="form-control" 
        type="text" 
        name="firstName"
        v-validate="'required'"
        v-model="localUser.firstName"
      >
      <span
        v-show="errors.has('firstName')"
        class="help-block text-danger"
      >
        {{ errors.first('firstName') }}
      </span>
    </div>

    <div 
      class="form-group"
      :class=" errors.has('lastName')
        ? 'has-error'
        : '' "
    >
      <label>Фамилия</label>
      <input 
        class="form-control" 
        type="text" 
        name="lastName"
        v-validate="'required'"
        v-model="localUser.lastName"
      >
      <span
        v-show="errors.has('lastName')"
        class="help-block text-danger"
      >
        {{ errors.first('lastName') }}
      </span>
    </div>

    <div
      class="form-group"
      :class=" errors.has('email')
        ? 'has-error'
        : '' "
    >
      <label>Email</label>
      <input 
        type="text" 
        name="email"
        v-validate="'required|email'"
        v-model="localUser.email"
        class="form-control"
      >
      <span
        v-show="errors.has('email')"
        class="help-block text-danger"
      >
        {{ errors.first('email') }}
      </span>
    </div>

    <div class="form-group">
      <label>URL картинки</label>
      <avatar-uploader v-model="localUser.picture" />
    </div>

    <div 
      class="form-group"
      :class=" errors.has('balance')
        ? 'has-error'
        : '' "
    >
      <label>Баланс</label>
      <input 
        class="form-control" 
        type="text" 
        name="balance"
        v-validate="'required'"
        v-model="localUser.balance"
      >
      <span
        v-show="errors.has('balance')"
        class="help-block text-danger"
      >
        {{ errors.first('balance') }}
      </span>
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

    <slot name='buttons' />

  </div>
</template>

<script>

import Vue from 'vue'
import throttle from 'lodash/throttle'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

export default {
  name: 'UserForm',
  inject: ['$validator'],
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  components: {
    AvatarUploader: () => import('@/components/AvatarUploader.vue')
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
    this.localUser = JSON.parse(JSON.stringify(this.value))
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
