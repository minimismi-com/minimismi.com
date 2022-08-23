import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';
import classnames from 'classnames';
import { useState } from 'react';
import { validateEmail } from '@/utils/generic';
import { Data } from './api/mailchimp';

export default function Home() {
  const [email, setEmail] = useState(``);
  const [isValid, setIsValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(() => true);

    try {
      const data: Data | void = await fetch(`/api/mailchimp`, {
        method: `POST`,
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': `application/json`,
        },
      }).then((response) => response.json());

      if (data?.success === true) {
        setIsProcessing(false);
        setIsSubscribed(true);
      }
    } finally {
      setIsProcessing(() => false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Minimismi.com | Unique Leotards handmade in Latvia</title>
        <meta
          name="description"
          content="Unique, handmade ballet leotards. Made with love in Latvia."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.centerWrap}>
        <main className={styles.main}>
          <h1>Minimismi</h1>
          <p>
            🇱🇻 Mēs esam Minimismi. Unikāli, minimālistiski, augstas kvalitātes,
            roku darba bodiji, izgatavoti no 100% pārstrādāta materiāla.
            Paredzēts dejotājiem, kuri rūpējas par vidi un nebaidās izpaust sevi
            🖤
          </p>
          <p>
            🇪🇺 We&apos;re Minimismi. Unique, minimalist, high quality leotards
            that are handmade from 100% recycled materials. Designed for dancers
            that care for the environment and are not afraid to express
            themselves 🤍
          </p>
          <hr className={styles.split} />
          {!isSubscribed ? (
            <>
              <h2>The first batch will arrive soon. Don&apos;t miss it! ↴</h2>
              <label className={styles.inputLabel} htmlFor="emailAddress">
                Your e-mail address:
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);

                  if (validateEmail(e.currentTarget.value) === true) {
                    setIsValid(() => true);
                  } else {
                    setIsValid(() => false);
                  }
                }}
                id="emailAddress"
                className={styles.input}
                type="email"
                required
                placeholder="example@mail.com"
              />
              <button
                onClick={handleSubmit}
                className={styles.submitButton}
                disabled={!isValid || isProcessing}
              >
                {!isProcessing
                  ? `Sign me up for a reminder`
                  : `One moment.. Adding you to the list.`}
              </button>
            </>
          ) : (
            <h2>💃 Thank you! We will keep you up to date </h2>
          )}
        </main>
      </div>

      <div className={styles.mask}>
        <div className={styles.maskWrapper}>
          <div
            className={classnames({
              [styles.maskedImage]: true,
              [styles.image1]: true,
            })}
          >
            <Image
              src="/images/image-1.jpg"
              alt="Minimismi Leotard"
              width={800}
              height={1067}
            />
          </div>
          <div
            className={classnames({
              [styles.maskedImage]: true,
              [styles.image2]: true,
            })}
          >
            <Image
              src="/images/image-2.jpg"
              alt="Minimismi Leotard"
              width={800}
              height={1067}
            />
          </div>
          <div
            className={classnames({
              [styles.maskedImage]: true,
              [styles.image3]: true,
            })}
          >
            <Image
              src="/images/image-3.jpg"
              alt="Minimismi Leotard"
              width={800}
              height={1067}
            />
          </div>
          <div className={styles.maskOverlay}>
            <Image
              src="/images/mask-1.png"
              alt="Mask"
              width={600}
              height={498}
              priority
            />
          </div>
        </div>
      </div>

      <footer className={styles.footer}></footer>
    </div>
  );
}
