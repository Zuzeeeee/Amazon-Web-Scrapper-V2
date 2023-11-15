import { subscribe, TypeEvents } from "../pubsub.js";

const $template = document.createElement("template");
$template.innerHTML = `
  <div id="error" class="table"></div>
`;

class RequestErrorScrape extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    let clone = $template.content.cloneNode(true);
    this.appendChild(clone);

    this.$error = this.querySelector("#error");

    subscribe(TypeEvents.ERROR, this.notify);
    subscribe(TypeEvents.UPDATE, this.reset);
    subscribe(TypeEvents.LOADING, this.reset);


    this.reset();
  }

  notify = async(msg) => {
    this.error = await msg;
    this.update();
  }

  reset = () => {
    this.$error.innerHTML = "";
  }

  update() {
    this.$error.innerHTML = this.error;
  }
}

customElements.define("jn-error", RequestErrorScrape);

export default RequestErrorScrape;