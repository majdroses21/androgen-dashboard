<template>
  	<Users title="Branches" button_text ="Add Branch" :headers_data="headers_data" :user_data="user_data"></Users>
</template>
<script>
import Users from '../components/Users.vue'
export default {
   components :{ Users},
   data(){
	return{
		headers_data:[
			{ text: "Name", value: "name", width:'200',height:'44' },
			{ text: "Emirate", value: "emirate", width:'200' ,height:'44' },
			{ text: "Address", value: "address", width:'500' ,height:'44' },
			{ text: "", value: "manage", width:'116' ,height:'44' },
		],
		user_data:[
				{
                  name:'ww',
                  emirate:'ww',
                  address:'ww',
               },
               {
                  name:'aww',
                  emirate:'ww',
                  address:'ww',
               },
               {
                  name:'3ww',
                  emirate:'ww',
                  address:'ww',
               },
		]
	}
   }
}
</script>

<style>

</style>