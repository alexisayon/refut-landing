# Scripts de Utilidad - ReFut Landing

Este directorio contiene scripts útiles para la gestión y revisión de registros de la landing page.

## 📁 Archivos

### `check-localStorage-registrations.js`
Script para revisar registros guardados en localStorage. Puede ejecutarse directamente en la consola del navegador.

**Uso:**
1. Abre la landing page en el navegador
2. Abre la consola del navegador (F12)
3. Copia y pega el contenido completo del archivo
4. El script mostrará todos los registros encontrados

**Funciones disponibles después de ejecutar:**
- `exportRegistrationsToJSON()` - Exporta todos los registros a JSON
- `migrateToFirebase()` - Migra los registros de localStorage a Firebase

### `check-registrations.html`
Herramienta visual para revisar registros. Abre este archivo directamente en el navegador.

**Características:**
- Interfaz visual amigable
- Estadísticas en tiempo real
- Tabla de registros
- Exportación a JSON
- Consola de salida integrada

## 🔧 Uso Rápido

### Desde la Consola del Navegador

```javascript
// 1. Revisar registros
// Copia y pega el contenido de check-localStorage-registrations.js

// 2. Exportar a JSON
exportRegistrationsToJSON()

// 3. Migrar a Firebase
migrateToFirebase()
```

### Desde la Herramienta Visual

1. Abre `check-registrations.html` en tu navegador
2. Haz clic en "Revisar Registros"
3. Usa los botones para exportar o migrar

## 📊 Qué Busca el Script

El script busca registros en:

1. **Lista Principal**: `localStorage.getItem('refut_early_access_list')`
   - Contiene un array con todos los registros

2. **Registros Individuales**: Claves que empiezan con `refut_early_access_`
   - Cada registro guardado individualmente con timestamp

3. **Otras Claves Relacionadas**: Cualquier clave que contenga:
   - `refut`
   - `early`
   - `access`
   - `beta`

## 🔄 Migración a Firebase

Si encuentras registros en localStorage que no están en Firebase:

1. Ejecuta el script de revisión
2. Verifica que los registros estén completos
3. Ejecuta `migrateToFirebase()` para migrarlos automáticamente

**Nota:** La migración requiere que Firebase esté correctamente configurado en la landing page.

## ⚠️ Importante

- Los scripts deben ejecutarse desde la misma página donde se guardaron los registros
- Asegúrate de tener permisos de localStorage habilitados
- Los registros en localStorage pueden perderse si el usuario limpia su navegador

## 🆘 Solución de Problemas

### No se encuentran registros
- Verifica que estés en la misma página donde se guardaron
- Revisa que localStorage no esté bloqueado
- Los registros pueden haberse perdido si se limpió el navegador

### Error al migrar a Firebase
- Verifica la configuración de Firebase
- Asegúrate de estar en la landing page con Firebase inicializado
- Revisa la consola para ver errores específicos

## 📝 Notas

- Los registros se guardan tanto en Firebase como en localStorage como respaldo
- Si Firebase falla, los datos se guardan solo en localStorage
- El script de migración puede recuperar estos registros perdidos
