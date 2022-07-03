const axios = require('axios');

// and we need jsdom and Readability to parse the article HTML
// const { JSDOM } = require('jsdom');
//const { Readability } = require('@mozilla/readability');
const htmlparser2 = require('htmlparser2');
const cheerio = require('cheerio');
export function getPureData(data) {
    try {
        const dom = htmlparser2.parseDocument(data);
        const $ = cheerio.load(dom);
        const body = $.html();
        const parts = body.split(`"articleBody":`);
        const anotherParts = parts[1].split(`"image":`)
        const dirtyData = anotherParts[0];
        const cleanerData = dirtyData.split(`"`);
        const pureData = cleanerData[1]
        let result = cheerio.load(pureData).text()
        return result.replace(/\\n/ig,'<br />');
    } catch(error) {
        console.log(error);
        return "Cors is not disable";
    }
    
    //let article = new Readability(dom).parse();
   // console.log(article);
}
export async function getContent(url) {
    const result = await axios.get(url,{
        headers: {
            authorization: ' xxxxxxxxxx' ,
            'Content-Type': 'application/json'
         } 
    })
    const pureData = getPureData(result.data)
    return pureData
}