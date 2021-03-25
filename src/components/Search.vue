<template >
    <div id="search_Container">
        <h3>Hello search.vue</h3>
        <div id="search_content">
            <div id="search_ContainerInputBloc">  
                <input id="search_input" type=textField>
                <button id="search_submit" class="search_CallToAction" type="button">
                    Rechercher
                </button>
            </div>
            <div id="search_ContainerByRandom">
                <button id="search_random" class="search_CallToAction" type="button" v-on:click="get10CharactersRandom()" >
                    Découvrir 10 Super Héros
                </button>
            </div>
        </div>

        

    </div>
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

        mounted(){

            //this.get10CharactersRandom()
        },

        methods:{

            get10CharactersRandom: function(){

                this.characters = [] // remove characters at each call

                axios.get(`http://gateway.marvel.com/v1/public/characters?apikey=${public_key}&limit=1&offset=0`)
                .then((result) => {
                    let nbCharacters = result.data.data.total
                    let randomChar;


                    for(let i = 0; i <= 9; i++){
                        randomChar = Math.round(Math.random()*nbCharacters)
                        console.log(randomChar)

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

                console.log(this.characters)
            }
        }
    }

</script>

<style lang="css">
    #search_content{
        display: flex;
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
        background-color: #ed1d24;
        color: white;
        font-weight: bold;
        font-size: 1.2rem;
        text-transform: uppercase;
        border-color:transparent;
        cursor: pointer;
    }   
    #search_input{
        width: 60%;
        margin-top: 1.5rem;
        border-radius: 15px;
    }
    #search_submit{
        width: 45%;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    #search_ContainerByRandom button{
        width: 50%;
        
    }
    
</style>