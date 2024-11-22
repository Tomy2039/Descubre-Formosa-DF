import Navbar from '../../components/iniciopage/NavBar'
import Hero from "../../components/iniciopage/Hero"
import About from "../../components/iniciopage/About"
import FAQ from "../../components/iniciopage/faqData"
import Contact from "../../components/iniciopage/Contact"
import Services from '../../components/iniciopage/Services'
import Footer from '../../components/iniciopage/Footer'
export function PageInicio() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
    <Services/>
    <FAQ/>
    <Contact/>
    <Footer/>
    </>
  )
} 
export default PageInicio