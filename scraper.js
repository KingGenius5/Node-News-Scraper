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
  const [title] = await page.$x('//*[@id="collection-coronavirus"]/div[1]/div/div/h1');
  const [latest] = await page.$x('//*[@id="collection-coronavirus"]/section/div/div');
  const [summary] = await page.$x('//*[@id="collection-coronavirus"]/section/section[1]/div[2]/div/div/ul');


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


scrapeArticle('https://www.nytimes.com/news-event/coronavirus');
