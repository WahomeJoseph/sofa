import SofaItem from "./SofaItem";

export default function SofaGrid({ sofas }) {
    return (
        <>
            <ul className="grid md:grid-cols-4 sm:grid sm:grid-cols-2 gap-14 w-[90%] mx-10 p-10 my-auto max-w-[90rem] shadow-md">
                {sofas.map((sofa) => (
                    <li key={sofa.id}>
                        <SofaItem {...sofa} />
                    </li>
                ))}
            </ul>
        </>

    )
}