
import HeroMain from './components/newcomponents/HeroMain'
import HeroTrust from './components/newcomponents/HeroTrust'
import HeroStats from './components/newcomponents/HeroStats'
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroMain />
      <HeroTrust />
      <HeroStats />
    </div>
  )
}