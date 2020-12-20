function transferInfo(country1, country2)
{
  var python = require("python-shell");
  var path = require("path")

  var options = {
    scriptPath : path.join(__dirname, 'scrape.py'),
    args : [country1]
  }

  var options2 = {
    scriptPath : path.join(__dirname, 'scrape.py'),
    args : [country2]
  }

  var country1Data[] = new python('scrape.py', options);
  var country2Data[] = new python('scrape.py', options2);
}
