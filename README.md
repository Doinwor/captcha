# captcha — капча студии i.

Двухуровневая капча с защитой от ботов. Чистый клиентский код (HTML + CSS + JS, без зависимостей).

**Живая страница:** https://doinwor.github.io/captcha/

## Состав

| Файл | Назначение |
|---|---|
| `index.html` | Сама капча (standalone-страница). |
| `demo.html` | Тестовая страница: встраивает капчу в `<iframe>` и ловит `postMessage`. |

## Что внутри капчи

- **Этап 1** — код или математический пример на canvas (5 символов, искажения, шум, гильош, водяной знак).
- **Этап 2** — «отметьте все буквы / геометрические фигуры / смайлики»: сетка чекбоксов под картинкой.
- **Этап 3** — анимация «Капча пройдена».
- **Защита** — honeypots (`hpEmail`, `hpUrl`, скрытый чекбокс `hpcb`), проверка на «человечность» (движение мыши, клавиатура, время ответа), лимит попыток с блокировкой.

## Интеграция

Вставьте капчу через `<iframe>` и слушайте сообщение об успехе:

```html
<iframe src="https://doinwor.github.io/captcha/"
        width="500" height="260"
        sandbox="allow-scripts allow-same-origin allow-forms"></iframe>

<script>
  window.addEventListener('message', function (e) {
    if (e.origin !== 'https://doinwor.github.io') return;
    if (e.data && e.data.type === 'captcha-success') {
      // капча пройдена — можно продолжать
    }
  });
</script>
```

Откройте `demo.html` для живого примера.

> **Важно:** проверка сейчас полностью клиентская. Для реальной защиты от ботов нужна серверная валидация токена (Cloudflare Workers / Vercel / Netlify Functions).
