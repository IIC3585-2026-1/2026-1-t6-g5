// Template del contenedor de accordion.
const accordionTemplate = document.createElement("template");
accordionTemplate.innerHTML = `
  <style>
    :host {
      display: grid;
      gap: 12px;
    }
  </style>

  <slot></slot>
`;

// Clase que define el componente <mi-accordion>.
class MiAccordion extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(accordionTemplate.content.cloneNode(true));
  }
}

// Template de cada item desplegable del accordion.
const accordionItemTemplate = document.createElement("template");
accordionItemTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    section {
      border: 1px solid var(--line, #383035);
      border-radius: 8px;
      background: var(--surface-soft, #202328);
      overflow: hidden;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
      min-height: 48px;
      padding: 0 16px;
      border: 0;
      background: rgba(8, 9, 11, 0.2);
      color: var(--muted, #a99f95);
      cursor: pointer;
      font: inherit;
      font-size: 0.78rem;
      font-weight: 800;
      text-align: left;
      text-transform: uppercase;
    }

    button:hover {
      color: var(--text, #f4efe8);
    }

    button:focus-visible {
      outline: 2px solid var(--accent-strong, #ff334a);
      outline-offset: -2px;
    }

    .icon {
      color: var(--accent-strong, #ff334a);
      font-size: 1.1rem;
      line-height: 1;
      transition: transform 160ms ease;
    }

    .panel {
      display: none;
      padding: 16px;
      border-top: 1px solid var(--line, #383035);
      color: var(--text, #f4efe8);
      line-height: 1.55;
    }

    :host([open]) .panel {
      display: block;
    }

    :host([open]) .icon {
      transform: rotate(45deg);
    }

    ::slotted(p) {
      margin: 0;
    }
  </style>

  <section>
    <button type="button" aria-expanded="false">
      <slot name="heading"></slot>
      <span class="icon" aria-hidden="true">+</span>
    </button>
    <div class="panel">
      <slot></slot>
    </div>
  </section>
`;

// Clase que define el componente <mi-accordion-item>.
class MiAccordionItem extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(accordionItemTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector("button");
    this.button.addEventListener("click", () => this.toggleAttribute("open"));
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const button = this.shadowRoot && this.shadowRoot.querySelector("button");
    if (!button) return;

    button.setAttribute("aria-expanded", String(this.hasAttribute("open")));
  }
}

customElements.define("mi-accordion", MiAccordion);
customElements.define("mi-accordion-item", MiAccordionItem);
