import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';
import classnames from 'classnames';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Minimismi Leotards</title>
        <meta
          name="description"
          content="Unique, handmade ballet leotards. Made with love in Latvia."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>

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
              width={1125}
              height={1500}
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
              width={1125}
              height={1500}
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
              width={1125}
              height={1500}
            />
          </div>
          <div className={styles.maskOverlay}>
            <Image
              src="/images/mask-1.png"
              alt="Mask"
              width={600}
              height={498}
            />
          </div>
        </div>
      </div>

      <footer className={styles.footer}></footer>
    </div>
  );
}
