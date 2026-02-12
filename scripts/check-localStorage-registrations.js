/**
 * Script para revisar registros guardados en localStorage
 * 
 * Uso:
 * 1. Abre la consola del navegador en la landing page
 * 2. Copia y pega este script completo
 * 3. O ejecuta: node scripts/check-localStorage-registrations.js (si estás en Node.js con jsdom)
 */

(function checkLocalStorageRegistrations() {
  console.log('🔍 ========================================')
  console.log('🔍 REVISIÓN DE REGISTROS EN LOCALSTORAGE')
  console.log('🔍 ========================================\n')

  // Verificar si estamos en el navegador
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    console.error('❌ Este script debe ejecutarse en el navegador')
    console.log('💡 Abre la consola del navegador (F12) y pega este script')
    return
  }

  // 1. Buscar en la lista principal
  console.log('📋 1. LISTA PRINCIPAL (refut_early_access_list)')
  console.log('   ────────────────────────────────────────────')
  
  let listaPrincipal = []
  try {
    const listaData = localStorage.getItem('refut_early_access_list')
    if (listaData) {
      listaPrincipal = JSON.parse(listaData)
    }
  } catch (error) {
    console.error('   ❌ Error al leer la lista principal:', error)
  }

  console.log(`   Total de registros: ${listaPrincipal.length}`)
  
  if (listaPrincipal.length > 0) {
    console.log('   ✅ Se encontraron registros!\n')
    
    // Mostrar resumen en tabla
    console.log('   📊 Resumen de registros:')
    const resumen = listaPrincipal.map((reg, index) => ({
      '#': index + 1,
      'Nombre': reg.nombre || 'Sin nombre',
      'Email': reg.email || 'Sin email',
      'Ubicación': reg.ubicacion || 'Sin ubicación',
      'Nivel': reg.nivelJuego || 'Sin nivel',
      'Fecha': reg.timestamp || 'Sin fecha',
      'ID': reg.id || 'Sin ID'
    }))
    console.table(resumen)
    
    // Mostrar detalles completos
    console.log('\n   📄 Detalles completos de cada registro:')
    listaPrincipal.forEach((reg, index) => {
      console.log(`\n   ──── Registro ${index + 1} ────`)
      console.log(JSON.stringify(reg, null, 2))
    })
  } else {
    console.log('   ⚠️  No hay registros en la lista principal\n')
  }

  // 2. Buscar registros individuales por clave
  console.log('\n🔑 2. REGISTROS INDIVIDUALES (por clave)')
  console.log('   ────────────────────────────────────────────')
  
  const allKeys = Object.keys(localStorage)
  const registrationKeys = allKeys.filter(key => 
    key.startsWith('refut_early_access_') && 
    key !== 'refut_early_access_list'
  )
  
  console.log(`   Total de claves encontradas: ${registrationKeys.length}`)
  
  if (registrationKeys.length > 0) {
    console.log('   ✅ Se encontraron registros individuales!\n')
    
    const registrosIndividuales = []
    registrationKeys.forEach((key, index) => {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}')
        registrosIndividuales.push({
          clave: key,
          datos: data
        })
        
        console.log(`\n   ──── ${key} ────`)
        console.log(JSON.stringify(data, null, 2))
      } catch (error) {
        console.log(`\n   ──── ${key} ────`)
        console.log('   ❌ Error al parsear:', localStorage.getItem(key))
      }
    })
    
    console.log(`\n   📊 Total de registros individuales: ${registrosIndividuales.length}`)
  } else {
    console.log('   ⚠️  No se encontraron registros individuales\n')
  }

  // 3. Buscar otras posibles claves relacionadas
  console.log('\n🔎 3. OTRAS CLAVES RELACIONADAS')
  console.log('   ────────────────────────────────────────────')
  
  const otrasClaves = allKeys.filter(key => 
    key.includes('refut') || 
    key.includes('early') || 
    key.includes('access') ||
    key.includes('beta')
  ).filter(key => 
    key !== 'refut_early_access_list' && 
    !key.startsWith('refut_early_access_')
  )
  
  if (otrasClaves.length > 0) {
    console.log(`   Se encontraron ${otrasClaves.length} claves relacionadas:`)
    otrasClaves.forEach(key => {
      const value = localStorage.getItem(key)
      console.log(`   - ${key}: ${value ? (value.length > 100 ? value.substring(0, 100) + '...' : value) : 'vacío'}`)
    })
  } else {
    console.log('   ⚠️  No se encontraron otras claves relacionadas')
  }

  // 4. Resumen final
  console.log('\n📊 4. RESUMEN FINAL')
  console.log('   ────────────────────────────────────────────')
  console.log(`   ✅ Lista principal: ${listaPrincipal.length} registros`)
  console.log(`   ✅ Registros individuales: ${registrationKeys.length} claves`)
  console.log(`   ✅ Otras claves relacionadas: ${otrasClaves.length} claves`)
  
  const totalEstimado = Math.max(listaPrincipal.length, registrationKeys.length)
  console.log(`\n   📈 Total estimado de registros: ${totalEstimado}`)
  
  if (totalEstimado > 0) {
    console.log('\n   ✅ ¡SE ENCONTRARON REGISTROS!')
    console.log('   💡 Puedes usar MigrationService.migrateLocalStorageData() para migrarlos a Firebase')
  } else {
    console.log('\n   ⚠️  NO SE ENCONTRARON REGISTROS EN LOCALSTORAGE')
    console.log('   💡 Los registros pueden estar solo en Firebase o se perdieron')
  }

  // 5. Función helper para exportar
  console.log('\n💾 5. FUNCIONES DE EXPORTACIÓN')
  console.log('   ────────────────────────────────────────────')
  
  window.exportRegistrationsToJSON = function() {
    const exportData = {
      exportDate: new Date().toISOString(),
      source: 'localStorage',
      totalRegistrations: listaPrincipal.length,
      registrations: listaPrincipal,
      individualKeys: registrationKeys.map(key => ({
        key: key,
        data: JSON.parse(localStorage.getItem(key) || '{}')
      }))
    }
    
    const json = JSON.stringify(exportData, null, 2)
    
    // Intentar copiar al portapapeles
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(json).then(() => {
        console.log('✅ Datos copiados al portapapeles')
        console.log('📋 JSON exportado:')
        console.log(json)
      }).catch(() => {
        console.log('📋 JSON para copiar manualmente:')
        console.log(json)
      })
    } else {
      console.log('📋 JSON para copiar manualmente:')
      console.log(json)
    }
    
    return exportData
  }
  
  window.migrateToFirebase = async function() {
    if (typeof window === 'undefined') {
      console.error('❌ Esta función debe ejecutarse en el navegador')
      return
    }
    
    try {
      // Importar el servicio de migración
      const { MigrationService } = await import('../lib/betaService')
      
      console.log('🔄 Iniciando migración a Firebase...')
      const result = await MigrationService.migrateLocalStorageData()
      
      console.log('\n✅ Migración completada:')
      console.log(`   - ${result.migrated} registros migrados`)
      console.log(`   - ${result.errors} errores`)
      
      if (result.migrated > 0 && result.errors === 0) {
        const confirmClean = confirm(
          `¿Deseas limpiar localStorage después de migrar ${result.migrated} registros?`
        )
        if (confirmClean) {
          MigrationService.clearLocalStorageData()
          console.log('✅ localStorage limpiado')
        }
      }
      
      return result
    } catch (error) {
      console.error('❌ Error en la migración:', error)
      console.log('💡 Asegúrate de estar en la página correcta y que Firebase esté configurado')
      return null
    }
  }
  
  console.log('   ✅ Función exportRegistrationsToJSON() disponible')
  console.log('   ✅ Función migrateToFirebase() disponible')
  console.log('\n   💡 Ejecuta: exportRegistrationsToJSON() para exportar los datos')
  console.log('   💡 Ejecuta: migrateToFirebase() para migrar a Firebase')

  console.log('\n✅ ========================================')
  console.log('✅ REVISIÓN COMPLETADA')
  console.log('✅ ========================================\n')
  
  return {
    listaPrincipal: listaPrincipal,
    registrosIndividuales: registrationKeys.length,
    total: totalEstimado
  }
})()

