<template >
    <div id="search_content">
        <div id="search_ContainerInputBloc">  
            <input id="search_input" type="text">
            <button id="search_submit" class="search_CallToAction" type="button" v-on:click="getCharactersSearch()">
                Rechercher
            </button>
        </div>
        <div id="search_ContainerByRandom">
            <button id="search_random" class="search_CallToAction" type="button" v-on:click="get10CharactersRandom()" >
                Découvrir 10 Super Héros
            </button>
        </div>
    </div>
    <h2>Liste de personnages aléatoire :</h2>
    <ul id="randContainer">
        <li v-for="character in characters" :key="character">
            <router-link :to="{ name: 'character', params: {id: character.id}}"> <!--Makes all tiles clickable to get informations-->
                <img class="thumbnails_img" :src="character.thumbnail.path+'/portrait_xlarge.'+character.thumbnail.extension" alt="image of {{character.name}}">
                <p>{{character.name}}</p>
            </router-link>
        </li>
    </ul>
</template>

<script>
    import {public_key } from '../marvel';
    import axios from 'axios'
    export default {
        name: 'Search',
        data(){
            return{
                characters: []
            }
        },
        methods:{
            get10CharactersRandom: function(){
                this.characters = [] //resets characters at each call
                axios.get(`http://gateway.marvel.com/v1/public/characters?apikey=${public_key}&limit=1&offset=0`) //get the number of characters in the database
                .then((result) => {
                    let nbCharacters = result.data.data.total
                    let randomChar;
                    for(let i = 0; i <= 9; i++){ //get 10 different characters
                        randomChar = Math.round(Math.random()*nbCharacters)
                        axios.get(`http://gateway.marvel.com/v1/public/characters?apikey=${public_key}&limit=1&offset=${randomChar}`)
                        .then((result) => {
                            result.data.data.results.forEach((character) => {
                                this.characters.push(character)
                            })
                        })
                        .catch((error) => {
                            console.log(error)
                        }) 
                    }
                })
                .catch((error) => {
                    console.log(error)
                }) 
            },

            getCharactersSearch: function(){
                this.characters = [] // removes characters at each call
                let input = document.getElementById("search_input").value
                axios.get(`http://gateway.marvel.com/v1/public/characters?apikey=${public_key}&limit=1&offset=0`) //get number of chracter in the database
                .then((result) => {
                    let nbCharacters = result.data.data.total
                    let nbLoops = Math.ceil(nbCharacters / 100);
                    let offset = 0;
                    for(let i = 0; i < nbLoops; i++){ //loop to allow to search in all the character list (it's supposed to search 100 by 100)
                        axios.get(`http://gateway.marvel.com/v1/public/characters?apikey=${public_key}&limit=100&offset=${offset}`)
                        .then((result) => {
                            result.data.data.results.forEach((character) => { //search loop
                                if(character.name.toLowerCase().includes(input.toLowerCase())){
                                    this.characters.push(character)
                                }else if(character.description.toLowerCase().includes(input.toLowerCase())){
                                    this.characters.push(character)
                                }
                            })
                        })
                        .catch((error) => {
                            console.log(error)
                        }) 
                        offset += 100;
                    }
                })
                .catch((error) => {
                    console.log(error)
                }) 
            }
        }
    }

</script>

<style>
    #search_content{
        display: flex;
        border: 3px solid #ed1d24;
        border-radius: 40px;
        padding: 4rem 0rem;
    }
    #search_ContainerByRandom, #search_ContainerInputBloc{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #search_ContainerInputBloc{
        border-right: 3px solid #ed1d24;
        flex-direction: column;
    }
    .search_CallToAction{
        text-decoration: none;
        padding: 0.5rem 1.5rem;
        background-color: red;
        color: white;
        font-weight: bold;
        font-size: 1.2rem;
        text-transform: uppercase;
        border-color:transparent;
        cursor: pointer;
    }   
    .search_CallToAction:hover{
        background-color:#A00;
    }
    #search_input{
        width: 60%;
        margin-top: 1.5rem;
    }
    #search_submit{
        width: 45%;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }
    #search_ContainerByRandom button{
        width: 50%;
    }
    #randContainer{
        display:flex;
        justify-content:center;
        padding:0 10%;
        width:80%;
        flex-wrap:wrap;
        list-style-type:none;
        background-color:#1e1e1e50;
        border-radius: 25px;
        padding-top:5%;
        padding-bottom:5%;
    }
    #randContainer li{
        width:20%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
    }
    #randContainer p,#randContainer a{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        color:white;
        text-decoration:none;
        font-weight:bold;
    }
</style>