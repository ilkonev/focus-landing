import { Send, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { trackFooterClick } from "@/lib/analytics";

const TELEGRAM_URL = "https://t.me/focus_ai_group";
const EMAIL_URL = "mailto:focusgroup.and.co@gmail.com";
const SUPPORT_URL = "https://www.tbank.ru/cf/49qzXMKw76x";

const Footer = () => {
  return (
    <footer className="py-12 bg-secondary/50 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Logo and Social */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px]">
              <Logo size={72} className="w-full h-full" />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="Telegram"
                onClick={() => trackFooterClick("telegram", "Telegram", TELEGRAM_URL)}
              >
                <Send className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </a>
              <a
                href={EMAIL_URL}
                className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="Email"
                onClick={() => trackFooterClick("email", "Email", EMAIL_URL)}
              >
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Centered Privacy Policy */}
          <div className="w-full md:flex-1 flex justify-center">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 text-center"
              onClick={() =>
                trackFooterClick("privacy", "Политика конфиденциальности", "/privacy")
              }
            >
              Политика конфиденциальности
            </Link>
          </div>

          {/* Support button and Copyright */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors duration-300"
              onClick={() => trackFooterClick("support", "Поддержать", SUPPORT_URL)}
            >
              Поддержать
            </a>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Focus
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
