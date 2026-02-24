import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";

interface EarlyAccessFormProps {
  buttonText?: string;
  variant?: "hero" | "cta";
}

const EarlyAccessForm = ({ buttonText = "Получить ранний доступ", variant = "hero" }: EarlyAccessFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, введите имя и контакты",
        variant: "destructive",
      });
      return;
    }

    if (!consent) {
      toast({
        title: "Необходимо согласие",
        description: "Дайте согласие на обработку персональных данных для отправки заявки",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Заявки собираются через Яндекс Форму (YandexFormEmbed)
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast({
        title: "Заявка отправлена! 🎉",
        description: "Мы свяжемся с вами, когда приложение будет готово",
      });
    } finally {
      setName("");
      setEmail("");
      setConsent(false);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md">
      <Input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-12 bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:bg-secondary rounded-xl transition-all duration-300"
      />
      <Input
        type="text"
        placeholder="Ваши контакты (телефон, тг, email)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:bg-secondary rounded-xl transition-all duration-300"
      />
      <label className="flex items-start gap-3 cursor-pointer group">
        <Checkbox
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked === true)}
          className="mt-0.5 rounded border-muted-foreground/50 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
        />
        <span className="text-sm text-muted-foreground leading-tight group-hover:text-foreground/90 transition-colors">
          Даю согласие на{" "}
          <Link to="/privacy" className="underline hover:no-underline text-foreground/90" target="_blank" rel="noopener noreferrer">
            обработку персональных данных
          </Link>
        </span>
      </label>
      <Button
        type="submit"
        className="w-full h-12 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold text-base transition-all duration-300 hover:scale-[1.02]"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {buttonText}
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
};

export default EarlyAccessForm;
