import { Card } from "@repo/design-system/card";

const LegalPages = () => {
  return (
    <div className=" w-full md:w-4/5 mx-auto px-4 py-8 space-y-8">
      {/* Terms and Conditions */}
      <Card id="terms">
        <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
        <p>
          For the purposes of these Terms and Conditions, the terms "we", "us",
          and "our" refer to Subhajit Garai, whose registered/operational office
          is located in Bankura, West Bengal – 722101. The terms "you", "your",
          "user", and "visitor" refer to any natural or legal person who is
          visiting our website and/or has agreed to make a purchase from us.
        </p>
      </Card>

      {/* Privacy Policy */}
      <Card id="privacy">
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
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
      </Card>

      {/* Refund and Cancellation Policy */}
      <Card id="refund">
        <h2 className="text-2xl font-bold mb-4">
          Cancellation and Refund Policy
        </h2>
        <p>
          All purchases made on our platform for JECA exam preparation
          content—such as mock tests, DPPs, and other digital study
          materials—are non-refundable. Once access to the digital content is
          granted, no cancellations or refunds will be entertained under any
          circumstances. If you face any technical issues or have concerns about
          your purchase, feel free to contact us within 1–2 days of the
          transaction. Our support team will do their best to assist you.
        </p>
      </Card>

      {/* Contact Us */}
      <Card id="contact">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p>
          Merchant Legal Entity Name: SUBHAJIT GARAI
          <br />
          Registered Address: Bankura, West Bengal 722101
          <br />
          Chat on telegram:{" "}
          <a
            className=" border-b-2  border-blue-500 text-"
            target="_blank"
            href="https://web.telegram.org/a/#7057093987"
          >
            Telegram_link
          </a>
          <br />
          Email: exambuddys.in@gmail.com
        </p>
      </Card>
    </div>
  );
};

export default LegalPages;
