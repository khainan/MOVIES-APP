import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

// icon
import hamburgerIcon from './assets/hamburger-icon.png';
import userIcon from './assets/user.png';

// styles
import './styles.scss';

type Menu = {
  icon: string;
  key: string;
  title: string;
}
interface IHeaderSidebarProps {
  menus: Menu[];
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
    <div className="dashboard-header-sidebar" ref={ref}>
      <div className="dashboard-header">
        <div className="dashboard-header-logo">
          <Image
            className="hamburger-icon"
            src={hamburgerIcon}
            alt=""
            onClick={handleOpenSidebar}
          />
          <h1>D.U</h1>
        </div>
        <div className="dashboard-header-user">
          <p>
            Hello, <span>{'User Name'}</span>
          </p>
          <Image alt="" src={userIcon} />
        </div>
      </div>
      <div className={classNames('dashboard-sidebar', { open: open })}>
        {(menus || []).map((menu: Menu, index: number) => (
          <div
            className={classNames('dashboard-sidebar-menu', {
              active: menu.key === 'home',
            })}
            key={index}
          >
            <Image alt="" src={menu.icon} />
            <p>{menu.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSidebar;