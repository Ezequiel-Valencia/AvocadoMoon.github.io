'use client';

/**
 * ContactInfo — equivalent to src/routes/_menubar/contactInfo.svelte
 */

import React from 'react';
import styles from './Popup.module.scss';

export default function ContactInfo() {
  return (
    <div id="contact" className={styles.menuPopup}>
      <h2 className={styles.menuLargeText}>Contact Info</h2>

      <h4 className={styles.menuMedText}>Email:</h4>
      <a href="mailto:ezq.valencia@gmail.com" className={styles.menuMedText}>
        ezq.valencia@gmail.com
      </a>

      <h4 className={styles.menuMedText}>Linkedin:</h4>
      <a className={styles.menuMedText} href="https://www.linkedin.com/in/ezequielvalencia/">
        Ezequiel Valencia
      </a>

      <h4 className={styles.menuMedText}>Github:</h4>
      <a className={styles.menuMedText} href="https://github.com/AvocadoMoon">
        AvocadoMoon
      </a>

      <h4 className={styles.menuMedText}>Resume:</h4>
      <a
        className={styles.menuMedText}
        href="https://docs.google.com/document/d/e/2PACX-1vQXG6xgS-gXDlE0v03SPC5k56cUHKYMERYuDSOsqoyo8cLsFWslB_Rmr0B_Het3GDX4m7YfRlge-lbo/pub"
      >
        Personal Resume
      </a>
    </div>
  );
}
