import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'الناز بهرامی | متخصص تولید محتوا با هوش مصنوعی',
  description:
    'الناز بهرامی، متخصص تولید محتوا با هوش مصنوعی. محتوای AI با روح انسانی برای برندها، و آموزش کاربردی هوش مصنوعی.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body>{children}</body>
    </html>
  )
}
