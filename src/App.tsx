import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { ThemeProvider } from './theme/ThemeProvider';
import { Home } from './pages/Home/Home';
import { NexErp } from './pages/NexErp/NexErp';
import { About } from './pages/About/About';
import { Services } from './pages/Services/Services';
import { Contact } from './pages/Contact/Contact';
import { NotFound } from './pages/NotFound/NotFound';

// Same pages in both languages: Arabic at "/", English under "/en".
const pages = (
  <>
    <Route index element={<Home />} />
    <Route path="nex-erp" element={<NexErp />} />
    <Route path="about" element={<About />} />
    <Route path="services" element={<Services />} />
    <Route path="contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </>
);

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/en" element={<Layout lang="en" />}>
            {pages}
          </Route>
          <Route path="/" element={<Layout lang="ar" />}>
            {pages}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
