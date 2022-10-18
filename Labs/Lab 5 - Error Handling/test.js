class PokemonAPIError extends Error {
  constructor(args) {
    super(args);
    this.name = "PokemonAPIError"
  }
}

console.log(new Error('A standard error'))
// { [Error: A standard error] }

console.log(new PokemonAPIError('Poke Error, please check your ...'))
// { [Your fancy error: An augmented error] name: 'FancyError' }