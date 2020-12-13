import styles from './Layout.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { Brightness6Rounded } from "@material-ui/icons";
import { useEffect, useState } from 'react';

const Layout = ({children,title}) => {

const [theme,SetTheme]=useState('light');

useEffect(()=>{
  document.documentElement.setAttribute('data-theme',localStorage.getItem('theme'));
  SetTheme(localStorage.getItem('theme'));
},[]);




const switchThemeHandler = () => {

if(theme==='light'){
  saveThemeSettings('dark');
}else{
  saveThemeSettings('light');
}

}

const saveThemeSettings = (theme) => {
  SetTheme(theme);
  localStorage.setItem('theme',theme);
  document.documentElement.setAttribute('data-theme',theme);

}

return(
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header_main}>
      <Link href="/">
        <div className={styles.header}>

          <h4>World's Country</h4>
        </div>
      </Link>
        
        <button className={styles.themeSwitcher} onClick={switchThemeHandler}>
          <Brightness6Rounded />
        </button>

      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <h3>Arifen aziz</h3>
      </footer>
    </div>
)

}

export default Layout;