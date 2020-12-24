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
