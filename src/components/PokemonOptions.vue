<template>
    <div class="options-container">
      <ul>
        <li v-for="pokemon in pokemons"
            :key="pokemon.id"
            @click="$emit( 'selection', pokemon.id )">
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
    }
  
  }

}
</script>
  
<style scoped>

ul {
    list-style-type: none;
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

li:hover {
  background: linear-gradient(to right, #4ecdc4, #2b8c99);
}

.options-container {
    display: flex;
    justify-content: center;
}


</style>

