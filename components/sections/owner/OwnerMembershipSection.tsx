import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { OWNER_CONTACT_URL } from '../../../lib/constants'
import { ownerMembershipPlans } from '../../../lib/ownerContent'
import { event } from '../../../lib/gtag'

const OwnerMembershipSection: React.FC = () => {
  const trackContact = (planId: string) => {
    event({ action: 'owner_cta_click', category: 'conversion', label: `membership_${planId}` })
  }

  return (
    <section id="membresias-duenos" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Planes de membresía para socios
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Tarifas de referencia según tu operación: cancha, complejo deportivo o liga/torneo.
            El acceso al panel es por invitación del equipo ReFut tras evaluar tu proyecto en la ZMG.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ownerMembershipPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-6 md:p-8 ${
                plan.highlighted
                  ? 'border-refut-green bg-dark-card shadow-lg shadow-refut-green/10'
                  : 'border-dark-border bg-dark-card'
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-semibold ${
                    plan.highlighted
                      ? 'bg-refut-green text-white'
                      : 'bg-white/10 text-white/80'
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-white/60 text-sm">{plan.tagline}</p>
              </div>

              <div className="mb-6">
                <p className="text-4xl font-bold text-white">{plan.price}</p>
                <p className="text-sm text-white/60 mt-1">{plan.priceNote}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-white/80">
                    <FaCheck className="w-4 h-4 text-refut-green shrink-0 mt-0.5" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={OWNER_CONTACT_URL}
                onClick={() => trackContact(plan.id)}
                className={`inline-flex items-center justify-center w-full py-3 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-dark-surface ${
                  plan.highlighted
                    ? 'bg-refut-green text-white hover:bg-accent-greenDark'
                    : 'border border-dark-border text-white hover:border-refut-green/50 hover:text-refut-green'
                }`}
              >
                Solicitar acceso
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-white/50 text-sm mt-8 max-w-2xl mx-auto">
          Precios de referencia en MXN, sin IVA. Sin permanencia. El acceso no es automático en línea:
          seleccionamos socios que encajan con la red ReFut en la ZMG. Los socios activos serán
          notificados con anticipación ante cambios de tarifa.
        </p>
      </div>
    </section>
  )
}

export default OwnerMembershipSection
