import CTABanner from "../components/CTABanner"
import Features from "../components/Features"
import HeroSection from "../components/HeroSection"
import TrendingQuote from "../components/TrendingQuote"

function Home() {
  return (
    <>
     <HeroSection/> 
     <TrendingQuote />
     <Features />
     <CTABanner />
    </>
  )
}

export default Home
