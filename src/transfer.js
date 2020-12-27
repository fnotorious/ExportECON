const axios = require('axios');
const cheerio = require('cheerio');

const page_url = 'https://www.tutorialspoint.com/general_knowledge/general_knowledge_countries_with_capitals.htm';

async function transferInfo(country)
{
  const { data } = await axios.get(page_url);
  const $ = cheerio.load(data);

  var $capital ;
  var $currency ;
  var countryName ;
  var $name ;

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

  for (var i = 1; i <= 194; i++)
  {
    countryName = $('body > div.mui-container-fluid.content > div > div.mui-col-md-6.tutorial-content > table > tbody > tr:nth-child(' + i + ') > td:nth-child(1)');
    $name = $(countryName);

    if (($name.text().trim()).includes(country))
    {
      $capital = $($('body > div.mui-container-fluid.content > div > div.mui-col-md-6.tutorial-content > table > tbody > tr:nth-child(' + i + ') > td:nth-child(2)')).text().trim();
      $currency = $($('body > div.mui-container-fluid.content > div > div.mui-col-md-6.tutorial-content > table > tbody > tr:nth-child(' + i + ') > td:nth-child(3)')).text().trim();
    }
  }

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

  return await [$capital, $currency];
}

async function getGDP(country)
{
  const { data } = await axios.get("https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)");
  const $ = cheerio.load(data);

  var countryName ;
  var grossDomProduct;

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

  for (var i = 1; i <= 194; i++)
  {
    countryName = $('#mw-content-text > div.mw-parser-output > table.wikitable > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(' + i + ') > td:nth-child(2) > a');
    $name = $(countryName);

    if (($name.text().trim()).includes(country))
    {
      grossDomProduct = $($('#mw-content-text > div.mw-parser-output > table.wikitable > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(' + i + ') > td:nth-child(3)')).text().trim();
      break;
    }
  }

  if (country === "Syria")
  {
    grossDomProduct = "N/A";
  }

  return await grossDomProduct;
}

async function getGDPC(country)
{
  const { data } = await axios.get("https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)_per_capita");
  const $ = cheerio.load(data);

  var countryName ;
  var grossDomCapita;

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

  for (var i = 1; i <= 194; i++)
  {
    countryName = $('#mw-content-text > div.mw-parser-output > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(' + i + ') > td:nth-child(2) > a');
    $name = $(countryName);

    if (($name.text().trim()).includes(country))
    {
      grossDomCapita = $($('#mw-content-text > div.mw-parser-output > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(' + i + ') > td:nth-child(3)')).text().trim();
      break;
    }
  }

  return await grossDomCapita;
}

async function ExportMoney(country)
{
  const { data } = await axios.get("https://en.wikipedia.org/wiki/List_of_countries_by_exports");
  const $ = cheerio.load(data);

  var countryName ;
  var moneyFromExports;
  var found = false ;

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

  if (country === "Syria" || country === "United Arab Emirates" || country === "Turkmenistan" ||  country === "Yemen")
  {
    moneyFromExports = "N/A";
  }

  if(found == false)
  {
    moneyFromExports = "N/A";
  }

  return await moneyFromExports;
}

async function ImportMoney(country)
{
  const { data } = await axios.get("https://en.wikipedia.org/wiki/List_of_countries_by_imports");
  const $ = cheerio.load(data);

  var countryName ;
  var moneyFromImports;
  var found = false ;

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

  if(found == false)
  {
    moneyFromExports = "N/A";
  }

  return await moneyFromImports;
}

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

  for (var i = 1; i <= 194; i++)
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

  for (var i = 1; i <= 194; i++)
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
