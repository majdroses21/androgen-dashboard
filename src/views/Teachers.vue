<template>
   <Users :title="$t('Teachers')" :modal_title="$t('new teacher')" type="teacher"></Users>
   </template>
   <script>
   import Users from '../components/Users.vue'
   export default {
      components :{ Users},
   }
   </script>
   
   <style>
   
   </style>