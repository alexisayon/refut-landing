# 🔥 Actualizar Reglas de Firestore Manualmente

## Problema
Las reglas de Firestore están bloqueando el acceso a la colección `beta_registrations`, por lo que el panel de administración no puede mostrar los datos.

## Solución Manual

### 1. Ir a Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona el proyecto `refut-app`

### 2. Actualizar Reglas de Firestore
1. En el menú lateral, haz clic en **"Firestore Database"**
2. Ve a la pestaña **"Rules"**
3. Reemplaza las reglas actuales con:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura para la colección de registros beta
    match /beta_registrations/{document} {
      allow read, write: if true;
    }
    
    // Permitir lectura y escritura para la colección de feedback
    match /user_feedback/{document} {
      allow read, write: if true;
    }
    
    // Denegar acceso a otras colecciones por seguridad
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

4. Haz clic en **"Publish"**

### 3. Verificar el Panel de Administración
1. Ve a: https://refut-landing.vercel.app/admin
2. Deberías ver los datos de Firebase ahora

## Reglas Actuales (Problemáticas)
```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;  // ← Esto bloquea todo acceso
    }
  }
}
```

## Reglas Corregidas
```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir acceso a beta_registrations
    match /beta_registrations/{document} {
      allow read, write: if true;
    }
    
    // Permitir acceso a user_feedback
    match /user_feedback/{document} {
      allow read, write: if true;
    }
    
    // Bloquear otras colecciones
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Verificación
Después de actualizar las reglas, el panel de administración debería mostrar:
- ✅ Total de usuarios registrados
- ✅ Estadísticas de ubicación
- ✅ Nivel de juego
- ✅ Problemas más comunes
- ✅ Tabla de registros recientes
