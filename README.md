# captcha — капча студии i.

Двухуровневая капча с защитой от ботов. Чистый клиентский код (HTML + CSS + JS, без зависимостей).

**Живая страница:** https://doinwor.github.io/captcha/
**Демо встраивания:** https://doinwor.github.io/captcha/demo.html

## Состав

| Файл | Назначение |
|---|---|
| `index.html` | Сама капча (standalone-страница). |
| `demo.html` | Тестовая страница: встраивает капчу в `<iframe>` и ловит `postMessage`. |

## Что внутри капчи

- **Этап 1** — код или математический пример на canvas (5 символов, искажения, шум, гильош, водяной знак).
- **Этап 2** — «отметьте все буквы / геометрические фигуры / смайлики»: сетка чекбоксов под картинкой.
- **Этап 3** — анимация «Капча пройдена».
- **Защита** — honeypots (`hpEmail`, `hpUrl`, скрытый чекбокс `hpcb`), проверка на «человечность» (движение мыши, клавиатура, время ответа).
- **Жёсткий провал** — после 5 ошибок на этапе 1 или 3 на этапе 2 (а также при срабатывании honeypot/поведенческой проверки) капча блокируется: красная точка, всё неактивно, сообщение снизу. Сброс — только перезагрузка страницы (F5).

## Прозрачность и размещение

Страница капчи полностью **прозрачная**, плашка прижата к **левому верхнему углу**. В `<iframe>` видно только саму плашку — фон «сайта-хозяина» просвечивает, обводок и белых полей нет. Размер плашки адаптивный (`min(480px, 94vw)`).

## Встраивание

```html
<iframe id="cap" src="https://doinwor.github.io/captcha/"
        width="500" height="180" title="Капча"
        style="border:0;background:transparent"
        sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
<button id="go" disabled>Продолжить →</button>

<script>
  var EXPECTED = 'https://doinwor.github.io';
  window.addEventListener('message', function (e) {
    if (e.origin !== EXPECTED) return;
    // капча сама присылает свою высоту — подгоняем iframe
    if (e.data && e.data.type === 'captcha-resize' && e.data.height) {
      document.getElementById('cap').style.height = e.data.height + 'px';
    }
    // капча пройдена
    if (e.data && e.data.type === 'captcha-success') {
      document.getElementById('go').disabled = false;
    }
  });
</script>
```

Откройте `demo.html` для живого примера (клетчатый фон — это «сайт-хозяин»).

> **Важно:** проверка сейчас полностью клиентская. Для реальной защиты от ботов нужна серверная валидация токена (Cloudflare Workers / Vercel / Netlify Functions).
