import pokemonApi from "@/api/pokemonApi"

export const getPokemons = () => {

    const pokemonsArr = Array.from( Array(650) )
    
    return pokemonsArr.map( (_, index ) => index+1 )

}

const getPokemonOptions = async () => {


    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5)

    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))

    return pokemons

}


export const getPokemonNames = async ( [a,b,c,d] = [] ) => {

    const promiseArr = [

        pokemonApi.get(`/${ a }`),
        pokemonApi.get(`/${ b }`),
        pokemonApi.get(`/${ c }`),
        pokemonApi.get(`/${ d }`),
    ]

    const [ p1, p2, p3, p4 ] = await Promise.all( promiseArr )
    
    return [
        { name: capitalizeFirstLetter(p1.data.name), id: a },
        { name: capitalizeFirstLetter(p2.data.name), id: b },
        { name: capitalizeFirstLetter(p3.data.name), id: c },
        { name: capitalizeFirstLetter(p4.data.name), id: d },
    ];

}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


export default getPokemonOptions