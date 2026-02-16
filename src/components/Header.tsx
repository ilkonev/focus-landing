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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-[env(safe-area-inset-top)] ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-20 min-h-16">
        {/* Logo - responsive size: 40px mobile, 72px desktop */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="transition-transform duration-300 group-hover:scale-105 w-10 h-10 md:w-[72px] md:h-[72px]">
            <Logo size={72} className="w-full h-full" />
          </div>
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
          className="md:hidden p-2 -mr-2 text-foreground hover:bg-secondary rounded-lg transition-colors touch-manipulation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="section-container py-4 px-4 sm:px-6 flex flex-col gap-1">
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
