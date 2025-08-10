import './globals.css'
import Navbar from './components/navbar'
import Footer from './components/footer'

export const metadata = {
  title: 'HealthCare Solutions - Professional Healthcare Management',
  description: 'Professional healthcare management services including insurance claims, technical support, and custom CMS solutions.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
