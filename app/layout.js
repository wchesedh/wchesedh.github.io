import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Weljo Chesedh - Portfolio',
  description: 'Full-Stack Developer, Prompt Engineer, and Implementation Engineer',
  icons: {
    icon: [
      { url: '/images/weljIcon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/weljIcon.png', type: 'image/png' },
    ],
    shortcut: [
      { url: '/images/weljIcon.png', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
