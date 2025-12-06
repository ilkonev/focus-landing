import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { trackFAQOpen } from "@/lib/analytics";
import { useSectionView } from "@/hooks/use-analytics";

const FAQSection = () => {
  const sectionRef = useSectionView('FAQ');

  const faqItems = [
    {
      value: "item-1",
      question: "Как Focus отслеживает мою активность?",
      content: (
        <>
          <p className="text-muted-foreground mb-3">
            Focus использует безопасные системные API для мониторинга времени, проведенного в приложениях. Мы не
            читаем содержимое ваших сообщений или документов — только замеряем время использования.
          </p>
          <p className="text-muted-foreground">
            Все данные хранятся локально на вашем устройстве и защищены шифрованием.
          </p>
        </>
      ),
    },
    {
      value: "item-2",
      question: "Какие приложения можно отслеживать?",
      content: (
        <p className="text-muted-foreground">
          Любые: соцсети, развлечения, учебные сервисы, рабочие инструменты — всё, что есть на вашем телефоне.
        </p>
      ),
    },
    {
      value: "item-3",
      question: "Как работает игровой прогресс и рейтинг?",
      content: (
        <>
          <p className="text-muted-foreground mb-3">
            За осознанные действия (работа, учеба, соблюдение лимитов) вы получаете очки прогресса. За хаотичные и
            импульсивные действия — очки снимаются.
          </p>
          <p className="text-muted-foreground mb-3">
            Рейтинг обновляется после каждого взаимодействия. Вы можете соревноваться с другими пользователями или
            своими друзьями.
          </p>
          <p className="text-muted-foreground">Топы рейтинга получают призы и бонусы.</p>
        </>
      ),
    },
    {
      value: "item-4",
      question: "Можно ли настроить уровни ограничений под себя?",
      content: (
        <>
          <p className="text-muted-foreground mb-3">Да.</p>
          <p className="text-muted-foreground mb-3">
            Есть несколько режимов — от мягкого сопровождения до строгой блокировки.
          </p>
          <p className="text-muted-foreground">
            Каждый пользователь выбирает комфортный уровень контроля, который можно изменить в любой момент.
          </p>
        </>
      ),
    },
    {
      value: "item-5",
      question: "Что такое «ударный режим» и когда он нужен?",
      content: (
        <>
          <p className="text-muted-foreground mb-3">
            Ударный режим — это интенсивный режим фокусировки на короткий период: все отвлекающие приложения
            блокируются, а прогресс растёт быстрее.
          </p>
          <p className="text-muted-foreground">
            Используется для важных задач или ситуаций, когда нужно быстро собраться.
          </p>
        </>
      ),
    },
    {
      value: "item-6",
      question: "Поможет ли Focus, если я просто хочу меньше нервничать из-за телефона?",
      content: (
        <>
          <p className="text-muted-foreground mb-3">Да.</p>
          <p className="text-muted-foreground">
            Многие пользователи отмечают снижение цифрового шума: меньше хаотичных открытий, понятные границы
            отдыха, спокойный ритм. Приложение не давит, а поддерживает здоровый баланс.
          </p>
        </>
      ),
    },
  ];

  return (
    <section id="faq" ref={sectionRef} className="section-container py-16 md:py-24">
      <div className="max-w-5xl mx-auto rounded-3xl border border-border/60 bg-secondary/20 p-6 md:p-10">
        <div className="grid gap-8 md:gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.4fr)] items-start">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <HelpCircle className="h-3.5 w-3.5 text-primary" />
              FAQ
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Вопросы и ответы
              </h2>
              <p className="text-muted-foreground">
                Собрали честные ответы о том, как Focus работает с вашей цифровой жизнью: что он видит, как считает
                прогресс и чем может помочь успокоиться.
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-1">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border border-border/40 rounded-xl px-4 md:px-6"
              >
                <AccordionTrigger 
                  className="text-left text-base font-semibold text-foreground hover:no-underline"
                  onClick={() => trackFAQOpen(item.question)}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;


