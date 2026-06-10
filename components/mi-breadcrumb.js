// Template del contenedor de breadcrumb.
const breadcrumbTemplate = document.createElement("template");
breadcrumbTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      margin-bottom: 18px;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding: 10px;
      border: 1px solid var(--line, #383035);
      border-radius: 8px;
      background: rgba(23, 25, 29, 0.86);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
    }

    ::slotted(mi-breadcrumb-item) {
      flex: 0 0 auto;
    }

    ::slotted(mi-breadcrumb-item:not(:last-child)) {
      margin-right: 18px;
    }
  </style>

  <nav aria-label="Navegacion principal">
    <slot></slot>
  </nav>
`;

// Clase que define el componente <mi-breadcrumb>.
class MiBreadcrumb extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(breadcrumbTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.updateActiveItem = this.updateActiveItem.bind(this);
    this.updateActiveItem();
    window.addEventListener("hashchange", this.updateActiveItem);
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.updateActiveItem);
  }

  updateActiveItem() {
    const currentHash = window.location.hash || "#configuracion";

    this.querySelectorAll("mi-breadcrumb-item").forEach((item) => {
      item.toggleAttribute("active", item.getAttribute("href") === currentHash);
    });
  }
}

// Template de cada item/enlace dentro del breadcrumb.
const breadcrumbItemTemplate = document.createElement("template");
breadcrumbItemTemplate.innerHTML = `
  <style>
    :host {
      position: relative;
      display: inline-flex;
    }

    :host(:not(:last-child))::after {
      content: ">";
      position: absolute;
      right: -18px;
      top: 50%;
      color: var(--muted, #a99f95);
      font-weight: 800;
      transform: translateY(-50%);
    }

    a {
      display: inline-flex;
      align-items: center;
      min-height: 40px;
      padding: 0 14px;
      border-radius: 6px;
      color: var(--muted, #a99f95);
      font-size: 0.92rem;
      font-weight: 700;
      text-decoration: none;
    }

    a:hover,
    :host([active]) a {
      background: var(--accent-soft, rgba(201, 31, 50, 0.16));
      color: var(--text, #f4efe8);
      box-shadow: inset 0 -2px 0 var(--accent-strong, #ff334a);
    }

    @media (max-width: 520px) {
      :host {
        flex: 1 1 calc(50% - 10px);
      }

      a {
        justify-content: center;
        width: 100%;
      }
    }
  </style>

  <a>
    <slot></slot>
  </a>
`;

// Clase que define el componente <mi-breadcrumb-item>.
class MiBreadcrumbItem extends HTMLElement {
  static get observedAttributes() {
    return ["href"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(breadcrumbItemTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.updateHref();
  }

  attributeChangedCallback() {
    this.updateHref();
  }

  updateHref() {
    const link = this.shadowRoot.querySelector("a");
    link.href = this.getAttribute("href") || "#";
  }
}

customElements.define("mi-breadcrumb", MiBreadcrumb);
customElements.define("mi-breadcrumb-item", MiBreadcrumbItem);
