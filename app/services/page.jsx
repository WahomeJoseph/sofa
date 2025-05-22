import Link from "next/link"
import ServiceForm from "../../components/service/Services"
import { Sofa, Brush, SprayCan, CircleCheckBig } from "lucide-react"
import { Toaster } from "sonner"

export async function generateMetadata() {
    return {
        title: "Sofa Lux Services and Products",
        description: "Elevate Your Living Room and Offices with Quality Sofas and Professional Services.",
    }
}

export default function Services() {
    return (
        <main className="min-h-screen bg-gray-950 text-[#ddd6cb]">
            <Toaster position="top-center" richColors/>
            <section className="relative py-16 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-amber-600">Our Premium Services</h1>
                        <p className="text-xl mb-8">Transforming spaces with exceptional sofa solutions tailored to your needs.</p>
                    </div>
                </div>
                <div className="absolute w-96 h-96 bg-amber-600/20 blur-[120px] -right-48 top-0"></div>
                <div className="absolute w-96 h-96 bg-amber-600/20 blur-[120px] -left-48 bottom-0"></div>
            </section>

            {/* Services Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-amber-600">Our Specialized Services</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="relative overflow-hidden bg-gray-900/30 rounded-lg shadow-lg transition-all duration-300 hover:scale-102">
                            <div className="p-6">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-600/20">
                                        <Sofa className="w-8 h-8 text-amber-600" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-center text-amber-600">Sofa Revamp</h3>
                                <div className="space-y-4 mb-6">
                                    <p className="text-sm font-light">Give your existing sofas a fresh new look with our professional revamping services. We offer:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Complete reupholstery with premium fabrics</li>
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Frame repair and reinforcement</li>
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Cushion replacement and refilling</li>
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Color and texture transformation</li>
                                    </ul>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link
                                        href="#booking-form"
                                        className="inline-block px-6 py-3 bg-amber-600 text-gray-950 font-bold rounded-md hover:bg-amber-500 transition-colors">
                                        Book This Service
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute w-60 h-60 bg-amber-600/20 blur-[80px] -left-20 -bottom-20 opacity-50"></div>
                        </div>

                        {/* Service 2 */}
                        <div className="relative overflow-hidden bg-gray-900/30 rounded-lg shadow-lg transition-all duration-300 hover:scale-102">
                            <div className="p-6">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-600/20">
                                        <Brush className="w-8 h-8 text-amber-600" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-center text-amber-600">Custom Sofa Design</h3>
                                <div className="space-y-4 mb-6">
                                    <p className="text-sm font-light">Design your dream sofa with our bespoke design services. Our process includes:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Consultation with our design experts</li>
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Custom measurements for perfect fit</li>
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Selection from over 200 premium fabrics</li>
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>3D modeling preview before production</li>
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Handcrafted construction by master artisans</li>
                                    </ul>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link
                                        href="#booking-form"
                                        className="inline-block px-6 py-3 bg-amber-600 text-gray-950 font-bold rounded-md hover:bg-amber-500 transition-colors">
                                        Book This Service
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute w-60 h-60 bg-amber-600/20 blur-[80px] -right-20 -top-20 opacity-50"></div>
                        </div>

                        {/* Service 3 */}
                        <div className="relative overflow-hidden bg-gray-900/30 rounded-lg shadow-lg transition-all duration-300 hover:scale-102">
                            <div className="p-6">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-600/20">
                                        <SprayCan className="w-8 h-8 text-amber-600" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-center text-amber-600">Sofa Cleaning</h3>
                                <div className="space-y-4 mb-6">
                                    <p className="text-sm font-light">Keep your sofas looking new with our professional cleaning services:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Deep fabric extraction cleaning</li>
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Stain and odor removal</li>
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Leather conditioning and protection</li>
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Sanitization and allergen reduction</li>
                                        <li className="flex text-sm font-light gap-3"><CircleCheckBig className="text-green-300" size={18}/>Protective coating application</li>
                                    </ul>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link
                                        href="#booking-form"
                                        className="inline-block px-6 py-3 bg-amber-600/90 text-gray-950 font-bold rounded-md hover:bg-amber-600/70 transition-colors">
                                        Book This Service
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute w-60 h-60 bg-amber-600/20 blur-[80px] -left-20 -top-20 opacity-50"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 bg-transparent">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-amber-600">Why Choose SofaLux</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 border border-gray-800 rounded-lg hover:border-amber-600/50 transition-colors">
                            <h3 className="text-xl font-bold mb-4 text-amber-600">Expert Craftsmanship</h3>
                            <p>
                                Our team of skilled artisans brings over 5 years of combined experience, ensuring every service is
                                performed with precision and care.
                            </p>
                        </div>

                        <div className="p-6 border border-gray-800 rounded-lg hover:border-amber-600/50 transition-colors">
                            <h3 className="text-xl font-bold mb-4 text-amber-600">Premium Materials</h3>
                            <p>
                                We use only the highest quality materials, from luxurious fabrics to eco-friendly cleaning solutions,
                                guaranteeing exceptional results.
                            </p>
                        </div>

                        <div className="p-6 border border-gray-800 rounded-lg hover:border-amber-600/50 transition-colors">
                            <h3 className="text-xl font-bold mb-4 text-amber-600">Customer Satisfaction</h3>
                            <p>
                                With a 98% customer satisfaction rate and a 30-day guarantee on all our services, you can trust us to
                                exceed your expectations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section id="booking-form" className="py-16 bg-gray-900/30">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-amber-600">Book Our Services</h2>
                        <ServiceForm />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-amber-600">FAQs?</h2>

                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="bg-gray-900/40 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-2 text-amber-600">How long does a sofa revamp take?</h3>
                            <p>
                                Most sofa revamp projects are completed within 7-14 days, depending on the complexity and materials
                                required. We'll provide you with a specific timeline during your consultation.
                            </p>
                        </div>

                        <div className="bg-gray-900/40 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-2 text-amber-600">Do you offer warranties on your services?</h3>
                            <p>
                                Yes, all our services come with a 30-day satisfaction guarantee. Custom sofa designs include a 5-year
                                warranty on craftsmanship and frame construction.
                            </p>
                        </div>

                        <div className="bg-gray-900/40 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-2 text-amber-600">
                                How often should I have my sofa professionally cleaned?
                            </h3>
                            <p>
                                For optimal maintenance, we recommend professional cleaning every 12-18 months for regular use sofas,
                                and every 6-12 months for homes with children, pets, or high traffic.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-amber-600">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-950">Ready to Transform Your Space?</h2>
                    <p className="text-xl mb-8 text-gray-900 max-w-2xl mx-auto">
                        Contact us today to schedule a consultation or book any of our premium sofa services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="#booking-form"
                            className="px-8 py-3 bg-gray-950 text-amber-600 font-bold rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Book a Service
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-3 bg-transparent border-2 border-gray-950 text-gray-950 font-bold rounded-md hover:bg-gray-950/10 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
