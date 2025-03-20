import MemberCard from './MemberCard'
import bonnie from '@/assets/bonnie-green.png'

export default function Team() {
    const team = [
        {
            id: 1,
            name: 'Merry Jane',
            role: 'Chief Executive Officer, CEO',
            photo: bonnie,
            bio: 'Janey drives the vision and strategy of Sofa Lux, ensuring we deliver premium furniture solutions.',
            quote: 'I believe that every home deserves a touch of luxury. At Sofa Lux, we make that possible.',
            socials: [
                {
                    name: 'twitter',
                    url: 'https://twitter.com/WachiraJoseph17'
                },
                {
                    name: 'instagram',
                    url: 'https://instagram.com/WachiraJoseph17'
                },
                {
                    name: 'pinterest',
                    url: 'https://pinterest.com/WachiraJoseph17'
                },
                {
                    name: 'facebook',
                    url: 'https://facebook.com/WachiraJoseph17'
                }
            ]
        },
        {
            id: 2,
            name: 'Merry Jane',
            role: 'Chief Executive Officer, CEO',
            photo: bonnie,
            bio: 'Janey drives the vision and strategy of Sofa Lux, ensuring we deliver premium furniture solutions.',
            quote: 'I believe that every home deserves a touch of luxury. At Sofa Lux, we make that possible.',
            socials: [
                {
                    name: 'twitter',
                    url: 'https://twitter.com/WachiraJoseph17'
                },
                {
                    name: 'instagram',
                    url: 'https://instagram.com/WachiraJoseph17'
                },
                {
                    name: 'pinterest',
                    url: 'https://pinterest.com/WachiraJoseph17'
                },
                {
                    name: 'facebook',
                    url: 'https://facebook.com/WachiraJoseph17'
                }
            ]
        }
    ]

    return (
        <>
            <section className="bg-transparent h-screen mt-0">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">

                    <div className="space-y-2 mx-auto max-w-screen-sm text-center mb-8">
                        <h2 className="text-[2rem] tracking-wide text-center text-amber-600">Sofa Lux Team</h2>
                        <p className="font-light text-[#ddd6cb] text-[1.2rem]">Sofa Lux Team</p>
                    </div>

                    <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                        {team.map((member) => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
