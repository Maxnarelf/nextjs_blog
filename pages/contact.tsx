import Head from 'next/head';
import { Fragment } from 'react';
import ContactForm from '../src/pages/Contact/ContactForm';

function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send me your messages!" />
      </Head>
      <ContactForm />
    </>
  );
}

export default ContactPage;
