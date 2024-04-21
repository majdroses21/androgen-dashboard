<template>
  <div class="container-fluid error-box">
    <div class="error-box-content">
      <Error class="error-img"></Error>
      <div class="error-title">
        {{ $t('Page Not found') }}
      </div>
     <router-link to="/">
       <button type="button" class="back-button">{{ $t('Back') }}</button>
     </router-link>
    </div>
  </div>
</template>

<script>
import Error from './Error.vue';
import { _t } from '../helpers';

export default {
  data(){

  },
  components:{Error}

}
</script>

<style>
.error-box {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(66,106,179);
    background: linear-gradient(180deg, rgba(66,106,179,1) 34%, rgba(51,51,51,1) 100%);
    flex-direction: column;
}
.error-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  position: absolute;
  bottom: 114px;
}
.error-box-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-bottom: 32px;
}
.back-button {
  background-color: var(--primary-color);
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 32px;
  border: none;
  border-radius: 30px;
  /* margin-top: 32px; */
}
.back-button:hover {
  background-color: var(--hover-color);
}
.error-img {
  max-width: 100%;
}
</style>