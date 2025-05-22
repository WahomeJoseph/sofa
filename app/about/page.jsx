import React, { Suspense } from 'react'

export default function About() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <About/>
    </Suspense>
  )
}
