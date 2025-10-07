import HeroSection from '@/components/store/HeroSection'
import FeaturedProducts from '@/components/store/FeaturedProducts'
import Categories from '@/components/store/Categories'
import Newsletter from '@/components/store/Newsletter'

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </>
  )
}