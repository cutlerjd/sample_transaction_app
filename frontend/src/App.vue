<template>
  <div id="app">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand>Jase Cutler</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/">Intro</b-nav-item>
        <b-nav-item to="app">App</b-nav-item>
        <b-nav-item to="details">Details</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>