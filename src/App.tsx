import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Post from './pages/Post';
import Navbar from './components/Navbar';
import { GlobalStyles } from './styles/GlobalStyles';
import Solutions from './pages/Solutions';
import Science from './pages/Science';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';
import Subscriptions from './pages/Subscriptions';
import About from './pages/About';
import Webinars from './pages/Webinars';
import ScrollToTop from './components/ScrollToTop';
import FAQ from './pages/FAQ';
import APIDocumentation from './pages/APIDocumentation';
import BookDemo from './components/BookDemo';
import NotFound from './pages/NotFound';
import ResourceRedirect from './pages/ResourceRedirect';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter basename="/">
        <ScrollToTop />
        <Navbar onDemoOpen={() => setIsDemoOpen(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/resources/:slug" element={<ResourceRedirect />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/science" element={<Science />} />
          <Route path="/about" element={<About />} />
          <Route path="/the-science-behind-ggtude" element={<Science />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/website-privacy-policy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/support" element={<Support />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/documentation" element={<APIDocumentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <CookieConsent />
        <BookDemo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App; 