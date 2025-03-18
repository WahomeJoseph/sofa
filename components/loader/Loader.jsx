import React from 'react'

export default function Loader() {
  return (
    <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90">
            <div className="w-20 h-20 border-4 border-t-4 border-gray-800 rounded-full animate-spin"></div>
        </div>
    </>
  )
}
