// Template del campo numerico con botones.
const campoNumericoTemplate = document.createElement("template");
campoNumericoTemplate.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
    }

    label {
      display: grid;
      gap: 8px;
      color: var(--muted, #a99f95);
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
    }

    .control {
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr) 44px;
      gap: 8px;
      align-items: center;
    }

    input,
    button {
      min-height: 42px;
      border: 1px solid var(--line, #383035);
      border-radius: 6px;
      background: var(--surface-soft, #202328);
      color: var(--text, #f4efe8);
      font: inherit;
      font-weight: 800;
    }

    input {
      min-width: 0;
      width: 100%;
      padding: 0 12px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
      appearance: none;
    }

    input[type="number"] {
      -moz-appearance: textfield;
      appearance: textfield;
    }

    button {
      width: 100%;
      cursor: pointer;
    }

    button:hover {
      border-color: var(--accent-strong, #ff334a);
      color: var(--accent-strong, #ff334a);
    }
  </style>

  <label>
    <span class="label-text"></span>
    <div class="control">
      <button class="decrease" type="button" aria-label="Disminuir valor">-</button>
      <input type="number" />
      <button class="increase" type="button" aria-label="Aumentar valor">+</button>
    </div>
  </label>
`;

// Clase que define el componente <campo-numerico>.
class CampoNumerico extends HTMLElement {
  static get observedAttributes() {
    return ["label", "min", "max", "step", "value"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(campoNumericoTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector("input");
    this.labelText = this.shadowRoot.querySelector(".label-text");
    this.shadowRoot.querySelector(".decrease").addEventListener("click", () => this.changeByStep(-1));
    this.shadowRoot.querySelector(".increase").addEventListener("click", () => this.changeByStep(1));
    this.input.addEventListener("input", () => this.setAttribute("value", this.input.value));
    this.input.addEventListener("focus", () => this.input.select());
    this.input.addEventListener("blur", () => {
      if (this.input.value === "") this.setAttribute("value", "0");
    });
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  changeByStep(direction) {
    const step = Number(this.getAttribute("step") || 1);
    const current = Number(this.input.value || this.getAttribute("value") || 0);
    const min = Number(this.getAttribute("min"));
    const max = Number(this.getAttribute("max"));
    let nextValue = current + step * direction;

    if (!Number.isNaN(min)) nextValue = Math.max(min, nextValue);
    if (!Number.isNaN(max)) nextValue = Math.min(max, nextValue);

    this.setAttribute("value", String(nextValue));
  }

  render() {
    if (!this.shadowRoot || !this.shadowRoot.querySelector("input")) return;

    this.input = this.shadowRoot.querySelector("input");
    this.labelText = this.shadowRoot.querySelector(".label-text");
    this.labelText.textContent = this.getAttribute("label") || "Valor";
    this.input.min = this.getAttribute("min") || "";
    this.input.max = this.getAttribute("max") || "";
    this.input.step = this.getAttribute("step") || "1";
    this.input.value = this.hasAttribute("value") ? this.getAttribute("value") : "0";
  }
}

customElements.define("campo-numerico", CampoNumerico);
