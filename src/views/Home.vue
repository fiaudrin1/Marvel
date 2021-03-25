<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Characters />
    <Search />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Characters from '@/components/Characters.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Characters,
    Search
  }
}
</script>
