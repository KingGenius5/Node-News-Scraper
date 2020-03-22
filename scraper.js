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
  //by xpath; which is a way to naviagate the page (similar to JQuery or native JS libs) but in a syntax that works better for webscrapers
  const [title] = await page.$x('/html/body/div[1]/div/div/div[2]/main/div/article/header/div[3]/h1/span[1]');
  const [latest] = await page.$x('//*[@id="story"]/header/div[4]');
  const [summary] = await page.$x('//*[@id="story"]/section/div[3]');


  const titleTxt = await title.getProperty('textContent');
  const rawTitle = await titleTxt.jsonValue();

  const latestTxt = await latest.getProperty('textContent');
  const rawLatest = await latestTxt.jsonValue();

  const summaryTxt = await summary.getProperty('textContent');
  const rawSummary = await summaryTxt.jsonValue();


  console.log({rawTitle});
  console.log({rawLatest});
  console.log({rawSummary});

  await browser.close();

}


scrapeArticle('https://www.nytimes.com/2020/03/21/world/coronavirus-updates-usa-world.html');
