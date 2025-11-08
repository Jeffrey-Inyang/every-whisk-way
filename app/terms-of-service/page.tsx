"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <h1 className="text-5xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-3xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using the Every Whisk Way website ("Site"), you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to abide by the above, please do not use this
              service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Every
              Whisk Way's Site for personal, non-commercial transitory viewing only. This is the grant of a license, not
              a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the Site</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. Disclaimer</h2>
            <p className="mb-4">
              The materials on Every Whisk Way's Site are provided on an 'as is' basis. Every Whisk Way makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Limitations</h2>
            <p className="mb-4">
              In no event shall Every Whisk Way or its suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or
              inability to use the materials on Every Whisk Way's Site, even if we or our authorized representative has
              been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. Accuracy of Materials</h2>
            <p className="mb-4">
              The materials appearing on Every Whisk Way's Site could include technical, typographical, or photographic
              errors. Every Whisk Way does not warrant that any of the materials on its Site are accurate, complete, or
              current. We may make changes to the materials contained on our Site at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Links</h2>
            <p className="mb-4">
              Every Whisk Way has not reviewed all of the sites linked to its Site and is not responsible for the
              contents of any such linked site. The inclusion of any link does not imply endorsement by Every Whisk Way
              of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">7. Modifications</h2>
            <p className="mb-4">
              Every Whisk Way may revise these Terms of Service for its Site at any time without notice. By using this
              Site, you are agreeing to be bound by the then current version of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">8. Governing Law</h2>
            <p className="mb-4">
              These Terms and Conditions and any separate agreements we may enter into to provide further services to
              you shall be governed by and construed in accordance with the laws under which Every Whisk Way is
              operated, excluding its conflicts of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">9. Content and Intellectual Property</h2>
            <p className="mb-4">
              All content on Every Whisk Way, including text, graphics, logos, images, and software, is the property of
              Every Whisk Way or its content suppliers and is protected by international copyright laws. You may not
              reproduce, distribute, or transmit any content without our prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">10. User-Generated Content</h2>
            <p className="mb-4">
              If you submit, post, or display content on our Site, you grant Every Whisk Way a worldwide, non-exclusive,
              royalty-free license to use, reproduce, modify, and distribute such content.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">11. Contact Information</h2>
            <p className="mb-4">If you have any questions about these Terms of Service, please contact us at:</p>
            <p className="font-semibold">
              Email:{" "}
              <a href="mailto:support@everywhiskway.com" className="text-primary hover:underline">
                support@everywhiskway.com
              </a>
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              These Terms of Service were last updated on {new Date().toLocaleDateString()}. We reserve the right to
              update these terms at any time.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
