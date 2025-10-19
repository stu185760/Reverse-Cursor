import Image from "next/image"

export function CraftsmanshipSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Meet Skilled Artisans</h2>
            <p className="text-lg text-slate-600">
              Our platform connects you with passionate craftspeople who take pride in their work. From shoemakers to
              jewelry designers, each artisan brings years of expertise and dedication to every project.
            </p>
            <ul className="space-y-3">
              {[
                "Expert craftsmanship and attention to detail",
                "Custom designs tailored to your vision",
                "Quality materials and sustainable practices",
                "Direct communication with makers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-1">✓</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/shoemaker-craft.jpg"
                alt="Shoemaker at work"
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/shoemaker-stitching.jpg"
                alt="Detailed stitching work"
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
