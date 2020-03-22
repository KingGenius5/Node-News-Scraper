//This is how we import libraries/modules in Node
//In this case, puppeteer is a library
const puppeteer = require('puppeteer');

//The async function will let us use "await", which tells the program to wait while the computer loads things
async function scrapeArticle(url) {

  //to start up the browser, we need to wait for puppoeteer to launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  //element
  //page is the page we opened, the $x is a puppeteer selector which allows us to select items
  //by xpath; which is a way to naviagate the page (similar to JQuery or native JS libs) but 
  //in a syntax that works better for webscrapers
  const [el] = await page.$x('//*[@id="story"]/section/div[3]/ul');
  const txt = await el.getProperty('textContent');
  const rawTxt = await txt.jsonValue();

  console.log({rawTxt});

  browser.close();

}


scrapeArticle('https://www.nytimes.com/2020/03/21/world/coronavirus-updates-usa-world.html');
