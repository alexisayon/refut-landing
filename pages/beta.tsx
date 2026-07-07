import type { NextPage } from 'next'
import Link from 'next/link'
import { Nav, Footer } from '../components'
import PageHead from '../components/PageHead'
import EarlyAccessForm from '../components/sections/EarlyAccessForm'
import { useBetaRegistration } from '../hooks/useBetaRegistration'

const Beta: NextPage = () => {
  const betaForm = useBetaRegistration()

  return (
    <>
      <PageHead
        title="Únete a la beta – ReFut"
        description="Regístrate para acceso prioritario a ReFut y ayúdanos a mejorar la plataforma del fútbol amateur."
        path="/beta"
      />
      <div className="min-h-screen bg-refut-black">
        <Nav />
        <div className="py-12 px-4 text-center">
          <Link href="/" className="text-refut-green hover:underline text-sm">
            ← Volver al inicio
          </Link>
        </div>
        <EarlyAccessForm {...betaForm} problemasPrincipales={[...betaForm.problemasPrincipales]} />
        <Footer />
      </div>
    </>
  )
}

export default Beta
