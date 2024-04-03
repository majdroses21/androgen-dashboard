<template>
  <Users :title="$t('Operations')" :modal_title="$t('operation employee')"  type="operation">
  </Users>
</template>
  <script>
  import Users from '../components/Users.vue'
  export default {
     components :{ Users},
  }
  </script>
  
  <style>
  
  </style>