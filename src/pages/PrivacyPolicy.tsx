import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="section-container max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                На главную
              </Link>
            </Button>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Политика конфиденциальности
            </h1>
            
            <p className="text-muted-foreground mb-8">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Общие положения</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
                  пользователей приложения Focus (далее — «Приложение»). Используя Приложение, вы соглашаетесь 
                  с условиями настоящей Политики конфиденциальности.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Мы обязуемся защищать вашу конфиденциальность и обеспечивать безопасность ваших персональных данных.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Собираемые данные</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  При использовании Приложения мы можем собирать следующую информацию:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Имя пользователя</li>
                  <li>Контактные данные (телефон, email, Telegram)</li>
                  <li>Данные об использовании устройств и приложений (экранное время, статистика использования)</li>
                  <li>Технические данные (тип устройства, операционная система, версия приложения)</li>
                  <li>Данные о взаимодействии с Приложением (настройки, предпочтения, цели)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Цели использования данных</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы используем собранные данные для следующих целей:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Предоставление и улучшение функциональности Приложения</li>
                  <li>Персонализация опыта использования</li>
                  <li>Анализ поведения пользователей для улучшения сервиса</li>
                  <li>Связь с пользователями по вопросам использования Приложения</li>
                  <li>Обеспечение безопасности и предотвращение мошенничества</li>
                  <li>Соблюдение требований законодательства</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Обработка данных</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Обработка персональных данных осуществляется с использованием современных технологий защиты. 
                  Мы применяем технические и организационные меры для защиты ваших данных от несанкционированного 
                  доступа, изменения, раскрытия или уничтожения.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Данные хранятся на защищенных серверах и обрабатываются в соответствии с требованиями 
                  законодательства о защите персональных данных.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Передача данных третьим лицам</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением следующих случаев:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Когда это необходимо для предоставления услуг (например, хостинг-провайдеры)</li>
                  <li>Когда это требуется по закону или по запросу государственных органов</li>
                  <li>С вашего явного согласия</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Все третьи лица, которым мы передаем данные, обязаны соблюдать требования конфиденциальности 
                  и использовать данные только в указанных целях.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Ваши права</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Вы имеете право:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Получать информацию о ваших персональных данных</li>
                  <li>Требовать исправления неточных данных</li>
                  <li>Требовать удаления ваших персональных данных</li>
                  <li>Ограничивать обработку ваших данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                  <li>Подать жалобу в уполномоченный орган по защите персональных данных</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Для реализации ваших прав свяжитесь с нами по адресу:{" "}
                  <a href="mailto:focusgroup.and.co@gmail.com" className="text-primary hover:underline">
                    focusgroup.and.co@gmail.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Хранение данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы храним ваши персональные данные в течение срока, необходимого для достижения целей, 
                  указанных в настоящей Политике, или в течение срока, установленного законодательством. 
                  После истечения срока хранения данные удаляются или обезличиваются.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Изменения в Политике</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
                  О существенных изменениях мы уведомим вас через Приложение или по указанным контактным данным. 
                  Продолжение использования Приложения после внесения изменений означает ваше согласие 
                  с новой версией Политики.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Контакты</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  По всем вопросам, связанным с обработкой персональных данных, вы можете обращаться:
                </p>
                <ul className="list-none space-y-2 text-muted-foreground">
                  <li>
                    Email:{" "}
                    <a href="mailto:focusgroup.and.co@gmail.com" className="text-primary hover:underline">
                      focusgroup.and.co@gmail.com
                    </a>
                  </li>
                  <li>
                    Telegram:{" "}
                    <a 
                      href="https://t.me/focus_ai_group" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      @focus_ai_group
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;


