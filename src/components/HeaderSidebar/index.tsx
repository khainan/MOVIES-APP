import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

// icon
import hamburgerIcon from './assets/hamburger-icon.png';
import userIcon from './assets/user.png';

// styles
import styles from './HeaderSidebar.module.scss';

type Menu = {
  icon: any;
  key: string;
  title: string;
};
interface IHeaderSidebarProps {
  menus: Menu[];
  children: any;
}

const HeaderSidebar = (props: IHeaderSidebarProps) => {
  const { menus } = props || {};
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
            <h1></h1>
          </div>
          <div className={styles['dashboard-header-user']}>
            <p>
              Hello, <span>{'User Name'}</span>
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
            <div className={styles['dashboard-sidebar-menu']} key={index}>
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
