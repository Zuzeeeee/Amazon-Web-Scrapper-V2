# Amazon-Web-Scraper

A simple scraper that read the amazon search page and return relevant data, such:

- Item id
- Name of the product
- Price of the product
- Url of the image
- Ratings
- Stars
- Link to the product

# How to run

If its your first time running this project, first you gonna need to install the dependencies:

> npm install

then you need update the user agent on ./backend/.env to your own user-agent.

## Getting the User Agente

Click on the link below, and copy your user agent.

<a href="https://whatmyuseragent.com" target="_blank">whatmyuseragent.com</a>

After go to ./backend/.env and update the USER_AGENT variable.

## Front-end

To start the front-end page, run:

> npm run start:front

or in dev mode, run:

> npm run dev:front

Page is hosted by default on <a href="http://localhost:3000" target="_blank">localhost:3000</a>

## Back-end

To start the back-end api, run:

> npm run start:api

or in dev mode, run:

> npm run dev:api

Server is hosted by default on <a href="http://localhost:5000" target="_blank">localhost:5000</a>
