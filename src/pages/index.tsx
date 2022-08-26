import Head from 'next/head';
import Image from 'next/image';
import 'animate.css';

import styles from '@/styles/Home.module.css';
import classnames from 'classnames';
import { useRef, useState } from 'react';
import { validateEmail } from '@/utils/generic';
import { Data } from './api/mailchimp';
import Select from 'react-select';
import { FiInstagram } from 'react-icons/fi';
import { ImWhatsapp } from 'react-icons/im';
import { BsCartPlus, BsEnvelope } from 'react-icons/bs';

import { customScrollTo } from '@/utils/generic';

const options = [
  { value: `en`, label: `🇪🇺 English` },
  { value: `lv`, label: `🇱🇻 Latvian` },
];

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === `en`),
  );
  const [lang, setLang] = useState(
    options.find((option) => option.value === `en`),
  );
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

  const scrollAndShake = () => {
    customScrollTo(0, () => {
      if (!ref.current?.classList.contains(`animate__shakeX`)) {
        ref.current?.classList.add(`animate__shakeX`);
        setTimeout(() => {
          ref.current?.classList.remove(`animate__shakeX`);
        }, 1500);
      }
    });
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
          <Select
            instanceId="languageSelector"
            defaultValue={selectedOption}
            onChange={(newValue) => {
              newValue?.value && setSelectedOption(newValue);
              newValue?.value && setLang(newValue);
            }}
            options={options}
          />
          <h1>Minimismi</h1>
          {lang?.value === `lv` && (
            <p>
              Mēs esam Minimismi. Unikāls, minimālistisks un augstas kvalitātes
              roku darbs. Dejošanai paredzēta apģērbu līnija, kas radīta no
              dabai draudzīga un 100% pārstrādāta materiāla. Paredzēts
              dejotājiem, kuri rūpējas par vidi un nebaidās izpausties 🖤
            </p>
          )}
          {lang?.value === `en` && (
            <p>
              We&apos;re Minimismi. Unique, minimalist, high quality ballet
              clothing that are handmade from 100% recycled materials. Designed
              for dancers that care for the environment and are not afraid to
              express themselves 🖤
            </p>
          )}

          {!isSubscribed ? (
            <div
              className={classnames({
                [styles.notification]: true,
                [`animate__animated`]: true,
              })}
              ref={ref}
            >
              <h2>
                {lang?.value === `en`
                  ? `The first batch will arrive soon. Don't miss it!`
                  : `Pirmā kolekcija pieejama drīzumā. Nepalaid garām!`}
              </h2>
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
                placeholder={
                  lang?.value === `en` ? `example@mail.com` : `piemērs@mail.com`
                }
              />
              <button
                onClick={handleSubmit}
                className={styles.submitButton}
                disabled={!isValid || isProcessing}
              >
                {!isProcessing
                  ? lang?.value === `en`
                    ? `Sign me up for a reminder`
                    : `Vēlos saņemt atgādinājumu`
                  : lang?.value === `en`
                  ? `One moment.. Adding you to the list.`
                  : `Uzgaidiet mirklīti… Pievienojam Jūs sarakstā.`}
              </button>
            </div>
          ) : (
            <h2>
              💃{` `}
              {lang?.value === `en`
                ? `Thank you! We will keep you up to date`
                : `Paldies!  Mēs informēsim Jūs par jaunumiem`}
            </h2>
          )}
          <hr className={styles.split} />
          <div className={styles.iconsWrapper}>
            <p className={styles.iconsText}>
              {lang?.value === `en`
                ? `Follow us for more:`
                : `Sekojiet mums, lai uzzinātu vairāk?`}
            </p>
            <a
              href="https://www.instagram.com/minimismi_lv/"
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              <FiInstagram size={20} />
            </a>
            <a
              href="mailto:info@minimismi.com"
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              <BsEnvelope size={22} />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=37129760818"
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              <ImWhatsapp size={20} />
            </a>
          </div>
          <hr className={styles.split} />
        </main>
      </div>

      <div className={styles.images}>
        <div className={styles.image}>
          <Image
            src="/images/leotard-1.jpg"
            alt="Minimismi Leotard Preview 1"
            width={300}
            height={394}
          />
          <div className={styles.buttonWrap}>
            <button onClick={() => scrollAndShake()}>
              <BsCartPlus size={22} />
              {lang?.value === `en`
                ? `Add to cart`
                : `Pievienot iepirkuma grozam`}
            </button>
          </div>
        </div>
        <div className={styles.image}>
          <Image
            src="/images/leotard-2.jpg"
            alt="Minimismi Leotard Preview 2"
            width={300}
            height={394}
          />
          <div className={styles.buttonWrap}>
            <button onClick={() => scrollAndShake()}>
              <BsCartPlus size={22} />
              {lang?.value === `en`
                ? `Add to cart`
                : `Pievienot iepirkuma grozam`}
            </button>
          </div>
        </div>
        <div className={styles.image}>
          <Image
            src="/images/leotard-3.jpg"
            alt="Minimismi Leotard Preview 3"
            width={300}
            height={394}
          />
          <div className={styles.buttonWrap}>
            <button onClick={() => scrollAndShake()}>
              <BsCartPlus size={22} />
              {lang?.value === `en`
                ? `Add to cart`
                : `Pievienot iepirkuma grozam`}
            </button>
          </div>
        </div>
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
    </div>
  );
}
