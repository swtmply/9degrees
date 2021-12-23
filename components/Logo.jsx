import React from 'react'
import Image from "next/image"
import iconmark from "../public/primarymark-white.svg"
import wordmark from "../public/wordmark-white.svg"

export default function Logo() {
  return (
    <>
      <Image 
        src={iconmark}
        width={12}
        height={6}
        layout="responsive"
      />
      <Image 
        src={wordmark} 
        width={26}
        height={4}
        layout="responsive"
      />  
    </>
  )
}
