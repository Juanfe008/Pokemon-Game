import { shallowMount } from "@vue/test-utils"
import PokemonPage from "@/pages/PokemonPage.vue"
import { pokemons } from "../mocks/pokemons.mock"

describe('PokemonPage Component ', () => {

    let wrapper
    
    beforeEach(() =>{
        wrapper = shallowMount( PokemonPage )

    })

    test('Debe de llamar mixPokemonArray al montar', () => {
        
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray')
        wrapper = shallowMount( PokemonPage )
        expect( mixPokemonArraySpy ).toHaveBeenCalled()
    })  

    test('Debe de hacer match con el snapshot cuando cargan los pokemons', () => {

        const wrapper = shallowMount( PokemonPage, {
            data() {
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('Debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {

        const wrapper = shallowMount( PokemonPage, {
            data() {
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')
        
        expect( picture.exists() ).toBeTruthy()
        expect( options.exists() ).toBeTruthy()

        
        expect( picture.attributes('pokemonid') ).toBe('5')
        expect( options.attributes('pokemons') ).toBeTruthy()

    })

    test('Pruebas con checkAnswer', async() => {

        const wrapper = shallowMount( PokemonPage, {
            data() {
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(5)

        expect( wrapper.find('h2').exists ).toBeTruthy()
        expect( wrapper.vm.showPokemon ).toBeTruthy()
        expect( wrapper.find('h2').text() ).toBe(`Correcto! es ${ pokemons[0].name }`)

        await wrapper.vm.checkAnswer(10)

        expect( wrapper.vm.message ).toBe(`Oh no, es ${ pokemons[0].name }`)
        

    })


})