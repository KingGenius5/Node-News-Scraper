//This is how we import libraries/modules in Node
//In this case, puppeteer is a library
const puppeteer = require('puppeteer');

//The async function will let us use "await", which tells the program to wait while the computer loads things
async function scrapeArticle(url) {

  //to start up the browser, we need to wait for puppoeteer to launch the browser
  const browser = await puppeteer.launch();

}
