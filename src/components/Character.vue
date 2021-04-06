<template >
    <div id="characterDetails">
        <p id="charID">{{this.$route.params.id}}</p>
        <ul>
            <li v-for="char in character" :key="char"><!--just in case there are more than one character id in the character var-->
                <div class="detailedChar_InfosContainer">
                    <div class="detailedChar_InfosCharContainer">
                        <div class="detailedChar_InfosGen">
                            <p class="detailedChar_Title"> {{char.name}} </p> <!--character name-->
                            <img class="detailedChar_Img" :src="url" alt="image of {{char.name}}"> <!--character image-->
                        </div>
                        <div class="detailedChar_BlocDesc">
                            <p class="detailedChar_Title"> Description </p>
                            <p class="detailedChar_Desc" v-if="Object.keys(char.description).length !== 0"> {{char.description}} </p> <!--character description-->
                            <p class="detailedChar_Desc" v-if="Object.keys(char.description).length === 0">No description provided.</p><!--if there are no desscriptions available-->
                            <a class="detailedChar_addBtnTeam" href="#" v-on:click="saveCharacter()">Ajouter à l'équipe</a><!--add a character to the current team-->
                        </div>
                    </div>
                    <div class="detailedChar_ComicsContainer" v-if="Object.keys(firstAndLastApparitionComics).length !== 0"><!--character appearances-->
                        <div class ="detailedChar_ComicsApparitions" v-for="(comic, key) in firstAndLastApparitionComics" :key="comic"> 
                            <h3 class="detailedChar_Title" v-if="key == 0">Première apparition</h3>
                            <h3 class="detailedChar_Title" v-else>Dernière apparition</h3><!--if th ekey isn't its first appearance we display its last one-->
                                <div class="detailedChar_comicsInfosGen">
                                    <p>{{comic.title}}</p>
                                    <p class="detailedChar_Dates">{{comic.dates[0].date}}</p>
                                </div>
                                <p>{{comic.description}}</p>
                        </div>
                    </div>
                    <!--while appearances information are loading or if no appearance were found-->
                    <p v-else style="margin-left:11%">Checking for comic book appearances in progress (this operation may take some time)... If this space is not replaced soon, it is very likely that no comic book appearance of this character has been referenced.</p>
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
                firstAndLastApparitionComics: [],//contains only first and last appearances
                url: '', //image url
                size: 'portrait_xlarge.jpg', //in image urls to define the wanted size
            }
        },
        mounted(){
            this.getCharacter()
            this.getFirstAndLastApparitionComics()
        },
        methods: {
            saveCharacter:function(){
                if (localStorage.team) { //if the localstored team exists
                    this.characterTeam = localStorage.team
                    this.obj=JSON.parse(this.characterTeam)

                    //verifiy if this character is not already in the team
                    let isUnique = true 
                    for(let i=0;i<this.obj.length;i++){
                        if(this.obj[i]===this.$route.params.id) isUnique=false
                    }
                    if(isUnique) this.obj.push(this.$route.params.id) //add the new character

                    localStorage.team=JSON.stringify(this.obj) //used to update the locally stored team
                }
                else{
                    this.obj=[] //if there are no locally stored teams yet
                    this.obj.push(this.$route.params.id)
                    localStorage.team=JSON.stringify(this.obj) //add to localstorage
                }
            },
            getCharacter: function(){
                var characterId = this.$route.params.id
                axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${public_key}&limit=10&offset=0`)
                    .then((result) => {
                        result.data.data.results.forEach((item) =>{
                            this.character.push(item)
                            this.url = `${item.thumbnail.path}/${this.size}` //get character's details
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            getFirstAndLastApparitionComics: async function(){ 
                //getting all character's appearances
                var characterId = this.$route.params.id
                await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${public_key}&limit=100&offset=0`)
                    .then((result) => {
                        result.data.data.results.forEach((comic) =>{
                            this.allApparitionComics.push(comic);
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                //this part is made to sort the appearances to get only th first and the last one
                let i = 0;
                let firstApparitionComic;
                let lastApparitionComic;
                this.allApparitionComics.forEach((comic) =>{
                    if( i == 0) {
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
                //definitive setting of character's appearance
                if(i > 0)this.firstAndLastApparitionComics = [firstApparitionComic, lastApparitionComic] 
                else this.firstAndLastApparitionComics = firstApparitionComic
            }
        
        }
    }

    
    
</script>

<style>
#charID{
    display:none
}
#characterDetails{
    margin-top:10%;
}
ul, li{
    list-style: none;
    padding: 0;
    margin: 0;
}
.detailedChar_InfosContainer{
}
.detailedChar_Title{
    font-weight: bold;
    font-size: 1.2rem;
}
.detailedChar_InfosCharContainer{
    display: flex;
}
.detailedChar_InfosGen{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.detailedChar_InfosGen, .detailedChar_BlocDesc{
    width: 50%;
}
.detailedChar_BlocDesc{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}
.detailedChar_Desc{
    width: 90%;
    text-align:center;
    margin-bottom: 2.5rem;
}
.detailedChar_addBtnTeam{
    text-decoration: none;
    padding: 0.5rem 1.5rem;
    background-color: #ed1d24;
    color: white;
    font-weight: bold;
    font-size: 1.5em;
    text-transform: uppercase;
}
.detailedChar_ComicsContainer{
    margin-top:10%;
    display:flex;
    width:100%;
    justify-content: space-between;
}
.detailedChar_ComicsApparitions{
    width: 47%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}
.detailedChar_comicsInfosGen{
    width: 95%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}
.detailedChar_ComicsApparitions p{
    text-align:center;
}
</style>