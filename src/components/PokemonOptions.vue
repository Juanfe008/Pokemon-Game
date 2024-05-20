<template>
  <div class="options-container">
    <ul>
      <li v-for="pokemon in pokemons"
          :key="pokemon.id"
          :class="listItemClass(pokemon.id)"
          @click="handleClick(pokemon.id)">
          {{ pokemon.name }}
      </li>
    </ul>      
  </div>
</template>
  
<script>
export default {
  
  props: {

    pokemons: {
      type: Array,
      required: true
    },

    optionSelected: {
      type: Object,
      required: true,
    }
  
  },

  methods: {

    listItemClass(pokemonId) {
      const { isSelected, isCorrect, selectedId } = this.optionSelected;
      return {
        disabled: isSelected,
        correct: isSelected && isCorrect && selectedId === pokemonId,
        incorrect: isSelected && !isCorrect && selectedId === pokemonId
      }
    },

    handleClick(pokemonId) {
        this.$emit('selection', pokemonId);  
    }
  }
}
</script>
  
<style scoped>

ul {
    list-style-type: none;
    text-transform: capitalize;
}

li {
    background-color: white;
    border-radius: 25px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
    padding: 10px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    transition: background-color 0.3s ease; 
    
}

li:not(.disabled):hover {
  background: linear-gradient(to right, #4ecdc4, #2b8c99);
}

li.disabled{
  pointer-events: none;
}

li.correct{
  background-color: rgb(7, 145, 7);
  color: white;
}

li.incorrect{
  background-color: rgb(197, 11, 11);
  color: white;
}

.options-container {
    display: flex;
    justify-content: center;
}


</style>

