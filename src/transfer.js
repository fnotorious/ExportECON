/**
* This file is used for transferring important data, including a country's
* capital, currency, GDP, GDP per capita, etc., to the browser side of the app.
*/

const axios = require('axios');                 // get Axios API
const cheerio = require('cheerio');             // get Cheerio API

// storing url of website to scrape for getting capital and currency data

const page_url = 'https://www.tutorialspoint.com/general_knowledge/general_knowledge_countries_with_capitals.htm';

/**
* Asynchronous function for retrieving the capital and currency data of a
* nation.
*
* @param {String} country the name of a country
* @return {Array} an array consisting of the capital and currency of a country
*/
async function transferInfo(country)
{
  const { data } = await axios.get(page_url);   // request for stored url
  const $ = cheerio.load(data);                 // for selecting elements within HTML data from url

  var $capital ;            // to store the capital city of a country
  var $currency ;           // to store the currency of a country
  var countryName ;         // to store the selector of a country name from the url's HTML data
  var $name ;               // to store the actual name of a country as a String taken from the countryName variable

  // Sometimes, the user may select a country whose name does not exactly
  // match the name of a country within the url's data (i.e. '&' used instead of
  // 'and', 'Czech Republic' instead of 'Czechia', etc.) These if statements
  // are provided to prevent any errors that may occur because of such minor
  // differences in how the countries are named.

  if (country === "Bosnia and Herzegovina")
  {
    country = "Bosnia & Herzegovina" ;
  }

  if (country === "Papua New Guinea")
  {
    country = "Papa New Guinea";
  }

  if (country === "Eswatini")
  {
    country = "Swaziland";
  }

  if (country === "Czechia")
  {
    country = "Czech Republic";
  }

  if (country === "North Macedonia")
  {
    country = "Macedonia";
  }

  // A loop that will iterate throughout a table within the stored url's HTML
  // that contains the data we are looking for. (country name, capital, and
  // currency)

  for (var i = 1; i <= 194; i++)
  {
    // get selector for the i'th index of the table

    countryName = $('body > div.mui-container-fluid.content > div > div.mui-col-md-6.tutorial-content > table > tbody > tr:nth-child(' + i + ') > td:nth-child(1)');
    $name = $(countryName);

    // if the country name at the current index in the table matches
    // the country we're looking for

    if (($name.text().trim()).includes(country))
    {
      // retrieve the capital and currency data from this table's index

      $capital = $($('body > div.mui-container-fluid.content > div > div.mui-col-md-6.tutorial-content > table > tbody > tr:nth-child(' + i + ') > td:nth-child(2)')).text().trim();
      $currency = $($('body > div.mui-container-fluid.content > div > div.mui-col-md-6.tutorial-content > table > tbody > tr:nth-child(' + i + ') > td:nth-child(3)')).text().trim();
      break ;
    }
  }

  // Within the url, some of the currencies and capitals of some countries
  // happen to be incorrect. These if statements are meant to prevent error
  // for such cases.

  if (country === "Romania")
  {
    $currency = "Leu";
  }

  else if (country === "Croatia")
  {
    $currency = "Kuna";
  }

  else if (country === "Republic of the Congo")
  {
    $currency = "Congolese Franc";
  }

  else if (country === "Bolivia")
  {
    $currency = "Bolivian Boliviano"
    $capital = "La Paz; Sucre"
  }

  else if (country === "Guinea")
  {
    $currency = "Guinea Franc";
    $capital = "Conakry";
  }

  // return the capital and currency of a country.

  return await [$capital, $currency];
}

/**
* Asynchronous function for retrieving the GDP of a country
*
* @param {String} country the name of a country
* @return {String} the GDP of a country
*/
async function getGDP(country)
{
  // send request to url

  const { data } = await axios.get("https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)");
  const $ = cheerio.load(data);   // for selecting elements from url's HTML

  var countryName;                // to store the selector of a country name from the url's HTML data
  var grossDomProduct;            // to store GDP data of a country
  var found = false ;             // value incase a nation is not found in the url's table

  // Again, error prevention for minor word/letter discrepencies between the
  // country the user selected and how the country is referenced in the url.

  if (country === "United States of America")
  {
    country = "United States";
  }

  if (country === "Czechia")
  {
    country = "Czech Republic";
  }

  if (country === "Democratic Republic of the Congo")
  {
    country = "Congo, Democratic Republic of the";
  }

  if (country === "Republic of the Congo")
  {
    country = "Congo, Republic of the";
  }

  // A loop that will iterate throughout a table within the stored url's HTML
  // that contains the data we are looking for.

  for (var i = 1; i <= 194; i++)
  {
    // get selector for the i'th index of the table

    countryName = $('#mw-content-text > div.mw-parser-output > table.wikitable > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(' + i + ') > td:nth-child(2) > a');
    $name = $(countryName);

    // if the country name at the current index in the table matches
    // the country we're looking for

    if (($name.text().trim()).includes(country))
    {
      // retrieve the GDP data from this table's index

      grossDomProduct = $($('#mw-content-text > div.mw-parser-output > table.wikitable > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(' + i + ') > td:nth-child(3)')).text().trim();
      found = true ;
      break;
    }
  }

  // Syria unfortunately has no 2020 estimate data on its GDP available
  // as of right now, so it will get the GDP value of N/A.

  if (country === "Syria")
  {
    grossDomProduct = "N/A";
  }

  if (found == false)
  {
    grossDomProduct = "N/A";
  }

  // return the GDP of a country

  return await grossDomProduct;
}

/**
* Asynchronous function for retrieving the GDP per capita of a country
*
* @param {String} country the name of a country
* @return {String} the GDP per capita of a country
*/
async function getGDPC(country)
{
  // send request to url

  const { data } = await axios.get("https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)_per_capita");
  const $ = cheerio.load(data);   // for selecting elements from url's HTML

  var countryName ;               // to store the selector of a country name from the url's HTML data
  var grossDomCapita;             // to store GDP per capita data of a country
  var found = false ;             // value incase a nation is not found in the url's table

  // Error prevention for minor word/letter discrepencies between the
  // country the user selected and how the country is referenced in the url.

  if (country === "United States of America")
  {
    country = "United States";
  }

  if (country === "Czechia")
  {
    country = "Czech Republic";
  }

  if (country === "Democratic Republic of the Congo")
  {
    country = "Congo, Democratic Republic of the";
  }

  if (country === "Republic of the Congo")
  {
    country = "Congo, Republic of the";
  }

  // A loop that will iterate throughout a table within the stored url's HTML
  // that contains the data we are looking for.

  for (var i = 1; i <= 194; i++)
  {
    // get selector for the i'th index of the table

    countryName = $('#mw-content-text > div.mw-parser-output > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(' + i + ') > td:nth-child(2) > a');
    $name = $(countryName);

    // if the country name at the current index in the table matches
    // the country we're looking for

    if (($name.text().trim()).includes(country))
    {
      // retrieve the GDP per capita data from this table's index

      grossDomCapita = $($('#mw-content-text > div.mw-parser-output > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(' + i + ') > td:nth-child(3)')).text().trim();
      found = true ;
      break;
    }
  }

  if (found == false)
  {
    grossDomCapita = "N/A";
  }

  // return the GDP per capita of a country

  return await grossDomCapita;
}


// The rest of the functions share the exact same pattern as the previous in
// in regards to what they do and how they perform, so I will leave out
// documentation for the sake of not repeating from within each function from
// here.


/**
* Asynchronous function for retrieving the value of exports of a country
*
* @param {String} country the name of a country
* @return {String} the value of exports of a country
*/
async function ExportMoney(country)
{
  const { data } = await axios.get("https://en.wikipedia.org/wiki/List_of_countries_by_exports");
  const $ = cheerio.load(data);

  var countryName ;
  var moneyFromExports;
  var found = false ;  // value incase a nation is not found in the url's table

  if (country === "United States of America")
  {
    country = "United States";
  }

  if (country === "Czechia")
  {
    country = "Czech Republic";
  }

  for (var i = 1; i <= 194; i++)
  {
    countryName = $('#mw-content-text > div.mw-parser-output > table:nth-child(6) > tbody > tr:nth-child(' + i + ') > td:nth-child(2) > a');
    $name = $(countryName);

    if (($name.text().trim()).includes(country))
    {
      moneyFromExports = $($('#mw-content-text > div.mw-parser-output > table:nth-child(6) > tbody > tr:nth-child(' + i + ') > td:nth-child(3)')).text().trim();
      found = true;
      break;
    }
  }

  // if country does not appear within the table being scraped from the url

  if(found == false)
  {
    moneyFromExports = "N/A";
  }

  return await moneyFromExports;
}

/**
* Asynchronous function for retrieving the value of imports of a country
*
* @param {String} country the name of a country
* @return {String} the value of imports of a country
*/
async function ImportMoney(country)
{
  const { data } = await axios.get("https://en.wikipedia.org/wiki/List_of_countries_by_imports");
  const $ = cheerio.load(data);

  var countryName ;
  var moneyFromImports;
  var found = false ;  // value incase a nation is not found in the url's table

  if (country === "United States of America")
  {
    country = "United States";
  }

  if (country === "Czechia")
  {
    country = "Czech Republic";
  }

  for (var i = 1; i <= 194; i++)
  {
    countryName = $('#mw-content-text > div.mw-parser-output > table.wikitable.sortable > tbody > tr:nth-child(' + i + ') > td:nth-child(2) > a');
    $name = cheerio.text($(countryName));

    if (($name.trim()).includes(country))
    {
      moneyFromImports = $($('#mw-content-text > div.mw-parser-output > table.wikitable.sortable > tbody > tr:nth-child(' + i + ') > td:nth-child(3)')).text().trim();
      found = true;
      break;
    }
  }

  // if country does not appear within the table being scraped from the url

  if(found == false)
  {
    moneyFromExports = "N/A";
  }

  return await moneyFromImports;
}

/**
* Asynchronous function for getting information on where a country exports to
* the most
*
* @param {String} country the name of a country
* @return {String} the value of imports of a country
*/
async function ExportPartner(country)
{
  const { data } = await axios.get("https://en.wikipedia.org/wiki/List_of_countries_by_leading_trade_partners");
  const $ = cheerio.load(data);

  var countryName ;
  var exportPartner;

  if (country === "United States of America")
  {
    country = "United States";
  }

  if (country === "Czechia")
  {
    country = "Czech Republic";
  }

  if (country === "Republic of the Congo")
  {
    country = "Congo";
  }

  if (country === "Democratic Republic of the Congo")
  {
    country = "Congo, Democratic Republic of the";
  }

  if (country === "Bosnia and Herzegovina")
  {
    country = "Bosnia";
  }

  if (country === "Eswatini")
  {
    country = "Swaziland";
  }

  for (var i = 1; i <= 203; i++)
  {
    countryName = $('#mw-content-text > div.mw-parser-output > table:nth-child(9) > tbody > tr:nth-child(' + i + ') > td:nth-child(1) > a');
    $name = cheerio.text($(countryName));

    if (($name.trim()).includes(country))
    {
      exportPartner = $($('#mw-content-text > div.mw-parser-output > table:nth-child(9) > tbody > tr:nth-child(' + i + ') > td:nth-child(2) > a')).text().trim();
      break;
    }
  }

  return await exportPartner;
}

/**
* Asynchronous function for getting information on where a country imports from
* the most
*
* @param {String} country the name of a country
* @return {String} the value of imports of a country
*/
async function ImportPartner(country)
{
  const { data } = await axios.get("https://en.wikipedia.org/wiki/List_of_countries_by_leading_trade_partners");
  const $ = cheerio.load(data);

  var countryName ;
  var importPartner;

  if (country === "United States of America")
  {
    country = "United States";
  }

  if (country === "Czechia")
  {
    country = "Czech Republic";
  }

  if (country === "Republic of the Congo")
  {
    country = "Congo";
  }

  if (country === "Democratic Republic of the Congo")
  {
    country = "Congo, Democratic Republic of the";
  }

  if (country === "Bosnia and Herzegovina")
  {
    country = "Bosnia";
  }

  if (country === "Eswatini")
  {
    country = "Swaziland";
  }

  for (var i = 1; i <= 203; i++)
  {
    countryName = $('#mw-content-text > div.mw-parser-output > table:nth-child(9) > tbody > tr:nth-child(' + i + ') > td:nth-child(1) > a');
    $name = cheerio.text($(countryName));

    if (($name.trim()).includes(country))
    {
      importPartner = $($('#mw-content-text > div.mw-parser-output > table:nth-child(9) > tbody > tr:nth-child(' + i + ') > td:nth-child(3) > a')).text().trim();
      break;
    }
  }

  return await importPartner;
}
