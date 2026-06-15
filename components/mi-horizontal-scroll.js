// Template del contenedor con scroll horizontal.
const horizontalScrollTemplate = document.createElement("template");
horizontalScrollTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .shell {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 10px;
      align-items: stretch;
    }

    button {
      width: 34px;
      border: 1px solid var(--line, #383035);
      border-radius: 6px;
      background: rgba(8, 9, 11, 0.56);
      color: var(--text, #f4efe8);
      cursor: pointer;
      font: inherit;
      font-weight: 900;
    }

    button:hover {
      border-color: var(--accent-strong, #ff334a);
      color: var(--accent-strong, #ff334a);
    }

    .scroll-area {
      margin: -4px;
      overflow-x: auto;
      overscroll-behavior-inline: contain;
      padding: 4px 4px 12px;
      scrollbar-color: var(--accent, #c91f32) rgba(255, 255, 255, 0.08);
    }

    .track {
      display: grid;
      grid-auto-columns: var(--scroll-card-width, minmax(230px, 280px));
      grid-auto-flow: column;
      gap: 14px;
      min-width: min-content;
    }

    ::slotted(*) {
      min-width: 230px;
    }

    @media (max-width: 520px) {
      .shell {
        grid-template-columns: minmax(0, 1fr);
      }

      button {
        display: none;
      }
    }
  </style>

  <div class="shell">
    <button class="previous" type="button" aria-label="Ver tarjetas anteriores">&lt;</button>
    <div class="scroll-area" tabindex="0">
      <div class="track">
        <slot></slot>
      </div>
    </div>
    <button class="next" type="button" aria-label="Ver mas tarjetas">&gt;</button>
  </div>
`;

// Clase que define el componente <mi-horizontal-scroll>.
class MiHorizontalScroll extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(horizontalScrollTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const scrollArea = this.shadowRoot.querySelector(".scroll-area");
    const previous = this.shadowRoot.querySelector(".previous");
    const next = this.shadowRoot.querySelector(".next");
    const move = () => Math.max(scrollArea.clientWidth * 0.8, 220);

    previous.addEventListener("click", () => {
      scrollArea.scrollBy({ left: -move(), behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      scrollArea.scrollBy({ left: move(), behavior: "smooth" });
    });
  }
}

customElements.define("mi-horizontal-scroll", MiHorizontalScroll);
