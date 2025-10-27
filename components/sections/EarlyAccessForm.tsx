import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import type { FormData } from '../../types'

interface FormErrors {
  [key: string]: string
}

interface EarlyAccessFormProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  mostrarFormulario: boolean
  setMostrarFormulario: React.Dispatch<React.SetStateAction<boolean>>
  formularioEnviado: boolean
  problemasPrincipales: string[]
  toggleProblemChecklist: (problema: string) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  privacyAccepted: boolean
  setPrivacyAccepted: React.Dispatch<React.SetStateAction<boolean>>
  termsAccepted: boolean
  setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>
  formErrors: FormErrors
  isSubmitting: boolean
  honeypot: string
  setHoneypot: React.Dispatch<React.SetStateAction<string>>
  selectedProblems: string[]
  additionalComment: string
  setAdditionalComment: React.Dispatch<React.SetStateAction<string>>
  formProgress: number
  achievements: string[]
  showAchievement: string | null
}

const EarlyAccessForm: React.FC<EarlyAccessFormProps> = ({
  formData,
  setFormData,
  mostrarFormulario,
  setMostrarFormulario,
  formularioEnviado,
  problemasPrincipales,
  toggleProblemChecklist,
  handleSubmit,
  privacyAccepted,
  setPrivacyAccepted,
  termsAccepted,
  setTermsAccepted,
  formErrors,
  isSubmitting,
  honeypot,
  setHoneypot,
  selectedProblems,
  additionalComment,
  setAdditionalComment,
  formProgress,
  achievements,
  showAchievement
}) => {
  return (
    <section id="formulario" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Completa tu Registro para la Beta
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Llena el formulario para unirte a la comunidad que está construyendo el futuro del fútbol amateur
        </p>

        {/* Barra de Progreso */}
        <div className="mb-8 animate-slideIn">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso del formulario</span>
            <span className="text-sm font-bold text-green-600">{Math.round(formProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="progress-bar h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${formProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {formProgress === 100 ? '¡Formulario completo! 🎉' : 
             formProgress >= 75 ? '¡Casi terminamos! 💪' :
             formProgress >= 50 ? '¡Vamos bien! 👍' :
             formProgress >= 25 ? '¡Sigue así! 🚀' : '¡Empecemos! ⚽'}
          </p>
        </div>

        {/* Notificación de Logros */}
        {showAchievement && (
          <div className="fixed top-4 right-4 z-50 animate-slideIn">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-xl border-2 border-yellow-300 max-w-sm">
              <div className="flex items-center">
                <div className="text-2xl mr-3 animate-bounce">
                  🏆
                </div>
                <div>
                  <h4 className="font-bold text-sm">
                    ¡Logro Desbloqueado!
                  </h4>
                  <p className="text-xs opacity-90">
                    {showAchievement}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contador de Logros */}
        {achievements.length > 0 && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
              <span className="mr-2">🏆</span>
              {achievements.length} logro{achievements.length !== 1 ? 's' : ''} desbloqueado{achievements.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot (anti-spam) */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Campos principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={formData.nombre}
                  onChange={(e) => {
                    setFormData({...formData, nombre: e.target.value})
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.nombre ? 'border-red-500' : 'border-gray-300 hover:border-green-300'
                  }`}
                  required
                  maxLength={50}
                />
                {formErrors.nombre && (
                  <p className="text-red-500 text-xs mt-1 animate-shake">{formErrors.nombre}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Tu email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value})
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300 hover:border-green-300'
                  }`}
                  required
                  maxLength={254}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1 animate-shake">{formErrors.email}</p>
                )}
              </div>

              <div>
                <select
                  value={formData.ubicacion}
                  onChange={(e) => {
                    setFormData({...formData, ubicacion: e.target.value})
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.ubicacion ? 'border-red-500' : 'border-gray-300 hover:border-green-300'
                  }`}
                  required
                >
                  <option value="">Selecciona tu zona</option>
                  <option value="Guadalajara Centro">Guadalajara Centro</option>
                  <option value="Zapopan">Zapopan</option>
                  <option value="Tlaquepaque">Tlaquepaque</option>
                  <option value="Tonalá">Tonalá</option>
                  <option value="San Pedro Tlaquepaque">San Pedro Tlaquepaque</option>
                  <option value="El Salto">El Salto</option>
                  <option value="Juanacatlán">Juanacatlán</option>
                  <option value="Ixtlahuacán de los Membrillos">Ixtlahuacán de los Membrillos</option>
                  <option value="Zapotlanejo">Zapotlanejo</option>
                  <option value="Otra zona">Otra zona</option>
                </select>
                {formErrors.ubicacion && (
                  <p className="text-red-500 text-xs mt-1 animate-shake">{formErrors.ubicacion}</p>
                )}
              </div>

              <div>
                <select
                  value={formData.nivelJuego}
                  onChange={(e) => {
                    setFormData({...formData, nivelJuego: e.target.value})
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.nivelJuego ? 'border-red-500' : 'border-gray-300 hover:border-green-300'
                  }`}
                  required
                >
                  <option value="">Tu nivel de fútbol</option>
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                  <option value="Semi-profesional">Semi-profesional</option>
                  <option value="Ex-profesional">Ex-profesional</option>
                </select>
                {formErrors.nivelJuego && (
                  <p className="text-red-500 text-xs mt-1 animate-shake">{formErrors.nivelJuego}</p>
                )}
              </div>
            </div>

            {/* Campo de mayor reto */}
            <div>
              <textarea
                placeholder="Cuéntanos cuál es tu mayor reto al jugar fútbol amateur..."
                value={formData.mayorReto}
                onChange={(e) => {
                  setFormData({...formData, mayorReto: e.target.value})
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none ${
                  formErrors.mayorReto ? 'border-red-500' : 'border-gray-300 hover:border-green-300'
                }`}
                rows={3}
                maxLength={500}
                required
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">
                  {formData.mayorReto.length}/500 caracteres
                </p>
                {formErrors.mayorReto && (
                  <p className="text-red-500 text-xs animate-shake">{formErrors.mayorReto}</p>
                )}
              </div>
            </div>

            {/* Problemas principales */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Selecciona los problemas que más te afectan:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {problemasPrincipales.map((problema, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedProblems.includes(problema)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedProblems.includes(problema)}
                      onChange={() => toggleProblemChecklist(problema)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                      selectedProblems.includes(problema)
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedProblems.includes(problema) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium">{problema}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {selectedProblems.length} problema{selectedProblems.length !== 1 ? 's' : ''} seleccionado{selectedProblems.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Comentario adicional */}
            <div>
              <textarea
                placeholder="¿Algún comentario adicional sobre tus experiencias con el fútbol amateur? (opcional)"
                value={additionalComment}
                onChange={(e) => setAdditionalComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none hover:border-green-300"
                rows={3}
                maxLength={300}
              />
              <p className="text-xs text-gray-500 mt-1">
                {additionalComment.length}/300 caracteres
              </p>
            </div>

            {/* Checkboxes de términos */}
            <div className="space-y-3">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-1 mr-3 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  He leído y acepto el{' '}
                  <a href="/privacidad" target="_blank" className="text-green-600 hover:text-green-700 underline">
                    Aviso de Privacidad y Protección de Datos
                  </a>
                </span>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 mr-3 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  He leído y acepto los{' '}
                  <a href="/terminos" target="_blank" className="text-green-600 hover:text-green-700 underline">
                    Términos y Condiciones
                  </a>
                </span>
              </label>

              {formErrors.terms && (
                <p className="text-red-500 text-sm animate-shake">{formErrors.terms}</p>
              )}
            </div>

            {/* Error general */}
            {formErrors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{formErrors.general}</p>
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isSubmitting || formularioEnviado}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                isSubmitting || formularioEnviado
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : formProgress === 100
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Enviando...
                </div>
              ) : formularioEnviado ? (
                '¡Registro Exitoso! ✅'
              ) : formProgress === 100 ? (
                '¡Únete a la Beta de ReFut! 🚀'
              ) : (
                `Completa el formulario (${Math.round(formProgress)}%)`
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EarlyAccessForm
