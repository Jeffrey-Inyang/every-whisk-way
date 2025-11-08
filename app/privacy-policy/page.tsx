"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Define the correct email address as a constant
const CONTACT_EMAIL = "everywhiskway@outlook.com"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Title has been updated to use Editorial/Serif style for consistency */}
        <h1 className="text-5xl font-serif font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Every Whisk Way ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We may collect information about you in a variety of ways. The information we may collect on the Site
              includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Personal Data:</strong> When you subscribe to our newsletter, we collect your email address and
                any information you voluntarily provide.
              </li>
              <li>
                <strong>Automatic Data:</strong> When you visit our Site, we automatically collect certain information
                about your device and browsing activity, including IP address, browser type, operating system, and pages
                visited.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your experience on
                our Site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">Every Whisk Way uses the information we collect in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>To send you newsletters and promotional content (with your consent)</li>
              <li>To improve and optimize our website and services</li>
              <li>To analyze site usage and trends</li>
              <li>To respond to customer service inquiries</li>
              <li>To prevent fraudulent transactions and protect against malicious activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Disclosure of Your Information</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may disclose your
              information when required by law or when we believe in good faith that such disclosure is necessary to
              protect our rights, your safety, or the safety of others.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. Security of Your Information</h2>
            <p className="mb-4">
              We use administrative, technical, and physical security measures to protect your personal information.
              However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Your Privacy Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal data, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>The right to access your personal data</li>
              <li>The right to rectify inaccurate information</li>
              <li>The right to request deletion of your data</li>
              <li>The right to opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">7. Third-Party Links</h2>
            <p className="mb-4">
              Our Site may contain links to third-party websites. We are not responsible for the privacy practices or
              content of these external sites. We encourage you to review their privacy policies before providing
              personal information.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us
              at:
            </p>
            <p className="font-semibold">
              Email:{" "}
              {/* 🔄 MODIFIED: Email updated to everywhiskway@outlook.com and target="_blank" added */}
              <a 
                href={`mailto:${CONTACT_EMAIL}`} 
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              This Privacy Policy was last updated on {new Date().toLocaleDateString()}. We reserve the right to update
              this policy at any time.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
