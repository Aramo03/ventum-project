import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api } from "../../api/client";
import { footerConfig, isValidEmail } from "./footer";
import "./footer.css";

const EMPTY_WHOLESALE = {
  name: "",
  phone: "",
  email: "",
  text: "",
};

const NEWSLETTER_COPY = {
  am: {
    placeholder: "Ձեր էլ. փոստը",
    invalid: "Մուտքագրեք վավեր էլ. հասցե։",
    success: "Բաժանորդագրությունն ավարտված է",
    loading: "Ուղարկվում է...",
    submit: "Բաժանորդագրվել",
  },
  en: {
    placeholder: "Your email address",
    invalid: "Please enter a valid email address.",
    success: "Subscription completed",
    loading: "Sending...",
    submit: "Subscribe",
  },
  ru: {
    placeholder: "Ваш e-mail",
    invalid: "Введите корректный e-mail.",
    success: "Подписка оформлена",
    loading: "Отправка...",
    submit: "Подписаться",
  },
};

export default function Footer({ newsletterDisabled = false }) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  const langKey = ["am", "en", "ru"].includes(i18n.language)
    ? i18n.language
    : "am";
  const copy = NEWSLETTER_COPY[langKey];

  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState("default"); // default | invalid | loading | success | disabled
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const [wholesaleOpen, setWholesaleOpen] = useState(false);
  const [wholesaleData, setWholesaleData] = useState(EMPTY_WHOLESALE);
  const [wholesaleStatus, setWholesaleStatus] = useState(null);

  const effectiveState = newsletterDisabled ? "disabled" : newsletterState;

  const handleEmailChange = (event) => {
    const nextValue = event.target.value;
    setEmail(nextValue);
    if (
      !newsletterDisabled &&
      (newsletterState === "invalid" || newsletterState === "success")
    ) {
      setNewsletterState("default");
      setNewsletterMessage("");
    }
  };

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();

    if (
      newsletterDisabled ||
      effectiveState === "disabled" ||
      newsletterState === "loading"
    ) {
      return;
    }

    if (!isValidEmail(email)) {
      setNewsletterState("invalid");
      setNewsletterMessage(copy.invalid);
      return;
    }

    setNewsletterState("loading");
    setNewsletterMessage("");

    try {
      await api.post("/api/leads/newsletter/", { email: email.trim() });
      setNewsletterState("success");
      setNewsletterMessage(copy.success);
      setEmail("");
    } catch {
      setNewsletterState("invalid");
      setNewsletterMessage(t("footer.submitError"));
    }
  };

  const handleWholesaleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/api/leads/wholesale/", {
        name: wholesaleData.name,
        phone: wholesaleData.phone,
        email: wholesaleData.email,
        text: wholesaleData.text,
      });
      setWholesaleStatus({
        success: true,
        message: t("footer.wholesaleSuccess"),
      });
      setWholesaleData(EMPTY_WHOLESALE);
    } catch {
      setWholesaleStatus({
        success: false,
        message: t("footer.submitError"),
      });
    }
  };

  const setField = (field) => (event) => {
    setWholesaleData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const addressText =
    langKey === "en"
      ? footerConfig.contact.addressEn
      : langKey === "ru"
        ? footerConfig.contact.addressRu
        : footerConfig.contact.addressAm;

  const inputClassName = [
    "site-footer__input",
    effectiveState === "invalid" ? "site-footer__input--invalid" : "",
    effectiveState === "success" ? "site-footer__input--success" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <footer
      className="site-footer"
      data-footer-variant={isHomePage ? "home" : "shop"}
    >
      {isHomePage ? (
        <div className="site-footer__gateway-bar">
          <div className="site-footer__contact-desktop">
            <span>{footerConfig.contact.phone}</span>
            <a href={`mailto:${footerConfig.contact.email}`}>
              {footerConfig.contact.email}
            </a>
            <span>{addressText}</span>
          </div>

          <div className="site-footer__mobile-meta">
            <p className="site-footer__copyright">
              © {new Date().getFullYear()} Ventum. {t("footer.rights")}
            </p>
            <div className="site-footer__contact">
              <span>{footerConfig.contact.phone}</span>
              <a href={`mailto:${footerConfig.contact.email}`}>
                {footerConfig.contact.email}
              </a>
              <span>{addressText}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="site-footer__grid">
            <div>
              <h2>{t("brand")}</h2>
              <p>{t("footer.description")}</p>
              <p>{t("footer.note")}</p>
              <p className="site-footer__copyright">
                © {new Date().getFullYear()} Ventum. {t("footer.rights")}
              </p>
            </div>

            <nav aria-label={t("footer.navigation")}>
              <h2>{t("footer.navigation")}</h2>
              <Link to="/">{t("nav.home")}</Link>
              <Link to="/textile">{t("nav.textile")}</Link>
              <Link to="/baby">{t("nav.baby")}</Link>
              <Link to="/cart">{t("nav.cart")}</Link>
            </nav>

            <form
              onSubmit={handleNewsletterSubmit}
              noValidate
              data-newsletter-state={effectiveState}
            >
              <h2>{t("footer.newsletterTitle")}</h2>
              <p>{t("footer.newsletterHint")}</p>
              <label className="vt-field">
                <span>{t("footer.newsletterEmail")}</span>
                <input
                  type="email"
                  className={inputClassName}
                  value={email}
                  placeholder={copy.placeholder}
                  onChange={handleEmailChange}
                  disabled={
                    effectiveState === "disabled" ||
                    effectiveState === "loading"
                  }
                  aria-invalid={effectiveState === "invalid"}
                />
              </label>
              <button
                className="vt-button site-footer__submit"
                type="submit"
                disabled={
                  effectiveState === "disabled" || effectiveState === "loading"
                }
              >
                {effectiveState === "loading"
                  ? copy.loading
                  : t("footer.newsletterSubmit") || copy.submit}
              </button>
              {newsletterMessage && (
                <p
                  className={
                    effectiveState === "success"
                      ? "site-footer__feedback--success vt-status vt-status--ok"
                      : "site-footer__feedback--invalid vt-status vt-status--error"
                  }
                  role="status"
                >
                  {newsletterMessage}
                </p>
              )}
            </form>

            <div>
              <h2>{t("footer.wholesaleTitle")}</h2>
              <p>{t("footer.wholesaleHint")}</p>
              <button
                className="vt-button vt-button--ghost"
                type="button"
                onClick={() => setWholesaleOpen((open) => !open)}
              >
                {wholesaleOpen
                  ? t("footer.closeForm")
                  : t("footer.wholesaleTitle")}
              </button>
            </div>
          </div>

          {wholesaleOpen && (
            <form
              className="site-footer__form"
              onSubmit={handleWholesaleSubmit}
            >
              <label className="vt-field">
                <span>{t("footer.wholesaleName")}</span>
                <input
                  type="text"
                  value={wholesaleData.name}
                  onChange={setField("name")}
                  required
                />
              </label>
              <label className="vt-field">
                <span>{t("footer.wholesalePhone")}</span>
                <input
                  type="text"
                  value={wholesaleData.phone}
                  onChange={setField("phone")}
                  required
                />
              </label>
              <label className="vt-field site-footer__wide">
                <span>{t("footer.wholesaleEmail")}</span>
                <input
                  type="email"
                  value={wholesaleData.email}
                  onChange={setField("email")}
                  required
                />
              </label>
              <label className="vt-field site-footer__wide">
                <span>{t("footer.wholesaleText")}</span>
                <textarea
                  value={wholesaleData.text}
                  onChange={setField("text")}
                  required
                />
              </label>
              <div className="site-footer__wide">
                <button className="vt-button" type="submit">
                  {t("footer.wholesaleSubmit")}
                </button>
              </div>
              {wholesaleStatus && (
                <p
                  className={`site-footer__wide ${wholesaleStatus.success ? "vt-status vt-status--ok" : "vt-status vt-status--error"}`}
                  role="status"
                >
                  {wholesaleStatus.message}
                </p>
              )}
            </form>
          )}

          <hr className="site-footer__divider" />

          <div className="site-footer__legal">
            <div className="site-footer__legal-links">
              <span>{footerConfig.contact.email}</span>
              <span>{addressText}</span>
              <span>© {new Date().getFullYear()} Ventum</span>
            </div>

            <div className="site-footer__payments" aria-label="Payment cards">
              {footerConfig.paymentMarks.map((mark) => (
                <span key={mark} className="site-footer__card-mark">
                  {mark}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </footer>
  );
}
