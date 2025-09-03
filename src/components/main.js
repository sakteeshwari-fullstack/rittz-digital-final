import Hero from "./hero";
import Services from "./services";
import Footer from "./footer";
import Casestudies from "./casestudies";
import Idea from "./idea";
import Gotidea from "./gotidea";
import Testimonials from "./testimonial";
import AIServicesSection from "./ai";
export default function main() {
  return (
    <>
      <Hero/>
      <AIServicesSection/>
      <Idea/>
      <Services/>
      <Casestudies/>
      <Testimonials/>
      <Gotidea/>
      <Footer/>
    </>
  );
}
