#!/bin/bash

# Script de migración a Firebase para ReFut
# Este script te guía paso a paso para migrar de localStorage a Firebase

echo "🚀 ReFut - Migración a Firebase"
echo "================================="
echo ""

# Verificar si Firebase está instalado
if ! npm list firebase > /dev/null 2>&1; then
    echo "❌ Firebase no está instalado. Instalando..."
    npm install firebase
    echo "✅ Firebase instalado correctamente"
else
    echo "✅ Firebase ya está instalado"
fi

echo ""
echo "📋 Pasos para completar la migración:"
echo ""
echo "1. 🔥 Crear proyecto en Firebase Console:"
echo "   - Ve a: https://console.firebase.google.com/"
echo "   - Crea un nuevo proyecto llamado 'refut-app'"
echo "   - Activa Google Analytics (recomendado)"
echo ""
echo "2. 🌐 Crear aplicación web:"
echo "   - En tu proyecto Firebase, haz clic en 'Agregar app'"
echo "   - Selecciona 'Web' (</>)"
echo "   - Registra la app con el nombre 'refut-landing'"
echo "   - Copia la configuración que aparece"
echo ""
echo "3. 🔧 Configurar variables de entorno:"
echo "   - Copia 'firebase-config.example.env' a '.env.local'"
echo "   - Reemplaza los valores con tu configuración de Firebase"
echo ""
echo "4. 🗄️ Configurar Firestore:"
echo "   - En Firebase Console, ve a 'Firestore Database'"
echo "   - Crea una base de datos en modo 'Producción'"
echo "   - Copia las reglas de 'firestore.rules'"
echo ""
echo "5. 🚀 Ejecutar migración:"
echo "   - Ejecuta: npm run dev"
echo "   - Ve a la página de migración en tu app"
echo "   - Haz clic en 'Iniciar Migración'"
echo ""

# Verificar archivos necesarios
echo "📁 Verificando archivos necesarios:"

if [ -f "lib/firebase.ts" ]; then
    echo "✅ lib/firebase.ts"
else
    echo "❌ lib/firebase.ts - Archivo no encontrado"
fi

if [ -f "lib/betaService.ts" ]; then
    echo "✅ lib/betaService.ts"
else
    echo "❌ lib/betaService.ts - Archivo no encontrado"
fi

if [ -f "components/MigrationPanel.tsx" ]; then
    echo "✅ components/MigrationPanel.tsx"
else
    echo "❌ components/MigrationPanel.tsx - Archivo no encontrado"
fi

if [ -f "firestore.rules" ]; then
    echo "✅ firestore.rules"
else
    echo "❌ firestore.rules - Archivo no encontrado"
fi

if [ -f "firebase-config.example.env" ]; then
    echo "✅ firebase-config.example.env"
else
    echo "❌ firebase-config.example.env - Archivo no encontrado"
fi

echo ""
echo "🎯 Próximos pasos:"
echo "1. Completa la configuración de Firebase"
echo "2. Crea el archivo .env.local con tus credenciales"
echo "3. Ejecuta la migración desde la interfaz web"
echo ""
echo "📞 ¿Necesitas ayuda? Revisa la documentación en:"
echo "   - Firebase: https://firebase.google.com/docs"
echo "   - Firestore: https://firebase.google.com/docs/firestore"
echo ""
echo "✨ ¡Migración lista para comenzar!"
