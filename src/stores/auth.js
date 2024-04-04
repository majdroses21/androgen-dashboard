import { defineStore } from 'pinia'

const resource = JSON.parse(localStorage.getItem('resource'));
const user = JSON.parse(localStorage.getItem('user'));

export const useAuthStore = defineStore('auth', {
    state: () => {
        return user
            ? { loggedIn: true , user }
            : { loggedIn: false , user: null};
    },
    actions: {
        refreshState(user){
            this.user=user
        },
        loginSave(user) {
            this.user = user
            this.loggedIn = true
        },
        logout() {
            this.user = null
            this.loggedIn = false 
        },
        remove_user(){
            this.user = null;
            this.loggedIn = false;
        }
    },
  })
  