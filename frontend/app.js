import {TypeEvents, publish, subscribe} from "./pubsub.js";
import ProductTable from "./components/ProductTable.js";
import ProductItem from "./components/ProductCard.js";
import RequestErrorScrape from "./components/RequestError.js";

const $form = document.querySelector("#form");
const $search = document.querySelector("#search");
const $asin = document.querySelector("#asin");

const amazonSearch = (e) => {
  if (!$search.value) {
    publish(TypeEvents.ERROR, "Please write a valid search term");
    return;
  }

  // Send a request to the back-end, using the search "keyword" and the id "asin"
  $.ajax({
    url:'http://localhost:5000/api/scrape',
    data: {
      keyword: $search.value,
      asin: $asin.value
    },

    type: "GET",

    success: function (data) {
        publish(TypeEvents.UPDATE, data); // Update the screen with the new data
    },

    error: function (error) {
        console.log(error);
        publish(TypeEvents.ERROR, error.responseText); // Update the screen to reflect the error message.
    }
});
}

$form.addEventListener("submit", (e) => {
  e.preventDefault(); 
  publish(TypeEvents.LOADING, true);
  amazonSearch(e);
});
