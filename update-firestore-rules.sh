#!/bin/bash

echo "🔥 Actualizando reglas de Firestore para ReFut"
echo "=============================================="

# Verificar que Firebase CLI esté instalado
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI no está instalado"
    echo "Instala con: npm install -g firebase-tools"
    exit 1
fi

# Verificar que estemos logueados
if ! firebase projects:list &> /dev/null; then
    echo "❌ No estás logueado en Firebase"
    echo "Ejecuta: firebase login"
    exit 1
fi

# Desplegar las reglas
echo "📝 Desplegando reglas de Firestore..."
firebase deploy --only firestore:rules

if [ $? -eq 0 ]; then
    echo "✅ Reglas de Firestore actualizadas correctamente"
    echo ""
    echo "🔧 Cambios realizados:"
    echo "  - Permitir lectura/escritura en beta_registrations"
    echo "  - Permitir lectura/escritura en user_feedback"
    echo "  - Mantener seguridad en otras colecciones"
    echo ""
    echo "🌐 Ahora el panel de administración debería funcionar:"
    echo "   https://refut-landing.vercel.app/admin"
else
    echo "❌ Error desplegando reglas de Firestore"
    exit 1
fi
