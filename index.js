const PORT = 3000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');
const writeStream = fs.createWriteStream('cards.csv');

// Write Headers
writeStream.write(`Title,Link,Price \n`);

const app = express();

const url = 'https://www.theguardian.com/international';
const commerceURL = 'https://www.blacklotus.cz/magic-produkty/'
const comics = 'https://www.comicspoint.cz/komiksy?section=vs-AjaxFilterPart&page=1&pageSize=48'


// Web Scraping for news website
// axios(url)
//   .then(response => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const articles = [];

//     $('.fc-item__title', html).each(function() {
//       const title = $(this).text()
//       const url = $(this).find('a').attr('href')
//       articles.push({
//         title,
//         url
//       })
//     })
//     console.log(articles);
//   }).catch(err => console.log(err))


// Web Scrapping for Magic Website
// axios(commerceURL)
// .then(response => {
//   const html = response.data;
//   const $ = cheerio.load(html);
//   const articles = [];

//   $('.p-in').each((i, el) => {
//     const title = $(el)
//       .find('.name')
//       .text() 
//       .replace(/\s\s+/g, '')
//     const link = $(el)
//       .find('a')
//       .attr('href')
//     const price = $(el)
//       .find('.price')
//       .text()
//       .replace(/\s\s+/g, '')

//     // Write Row to CSV
//     writeStream.write(`${title}, ${link}, ${price} \n`);
  
//   });

//   console.log('Scrapping Done...')

// }).catch(err => console.log(err))

axios(comics)
.then(response => {
  const html = response.data;
  const $ = cheerio.load(html);
  const articles = [];

  $('.p-in').each((i, el) => {
    const title = $(el)
      .find('.name')
      .text() 
      .replace(/\s\s+/g, '')
    const link = $(el)
      .find('a')
      .attr('href')
    const price = $(el)
      .find('.price')
      .text()
      .replace(/\s\s+/g, '')

    // Write Row to CSV
    writeStream.write(`${title}, ${link}, ${price} \n`);
  
  });

  console.log('Scrapping Done...')

}).catch(err => console.log(err))



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));