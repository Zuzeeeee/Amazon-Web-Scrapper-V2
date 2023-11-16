# Amazon-Web-Scraper

A simple scraper that read the amazon search page and return relevant data, such:

- Item id
- Item index
- Name of the product
- Price of the product
- Url of the image
- Ratings
- Stars
- Link to the product

# How to run

If its your first time running this project, first you gonna need to install the dependencies:

> npm install

## Getting the User Agente

Then you need update the user agent on ./backend/.env to your own user-agent.

Click on the link below, and copy your user agent.

<a href="https://whatmyuseragent.com" target="_blank">whatmyuseragent.com</a>

After go to [env](./backend/.env) and update the USER_AGENT variable.

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

## Important

If running on dev mode, update the [env](./backend/.env) Enviroment to "DEV" to avoid cors problems
