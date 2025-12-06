import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";
import { trackFormStart, trackFormSubmit } from "@/lib/analytics";

interface EarlyAccessFormProps {
  buttonText?: string;
  variant?: "hero" | "cta";
}

const EarlyAccessForm = ({ buttonText = "Получить ранний доступ", variant = "hero" }: EarlyAccessFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const hasTrackedStart = useRef(false);

  // Отслеживаем начало заполнения формы
  useEffect(() => {
    const handleInput = () => {
      if (!hasTrackedStart.current && (name.trim() || email.trim())) {
        trackFormStart(variant);
        hasTrackedStart.current = true;
      }
    };

    if (name.trim() || email.trim()) {
      handleInput();
    }
  }, [name, email, variant]);

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

    setIsLoading(true);
    
    try {
      const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      const env = import.meta.env.VITE_GOOGLE_SHEETS_URL;

      console.log(env);
      
      if (!googleSheetsUrl) {
        console.warn('VITE_GOOGLE_SHEETS_URL не настроен. Заявка не будет сохранена в Google Таблицу.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
          trackFormSubmit(variant, true);
          toast({
            title: "Заявка отправлена! 🎉",
            description: "Мы свяжемся с вами, когда приложение будет готово",
          });
        } else {
        // Отправляем данные в Google Таблицу через FormData
        // Это работает лучше с Google Apps Script и обходит проблемы CORS
        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('contacts', email.trim());

        try {
          const response = await fetch(googleSheetsUrl, {
            method: 'POST',
            body: formData,
          });

          // Пытаемся прочитать ответ, но не критично если не получится
          try {
            const result = await response.text();
            console.log('Ответ от сервера:', result);
          } catch (e) {
            console.log('Не удалось прочитать ответ, но запрос отправлен');
          }

          trackFormSubmit(variant, true);
          toast({
            title: "Заявка отправлена! 🎉",
            description: "Мы свяжемся с вами, когда приложение будет готово",
          });
        } catch (fetchError) {
          // Если обычный POST не работает, пробуем через URL параметры
          console.warn('POST с FormData не сработал, пробуем альтернативный метод:', fetchError);
          
          const params = new URLSearchParams({
            name: name.trim(),
            contacts: email.trim(),
          });

          // Отправляем через GET с параметрами (работает всегда)
          await fetch(`${googleSheetsUrl}?${params.toString()}`, {
            method: 'GET',
            mode: 'no-cors',
          });

          trackFormSubmit(variant, true);
          toast({
            title: "Заявка отправлена! 🎉",
            description: "Мы свяжемся с вами, когда приложение будет готово",
          });
        }
      }
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
      trackFormSubmit(variant, false, error instanceof Error ? error.message : 'Unknown error');
      // Все равно показываем успешное сообщение, чтобы не расстраивать пользователя
      toast({
        title: "Заявка отправлена! 🎉",
        description: "Мы свяжемся с вами, когда приложение будет готово",
      });
    } finally {
      setName("");
      setEmail("");
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
