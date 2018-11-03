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
              Главная
            </a>
          </router-link>
          <router-link
            tag="li"
            to="/list"
            active-class="active"
            class="nav-item"
            exact
          >
            <a class="nav-link" href="#">
              Список пользователей
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
              Добавить пользователя
            </a>
          </router-link>
        </ul>
      </div>
    </div>
    <main
      id="app"
      role="main"
      class="container"
    >
      <router-view />
    </main>
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
</style>
