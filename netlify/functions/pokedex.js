const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const chalk = require('chalk');
const { DateTime } = require('luxon');

exports.handler = async function (event, context) {
  const date = DateTime.now();

  const eventBody = JSON.parse(event.body);
  console.log(chalk.cyan('#40CEFF')(`${date}`));
  console.log(chalk.cyan(`\teventBody.region: ${eventBody.region} `));
  const POKE_API = 'https://pokeapi.co/api/v2/pokedex/' + eventBody.region;

  console.log(event);

  const response = await fetch(POKE_API);
  const data = await response.json();

  console.log(
    chalk.cyan(`\tNumber of entires: ${data.pokemon_entries.length}`)
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      pokemon: data.pokemon_entries,
    }),
  };
};
