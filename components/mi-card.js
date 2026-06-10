// Template de la tarjeta reutilizable.
const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      width: var(--card-width, auto);
      min-height: var(--card-min-height, auto);
    }

    article {
      border: 1px solid var(--line, #383035);
      border-radius: var(--card-radius, 8px);
      background: var(
        --card-background,
        linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 160px),
        rgba(23, 25, 29, 0.94)
      );
      box-shadow: var(--card-shadow, 0 18px 38px rgba(0, 0, 0, 0.32));
      color: var(--text, #f4efe8);
      min-height: inherit;
      overflow: hidden;
    }

    :host([plain]) article {
      height: 100%;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 18px 20px;
      border-bottom: 1px solid var(--line, #383035);
      background: rgba(8, 9, 11, 0.34);
    }

    :host([plain]) header {
      display: none;
    }

    ::slotted([slot="title"]) {
      margin: 0;
      font-size: 1rem;
      letter-spacing: 0;
    }

    ::slotted([slot="meta"]) {
      color: var(--signal, #d7a64a);
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
    }

    .body {
      padding: var(--card-padding, 20px);
    }

    :host([plain]) .body {
      height: 100%;
    }

    @media (max-width: 520px) {
      header,
      .body {
        padding: 16px;
      }
    }
  </style>

  <article>
    <header>
      <slot name="title"></slot>
      <slot name="meta"></slot>
    </header>
    <div class="body">
      <slot></slot>
    </div>
  </article>
`;

// Clase que define el componente <mi-card>.
class MiCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(cardTemplate.content.cloneNode(true));
  }
}

customElements.define("mi-card", MiCard);
