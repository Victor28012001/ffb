type NavWithPath = {
  name: string;
  path: string;
};
type NavObject = {
  name: string;
  path?: string;
  dropdown?: NavWithPath[];
};

type NavArray = NavObject[];

export const NavLinks: NavArray = [
  {
    name: "Home",
    path: "/Home",
  },
  {
    name: "Games",
    dropdown: [
      // { name: "Create Game", path: "/aiduel" },
      { name: "Join Game", path: "/duels" },
      { name: "Watch Game", path: "/duels" },
      // { name: "Tournaments", path: "/profile/yourcharacters" },
    ],
  },
  {
    name: "Market place",
    path: "/marketplace",
  },
  {
    name: "Settings",
    dropdown: [
      { name: "Profile", path: "/profile" },
      { name: "Purchase Player", path: "/profile/purchasecharacter" },
      { name: "Build Player", path: "/profile/createcharacter" },
      { name: "Your Players", path: "/profile/yourcharacters" },
      { name: "Assets Manager", path: "/profile/useractivity" },
    ],
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
];

type creatorObj = {
  title: string;
  createdBy: string;
  amount: string;
};

export const creators: creatorObj[] = [
  {
    title: "DRAGON",
    createdBy: "0xblackadam",
    amount: "1.002",
  },
  {
    title: "PRINCESS",
    createdBy: "Nonnyjoe",
    amount: "2.502",
  },
  {
    title: "FIREFLY",
    createdBy: "Evans",
    amount: "4.200",
  },
];

// footer links

export const quickLinks: NavArray = [
  {
    name: "Gaming",
    path: "/",
  },
  {
    name: "Product",
    path: "/",
  },
  {
    name: "All NFTs",
    path: "/",
  },
  {
    name: "Social Network",
    path: "/",
  },
  {
    name: "Domain Names",
    path: "/",
  },
  {
    name: "Collectibles",
    path: "/",
  },
];

export const support: NavArray = [
  {
    name: "Setting & Privacy",
    path: "/",
  },
  {
    name: "Help & Support",
    path: "/",
  },
  {
    name: "Live Auction",
    path: "/",
  },
  {
    name: "Item Detail",
    path: "/",
  },
  {
    name: "24/7 Support",
    path: "/",
  },
  {
    name: "Our News",
    path: "/",
  },
];
