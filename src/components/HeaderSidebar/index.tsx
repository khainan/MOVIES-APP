import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Router from 'next/router';

// icon
import hamburgerIcon from './assets/hamburger-icon.png';
import userIcon from './assets/user.png';
import unitedKingdomIcon from './assets/united-kingdom.png';
import indonesiaIcon from './assets/indonesia.png';

// utils
import { translate } from '../../utils/translate';

// styles
import styles from './HeaderSidebar.module.scss';

type Menu = {
  icon: any;
  key: string;
  path: string;
  title: string;
};
interface IHeaderSidebarProps {
  children: any;
  language: string;
  menus: Menu[];
  onChangeLanguage: any;
}

const HeaderSidebar = (props: IHeaderSidebarProps) => {
  const { menus, language, onChangeLanguage } = props || {};
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleOpenSidebar = () => {
    setOpen((sidebar) => !sidebar);
  };

  const handleOutsideClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSetLanguage = (lang: string) => {
    onChangeLanguage(lang);
  };

  const handleChangePage = (path: string) => {
    Router.replace(path);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  return (
    <div className={styles['dashboard-header-container']}>
      <div className={styles['dashboard-header-sidebar']} ref={ref}>
        <div className={styles['dashboard-header']}>
          <div className={styles['dashboard-header-logo']}>
            <div className={styles['hamburger-icon']}>
              <Image src={hamburgerIcon} alt="" onClick={handleOpenSidebar} />
            </div>
            <div className={styles.language}>
              <Image
                className={language === 'en' ? styles.active : ''}
                alt=""
                src={unitedKingdomIcon}
                width={24}
                height={24}
                onClick={() => handleSetLanguage('en')}
              />
              <span className={styles['language-separator']} />
              <Image
                className={language === 'id' ? styles.active : ''}
                alt=""
                src={indonesiaIcon}
                width={24}
                height={24}
                onClick={() => handleSetLanguage('id')}
              />
            </div>
            <h1></h1>
          </div>
          <div className={styles['dashboard-header-user']}>
            <p>
              {translate('hello', language)} , <span>{'User Name'}</span>
            </p>
            <Image alt="" src={userIcon} width={24} height={24} />
          </div>
        </div>
        <div
          className={
            open
              ? styles['dashboard-sidebar-open']
              : styles['dashboard-sidebar']
          }
        >
          {(menus || []).map((menu: Menu, index: number) => (
            <div
              className={styles['dashboard-sidebar-menu']}
              key={index}
              onClick={() => handleChangePage(menu.path)}
            >
              <Image alt="" src={menu.icon} width={24} height={24} />
              <p>{menu.title}</p>
            </div>
          ))}
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default HeaderSidebar;
