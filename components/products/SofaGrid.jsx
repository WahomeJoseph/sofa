import SofaItem from "./SofaItem";

export default function SofaGrid({ sofas }) {
    return (
        <>
            <ul className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 w-[100%] mx-10 p-10 my-auto">
                {sofas.map((sofa) => (
                    <li key={sofa.id}>
                        <SofaItem {...sofa} />
                    </li>
                ))}
            </ul>
        </>

    )
}