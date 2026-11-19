import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../../api/client";
import "./footer.css";

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  // Wholesale form state
  const [wholesaleOpen, setWholesaleOpen] = useState(false);
  const [wholesaleData, setWholesaleData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [wholesaleStatus, setWholesaleStatus] = useState(null);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/leads/newsletter/", { email });
      setNewsletterStatus({
        success: true,
        message: t("footer.newsletterSuccess", "Successfully subscribed!"),
      });
      setEmail("");
    } catch (err) {
      setNewsletterStatus({
        success: false,
        message: t(
          "footer.newsletterError",
          "Subscription failed or email already exists.",
        ),
      });
    }
  };

  const handleWholesaleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/leads/wholesale/", wholesaleData);
      setWholesaleStatus({
        success: true,
        message: t("footer.wholesaleSuccess", "Inquiry sent successfully!"),
      });
      setWholesaleData({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      setWholesaleStatus({
        success: false,
        message: t("footer.wholesaleError", "Failed to send inquiry."),
      });
    }
  };

  return (
    <footer className="footer-container bg-neutral-900 text-neutral-300 py-12 px-6 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand / Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Ventum</h3>
          <p className="text-sm text-neutral-400 mb-4">
            {t(
              "footer.description",
              "Modern textile and baby shop built with quality and style.",
            )}
          </p>
          <div className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Ventum. All rights reserved.
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            {t("footer.navigation", "Navigation")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                {t("nav.home", "Home")}
              </a>
            </li>
            <li>
              <a href="/textile" className="hover:text-white transition-colors">
                {t("nav.textile", "Textile")}
              </a>
            </li>
            <li>
              <a href="/baby" className="hover:text-white transition-colors">
                {t("nav.baby", "Baby")}
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-white transition-colors">
                {t("nav.cart", "Cart")}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Newsletter */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            {t("footer.newsletterTitle", "Newsletter")}
          </h4>
          <p className="text-sm text-neutral-400 mb-3">
            {t(
              "footer.newsletterSubtitle",
              "Subscribe to get special offers and updates.",
            )}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("footer.emailPlaceholder", "Enter your email")}
              required
              className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-white focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded text-sm transition-colors"
            >
              {t("footer.subscribe", "Subscribe")}
            </button>
            {newsletterStatus && (
              <p
                className={`text-xs ${newsletterStatus.success ? "text-green-400" : "text-red-400"}`}
              >
                {newsletterStatus.message}
              </p>
            )}
          </form>
        </div>

        {/* Col 4: Wholesale Inquiry */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            {t("footer.wholesaleTitle", "Wholesale")}
          </h4>
          <p className="text-sm text-neutral-400 mb-3">
            {t(
              "footer.wholesaleSubtitle",
              "Partner with us for wholesale purchases.",
            )}
          </p>
          <button
            onClick={() => setWholesaleOpen(!wholesaleOpen)}
            className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded text-sm transition-colors border border-neutral-700"
          >
            {wholesaleOpen
              ? t("footer.closeForm", "Close Form")
              : t("footer.wholesaleButton", "Wholesale Inquiry")}
          </button>
        </div>
      </div>

      {/* Wholesale Modal / Expandable Form */}
      {wholesaleOpen && (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h4 className="text-lg font-bold text-white mb-4">
            {t("footer.wholesaleFormTitle", "Wholesale Inquiry Form")}
          </h4>
          <form
            onSubmit={handleWholesaleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-xs text-neutral-400 mb-1">
                {t("footer.name", "Name")}
              </label>
              <input
                type="text"
                value={wholesaleData.name}
                onChange={(e) =>
                  setWholesaleData({ ...wholesaleData, name: e.target.value })
                }
                required
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">
                {t("footer.phone", "Phone")}
              </label>
              <input
                type="text"
                value={wholesaleData.phone}
                onChange={(e) =>
                  setWholesaleData({ ...wholesaleData, phone: e.target.value })
                }
                required
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-sm text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-neutral-400 mb-1">
                {t("footer.email", "Email")}
              </label>
              <input
                type="email"
                value={wholesaleData.email}
                onChange={(e) =>
                  setWholesaleData({ ...wholesaleData, email: e.target.value })
                }
                required
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-sm text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-neutral-400 mb-1">
                {t("footer.message", "Message")}
              </label>
              <textarea
                value={wholesaleData.message}
                onChange={(e) =>
                  setWholesaleData({
                    ...wholesaleData,
                    message: e.target.value,
                  })
                }
                rows="3"
                required
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-sm text-white"
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded text-sm transition-colors"
              >
                {t("footer.sendInquiry", "Send Inquiry")}
              </button>
            </div>
            {wholesaleStatus && (
              <p
                className={`sm:col-span-2 text-xs ${wholesaleStatus.success ? "text-green-400" : "text-red-400"}`}
              >
                {wholesaleStatus.message}
              </p>
            )}
          </form>
        </div>
      )}
    </footer>
  );
}
