// Template del switch de dos estados.
const switchTemplate = document.createElement("template");
switchTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      min-height: 42px;
      color: var(--muted, #a99f95);
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
    }

    button {
      position: relative;
      width: 58px;
      height: 32px;
      border: 1px solid var(--line, #383035);
      border-radius: 999px;
      background: #302a2c;
      cursor: pointer;
    }

    button::after {
      content: "";
      position: absolute;
      left: 4px;
      top: 4px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--muted, #a99f95);
      transition: transform 160ms ease, background 160ms ease;
    }

    :host([checked]) button {
      border-color: var(--accent-strong, #ff334a);
      background: var(--accent-soft, rgba(201, 31, 50, 0.16));
    }

    :host([checked]) button::after {
      background: var(--accent-strong, #ff334a);
      transform: translateX(26px);
    }

    .checked {
      display: none;
    }

    .unchecked {
      display: inline;
    }

    :host([checked]) .checked {
      display: inline;
    }

    :host([checked]) .unchecked {
      display: none;
    }
  </style>

  <div class="row">
    <span>
      <slot></slot>
      <span class="checked"><slot name="checked-message">Activo</slot></span>
      <span class="unchecked"><slot name="unchecked-message">Inactivo</slot></span>
    </span>
    <button type="button" role="switch" aria-checked="false"></button>
  </div>
`;

// Clase que define el componente <mi-switch>.
class MiSwitch extends HTMLElement {
  static get observedAttributes() {
    return ["checked"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(switchTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector("button");
    this.button.addEventListener("click", () => this.toggleAttribute("checked"));
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const button = this.shadowRoot && this.shadowRoot.querySelector("button");
    if (!button) return;

    button.setAttribute("aria-checked", String(this.hasAttribute("checked")));
  }
}

customElements.define("mi-switch", MiSwitch);
