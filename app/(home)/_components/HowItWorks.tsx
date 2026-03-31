import { HOW_IT_WORKS } from '@/constants'


const HowItWorks = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
          <p className="text-sm text-gray-500 mt-2">
            Three steps to your next role
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mx-auto mb-4">
                {step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
  )
}

export default HowItWorks