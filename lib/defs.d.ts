declare interface Badge {
  name: string;
  color: string;
  icon: string;
}

declare interface BadgeCat {
  name: string;
  description: string;
  list: Badge[];
}

declare interface Badges {
  config:  {
    showCats: boolean;
    showTags: boolean;
    showLogos: boolean
    style: 'flat-square' | 'flat' | 'plastic' | 'for-the-badge' | 'social';
  }
  cats: BadgeCat
}
declare interface Config {
  headerImg: string;
  badges: Badges;
}

