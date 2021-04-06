<template>
  <div class="explorer">
    <Search />
    <Thumbnails />
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue'
import Thumbnails from '@/components/Thumbnails.vue'

export default { //ajout des composants search et thumbnails dans l'explorer
  name: 'Explorer',
  components: {
    Thumbnails,
    Search
  }
}
</script>
