import React from 'react'
import Link from "next/link"


export default function SidebarMenu() {
  return (
    <>
      <div className="text-[#e6e6e6] text-md space-y-2">
        <Link href="/admin/dashboard">
          <a className="block">Home</a>
        </Link>
        <Link href={`/admin/dashboard`}>
          <a className="block">Articles</a>
        </Link>
        <Link href="/admin/dashboard">
          <a className="block">Drafts</a>
        </Link>
        <Link href="/admin/dashboard">
          <a className="block">Trash</a>
        </Link>
      </div>
    </>
  )
}
