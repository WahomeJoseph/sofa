import { getSofa } from "@/utils/Products";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateMetadata({ params }) {
    const { sofaSlug } = await params;
    const sofas = await getSofa(sofaSlug);

    if (!sofas) {
        notFound();
    }

    return {
        title: sofas.name,
        description: sofas.description,
    };
}

export default async function SofaCard({ params }) {
    const { sofaSlug } = await params;
    const sofas = await getSofa(sofaSlug);

    if (!sofas) {
        notFound();
    }

    // Replace newlines with <br /> for HTML rendering
    sofas.description = sofas.description.replace(/\n/g, '<br />');

    return (
        <>
            <header className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                {/* Sofa Image */}
                <div className="relative w-full h-full">
                    <Image
                        src={sofas.image}
                        alt={sofas.name}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                {/* Overlay for Text */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ddd6cb] mb-4">
                        {sofas.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-amber-600 mb-4">By Sofa Lux {sofas.price}</p>
                    <p className="text-lg md:text-xl text-[#ddd6cb] max-w-2xl">
                        {sofas.description}
                    </p>
                </div>
            </header>

            {/* Main Content Section */}
            <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
                <div className="prose prose-lg max-w-none">
                    <p
                        dangerouslySetInnerHTML={{ __html: sofas.description }}
                        className="text-[#ddd6cb]"
                    ></p>
                </div>
            </main>
        </>
    );
}