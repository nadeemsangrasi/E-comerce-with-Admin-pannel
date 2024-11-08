import { Facebook, Instagram, Linkedin, Twitch, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";
interface IIcon {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface ILink {
  name: string;
  url: string;
}
const icons: IIcon[] = [
  {
    name: "facebook",
    url: "https://www.facebook.com/",
    icon: <Facebook />,
  },
  {
    name: "twitter",
    url: "https://twitter.com/",
    icon: <Twitter />,
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/",
    icon: <Instagram />,
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/",
    icon: <Linkedin />,
  },
];

const company: ILink[] = [
  {
    name: "New Arrivals",
    url: "/#new",
  },
  {
    name: "Discount",
    url: "/#sale",
  },
  {
    name: "Mobile App",
    url: "/#mobile",
  },
  {
    name: "Young's Favourite",
    url: "/#young",
  },
];

const quickLinks: ILink[] = [
  {
    name: "Blogs",
    url: "/blogs",
  },
  {
    name: "Products",
    url: "/products",
  },
  {
    name: "Brands",
    url: "/#brands",
  },
  {
    name: "Community",
    url: "/#community",
  },
];

const Footer = () => {
  return (
    <div className="bg-primary-black">
      <div className=" text-white px-10 py-16 max-w-screen-2xl mx-auto">
        <div className="flex justify-between flex-wrap gap-8 lg:gap-0">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">FASHION</h1>
            <p className="text-gray-500">
              Complete your style with awesome clothes from us.
            </p>
            <div className="flex gap-2 items-center">
              {icons.map((icon: IIcon) => (
                <Link
                  key={icon.name}
                  href={icon.url}
                  className="bg-primary-yellow p-2 text-black rounded-lg"
                >
                  {icon.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl text-[#8E8E8E]">Company</h3>
            {company.map((item: ILink) => (
              <Link
                key={item.name}
                href={item.url}
                className="text-gray-500 block"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="space-y-3">
            <h3 className="text-xl text-[#8E8E8E]">Quick Links</h3>
            {quickLinks.map((item: ILink) => (
              <Link
                key={item.name}
                href={item.url}
                className="text-gray-500 block"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="space-y-3">
            <h3 className="text-xl text-[#8E8E8E]">Legal</h3>
            <Link href={"/"} className="text-gray-500 block">
              Terms & Conditions
            </Link>
            <Link href={"/"} className="text-gray-500 block">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
