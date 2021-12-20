let url = "https://www.wikipedia.org";
const request = require("request");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const { copy } = require("request/lib/helpers");
const { get } = require("request");

let browserOpenPromise = puppeteer.launch({
    headless:false,
    args:["--start-maximised"],
    defaultViewport:null,
});

let page;
browserOpenPromise.then(function(browser) {
    let openPromise =  browser.newPage();
    return openPromise;
}).then(function(newTab) {
    page  = newTab;
    let wikiOpenPromise =page.goto(url);
    return wikiOpenPromise;
}).then(function() {
    let linkWaitPromise = page.waitForSelector("a[id='js-link-box-en']");
    return linkWaitPromise;
}).then(function(){
    let linkClickPromise = page.click("a[id='js-link-box-en']");
    return linkClickPromise;
})
.then(function() {
    let portalWaitPromise = page.waitForSelector("a[title='Wikipedia:Contents/Portals']");
    return portalWaitPromise;
}).then(function() {
    let portalClickPromise = page.click("a[title='Wikipedia:Contents/Portals']");
    return portalClickPromise;
})
.then(function() {
    let atozWaitPromise = page.waitForSelector("a[title='Wikipedia:Contents/A–Z index']");
    return atozWaitPromise;
})
.then(function() {
    let atoz = page.click("a[title='Wikipedia:Contents/A–Z index']");
    return atoz;
}).then(function() {
    let y = page.waitForSelector("a[title='Special:AllPages/Y']");
    return y;
}).then(function() {
    let y = page.click("a[title='Special:AllPages/Y']");
    return y;
})
.then(function() {
    let yWait = page.waitForSelector("a[title='Y']");
    return yWait;
})
.then(function() {
    let Y = page.click("a[title='Y']");
    return Y;
}).then(function() {
    let Purl = page.url();
    return Purl;
}).then(function(pUrl) {
    url = pUrl;
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err.message);
        } else {
            extractDetails(html, url);
        }
    }
    
    function extractDetails(html, url) {

        let $ = cheerio.load(html);
        let div = $(".mw-parser-output p");
        
        console.log("\n\n\n-----------------Name-------------------\n\n\n")
        for(let i =2;i<=4;i++){
            console.log($(div[i]).text());
            
        }
        console.log("\n\n\n----------------History-----------------\n\n\n")
        for(let i =5;i<=13;i++){
            console.log($(div[i]).text());
            
        }
        console.log("\n\n\n-------------Pronounciation-------------\n\n\n")
        for(let i =15;i<=47;i++){
            console.log($(div[i]).text());
    
        }
    }
}).catch(function(err) {
    console.log(err.message);
})


