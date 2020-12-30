/**
* This file is used for reading from file src/csv, which contains a large list
* of export and import makeup of various countries in good detail. These csv
* files specifically contain rows of different export items/resources, their
* category (agriculture, textiles, etc.), and how much their share is of all
* exports/imports of a country (in percent). For the pie charts that will be
* presented within the browser, we only need the share of each category out of
* the whole, which is the job this file performs.
*/

// get required modules

const { promises: fs } = require('fs');
const path = require('path');
const neatCsv = require('neat-csv');

/**
* An async function that gets the share of each category, such as the services
* sector or the textiles sector, out of the whole export/import makeup.
*
* @param {String} dir directory of the csv file to read
* @return {Array} return an array consisting of the share of every sector (in percent)
*/
async function getData(dir)
{
  var services = 0.0 ;                  // share of services sector
  var textiles = 0.0 ;                  // share of textiles sector
  var agriculture = 0.0 ;               // share of agriculture sector
  var stone = 0.0 ;                     // share of stone sector
  var minerals = 0.0 ;                  // share of minerals sector
  var metals = 0.0 ;                    // share of metals sector
  var chemicals = 0.0 ;                 // share of chemicals sector
  var vehicles = 0.0 ;                  // share of vehicles sector
  var machinery = 0.0 ;                 // share of machinery sector
  var electronics = 0.0 ;               // share of electronics sector
  var other = 0.0 ;                     // share of miscellaneous resources

  const filePath = path.join(__dirname, dir); // retrieve directory
  const data = await fs.readFile(filePath);   // read csv file and store raw data
  const parsedData = await neatCsv(data);     // organize data into an array that is usable (NeatCSV API)

  // iterate through the parsed data taken from the csv file

  for (var i = 0 ; i < parsedData.length ; i++)
  {
    // if sector of first item/resource is agriculture

    if (parsedData[i].Sector === "Agriculture")
    {
      // add its share to agriculture

      agriculture += parseFloat(parsedData[i].Share) ;
    }

    // if sector of first item/resource is textiles

    else if (parsedData[i].Sector === "Textiles")
    {
      // add its share to textiles

      textiles += parseFloat(parsedData[i].Share) ;
    }

    // and so on and so forth...

    else if (parsedData[i].Sector === "Services")
    {
      services += parseFloat(parsedData[i].Share) ;
    }

    else if (parsedData[i].Sector === "Stone")
    {
      stone += parseFloat(parsedData[i].Share) ;
    }

    else if (parsedData[i].Sector === "Minerals")
    {
      minerals += parseFloat(parsedData[i].Share) ;
    }

    else if (parsedData[i].Sector === "Metals")
    {
      metals += parseFloat(parsedData[i].Share) ;
    }

    else if (parsedData[i].Sector === "Chemicals")
    {
      chemicals += parseFloat(parsedData[i].Share) ;
    }

    else if (parsedData[i].Sector === "Vehicles")
    {
      vehicles += parseFloat(parsedData[i].Share) ;
    }

    else if (parsedData[i].Sector === "Machinery")
    {
      machinery += parseFloat(parsedData[i].Share) ;
    }

    else if (parsedData[i].Sector === "Electronics")
    {
      electronics += parseFloat(parsedData[i].Share) ;
    }

    else if (parsedData[i].Sector === "Other")
    {
      other += parseFloat(parsedData[i].Share) ;
    }
  }

  // Up to this point we now have the share of each sector out of a whole in
  // percent. Adding all the sectors together should add up almost to 100,
  // as expected.

  return await ([services.toFixed(2),
     textiles.toFixed(2),
     agriculture.toFixed(2),
     stone.toFixed(2),
     minerals.toFixed(2),
     metals.toFixed(2),
     chemicals.toFixed(2),
     vehicles.toFixed(2),
     machinery.toFixed(2),
     electronics.toFixed(2),
     other.toFixed(2)]);
}
