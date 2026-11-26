import { useEffect } from 'react'
import {
  BRANDS,
  BUTTON_STATES,
  FEEDBACK,
  FORM_STATES,
  LIBRARY,
  MOTION_TOKENS,
  PALETTES,
  SIZES,
  SPACING,
  TYPE_SCALE,
} from './design.js'
import './tokens.css'
import './controls.css'
import './design.css'

function ActionButton({ kind, state, label }) {
  const loading = state.id === 'loading'

  return (
    <button
      type="button"
      className={['ds-btn', kind === 'cash' ? 'ds-btn--cash' : 'ds-btn--card', state.className]
        .filter(Boolean)
        .join(' ')}
      disabled={state.disabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading ? <span className="ds-btn__spinner" aria-hidden="true" /> : null}
      <span>{label}</span>
    </button>
  )
}

function StateMatrix({ kind, label }) {
  return (
    <>
      <p className="ds-kind">{label}</p>
      <div className="ds-state-grid">
        {BUTTON_STATES.map((state) => (
          <div className="ds-state" key={`${kind}-${state.id}`}>
            <span>{state.label}</span>
            <ActionButton kind={kind} state={state} label={label} />
          </div>
        ))}
      </div>
    </>
  )
}

function PaymentMarks() {
  return (
    <div className="ds-marks" aria-label="Accepted card payments">
      <span className="ds-pay ds-pay--visa">VISA</span>
      <span className="ds-pay ds-pay--mastercard">
        <span className="ds-pay__circles" aria-hidden="true">
          <span />
          <span />
        </span>
        Mastercard
      </span>
    </div>
  )
}

function SizeRow() {
  return (
    <div className="ds-sizes" role="group" aria-label="Size selection">
      {SIZES.map((size) => (
        <button
          key={size.id}
          type="button"
          className={size.selected ? 'ds-size is-selected' : 'ds-size'}
          aria-pressed={size.selected}
        >
          {size.label}
        </button>
      ))}
    </div>
  )
}

function StoreSpecimen({ brand }) {
  return (
    <section className="ds-control-panel" data-brand={brand.id} aria-label={`${brand.name} controls`}>
      <h3>{brand.name}</h3>
      <div className="ds-control-stack">
        <div className="ds-switch" role="group" aria-label="Persistent store switch">
          {BRANDS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="ds-switch__option"
              aria-pressed={item.id === brand.id}
            >
              {item.name}
            </button>
          ))}
        </div>
        <label className="ds-field">
          <span className="ds-field__label">Product search</span>
          <input type="search" defaultValue="" placeholder={brand.search} />
        </label>
        <div className="ds-categories" role="group" aria-label="Category control">
          {brand.categories.map((category) => (
            <button
              key={category}
              type="button"
              className="ds-category"
              aria-pressed={category === brand.selectedCategory}
            >
              {category}
            </button>
          ))}
        </div>
        <button type="button" className="ds-btn ds-btn--card">
          Primary action
        </button>
      </div>
    </section>
  )
}

function ProductSpecimen({ brand }) {
  const product = brand.product

  return (
    <article className="ds-card" data-brand={brand.id}>
      <div className="ds-card__media">
        <span className="ds-badge ds-badge--discount">{product.discount}</span>
      </div>
      <div className="ds-card__body">
        <span className="ds-badge ds-badge--stock">{product.stock}</span>
        <h3>{product.name}</h3>
        <p className="ds-card__spec">{product.spec}</p>
        <SizeRow />
        <p className="ds-price-row">
          <span className="ds-price-old">{product.oldPrice}</span>
          <span className="ds-card__price">{product.price}</span>
        </p>
        <PaymentMarks />
        <div className="ds-card__actions">
          <ActionButton kind="card" state={BUTTON_STATES[0]} label="Card" />
          <ActionButton kind="cash" state={BUTTON_STATES[0]} label="Cash" />
        </div>
      </div>
    </article>
  )
}

function FieldSpecimen({ state }) {
  const loading = state.id === 'loading'

  return (
    <label className={['ds-field', state.className].filter(Boolean).join(' ')}>
      <span className="ds-field__label">{state.label}</span>
      <span className="ds-field__control">
        <input
          type="email"
          placeholder="Ձեր էլ. փոստը"
          defaultValue={state.value || ''}
          disabled={state.disabled || loading || undefined}
          aria-invalid={state.id === 'invalid' || undefined}
        />
        {loading ? <span className="ds-field__spinner" aria-hidden="true" /> : null}
      </span>
      {state.hint ? <span className="ds-field__hint">{state.hint}</span> : null}
    </label>
  )
}

function SkeletonCard() {
  return (
    <div className="ds-skeleton" aria-hidden="true">
      <i className="ds-skeleton__photo" />
      <i className="ds-skeleton__name" />
      <i className="ds-skeleton__spec" />
      <span className="ds-skeleton__sizes">
        <i />
        <i />
        <i />
      </span>
      <i className="ds-skeleton__price" />
      <span className="ds-skeleton__buttons">
        <i />
        <i />
      </span>
    </div>
  )
}

export default function Design() {
  useEffect(() => {
    document.title = 'Ventum · Design system'
  }, [])

  return (
    <main className="ds-page">
      <header className="ds-cover">
        <div className="ds-masthead">
          <p className="ds-system-brand">Ventum / Design system</p>
          <p className="ds-release">Commerce foundations — 2026</p>
        </div>
        <h1 className="ds-system-title">
          Two identities. One considered shopping experience.
        </h1>
        <p className="ds-system-description">
          From home comforts to a world for little ones.
        </p>
      </header>

      <section className="ds-section ds-reveal" id="palettes" aria-labelledby="palettes-title">
        <div className="ds-section__head">
          <p className="ds-kicker">01 / Brand</p>
          <div>
            <h2 id="palettes-title">Paired palettes &amp; authentic identities</h2>
          </div>
        </div>
        <div className="ds-pair">
          {PALETTES.map((palette) => (
            <article className="ds-identity" data-brand={palette.id} key={palette.id}>
              <p className="ds-wordmark">
                {palette.wordmark}
                <span>{palette.mark}</span>
              </p>
              <div className="ds-identity__meta">
                <h3>{palette.identity}</h3>
                <p>{palette.tagline}</p>
              </div>
              <ul className="ds-swatches ds-swatches--frame">
                {palette.colors.map((color) => (
                  <li className="ds-swatch ds-swatch--block" key={color.token}>
                    <i style={{ background: color.value }} />
                    <span>
                      <b>{color.role}</b>
                      <small>{color.value}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="ds-section ds-reveal" id="library" aria-labelledby="library-title">
        <div className="ds-section__head">
          <p className="ds-kicker">02</p>
          <div>
            <h2 id="library-title">Component library</h2>
            <p className="ds-section__lead">
              Other screens take the classes from here. This page only shows them.
            </p>
          </div>
        </div>
        <ul className="ds-library">
          {LIBRARY.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                <strong>{item.name}</strong>
                <span>{item.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="ds-section ds-reveal" id="type" aria-labelledby="type-title">
        <div className="ds-section__head">
          <p className="ds-kicker">03</p>
          <div>
            <h2 id="type-title">Shared Armenian-first hierarchy</h2>
            <p className="ds-section__lead">
              Display and body are set in Armenian first. English and Russian use the same scale.
            </p>
          </div>
        </div>
        <div className="ds-type-hero">
          <div>
            <p className="ds-display" lang="hy">
              Հանգիստ առավոտ
            </p>
            <p className="ds-body-sample" lang="hy">
              Բնական գործվածքը տունը դարձնում է հանգիստ։ Սա ցուցադրման և հիմնական
              տեքստի զույգն է։
            </p>
          </div>
          <aside className="ds-lang-note">
            <p className="ds-kicker">am / en / ru</p>
            <p lang="hy">am — հայերենը առաջին դեմքն է։</p>
            <p lang="en">en — English uses the same sizes and the same tokens.</p>
            <p lang="ru">ru — Русский держит ту же шкалу и те же токены.</p>
          </aside>
        </div>
        <div className="ds-scale-wrap">
        <table className="ds-scale">
          <thead>
            <tr>
              <th>Token</th>
              <th>Sample</th>
              <th>Size</th>
              <th>Line</th>
            </tr>
          </thead>
          <tbody>
            {TYPE_SCALE.map((step) => (
              <tr key={step.token}>
                <td className="ds-token">{step.token}</td>
                <td lang={step.lang} data-step={step.name}>
                  {step.sample}
                </td>
                <td>{step.size}</td>
                <td>{step.line}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </section>

      <section className="ds-section ds-reveal" id="rhythm" aria-labelledby="rhythm-title">
        <div className="ds-section__head">
          <p className="ds-kicker">04</p>
          <div>
            <h2 id="rhythm-title">Rhythm, shape, and elevation</h2>
            <p className="ds-section__lead">
              Spacing keeps a token, a measure, and a value. Surfaces stay inside the brand canvas.
            </p>
          </div>
        </div>
        <ul className="ds-space">
          {SPACING.map((step) => (
            <li key={step.token}>
              <span className="ds-token">{step.token}</span>
              <span
                className="ds-space__bar"
                style={{ width: `${step.measure}px` }}
                aria-hidden="true"
              />
              <span>
                {step.measure}px · {step.value}
              </span>
            </li>
          ))}
        </ul>
        <div className="ds-surfaces">
          {PALETTES.map((palette) => (
            <div className="ds-surface" data-brand={palette.id} key={palette.id}>
              <div className="ds-surface__card">
                <strong>{palette.identity} surface</strong>
                <p>
                  Canvas {palette.id === 'textile' ? '#FFFFFF' : '#FAF7F0'}, white card,
                  line #E4E4E4, elevation --ds-elev-2.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="ds-media-note">
          <div className="ds-media-frame" aria-hidden="true" />
          <p className="ds-note">
            Media proportion is 4 / 3, token --ds-media-ratio. The photograph covers the
            frame. The frame does not grow with the file and does not stretch the page.
          </p>
        </div>
      </section>

      <section className="ds-section ds-reveal" id="motion" aria-labelledby="motion-title">
        <div className="ds-section__head">
          <p className="ds-kicker">04b</p>
          <div>
            <h2 id="motion-title">Motion tokens</h2>
            <p className="ds-section__lead">
              Durations, curves, shift, and scale live in the token table. Classes
              ds-reveal and ds-skeleton read them. Under prefers-reduced-motion: reduce,
              shift is 0 and scale is 1.
            </p>
          </div>
        </div>
        <div className="ds-scale-wrap">
          <table className="ds-scale">
            <thead>
              <tr>
                <th>Token</th>
                <th>Role</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {MOTION_TOKENS.map((row) => (
                <tr key={row.token}>
                  <td className="ds-token">{row.token}</td>
                  <td>{row.role}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ds-kind">Reveal sample</p>
        <p className="ds-note ds-reveal">
          This line uses ds-reveal once. Other screens import the same class after merge.
        </p>
      </section>

      <section className="ds-section ds-reveal" id="controls" aria-labelledby="controls-title">
        <div className="ds-section__head">
          <p className="ds-kicker">05</p>
          <div>
            <h2 id="controls-title">Store switch, search, and category</h2>
            <p className="ds-section__lead">
              Specimens of the store controls. They are not the live header and they do not
              write a query or call search.
            </p>
          </div>
        </div>
        <div className="ds-pair">
          {BRANDS.map((brand) => (
            <StoreSpecimen brand={brand} key={brand.id} />
          ))}
        </div>
      </section>

      <section className="ds-section ds-reveal" id="purchase" aria-labelledby="purchase-title">
        <div className="ds-section__head">
          <p className="ds-kicker">06</p>
          <div>
            <h2 id="purchase-title">Purchase actions, sizes, and product states</h2>
            <p className="ds-section__lead">
              Classes, not a cart. Card and Cash each show default, hover, pressed,
              focus-visible, disabled, and loading. Loading does not send a request.
            </p>
          </div>
        </div>
        <div className="ds-pair">
          {BRANDS.map((brand) => (
            <section className="ds-state-panel" data-brand={brand.id} key={brand.id}>
              <h3>{brand.name}</h3>
              <StateMatrix kind="card" label="Card" />
              <StateMatrix kind="cash" label="Cash" />
              <p className="ds-kind">Selected and available sizes</p>
              <SizeRow />
              <p className="ds-kind">Stock and discount</p>
              <div className="ds-marks">
                <span className="ds-badge ds-badge--stock">{brand.product.stock}</span>
                <span className="ds-badge ds-badge--discount">{brand.product.discount}</span>
              </div>
              <p className="ds-kind">Accepted card payments</p>
              <PaymentMarks />
            </section>
          ))}
        </div>
      </section>

      <section className="ds-section ds-reveal" id="card" aria-labelledby="card-title">
        <div className="ds-section__head">
          <p className="ds-kicker">07</p>
          <div>
            <h2 id="card-title">Product-card anatomy and interaction states</h2>
            <p className="ds-section__lead">
              A static card for each brand. The live card is another zone and uses these classes.
            </p>
          </div>
        </div>
        <div className="ds-pair">
          {BRANDS.map((brand) => (
            <div className="ds-stack" key={brand.id}>
              <ProductSpecimen brand={brand} />
              <section className="ds-state-panel" data-brand={brand.id} aria-label={`${brand.name} interaction states`}>
                <h3>Interaction states</h3>
                <StateMatrix kind="card" label="Card" />
                <StateMatrix kind="cash" label="Cash" />
              </section>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section ds-reveal" id="form" aria-labelledby="form-title">
        <div className="ds-section__head">
          <p className="ds-kicker">08 / Form</p>
          <div>
            <h2 id="form-title">Newsletter field</h2>
            <p className="ds-section__lead">
              Default, focus-visible, invalid, success, disabled, and loading. This specimen
              does not post to the newsletter.
            </p>
          </div>
        </div>
        <div className="ds-pair">
          {BRANDS.map((brand) => (
            <div data-brand={brand.id} key={brand.id}>
              <p className="ds-kind">{brand.name}</p>
              <div className="ds-form-grid">
                {FORM_STATES.map((state) => (
                  <FieldSpecimen state={state} key={`${brand.id}-${state.id}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section ds-reveal" id="feedback" aria-labelledby="feedback-title">
        <div className="ds-section__head">
          <p className="ds-kicker">09 / Feedback</p>
          <div>
            <h2 id="feedback-title">Empty, skeleton, and error</h2>
            <p className="ds-section__lead">
              Specimens of the catalog states. Retry does not repeat a request from this page.
            </p>
          </div>
        </div>
        <div className="ds-pair">
          <article className="ds-feedback" data-brand="textile" lang="hy">
            <h3>{FEEDBACK.textileEmptyTitle}</h3>
            <p>{FEEDBACK.textileEmptyText}</p>
          </article>
          <article className="ds-feedback" data-brand="baby" lang="hy">
            <h3>{FEEDBACK.babyEmptyTitle}</h3>
            <p>{FEEDBACK.babyEmptyText}</p>
            <button type="button" className="ds-btn ds-btn--card">
              {FEEDBACK.babyEmptyAction}
            </button>
          </article>
          <article className="ds-feedback" data-brand="textile" lang="hy">
            <h3>{FEEDBACK.errorTitle}</h3>
            <p>{FEEDBACK.errorText}</p>
            <button type="button" className="ds-btn ds-btn--card">
              {FEEDBACK.errorAction}
            </button>
          </article>
          <article className="ds-feedback" data-brand="baby" lang="hy">
            <h3>{FEEDBACK.errorTitle}</h3>
            <p>{FEEDBACK.errorText}</p>
            <button type="button" className="ds-btn ds-btn--cash">
              {FEEDBACK.errorAction}
            </button>
          </article>
        </div>
        <p className="ds-kind">Loading</p>
        <div className="ds-skeleton-grid" aria-label="Loading skeleton">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>

      <footer className="ds-system-footer">
        <p>
          <span className="ds-kicker">System identifier</span>
          <strong>Ventum Design System</strong>
        </p>
        <p>
          <span className="ds-kicker">System edition</span>
          Commerce foundations · 2026
        </p>
      </footer>
    </main>
  )
}
