import React from 'react'
import Link from 'next/link'

export function Navigation() {
  const menuItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Ask Sensei', href: '/ask' },
    { label: 'Opportunities', href: '/opportunities' },
    { label: 'Risk Analysis', href: '/risk' },
    { label: 'Portfolio', href: '/portfolio' },
  ]

  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        YieldSensei
      </Link>
      
      <div className="flex gap-8">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
} 