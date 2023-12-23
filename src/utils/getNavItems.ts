interface NavItem {
  name: string;
  path: string;
}

interface NavItems {
  admin: NavItem[];
  user: NavItem[];
}

const navItems: NavItems = {
  admin: [
    {
      name: 'Questions',
      path: '/questions',
    },
    {
      name: 'Answers',
      path: '/answers',
    },

  ],
  user: [
    {
      name: 'Answers',
      path: '/answers',
    },
  ],
}

export const getNavItems = (role: string) => {
  if (role === 'admin') {
    return navItems.admin;
  } else {
    return navItems.user;
  }
}