import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { trackLinkClick, trackCTAClick } from "@/lib/analytics";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#results", label: "Результаты" },
    { href: "#how-it-works", label: "Как это работает" },
    { href: "#interface", label: "Интерфейс" },
    { href: "#faq", label: "Вопросы и ответы" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="transition-transform duration-300 group-hover:scale-105">
            <Logo size={36} />
          </div>
          <span className="font-bold text-xl text-foreground">Focus</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              onClick={() => trackLinkClick(link.label, link.href, 'header_desktop')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button variant="default" size="sm" className="rounded-full px-6" asChild>
            <a href="#cta" onClick={() => trackCTAClick('Получить доступ', 'header_desktop')}>
              Получить доступ
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-fade-in">
          <nav className="section-container py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300 py-3 px-4 rounded-xl"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackLinkClick(link.label, link.href, 'header_mobile');
                }}
              >
                {link.label}
              </a>
            ))}
            <Button variant="default" className="w-full mt-4 rounded-full" asChild>
              <a 
                href="#cta" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackCTAClick('Получить доступ', 'header_mobile');
                }}
              >
                Получить доступ
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
