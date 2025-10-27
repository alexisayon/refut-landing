import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'default' | 'white' | 'dark' | 'footer'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
}

export const Logo = ({ 
  variant = 'default', 
  size = 'md', 
  className = '',
  href = '/'
}: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8 w-24',    // 96px × 32px
    md: 'h-10 w-30',    // 120px × 40px
    lg: 'h-12 w-36'     // 144px × 48px
  }

  const logoPath = {
    default: '/logo/logorefut.svg',      // Logo principal (isologo)
    white: '/logo/logorefut3.svg',       // Logo para fondos oscuros
    dark: '/logo/logorefut2.svg',          // Logo para fondos claros
    footer: '/logo/logorefut3.svg'       // Logo para footer (mejor contraste)
  }

  const LogoImage = () => (
    <div className={`${sizeClasses[size]} ${className}`}>
      <Image
        src={logoPath[variant]}
        alt="ReFut Logo"
        width={size === 'sm' ? 96 : size === 'md' ? 120 : 144}
        height={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
        className="h-full w-full object-contain"
        priority={true}
      />
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <LogoImage />
      </Link>
    )
  }

  return <LogoImage />
}

// Componente para el favicon
export const Favicon = () => (
  <>
    <link rel="icon" href="/logo/favicon.ico" sizes="any" />
    <link rel="icon" href="/logo/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/logo/apple-touch-icon.png" />
  </>
)

export default Logo
