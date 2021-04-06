<template>
  <div class="equipes">
    <Team />
  </div>
</template>

<script>
// @ is an alias to /src
import Team from '@/components/Team.vue'

export default { //ajout du composant equipe
  name: 'Equipes',
  components: {
    Team
  }
}
</script>
