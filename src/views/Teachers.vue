<template>
   <Users title="Teachers" button_text ="Add User" :headers_data="headers_data" :user_data="user_data"></Users>
   </template>
   <script>
   import Users from '../components/Users.vue'
   export default {
      components :{ Users},
      data(){
     return{
       headers_data:[
         { text: "Name", value: "name", width:'307',height:'44' },
         { text: "Branch", value: "branch", width:'220' ,height:'44' },
         { text: "User Name", value: "userName", width:'198' ,height:'44' },
         { text: "Certificate", value: "certificate", width:'220' ,height:'44' },
         { text: "", value: "manage", width:'116' ,height:'44' },
       ],
       user_data:[
           {
             name:'ww',
             branch:'ww',
             userName:'ww',
             certificate:'jj'
           },
           {
             name:'ww',
             branch:'ww',
             userName:'ww',
             certificate:'jj'
           },
           {
             name:'ww',
             branch:'ww',
             userName:'ww',
             certificate:'jj'
           },
       ]
     }
      }
   }
   </script>
   
   <style>
   
   </style>