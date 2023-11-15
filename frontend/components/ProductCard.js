const $template = document.createElement("template");
$template.innerHTML = `
  <div id="container" class="container">
    <div class="row">
      <p id="item-id" class="item-id"></p>
      <p id="item-index" class="item-index"></p>
    </div>
    <img id="item-img" class="item-img"/>
    <p id="item-name" class="item-name"></p>
    <div class="row">
      <p id="item-stars" class="item-stars"></p>
      <p id="item-rating" class="item-rating"></p>
    </div>
    <p id="item-price" class="item-price"></p>
  </div>
`;

/**
 * A card for holding the product data
 */
class ProductCard extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    let clone = $template.content.cloneNode(true);
    this.appendChild(clone);

    this.$img = this.querySelector("#item-img");
    this.$id = this.querySelector("#item-id")
    this.$index = this.querySelector("#item-index")
    this.$name = this.querySelector("#item-name");
    this.$stars = this.querySelector("#item-stars");
    this.$rating = this.querySelector("#item-rating");
    this.$price = this.querySelector("#item-price");


    this.imgSrc = this.getAttribute("src");
    this.id = this.getAttribute("id");
    this.index = this.getAttribute("index");
    this.name = this.getAttribute("name");
    this.stars = this.getAttribute("stars");
    this.rating = this.getAttribute("rating");
    this.price = this.getAttribute("price");

    this.update();
  }

  update() {
    this.$img.setAttribute("src",this.imgSrc);
    this.$id.innerHTML = `${this.id}`;
    this.$index.innerHTML = `#${this.index}`;
    this.$name.innerHTML = this.name;
    this.$stars.innerHTML = this.stars.replace("stars", "").replace("out of", "/").trim();
    this.$rating.innerHTML = `${this.rating} ratings`;
    this.$price.innerHTML = `$ ${this.price}00`;
  }
}

customElements.define("jn-table-item", ProductCard);

export default ProductCard;