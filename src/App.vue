<template>
  <div id="app">
    <nav>
      <router-link to="/login">Logi sisse</router-link> |
      <router-link to="/main">Minu menüüd ja ostunimekirjad</router-link> |
      <router-link to="/add-to-menu">Vaata kõiki retsepte</router-link> |
      <router-link to="/addRecipe">Lisa uus retsept</router-link> |
      <router-link to="/create_menu">Koosta uus menüü</router-link> |
      <router-link to="/logout">Logi välja</router-link> |

    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
