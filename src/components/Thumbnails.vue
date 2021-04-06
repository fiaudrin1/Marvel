<template >
    <h2>Catalogue de personnage :</h2>
    <div class="thumbnails_container">
        <div class="thumbnails_content" v-for="(character, index) in characters" :key="character"> <!--For each character displayed-->
            <router-link :to="{ name: 'character', params: {id: character.id}}"> <!--Clickable tile-->
                <img class="thumbnails_img" :src="url[index]" alt="image of {{character.name}}">
                <div class="thumbnails_contentName">
                    <p class="thumbnails_name"> {{character.name}} </p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {public_key} from '../marvel';
    import axios from 'axios'
    export default {
        name: 'Thumbnails',
        data(){
            return{
                characters: [],
                url: [], //images urls for characters
                size: 'portrait_xlarge.',  //this defines the wanted size of an image from the api
            }
        },
        mounted(){
            this.getCharacters()
        },
        methods:{
            getCharacters: function(){
                axios.get(`https://gateway.marvel.com/v1/public/characters?apikey=${public_key}&limit=20&offset=0`)
                    .then((result) => {
                        result.data.data.results.forEach((item) => { //get the first 20 character to display
                            this.characters.push(item)
                            this.url.push(`${item.thumbnail.path}/${this.size}${item.thumbnail.extension}`) //url formatting
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
    .thumbnails_content a{
        text-decoration:none
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