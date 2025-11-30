import { Card } from "@repo/design-system/card";
import { Shield, FileText, RefreshCcw, Mail, MapPin, ExternalLink } from "lucide-react";

const LegalPages = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Legal & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transparency is key. Here you'll find our terms of service, privacy policy, and other legal information.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Terms and Conditions */}
        <Card id="terms" className="p-8 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
              <FileText size={24} />
            </div>
            <h2 className="text-2xl font-bold">Terms and Conditions</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <p>
              For the purposes of these Terms and Conditions, the terms "we", "us",
              and "our" refer to Subhajit Garai, whose registered/operational office
              is located in Bankura, West Bengal – 722101. The terms "you", "your",
              "user", and "visitor" refer to any natural or legal person who is
              visiting our website and/or has agreed to make a purchase from us.
            </p>
          </div>
        </Card>

        {/* Privacy Policy */}
        <Card id="privacy" className="p-8 border-l-4 border-l-purple-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/10 rounded-full text-purple-500">
              <Shield size={24} />
            </div>
            <h2 className="text-2xl font-bold">Privacy Policy</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <p>
              This Privacy Policy outlines how Subhajit Garai uses and protects any
              information that you provide when you visit our website. We are
              committed to ensuring that your privacy is protected. Information such
              as your name, contact details, and preferences may be collected to
              improve our services, maintain internal records, and send promotional
              communications. We may use cookies to enhance your experience on our
              website. You can choose to restrict or decline the use of cookies
              through your browser settings.
            </p>
          </div>
        </Card>

        {/* Refund and Cancellation Policy */}
        <Card id="refund" className="p-8 border-l-4 border-l-orange-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-500/10 rounded-full text-orange-500">
              <RefreshCcw size={24} />
            </div>
            <h2 className="text-2xl font-bold">Cancellation and Refund Policy</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <p>
              All purchases made on our platform for JECA exam preparation
              content—such as mock tests, DPPs, and other digital study
              materials—are non-refundable. Once access to the digital content is
              granted, no cancellations or refunds will be entertained under any
              circumstances. If you face any technical issues or have concerns about
              your purchase, feel free to contact us within 1–2 days of the
              transaction. Our support team will do their best to assist you.
            </p>
          </div>
        </Card>

        {/* Contact Us */}
        <Card id="contact" className="p-8 border-l-4 border-l-green-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-500/10 rounded-full text-green-500">
              <Mail size={24} />
            </div>
            <h2 className="text-2xl font-bold">Contact Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-muted-foreground mt-1" size={20} />
                <div>
                  <h3 className="font-semibold">Registered Address</h3>
                  <p className="text-muted-foreground">Bankura, West Bengal 722101</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-muted-foreground mt-1" size={20} />
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <a href="mailto:exambuddys.in@gmail.com" className="text-primary hover:underline">
                    exambuddys.in@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-secondary/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                Quick Support <ExternalLink size={16} />
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Need immediate assistance? Chat with us on Telegram.
              </p>
              <a
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full"
                target="_blank"
                href="https://web.telegram.org/a/#7057093987"
                rel="noreferrer"
              >
                Open Telegram Chat
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LegalPages;
