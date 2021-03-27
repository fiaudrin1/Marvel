<template >
    <div class="thumbnails_container">
        <div class="thumbnails_content" v-for="(character, index) in characters" :key="character">
            <router-link :to="{ name: 'character', params: {id: character.id}}">
                <img class="thumbnails_img" :src="url[index]" alt="image of {{character.name}}"> <!-- TODO : Si plusieurs images, faire carroussel automatique -->
                <div class="thumbnails_contentName">
                    <p class="thumbnails_name"> {{character.name}} </p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {public_key/*, private_key*/ } from '../marvel';
    import axios from 'axios'
    export default {
        name: 'Thumbnails',

        data(){

            return{

                characters: [],
                url: [],
                size: 'portrait_xlarge.',
            }
        },

        mounted(){

            this.getCharacters()
        },

        methods:{

            getCharacters: function(){

                axios.get(`http://gateway.marvel.com/v1/public/characters?apikey=${public_key}&limit=20&offset=0`)
                    .then((result) => {

                        result.data.data.results.forEach((item) => {

                            console.log("item")
                            console.log(item)
                            console.log(`${item.thumbnail.path}/${this.size}`)
                            this.characters.push(item)

                            this.url.push(`${item.thumbnail.path}/${this.size}${item.thumbnail.extension}`)
                        })
                        console.log(this.url)
                    })
                    .catch((error) => {

                        console.log(error)
                    }) 

            }
        }
    }

</script>

<style lang="css">
    .thumbnails_container{
        background-color: #1e1e1ea1;
        border-radius: 25px;
    }
    .thumbnails_container{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .thumbnails_content{
        display: flex;
        flex-direction: column;
        margin: 30px;
    }
    
    .thumbnails_content{
        display: flex;
        flex-wrap: wrap;
        background-color: #1e1e1ea1;
        width: 150px;
    }
    .thumbnails_name{
        color: white;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2rem;
        align-items: center;
        max-width: 100px;
    }
    .thumbnails_contentName{
        display: flex;
        justify-content: center;
    }

</style>