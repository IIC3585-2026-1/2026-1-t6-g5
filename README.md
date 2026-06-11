# DevilOps Mission Panel

Mini aplicación web de una sola página inspirada en el personaje de comics Daredevil. La interfaz permite configurar parámetros básicos de una misión, revisar detalles y explorar un equipo disponible de personajes asociados al contexto de Daredevil.

## Cómo ejecutar

Abrir `index.html` directamente en Chrome.

No requiere instalación de dependencias ni servidor de desarrollo, porque el proyecto usa HTML, CSS y JavaScript vanilla.

## Tecnologías usadas

- HTML.
- CSS.
- JavaScript vanilla.
- Web Components nativos.
- Custom Elements.
- HTML Templates.
- Shadow DOM.

## Componentes

Los componentes están definidos en la carpeta `components/` y se cargan desde `index.html`.

- `<mi-breadcrumb>`: contenedor de navegación principal.
- `<mi-breadcrumb-item>`: item individual del breadcrumb.
- `<mi-card>`: tarjeta reutilizable con slots para título, metadato y contenido.
- `<mi-horizontal-scroll>`: contenedor con scroll horizontal para mostrar varias cards.
- `<campo-numerico>`: campo numérico con botones para aumentar y disminuir.
- `<mi-slider>`: slider configurable por atributos.
- `<mi-slider-label>`: etiqueta posicionable para el slider.
- `<mi-switch>`: switch para alternar entre dos estados.
- `<mi-accordion>`: contenedor de detalles desplegables.
- `<mi-accordion-item>`: item individual del accordion.

## Cumplimiento del objetivo

La app hace uso de Web Components nativos mediante componentes personalizados reutilizables y encapsulados. Cada componente se registra con `customElements.define`, usa un `template` para definir su estructura y crea su propio Shadow DOM con `attachShadow({ mode: "open" })`.

Los estilos principales de cada componente viven dentro del Shadow DOM, mientras que `styles.css` contiene el layout general y ajustes de la página principal.

La pantalla principal integra todos los componentes en una misma interfaz.

## Reutilización y encapsulación

La reutilización se demuestra usando varias instancias de componentes:

- Más de cuatro `<mi-card>`.
- Tres `<mi-breadcrumb-item>`.
- Tres `<mi-accordion-item>`.
- Tres `<mi-slider-label>`.

Cada componente tiene su propio Shadow DOM y estilos internos. El CSS global se limita al diseño general de la aplicación y a personalizaciones controladas mediante variables CSS.

## Uso de IA

Se utilizó IA como apoyo en los siguientes puntos:

- Entender conceptos de Web Components mediante resumenes y estudio previo.
- Definir el alcance de una mini app de una sola página.
- Adaptar la idea para acercarla a la temática de la serie Daredevil.
- Dividir el trabajo en tarjetas de JIRA lo más atómicas y paralelizables posibles.
- Dividir el trabajo en componentes reutilizables.
- Revisar criterios de aceptación relacionados con reutilización, encapsulación e integración.
- Mejorar detalles de UX como navegación, scroll horizontal, accordion y controles interactivos, los cuales presentaban problemas de tamaño en un inicio.

El código sugerido con apoyo de IA fue revisado y probado durante la implementación.
