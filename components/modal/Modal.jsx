import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

export default function Modal({ isOpen, onClose, children }) {
    // const router = useRouter()
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div
                // onClick={router.back()} 
                className="bg-gray-950 rounded-lg shadow-lg p-6 w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-200">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}