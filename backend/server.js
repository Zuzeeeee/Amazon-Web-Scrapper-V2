const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const url = (search) => `https://www.amazon.com/s?k=${search}&sprefix=${search}%2Caps%2C188`;
const paginatedUrl = (search, page) => `https://www.amazon.com/s?k=${search}&sprefix=${search}%2Caps%2C188&ref=sr_pg_${page}`;

const userAgent = process.env.USER_AGENT;
const header = {'User-Agent': userAgent, 'Accept-Language': 'en-US, en;q=0.5'};


app.use(cors({
  origin: 'http://localhost:3000'
}));

const fetchData = async (q, res) => {
  let items = [];
  try {
    if (q.asin == '' || !q.asin) {
      let response = await axios.get(url(q.keyword), {headers: header});
      let $ = await cheerio.load(response.data);
      $('.s-asin').each((i,el)=> {
        const id = $(el).attr('data-asin');
        const index = $(el).attr('data-index');
        const stars = $(el).find('.a-spacing-top-micro span .a-icon-alt').html() ?? "Not rated yet";
        const name = $(el).find('h2 span').text();  
        const price = $(el).find('a .a-price-whole').text();
        const rating = $(el).find('div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small div:nth-child(2) div span:nth-child(2)').attr('aria-label') ?? 0;
        const src = $(el).find('.s-image').attr('src');
        const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
        
        const datas = {id,index,stars,name,price,rating,src,link};
        items.push(datas);
      });
    } else {
      for (let i = 0; i < 5; i++) {
        let response = await axios.get(url(q.keyword, i + 1), {headers: header});
        let $ = await cheerio.load(response.data);
        $('.s-asin').each((i,el) => {
          const id = $(el).attr('data-asin');
          if (id === q.asin) {
            const index = $(el).attr('data-index');
            const stars = $(el).find('.a-spacing-top-micro span .a-icon-alt').html() ?? "Not rated yet";
            const name = $(el).find('h2 span').text();  
            const price = $(el).find('a .a-price-whole').text();
            const rating = $(el).find('div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small div:nth-child(2) div span:nth-child(2)').attr('aria-label') ?? 0;
            const src = $(el).find('.s-image').attr('src');
            const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
            
            const datas = {id,index,stars,name,price,rating,src,link};
            items.push(datas);
          } 
        })
        if (items.length > 0) break;
      }
    }
    if (items.length <= 0) {
      res.status(404);
      res.send("Product not found");
      return;
    }
    res.status(200);
    res.send(items);
  } catch (e) {
    res.status(400);
    res.send("Something bad happen!");
  }
}

app.get('/api/scrape', async(req, res) => {
  await fetchData(req.query, res)
});

app.get('/', async(req,res) => {
  res.send("Server Online!");
})

app.listen(port, () => console.log('Server Running!'));
