<template>
    <div class=teamComponent>
        <h1>Votre équipe "{{teamName}}" :</h1>
        <form @submit="updateName()"> <!--Call function on form submit-->
            <input type=text v-model.lazy="teamName" required> <!--Binding this field to a component var in lazy mode to update only on submit-->
            <input class=eqpFormBtn type=submit value="Renommer équipe">
        </form>
        <div class=TeamList>
            <div class=teamMember v-for="(member,index) in team" :key="index"> <!--Loop to display all team members-->
                <a :href="'/character/'+member">{{ member }}</a>
                <p>{{ membersName[index] }}</p>
                <p class=teamDel v-on:click="remove(index)">Supprimer</p> <!--call function on click-->
            </div>
        </div>
        <div class=btnsEqp> <!--Team controls-->
            <p class=mainBtnEqp v-on:click="removeTeam()">Supprimer l'équipe</p> <!--Call remove team function on click-->
            <p class=mainBtnEqp v-on:click="newTeam()">Nouvelle équipe</p> <!--Call create a new team function on click-->
            <p v-if="checkPrevious()" class=mainBtnEqp v-on:click="restore()">Restaurer équipe précédente</p> <!--Show if there is an older team backuped, will trigger restore function onclick-->
        </div>
        <p>Votre équipe est actuellement sauvegardée dans le LocalStorage de votre navigateur.</p>
        <p>En créant une nouvelle équipe, l'équipe précédente pourra être restaurée.</p>
        <p>Enfin, restaurer une équipe placera votre équipe actuelle comme équipe précédente, pouvant être restaurée à son tour.</p>
    </div>
</template>

<script>
    import {public_key} from '../marvel'//imports
    import axios from 'axios'

    export default {
        name: 'Team',
        data(){
            return { //component's attributes
                team: [],
                membersName: [],
                teamName:[],
            }
        },
        mounted(){
            this.getTeam() //triggered on component load
        },
        methods: {
            getTeam: function(){ //retrieve team data from localstorage
                if(!localStorage.team){ //if there are no current team create it
                    this.obj=[]
                    localStorage.team=JSON.stringify(this.obj)
                }
                if(!localStorage.teamName) localStorage.teamName=JSON.stringify("NewTeam") //if there is no current teamName in LocalStorage, create it
                
                this.team=JSON.parse(localStorage.team) //copy data from localStorage 
                this.teamName=JSON.parse(localStorage.teamName)
                
                this.membersName=[] //reset teamNames
                for(let i=0;i<this.team.length;i++){
                    this.getMemberName(this.team[i]) //foreach team member, get its name
                }
            },
            getMemberName: function(id){ //return the name associated to a character ID
                axios.get(`http://gateway.marvel.com/v1/public/characters/${id}?apikey=${public_key}&limit=1&offset=0`)
                    .then((result) => {
                        let name=result.data.data.results[0].name

                        let isUnique=true //Check if the name is not already ion the list (just in case)
                        for(let i=0;i<this.membersName.length;i++){
                            if(this.membersName[i]===name) isUnique = false
                        }

                        if(isUnique) this.membersName.push(name) //push the name in the component's membersName array if unique
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            remove(index){ //removes a team member 
                this.team.splice(index,1) //from the id array
                this.membersName.splice(index,1) //from the name array
                localStorage.team = JSON.stringify(JSON.parse(localStorage.team).splice(index,1)) //from the local data array
            },
            removeTeam(){ //empty the current team
                //component's data reset
                this.team=[]
                this.teamName="NewTeam"
                this.membersName=[]
                //localstorage data reset
                localStorage.team=JSON.stringify(this.team)
                localStorage.teamName=JSON.stringify(this.teamName)
            },
            newTeam(){ //creates a new team
                //exports the current team to the previous team locally stored 
                let arr =[]
                arr.push(this.teamName)
                arr.push(this.team)
                localStorage.previousTeam=JSON.stringify(arr)
                //empty the current team
                this.removeTeam()
            },
            restore(){ //inverts the current and the previous team locally sotred
                //create an array of the current team data
                let arr =[]
                arr.push(this.teamName)
                arr.push(this.team)
                //copy previous team data to current team data in local storage
                localStorage.teamName=JSON.stringify(JSON.parse(localStorage.previousTeam)[0])
                localStorage.team=JSON.stringify(JSON.parse(localStorage.previousTeam)[1])
                //update component's attributes
                this.teamName=JSON.parse(localStorage.previousTeam)[0]
                this.team=JSON.stringify(JSON.parse(localStorage.previousTeam)[1])
                //update display
                this.getTeam()
                //save old current team data in previous team in localstorage
                localStorage.previousTeam=JSON.stringify(arr)
            },
            checkPrevious(){ //checks if there is currently a previous tema recorded in localstorage
                return (localStorage.previousTeam)
            },
            updateName(){ //updates the current team name in localstorage
                localStorage.teamName=JSON.stringify(this.teamName)
            },
        }
    }

</script>

<style>
 .teamMember{
    display:flex;
    align-items:center;
    justify-content:space-around;
    width:100%;
    border-bottom : black 1px solid
 }
 .teamDel{
    cursor:pointer;
    padding:.5em;
    background-color:red;
    color:white;
    font-weight:bold;
 }
 .teamDel:hover{
    background-color:#A00;
 }
 .mainBtnEqp{
    cursor:pointer;
    padding:.5em;
    background-color:red;
    color:white;
    font-weight:bold;
    width:230px;
    display:flex;
    justify-content:center;
    align-items:center;
 }
 .mainBtnEqp:hover{
    background-color:#A00;
 }
 .teamComponent{
     display:flex;
     flex-direction:column;
     justify-content:center;
     align-items:center;
 }
 .teamComponent p{
     text-align:center;
 }
 .TeamList{
     width:100%;
     padding:10% 0;
 }
 .eqpFormBtn{
     margin-left:2em;
     padding:.4em;
     border-radius:0;
     border:none;
     color:white;
     background-color:red;
     font-weight:bold;
 }
 .eqpFormBtn:hover{
     background-color:#A00;
 }
 .btnsEqp{
     width:100%;
     display:flex;
     align-items:center;
     justify-content:space-around;
 }
</style>