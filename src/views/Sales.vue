<template>
  <Users :title="$t('Sales')" :modal_title="$t('sales employee')" type="sale"></Users>
  </template>
  <script>
  import Users from '../components/Users.vue'
  export default {
     components :{ Users},
  }
  </script>
  
  <style>
  
  </style>