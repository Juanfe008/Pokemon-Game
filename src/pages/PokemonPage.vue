<template>
  
  <h1 v-if="!pokemon" class="title" >Espere...</h1>
  <div v-else>
  
    <h1 class="title">¿Quién es este Pokémon?</h1>

    <PokemonPicture 
        :pokemon-id="pokemon.id" 
        :show-pokemon="showPokemon"/>

    <PokemonOptions 
        :pokemons="pokemonArr"
        :optionSelected="optionSelected" 
        @selection="checkAnswer"
    />
    
    <template v-if="showAnswer">
      <h2 class="fade-in message">{{ message }}</h2>
      <button @click="newGame" class="newGame-button">
        Nuevo Juego
      </button>
    </template>

  </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions.js'

export default {

  components: { PokemonOptions, PokemonPicture},

  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: '',
      optionSelected: {isSelected: false, isCorrect: null, selectedId: null},
    }
  },

  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions()
      const rndInt = Math.floor( Math.random() * 4 )
      this.pokemon = this.pokemonArr[ rndInt ]

    },

    checkAnswer( selectedId ) {
      
      this.showPokemon = true
      this.showAnswer = true
      

      if (selectedId == this.pokemon.id){
        
        this.message = `Correcto! es ${ this.pokemon.name }!`
        this.optionSelected = {isSelected: true, isCorrect: true, selectedId }


      }
      else{

        this.message = `Oh no, es ${ this.pokemon.name }...`
        this.optionSelected = {isSelected: true, isCorrect: false, selectedId }

      }

    },

    newGame(){
      this.showPokemon = false
      this.showAnswer = false
      this.pokemonArr = []
      this.pokemon = null
      this.optionSelected = {isSelected:false, isCorrect: null, selectedId: null}
      this.mixPokemonArray()
      
    }

  },

  mounted() {
    this.mixPokemonArray()
  }
}
</script>

<style>

.title{
    font-family: 'Montserrat', sans-serif;
    font-size: 2em;
    color: #fff; 
}

.newGame-button{
  background-color: white;
  padding: 10px;
  font-size: 16px;
  border: #992b2b00;
  width: 250px;
  border-radius: 25px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  color: #2c3e50;

}

.newGame-button:hover {
    background: linear-gradient(to right, #4ecdc4, #2b8c99);
}

.message{
  color: #fff;
  margin: 10px;
}

</style>