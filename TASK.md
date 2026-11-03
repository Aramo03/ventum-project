# Ventum — задания команды

**Git:** [CONTRIBUTING.md](CONTRIBUTING.md)  
**Макет:** [Figma Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)

Каркас уже в `main` и `dev`: пустые страницы, Header, Footer, health, Swagger. Моделей товаров нет. В этой волне ученик заполняет свою зону. Чужие файлы не переписывать.

| # | Имя | Ветка | Зона |
|---|-----|--------|------|
| 1 | Lead | `feat/lead-lead` | Порядок PR и проверка `docker compose up` |
| 2 | Daniel | `feat/daniel-api` | `GET /api/health/` и Swagger остаются рабочими, если трогаешь API |
| 3 | Sv | `feat/sv-i18n` | Строки `am` и `en` в `frontend/src/i18n/` |
| 4 | Karen | `feat/karen-gateway` | Страница `/` по кадру Gateway |
| 5 | Vach | `feat/vach-header` | Header: поиск, язык, аккаунт, корзина, меню |
| 6 | Ashot | `feat/ashot-footer` | Footer и блок рассылки |
| 7 | Hayk | `feat/hayk-textile` | Витрина `/textile` |
| 8 | Suren | `feat/suren-baby` | Витрина `/baby` |
| 9 | Mariam | `feat/mariam-catalog` | Состояния каталога и формы рассылки из Design system |
| 10 | UI / QA | `feat/ui-ui` | Цвета из макета, страница 404, вид на узком экране |

Порядок мержа: **Lead → Daniel → Sv → Vach → Ashot → Karen → Hayk → Suren → Mariam → UI/QA**.

Правила: один PR = одна зона; в `main` не пушить; модели товаров в этой волне не добавлять.

## English

The shell is already on `main` and `dev`: empty pages, Header, Footer, health, Swagger. There are no product models. Each student fills one zone and does not rewrite other people's files.

| # | Name | Branch | Zone |
|---|------|--------|------|
| 1 | Lead | `feat/lead-lead` | PR order and `docker compose up` |
| 2 | Daniel | `feat/daniel-api` | Keep `GET /api/health/` and Swagger working |
| 3 | Sv | `feat/sv-i18n` | `am` and `en` strings |
| 4 | Karen | `feat/karen-gateway` | `/` from the Gateway frame |
| 5 | Vach | `feat/vach-header` | Header |
| 6 | Ashot | `feat/ashot-footer` | Footer and newsletter |
| 7 | Hayk | `feat/hayk-textile` | `/textile` |
| 8 | Suren | `feat/suren-baby` | `/baby` |
| 9 | Mariam | `feat/mariam-catalog` | Catalog and newsletter states from the design system |
| 10 | UI / QA | `feat/ui-ui` | Colors, 404, narrow screen |

Merge order: **Lead → Daniel → Sv → Vach → Ashot → Karen → Hayk → Suren → Mariam → UI/QA**.

One pull request is one zone. Do not push to `main`. Do not add product models in this wave.

## Հայերեն

Կարկասը արդեն `main`-ում և `dev`-ում է՝ դատարկ էջեր, Header, Footer, health, Swagger: Ապրանքի մոդելներ չկան: Ամեն աշակերտ լրացնում է իր գոտին և ուրիշի ֆայլերը չի վերագրում:

| # | Անուն | Ճյուղ | Գոտի |
|---|------|--------|------|
| 1 | Lead | `feat/lead-lead` | PR-ների կարգը և `docker compose up` |
| 2 | Daniel | `feat/daniel-api` | `GET /api/health/` և Swagger-ը մնում են աշխատող |
| 3 | Sv | `feat/sv-i18n` | `am` և `en` տողերը |
| 4 | Karen | `feat/karen-gateway` | `/` էջը Gateway կադրից |
| 5 | Vach | `feat/vach-header` | Header |
| 6 | Ashot | `feat/ashot-footer` | Footer և նամակագրություն |
| 7 | Hayk | `feat/hayk-textile` | `/textile` |
| 8 | Suren | `feat/suren-baby` | `/baby` |
| 9 | Mariam | `feat/mariam-catalog` | Կատալոգի և ձևի վիճակները design system-ից |
| 10 | UI / QA | `feat/ui-ui` | Գույներ, 404, նեղ էկրան |

Merge-ի կարգը՝ **Lead → Daniel → Sv → Vach → Ashot → Karen → Hayk → Suren → Mariam → UI/QA**:

Մեկ PR = մեկ գոտի: `main` չենք push անում: Այս ալիքում ապրանքի մոդել չենք ավելացնում:
