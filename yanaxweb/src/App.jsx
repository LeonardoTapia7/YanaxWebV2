import './styles/global.css';
import './styles/tokens.css';

import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Pilares from './components/Pilares/Pilares';
import Showcase from './components/Showcase/Showcase';
import Servicios from './components/Servicios/Servicios';
import CtaFooter from './components/CtaFooter/CtaFooter';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pilares />
        <Showcase />
        <Servicios />
        <CtaFooter />
      </main>
    </>
  );
}
