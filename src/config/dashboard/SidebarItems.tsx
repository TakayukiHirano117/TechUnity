import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import GearIcon from "@/components/atoms/Icon/GearIcon";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";
import RecruitIcon from "@/components/atoms/Icon/RecruitIcon";

export const SidebarItems = [
  {
    id: 1,
    href: "/dashboard/recruits",
    icon: <RecruitIcon width="20" height="20" />,
    text: "募集の管理",
  },
  {
    id: 2,
    href: "/dashboard/liked-recruits",
    icon: <HeartIcon width="20" height="20" />,
    text: "いいねした募集",
  },
  {
    id: 3,
    href: "/dashboard/applied-recruits",
    icon: <ApplyIcon width="20" height="20" />,
    text: "応募した募集",
  },
  {
    id: 4,
    href: "/dashboard/profiles",
    icon: <GearIcon width="20" height="20" />,
    text: "アカウント設定",
  },
];
