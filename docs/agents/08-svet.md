# Agent brief — Wave 3 — #8 Svet

**Волна 6.** `/baby`, папка `frontend/src/pages/Baby/`, ветка `feat/svet-baby`, после Karen. Секции включая Parent care guide `6-13287` / `6-13550`, `id="brand-story"`, движение на токенах. Diff Textile пустой. Раздел «8 — Svet · baby» в [task-wave6.md](../../task-wave6.md). Текст ниже не стирать.

**Wave 6.** `/baby`, folder `frontend/src/pages/Baby/`, branch `feat/svet-baby`, after Karen. Sections including Parent care guide `6-13287` / `6-13550`, `id="brand-story"`, motion on tokens. Empty Textile diff. Section “8 — Svet · baby” in [task-wave6.md](../../task-wave6.md). The text below stays.

**Wave 6.** `/baby`, պանակ `frontend/src/pages/Baby/`, ճյուղ `feat/svet-baby`, Karen-ից հետո։ Սեկցիաներ՝ ներառյալ Parent care guide `6-13287` / `6-13550`, `id="brand-story"`, շարժում՝ token-ներով։ Textile diff-ը դատարկ է։ Բաժինը՝ [task-wave6.md](../../task-wave6.md), «8 — Svet · baby»։ Ներքևի տեքստը մնում է։

**Волна 5 (закрыта).** Полный `/baby`, кадры `6-13059` и `6-13319`. Папка `frontend/src/pages/Baby/`, ветка `feat/svet-baby`, после Karen. Те же секции витрины плюс отдельный Parent care guide. Карточка Vach, без товара Textile. Diff Textile пустой. Опт не собирать. Раздел «8 — Svet · baby» в [task-wave5.md](../../task-wave5.md). Текст ниже не стирать.

**Wave 5 (closed).** The full `/baby`, frames `6-13059` and `6-13319`. Folder `frontend/src/pages/Baby/`, branch `feat/svet-baby`, after Karen. The same shop sections plus a separate Parent care guide. Vach’s card. No Textile product. The Textile diff stays empty. Do not build wholesale. Section “8 — Svet · baby” in [task-wave5.md](../../task-wave5.md). The text below stays.

**Wave 5 (փակ).** Լրիվ `/baby`, կադրեր `6-13059` և `6-13319`։ Պանակ `frontend/src/pages/Baby/`, ճյուղ `feat/svet-baby`, Karen-ից հետո։ Խանութի նույն սեկցիաները, գումարած առանձին Parent care guide։ Vach-ի քարտ, առանց Textile ապրանքի։ Textile-ի diff-ը դատարկ է։ Մեծածախը չհավաքել։ Բաժինը՝ [task-wave5.md](../../task-wave5.md), «8 — Svet · baby»։ Ներքևի տեքստը մնում է։

**Волна 4.** Текущий экран — [task-wave4.md](../../task-wave4.md), раздел «8 — Svet · baby». Только `frontend/src/pages/Baby/` по кадру, та же карточка Vach, без товара Textile. Текст ниже не стирать.

**Wave 4.** Current screen: [task-wave4.md](../../task-wave4.md), section “8 — Svet · baby”. Only `frontend/src/pages/Baby/` from the frame, the same card, no Textile product. The text below stays.

**Wave 4.** Ընթացիկ էկրանը՝ [task-wave4.md](../../task-wave4.md), «8 — Svet · baby»։ Միայն `frontend/src/pages/Baby/` կադրից, նույն քարտով, առանց Textile ապրանքի։ Ներքևի տեքստը մնում է։

Отдай этот файл агенту целиком. Номер ученика — **8**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «8 — Svet · baby» в [task-wave3.md](../../task-wave3.md).

Страница `/baby` уже читает каталог. Сид и модели не трогать. Файлы Textile не трогать.

## Русский

### Кто ты

Ты делаешь зону ученика 8, Svet, ветка `feat/svet-baby`. Срок — конец января 2027.

Один PR, base = `dev`. В `main` не пушить. Postgres не поднимать.

В очереди ты после Karen: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

### Зона ответственности

Можно: `frontend/src/pages/Baby/` и новые ключи в трёх JSON.

Нельзя: `seed_baby`, модели, страница Textile, API корзины.

### Шаги

1. На каждом опубликованном товаре кнопка шлёт `POST /api/cart/items/` с его `sku` и `qty: 1` через `api`.
2. **401** показывает на карточке, что нужен вход.
3. Успех виден на карточке.
4. Свои строки — в трёх JSON. Ключи Karen не затирать: у Baby свой блок, если строки другие.

### Definition of Done

Кнопка кладёт товар Baby. Страница Textile в diff не меняется.

### Нельзя

Копировать файлы Textile поверх Baby.

## English

You are student **8**, Svet, branch `feat/svet-baby`. Add the same add-to-cart button on `/baby` only. Post `{sku, qty: 1}`. A 401 says sign-in is required. Show success on the card. Add strings to all three JSON files without wiping Karen’s keys.

Do not change the seed, the models, or any Textile file.

**Done when** the button adds a Baby product and the Textile page is untouched.

## Հայերեն

Դու աշակերտ **8**-ն ես, Svet, ճյուղը՝ `feat/svet-baby`։ Նույն «զամբյուղ» կոճակը դիր միայն `/baby`-ում։ Ուղարկիր `{sku, qty: 1}`։ 401-ը ասում է, որ մուտք է պետք։ Հաջողությունը երևում է քարտի վրա։ Տողերը՝ երեք JSON-ում, Karen-ի բանալիները չջնջել։

Seed-ը, մոդելները և Textile-ի ֆայլերը չփոխել։

**Ավարտված է, երբ** կոճակը դնում է Baby ապրանք, և Textile էջը չի դիպչվել։
