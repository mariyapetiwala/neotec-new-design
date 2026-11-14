import { Link } from "@tanstack/react-router";
import logo from "@/assets/neotecx-logo.svg";

export function NeotecLogo() {
  return <Link to="/" aria-label="Neotecx home" className="inline-flex shrink-0 items-center"><img src={logo} alt="NeoTecx" width={641} height={120} className="h-auto w-36 object-contain sm:w-44" /></Link>;
}

export function neotecHref(href: string) {
  if (href.startsWith("https://neotecx.com")) {
    const url = new URL(href);
    return url.pathname.replace(/\/$/, "") + url.hash || "/";
  }
  return href;
}
