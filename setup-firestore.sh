#!/bin/bash

# Script para configurar Firestore en ReFut
# Proyecto: refut-app

echo "🔥 ReFut - Configuración de Firestore"
echo "======================================"
echo ""

echo "📋 Pasos para configurar Firestore:"
echo ""
echo "1. 🌐 Ve a Firebase Console:"
echo "   https://console.firebase.google.com/project/refut-app"
echo ""
echo "2. 🗄️ Configurar Firestore:"
echo "   - Haz clic en 'Firestore Database' en el menú lateral"
echo "   - Haz clic en 'Crear base de datos'"
echo "   - Selecciona 'Iniciar en modo de producción'"
echo "   - Elige la ubicación: 'us-central1' (más rápido para México)"
echo "   - Haz clic en 'Siguiente' y luego 'Habilitar'"
echo ""
echo "3. 🔒 Configurar Reglas de Seguridad:"
echo "   - En la pestaña 'Reglas' de Firestore"
echo "   - Reemplaza el contenido con las reglas de 'firestore.rules'"
echo "   - Haz clic en 'Publicar'"
echo ""
echo "4. 🌐 Crear Aplicación Web:"
echo "   - En el menú lateral, haz clic en 'Configuración del proyecto'"
echo "   - Haz clic en 'Agregar app'"
echo "   - Selecciona 'Web' (</>)"
echo "   - Registra la app con el nombre 'refut-landing'"
echo "   - Copia la configuración que aparece"
echo ""
echo "5. 🔧 Configurar Variables de Entorno:"
echo "   - Copia 'firebase-config.example.env' a '.env.local'"
echo "   - Reemplaza los valores con tu configuración real"
echo ""

# Verificar si Firestore está configurado
echo "📊 Verificando configuración actual:"
echo ""

if [ -f ".env.local" ]; then
    echo "✅ Archivo .env.local encontrado"
    if grep -q "refut-app" .env.local; then
        echo "✅ Project ID configurado correctamente"
    else
        echo "⚠️  Project ID no configurado en .env.local"
    fi
else
    echo "❌ Archivo .env.local no encontrado"
    echo "   Ejecuta: cp firebase-config.example.env .env.local"
fi

echo ""
echo "🎯 Próximos pasos:"
echo "1. Completa la configuración de Firestore"
echo "2. Crea la aplicación web"
echo "3. Configura las variables de entorno"
echo "4. Ejecuta: npm run dev"
echo "5. Ve a http://localhost:3000/migration"
echo ""
echo "📞 ¿Necesitas ayuda?"
echo "   - Firebase Console: https://console.firebase.google.com/project/refut-app"
echo "   - Documentación Firestore: https://firebase.google.com/docs/firestore"
echo ""
echo "✨ ¡Firestore listo para configurar!"
