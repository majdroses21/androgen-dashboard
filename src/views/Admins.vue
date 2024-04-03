<template>
  <Users :title="$t('Admins')" :modal_title="$t('new admin')" type="admin">
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