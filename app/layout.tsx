import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata = {
  title: "mobiliario mendoza",
  description: "Sistema de punto de venta",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-gray-50">
        {children}        
      </body>
    </html>
  )
}
