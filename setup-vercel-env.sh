#!/bin/bash

echo "🚀 ReFut - Configuración de Variables de Entorno en Vercel"
echo "========================================================="
echo ""

echo "📋 Variables de entorno necesarias para Firebase en producción:"
echo ""

# Leer variables del archivo .env.local
if [ -f ".env.local" ]; then
    echo "✅ Archivo .env.local encontrado"
    echo ""
    echo "🔧 Variables que necesitas configurar en Vercel:"
    echo ""
    
    # Extraer variables de Firebase
    grep "NEXT_PUBLIC_FIREBASE" .env.local | while read line; do
        echo "   $line"
    done
    
    echo ""
    echo "📊 Pasos para configurar en Vercel:"
    echo ""
    echo "1. 🌐 Ve a Vercel Dashboard:"
    echo "   https://vercel.com/dashboard"
    echo ""
    echo "2. 🔍 Encuentra tu proyecto 'refut-landing'"
    echo ""
    echo "3. ⚙️ Ve a Settings → Environment Variables"
    echo ""
    echo "4. ➕ Agrega cada variable:"
    echo "   - Haz clic en 'Add New'"
    echo "   - Copia el nombre y valor de cada variable"
    echo "   - Selecciona 'Production' environment"
    echo "   - Haz clic en 'Save'"
    echo ""
    echo "5. 🔄 Redespliega el proyecto:"
    echo "   - Ve a 'Deployments'"
    echo "   - Haz clic en 'Redeploy' en el último deployment"
    echo ""
    echo "6. ✅ Verifica que funciona:"
    echo "   - Ve a https://refut-landing.vercel.app"
    echo "   - Prueba el formulario de registro"
    echo "   - Verifica en Firebase Console que se crean documentos"
    echo ""
    echo "📞 ¿Necesitas ayuda?"
    echo "   - Vercel Docs: https://vercel.com/docs/concepts/projects/environment-variables"
    echo "   - Firebase Console: https://console.firebase.google.com/project/refut-app"
    echo ""
    echo "✨ ¡Configuración lista para Vercel!"
    
else
    echo "❌ Archivo .env.local no encontrado"
    echo "   Asegúrate de tener las credenciales de Firebase configuradas"
fi
