#!/bin/bash

# Script de prueba para Firebase en ReFut
echo "🧪 ReFut - Prueba de Firebase"
echo "============================="
echo ""

echo "📋 Verificando configuración:"
echo ""

# Verificar archivos necesarios
if [ -f ".env.local" ]; then
    echo "✅ Archivo .env.local encontrado"
    
    # Verificar si las credenciales están configuradas
    if grep -q "AIzaSy" .env.local; then
        echo "✅ API Key configurada"
    else
        echo "❌ API Key no configurada"
    fi
    
    if grep -q "refut-app" .env.local; then
        echo "✅ Project ID configurado"
    else
        echo "❌ Project ID no configurado"
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

echo ""
echo "🌐 URLs para probar:"
echo "   - Landing Page: http://localhost:3000"
echo "   - Página de Migración: http://localhost:3000/migration"
echo ""
echo "🔍 Pruebas a realizar:"
echo "1. Abrir http://localhost:3000/migration"
echo "2. Verificar que se muestran las estadísticas"
echo "3. Probar el botón de migración"
echo "4. Verificar en Firebase Console que se crean documentos"
echo ""
echo "📊 Firebase Console:"
echo "   https://console.firebase.google.com/project/refut-app/firestore"
echo ""
echo "✨ ¡Listo para probar!"
