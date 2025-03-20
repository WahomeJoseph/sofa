import { useEffect } from 'react';
import { MdCloseFullscreen } from "react-icons/md";

export default function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 inset-0 z-50 justify-center items-center w-full h-screen">
            
            <div className="relative p-4 w-full max-w-[44rem] mx-auto mt-10 max-h-full">
                <div className="relative bg-gray-900 rounded-lg shadow-sm">
                    <div className="flex relative items-center justify-between p-4 md:p-5 border-b rounded-t border-amber-600">
                        <button
                         onClick={onClose}
                         type="button" 
                         className="text-amber-600 bg-transparent hover:bg-amber-600 hover:text-gray-900 rounded-lg text-base w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="static-modal">
                            <MdCloseFullscreen size={30}/>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>


        // <div classNameName="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        //     <div
        //         // onClick={router.back()} 
        //         classNameName="bg-gray-950 rounded-lg shadow-lg p-6 w-full max-w-md">
        //         <button
        //             onClick={onClose}
        //             classNameName="absolute top-4 right-4 text-gray-400 hover:text-gray-200">
        //             X
        //         </button>
        //         {children}
        //     </div>
        // </div>
    );
}
