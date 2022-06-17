import { Icon, Image, Label } from "semantic-ui-react";
import styles from '../styles/Home.module.css';

const Footer = () => (
  <footer className={styles.footer}>
        <a
          href="https://github.com/kagabof"
          // target="_blank"
          rel="kagabof github profile"
          className={styles.footerLink}
        >
          <span className={styles.logo}>
            Powered by{' '}{' '}{' '}
            <Image avatar src="https://avatars.githubusercontent.com/u/44500114?v=4" />
            <Label><Icon name="github" size="large" color="black" />kagabof</Label>
          </span>
        </a>
      </footer>
);

export default Footer;
