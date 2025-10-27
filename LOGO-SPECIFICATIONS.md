# 🎨 Especificaciones del Logo - ReFut

## 📐 Dimensiones Requeridas

### **Logo Principal**
- **Tamaño:** 120px × 40px (ancho × alto)
- **Formato:** SVG (preferido) o PNG con fondo transparente
- **Resolución:** 2x para pantallas Retina (240px × 80px)

### **Logo Pequeño (Favicon)**
- **Tamaño:** 32px × 32px
- **Formato:** ICO, PNG o SVG
- **Versiones:** 16x16, 32x32, 48x48

## 🎨 Especificaciones de Diseño

### **Colores**
- **Primario:** Verde (#10B981) - relacionado con fútbol
- **Secundario:** Azul (#3B82F6) - confianza
- **Acento:** Naranja (#F59E0B) - energía
- **Texto:** Gris oscuro (#1F2937)

### **Estilo**
- **Tipografía:** Sans-serif, moderna
- **Elementos:** Balón de fútbol, campo, o elementos deportivos
- **Estilo:** Minimalista, profesional

## 📁 Archivos Necesarios

```
public/logo/
├── logo.svg          # Logo principal (SVG)
├── logo.png          # Logo principal (PNG)
├── logo-white.svg    # Logo para fondos oscuros
├── logo-dark.svg     # Logo para fondos claros
├── favicon.ico       # Favicon
├── favicon.png       # Favicon PNG
└── apple-touch-icon.png # Para iOS
```

## 🔧 Cómo Reemplazar

1. **Crea tu logo** con las dimensiones especificadas
2. **Guarda los archivos** en `public/logo/`
3. **Usa el componente Logo** en tu código:

```tsx
import Logo from '../components/Logo'

// En el header
<Logo variant="white" size="md" />

// En el footer
<Logo variant="default" size="sm" />
```

## 🎯 Ubicaciones del Logo

- **Header/Navigation:** Logo blanco, tamaño mediano
- **Hero Section:** Logo principal, tamaño grande
- **Footer:** Logo principal, tamaño pequeño
- **Favicon:** Logo simplificado, 32x32px

## 📱 Responsive

El logo se adapta automáticamente a diferentes tamaños:
- **Mobile:** 96px × 32px
- **Desktop:** 120px × 40px
- **Large screens:** 144px × 48px

## 🚀 Implementación

Una vez que tengas tu logo:

1. Reemplaza los archivos en `public/logo/`
2. El componente `Logo` se actualizará automáticamente
3. No necesitas cambiar el código

## 💡 Consejos de Diseño

- **Simplicidad:** Que se vea bien en tamaños pequeños
- **Contraste:** Que funcione en fondos claros y oscuros
- **Legibilidad:** Que el texto sea claro
- **Escalabilidad:** Que se vea bien en diferentes tamaños
