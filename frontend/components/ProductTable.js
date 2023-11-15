import { subscribe, TypeEvents } from "../pubsub.js";

const $template = document.createElement("template");
$template.innerHTML = `
  <div id="table" class="table"></div>
`;

class ProductTable extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    let clone = $template.content.cloneNode(true);
    this.appendChild(clone);
    
    this.$table = this.querySelector("#table");

    subscribe(TypeEvents.UPDATE, this.notify);
    subscribe(TypeEvents.ERROR, this.reset);
    subscribe(TypeEvents.LOADING, this.loading);
    this.update();
  }

  notify = async(msg) => {
    this.data = await msg;
    this.update();
  }

  reset = () => {
    this.$table.innerHTML = "";
  }

  loading = () => {
    this.$table.innerHTML = "<span class='loader'></span>";
  }

  update() {
    this.reset();

    this.data?.forEach(items => {
      let child = document.createElement("jn-table-item");

      Object.keys(items).forEach((attr) => child.setAttribute(attr, items[attr]))
      this.$table.appendChild(child);
    });
  }
}

customElements.define("jn-table", ProductTable);

export default ProductTable;
