<template >
    <div>
        <h3>Hello character.vue</h3>
        <p>{{this.$route.params.id}}</p>

    <ul>
        <li v-for="char in character" :key="char">
            <div class="detailedChar_InfosContainer">
                <div class="detailedChar_InfosCharContainer">
                    <div class="detailedChar_InfosGen">
                        <p class="detailedChar_Title"> {{char.name}} </p>
                        <img class="detailedChar_Img" :src="url" alt="image of {{char.name}}"> <!-- TODO : Si plusieurs images, faire carroussel automatique -->
                    </div>
                    <div class="detailedChar_BlocDesc">
                        <p class="detailedChar_Title"> Description </p>
                        <p class="detailedChar_Desc"> {{char.description}} </p>
                        <a class="detailedChar_addBtnTeam" href="#">Ajouter</a>
                    </div>
                </div>

                <div class="detailedChar_ComicsContainer">
                    <div class ="detailedChar_ComicsApparitions" v-for="(comic, key) in firstAndLastApparitionComics" :key="comic"> 
                        <h3 class="detailedChar_Title" v-if="key == 0">Première apparition</h3>
                        <h3 class="detailedChar_Title" v-else>Dernière apparition</h3>
                            <div class="detailedChar_comicsInfosGen">
                                <p>{{comic.title}}</p>
                                <p class="detailedChar_Dates">{{comic.dates[0].date}}</p>
                            </div>
                            <p>{{comic.description}}</p>
                    </div>
                </div>

            </div>
        </li>
    </ul>

    

    </div>
</template>

<script>
    import {public_key} from '../marvel'
    import axios from 'axios'

    export default {
        name: 'Character',

        data(){

            return {
                character: [],
                allApparitionComics: [],
                firstAndLastApparitionComics: [],
                url: '',
                size: 'portrait_xlarge.jpg',
            }
        },

        mounted(){

            this.getCharacter()
            this.getFirstAndLastApparitionComics()
        },

        methods: {

            getCharacter: function(){

                var characterId = this.$route.params.id

                axios.get(`http://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${public_key}&limit=10&offset=0`)
                    .then((result) => {

                        result.data.data.results.forEach((item) =>{

                            this.character.push(item)

                            this.url = `${item.thumbnail.path}/${this.size}`
                        })
                    })
                    .catch((error) => {
                    
                        console.log(error)
                    })
            },


            getFirstAndLastApparitionComics: async function(){

                var characterId = this.$route.params.id
                
                //await axios.get(`http://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${public_key}&limit=100&offset=0`)
                await axios.get(`http://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${public_key}&limit=100&offset=0`)
                    .then((result) => {
                        console.log(result)

                        result.data.data.results.forEach((comic) =>{

                            this.allApparitionComics.push(comic);
                        })
                        console.log("this.allApparitionComics")
                        console.log(this.allApparitionComics)
                    })
                    .catch((error) => {
                        console.log(error)
                    })

                let i = 0;

                let firstApparitionComic;
                let lastApparitionComic;


                this.allApparitionComics.forEach((comic) =>{
                        
                    if( i == 0) {
                        console.log("initialisation first and last comics")
                        firstApparitionComic = comic;
                        lastApparitionComic = comic;                                
                    }
                    if(comic.dates[0].date < firstApparitionComic.dates[0].date ){
                        firstApparitionComic = comic
                    }
                    if(comic.dates[0].date > lastApparitionComic.dates[0].date ){
                        lastApparitionComic = comic
                    }
                    i++;
                })
                                        
                if(i > 0){
                    this.firstAndLastApparitionComics = [firstApparitionComic, lastApparitionComic]
                } else {
                    this.firstAndLastApparitionComics = firstApparitionComic
                }
                console.log("firstAndLastApparitionComics")
                console.log(this.firstAndLastApparitionComics)
            }
        
        }
    }

    
    
</script>

<style lang="css">

ul, li{
    list-style: none;
    padding: 0;
    margin: 0;
}

.detailedChar_InfosContainer{
    border: 1px solid black;
}

.detailedChar_Title{
    font-weight: bold;
    font-size: 1.2rem;
}

.detailedChar_InfosCharContainer{
    display: flex;
}

.detailedChar_InfosGen{
    border-right: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.detailedChar_InfosGen, .detailedChar_BlocDesc{
    width: 50%;
}

.detailedChar_Desc{
    width: 90%;
    margin-left: 10%;
    margin-bottom: 2.5rem;
}
.detailedChar_addBtnTeam{
    text-decoration: none;
    padding: 0.5rem 1.5rem;
    background-color: #ed1d24;
    color: white;
    font-weight: bold;
    font-size: 2rem;
    text-transform: uppercase;
    margin-left:20%;
}

.detailedChar_ComicsContainer{
    display:flex;
    justify-content: space-between;
}
.detailedChar_ComicsApparitions{
    width: 50%;
}
.detailedChar_comicsInfosGen{
    width: 95%;
}
</style>