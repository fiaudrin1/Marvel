<template >
    <div>
        <h3>Hello characters.vue</h3>

        <ul>
            <li v-for="character in characters" :key="character">
                <router-link :to="{ name: 'character', params: {id: character.id}}">{{character.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {public_key/*, private_key*/ } from '../marvel';
    import axios from 'axios'
    export default {
        name: 'Characters',

        data(){

            return{

                characters: []
            }
        },

        mounted(){

            this.getCharacters()
        },

        methods:{

            getCharacters: function(){

                axios.get(`http://gateway.marvel.com/v1/public/characters?apikey=${public_key}&limit=10&offset=0`)
                    .then((result) => {

                        result.data.data.results.forEach((item) => {

                            //console.log(item)
                            this.characters.push(item)
                        })
                    })
                    .catch((error) => {

                        console.log(error)
                    }) 

            }
        }
    }

</script>

<style lang="css">

</style>