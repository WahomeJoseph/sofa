'use client'
import { useFormStatus } from 'react-dom'

export default function Submit() {
    const { pending } = useFormStatus()
    return (
        <button>
            {pending ? 'Submitting...' : 'Contact Us'}
        </button>
    )
}