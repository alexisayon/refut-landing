#!/bin/bash

echo "🔥 ReFut - Verificación de Firebase"
echo "===================================="
echo ""

echo "📋 Verificando configuración de Firebase:"
echo ""

# Verificar archivos necesarios
if [ -f ".env.local" ]; then
    echo "✅ Archivo .env.local encontrado"
    
    # Verificar variables de entorno
    if grep -q "AIzaSy" .env.local; then
        echo "✅ API Key configurada"
    else
        echo "❌ API Key no configurada"
    fi
    
    if grep -q "refut-app" .env.local; then
        echo "✅ Project ID configurado: refut-app"
    else
        echo "❌ Project ID no configurado"
    fi
    
    if grep -q "1:723153937501:web" .env.local; then
        echo "✅ App ID configurado"
    else
        echo "❌ App ID no configurado"
    fi
else
    echo "❌ Archivo .env.local no encontrado"
fi

echo ""
echo "📁 Archivos de Firebase:"
if [ -f "lib/firebase.ts" ]; then
    echo "✅ lib/firebase.ts"
else
    echo "❌ lib/firebase.ts"
fi

if [ -f "lib/betaService.ts" ]; then
    echo "✅ lib/betaService.ts"
else
    echo "❌ lib/betaService.ts"
fi

if [ -f "components/MigrationPanel.tsx" ]; then
    echo "✅ components/MigrationPanel.tsx"
else
    echo "❌ components/MigrationPanel.tsx"
fi

if [ -f "pages/migration.tsx" ]; then
    echo "✅ pages/migration.tsx"
else
    echo "❌ pages/migration.tsx"
fi

if [ -f "pages/test-firebase.tsx" ]; then
    echo "✅ pages/test-firebase.tsx"
else
    echo "❌ pages/test-firebase.tsx"
fi

echo ""
echo "🌐 URLs para probar Firebase:"
echo "   - Página de Migración: http://localhost:3000/migration"
echo "   - Prueba de Firebase: http://localhost:3000/test-firebase"
echo ""
echo "📊 Firebase Console:"
echo "   https://console.firebase.google.com/project/refut-app/firestore"
echo ""
echo "🔍 Próximos pasos:"
echo "1. Ve a http://localhost:3000/test-firebase"
echo "2. Haz clic en 'Ejecutar Pruebas'"
echo "3. Verifica que se crean documentos en Firestore"
echo "4. Si hay errores, configura Firestore en Firebase Console"
echo ""
echo "✨ ¡Listo para probar Firebase!"
