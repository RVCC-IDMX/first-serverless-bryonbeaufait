const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const chalk = require('chalk');
const { DateTime } = require("luxon");

/*
https://github.com/node-fetch/node-fetch/blob/HEAD/docs/v3-UPGRADE-GUIDE.md#converted-to-es-module
*/

exports.handler = async function (event, context) {

 const date = DateTime.now();

  const eventBody = JSON.parse(event.body);
  console.log(chalk.magenta(`${date}`));
  console.log(chalk.magenta(`\teventBody.region: ${eventBody.region}`));

  const POKE_API = 'https://pokeapi.co/api/v2/pokedex/' + eventBody.region

  const response = await fetch(POKE_API);
  const data = await response.json();

  console.log(chalk.magenta(`\tNumber of entries: ${data.pokemon_entries.length}`));

  return {
    statusCode: 200,
    body: JSON.stringify(data.pokemon_entries)
  }
}

