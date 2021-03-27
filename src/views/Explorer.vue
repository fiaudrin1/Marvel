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

export default {
  name: 'Explorer',
  components: {
    Thumbnails,
    Search
  }
}
</script>
