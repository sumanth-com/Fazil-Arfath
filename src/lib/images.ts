import fazilPortrait from "../../assets/fazil.png";
import dataplatrLogo from "../../assets/companies/dataplatr.png";
import tyasuiteLogo from "../../assets/companies/tyasuite.jpg";
import itcartLogo from "../../assets/companies/itcart.png";
import upnetLogo from "../../assets/companies/upnet.png";

export const IMAGES = {
  portrait: fazilPortrait,
} as const;

export const COMPANY_LOGOS = {
  dataplatr: dataplatrLogo,
  tyasuite: tyasuiteLogo,
  itcart: itcartLogo,
  upnet: upnetLogo,
} as const;

export type CompanyLogoKey = keyof typeof COMPANY_LOGOS;
