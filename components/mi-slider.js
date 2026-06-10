// Template del slider con valor visible y espacio para etiquetas.
const sliderTemplate = document.createElement("template");
sliderTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    label {
      display: grid;
      gap: 10px;
      color: var(--muted, #a99f95);
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
    }

    .heading {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }

    output {
      color: var(--signal, #d7a64a);
    }

    input {
      width: 100%;
      accent-color: var(--accent-strong, #ff334a);
    }

    .labels {
      position: relative;
      min-height: 22px;
      margin-top: -4px;
    }
  </style>

  <label>
    <span class="heading">
      <span class="label-text"></span>
      <output></output>
    </span>
    <input type="range" />
  </label>
  <div class="labels">
    <slot></slot>
  </div>
`;

// Clase que define el componente <mi-slider>.
class MiSlider extends HTMLElement {
  static get observedAttributes() {
    return ["label", "min", "max", "step", "value"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(sliderTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector("input");
    this.input.addEventListener("input", () => this.setAttribute("value", this.input.value));
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot || !this.shadowRoot.querySelector("input")) return;

    const input = this.shadowRoot.querySelector("input");
    this.shadowRoot.querySelector(".label-text").textContent = this.getAttribute("label") || "Slider";
    input.min = this.getAttribute("min") || "0";
    input.max = this.getAttribute("max") || "100";
    input.step = this.getAttribute("step") || "1";
    input.value = this.getAttribute("value") || "0";
    this.shadowRoot.querySelector("output").textContent = input.value;
  }
}

// Template de una etiqueta posicionable para <mi-slider>.
const sliderLabelTemplate = document.createElement("template");
sliderLabelTemplate.innerHTML = `
  <style>
    :host {
      position: absolute;
      left: var(--label-position, 0%);
      top: 0;
      color: var(--muted, #a99f95);
      font-size: 0.78rem;
      font-weight: 800;
      transform: translateX(-50%);
      white-space: nowrap;
    }

    :host([position="0"]) {
      transform: translateX(0);
    }

    :host([position="100"]) {
      transform: translateX(-100%);
    }
  </style>

  <slot></slot>
`;

// Clase que define el componente <mi-slider-label>.
class MiSliderLabel extends HTMLElement {
  static get observedAttributes() {
    return ["position"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(sliderLabelTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.updatePosition();
  }

  attributeChangedCallback() {
    this.updatePosition();
  }

  updatePosition() {
    this.style.setProperty("--label-position", `${this.getAttribute("position") || 0}%`);
  }
}

customElements.define("mi-slider", MiSlider);
customElements.define("mi-slider-label", MiSliderLabel);
