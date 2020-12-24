const { promises: fs } = require('fs');
const path = require('path');
const neatCsv = require('neat-csv');

async function getData(url)
{
  var services = 0.0 ;
  var textiles = 0.0 ;
  var agriculture = 0.0 ;
  var stone = 0.0 ;
  var minerals = 0.0 ;
  var metals = 0.0 ;
  var chemicals = 0.0 ;
  var vehicles = 0.0 ;
  var machinery = 0.0 ;
  var electronics = 0.0 ;
  var other = 0.0 ;

  const filePath = path.join(__dirname, url);
  const data = await fs.readFile(filePath);
  const parsedData = await neatCsv(data);

  for (var i = 0 ; i < parsedData.length ; i++)
  {
    if (parsedData[i].Sector === "Agriculture")
    {
      agriculture += parseFloat(parsedData[i].Share) ;
    }

    else if (parsedData[i].Sector === "Textiles")
    {
      textiles += parseFloat(parsedData[i].Share) ;
    }

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
