<template>
  <div id="app">
    <div id="nav" class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">Vue course app</a>
      <button 
        class="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarsExampleDefault" 
        aria-controls="navbarsExampleDefault" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div 
        class="collapse navbar-collapse" 
        id="navbarsExampleDefault"
      >
        <ul class="navbar-nav mr-auto">
          <router-link
            tag="li"
            to="/"
            active-class="active"
            class="nav-item"
            exact
          >
            <a class="nav-link" href="#">
              Home
            </a>
          </router-link>
          <router-link
            tag="li"
            to="/about"
            active-class="active"
            class="nav-item"
            exact
          >
            <a class="nav-link" href="#">
              About
            </a>
          </router-link>
          <router-link
            tag="li"
            to="/users"
            active-class="active"
            class="nav-item"
            exact
          >
            <a class="nav-link" href="#">
              Users List
            </a>
          </router-link>
          <router-link
            tag="li"
            to="/add"
            active-class="active"
            class="nav-item"
            exact
          >
            <a class="nav-link" href="#">
              Add user
            </a>
          </router-link>
        </ul>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.css";

export default {
  name: "App"
};
</script>
<style lang="stylus">
#app
  margin-top 60px
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
</style>
