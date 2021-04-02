<template>
    <div class=teamComponent>
        <h1>Votre équipe "{{teamName}}" :</h1>
        <form @submit="updateName()">
            <input type=text v-model="teamName" lazy required>
            <input class=eqpFormBtn type=submit value="Renommer équipe">
        </form>
        <div class=TeamList>
            <div class=teamMember v-for="(member,index) in team" :key="index">
                <a :href="'/character/'+member">{{ member }}</a>
                <p>{{ membersName[index] }}</p>
                <p class=teamDel v-on:click="remove(index)">Supprimer</p>
            </div>
        </div>
        <div class=btnsEqp>
            <p class=mainBtnEqp v-on:click="removeTeam()">Supprimer l'équipe</p>
            <p class=mainBtnEqp v-on:click="newTeam()">Nouvelle équipe</p>
            <p v-if="checkPrevious()" class=mainBtnEqp v-on:click="restore()">Restaurer équipe précédente</p>
        </div>
        <p>Votre équipe est actuellement sauvegardée dans le LocalStorage de votre navigateur.</p>
        <p>En créant une nouvelle équipe, l'équipe précédente pourra être restaurée.</p>
        <p>Enfin, restaurer une équipe placera votre équipe actuelle comme équipe précédente, pouvant être restaurée à son tour.</p>
    </div>
</template>

<script>
    import {public_key} from '../marvel'
    import axios from 'axios'

    export default {
        name: 'Team',

        data(){
            return {
                team: [],
                membersName: [],
                teamName:[],
            }
        },

        mounted(){
            this.getTeam()
        },

        methods: {
            getTeam: function(){
                if(!localStorage.team){
                    this.obj=[]
                    localStorage.team=JSON.stringify(this.obj)
                }
                if(!localStorage.teamName) localStorage.teamName=JSON.stringify("NewTeam")
                this.team=JSON.parse(localStorage.team)
                this.teamName=JSON.parse(localStorage.teamName)
                
                this.membersName=[]
                for(let i=0;i<this.team.length;i++){
                    
                    this.getMemberName(this.team[i])
                }
                console.log(this.membersName)
            },
            getMemberName: function(id){
                axios.get(`http://gateway.marvel.com/v1/public/characters/${id}?apikey=${public_key}&limit=1&offset=0`)
                    .then((result) => {
                        let name=result.data.data.results[0].name
                        let isUnique=true
                        for(let i=0;i<this.membersName.length;i++){
                            if(this.membersName[i]===name) isUnique = false
                        }
                        if(isUnique) this.membersName.push(name)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            remove(index){
                this.team.splice(index,1)
                this.membersName.splice(index,1)
                localStorage.team = JSON.stringify(JSON.parse(localStorage.team).splice(index,1))
            },
            removeTeam(){
                this.team=[]
                this.teamName="NewTeam"
                this.membersName=[]
                localStorage.team=JSON.stringify(this.team)
                localStorage.teamName=JSON.stringify(this.teamName)
            },
            newTeam(){
                let arr =[]
                arr.push(this.teamName)
                arr.push(this.team)
                localStorage.previousTeam=JSON.stringify(arr)
                this.removeTeam()
            },
            restore(){
                let arr =[]
                arr.push(this.teamName)
                arr.push(this.team)
                console.log(arr)
                localStorage.teamName=JSON.stringify(JSON.parse(localStorage.previousTeam)[0])
                localStorage.team=JSON.stringify(JSON.parse(localStorage.previousTeam)[1])
                this.teamName=JSON.parse(localStorage.previousTeam)[0]
                this.team=JSON.stringify(JSON.parse(localStorage.previousTeam)[1])
                this.getTeam()
                localStorage.previousTeam=JSON.stringify(arr)
            },
            checkPrevious(){
                return (localStorage.previousTeam)
            },
            updateName(){
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