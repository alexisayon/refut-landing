import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'

// Test Firebase connection
const testFirebaseConnection = async () => {
  try {
    console.log('🧪 Probando conexión con Firebase...')
    
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    }

    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    
    console.log('✅ Firebase inicializado correctamente')
    console.log('📊 Project ID:', firebaseConfig.projectId)
    
    // Test write operation
    console.log('📝 Probando escritura...')
    const testDoc = await addDoc(collection(db, 'test_connection'), {
      timestamp: new Date(),
      message: 'Test de conexión desde ReFut',
      status: 'success'
    })
    
    console.log('✅ Documento creado:', testDoc.id)
    
    // Test read operation
    console.log('📖 Probando lectura...')
    const snapshot = await getDocs(collection(db, 'test_connection'))
    console.log('✅ Documentos encontrados:', snapshot.size)
    
    console.log('🎉 ¡Firebase funciona perfectamente!')
    
  } catch (error) {
    console.error('❌ Error en prueba de Firebase:', error)
    console.error('Detalles:', error.message)
  }
}

// Run test
testFirebaseConnection()
