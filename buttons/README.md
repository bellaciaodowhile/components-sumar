# Sistema de Botones Sumari

Un sistema completo de botones CSS con múltiples variaciones y funcionalidades responsive.

## Características

- **Alturas**: 44px (estándar) y 50px (large)
- **Variantes**: Fill, Gradient, Outline (con blur)
- **Iconos**: Dentro de círculos de 28px (44px altura) o 34px (50px altura)
- **Color de círculo**: #FDFDFD
- **Responsive**: Ancho completo automático en pantallas < 580px
- **Ancho variable**: Usando la variable CSS `--width-btn-sumari`
- **Soporte para iconos**: Iconos alineados a la izquierda con texto centrado
- **Estados**: Hover, Active, Focus, Disabled, Loading
- **Colores**: Primary, Success, Danger, Warning, Info, Dark, Light

## Uso Básico

### HTML
```html
<!-- Botón básico -->
<button class="btn-sumari btn-sumari--fill">
  <div class="btn-text">Mi Botón</div>
</button>

<!-- Botón con ancho personalizado -->
<button class="btn-sumari btn-sumari--outline" style="--width-btn-sumari: 200px;">
  <div class="btn-text">Botón Custom</div>
</button>

<!-- Botón con gradiente -->
<button class="btn-sumari btn-sumari--gradient">
  <div class="btn-text">Botón Gradiente</div>
</button>

<!-- Botón outline con blur -->
<button class="btn-sumari btn-sumari--outline">
  <div class="btn-text">Botón con Blur</div>
</button>

<!-- Botón con icono -->
<button class="btn-sumari btn-sumari--gradient btn-sumari--with-icon">
  <div class="btn-icon-circle">
    <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="..." stroke="currentColor" stroke-width="2"/>
    </svg>
  </div>
  <div class="btn-text">Con Icono</div>
</button>

<!-- Botón grande (50px) -->
<button class="btn-sumari btn-sumari--fill btn-sumari--large">
  <div class="btn-text">Botón Grande</div>
</button>
```

## Clases Disponibles

### Clase Base
- `.btn-sumari` - Clase base requerida

### Variantes de Estilo
- `.btn-sumari--fill` - Botón relleno
- `.btn-sumari--gradient` - Botón con gradiente (#4168D8 a #6142D1)
- `.btn-sumari--outline` - Botón con borde y efecto blur (200px)

### Modificadores
- `.btn-sumari--with-icon` - Para botones que contienen iconos (padding: 0 20px 0 8px)

### Tamaños
- `.btn-sumari--large` - Botón de 50px de altura
- `.btn-sumari--small` - Botón de 36px de altura

### Colores
- `.btn-sumari--success` - Verde
- `.btn-sumari--danger` - Rojo
- `.btn-sumari--warning` - Amarillo
- `.btn-sumari--info` - Azul claro
- `.btn-sumari--dark` - Gris oscuro
- `.btn-sumari--light` - Gris claro

### Estados Especiales
- `.btn-sumari--loading` - Estado de carga con spinner
- `.btn-sumari--pulse` - Animación de pulso
- `.btn-sumari--block` - Ancho completo

## Ancho Variable

Usa la variable CSS `--width-btn-sumari` para establecer un ancho específico:

```html
<button class="btn-sumari btn-sumari--fill" style="--width-btn-sumari: 250px;">
  Botón Personalizado
</button>
```

## Responsive

En pantallas menores a 580px, todos los botones automáticamente toman el 100% del ancho disponible, sin importar el valor de `--width-btn-sumari`.

## Personalización

Puedes personalizar los colores y estilos modificando las variables CSS en `:root`:

```css
:root {
  --btn-primary-color: #007bff;
  --btn-primary-hover: #0056b3;
  --btn-primary-active: #004085;
  --btn-text-color: #ffffff;
  --btn-border-radius: 6px;
  /* ... más variables */
}
```

## Ejemplos de Uso

```html
<!-- Botón de envío con gradiente -->
<button class="btn-sumari btn-sumari--gradient btn-sumari--success">
  <div class="btn-text">Enviar Formulario</div>
</button>

<!-- Botón de cancelar con blur -->
<button class="btn-sumari btn-sumari--outline btn-sumari--danger">
  <div class="btn-text">Cancelar</div>
</button>
```