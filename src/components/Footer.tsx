import { Link } from "react-router-dom";
import { Ghost, Github, Globe, MapPin, Monitor, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

interface SystemInfo {
  ip: string;
  city: string;
  country: string;
  browser: string;
  os: string;
}

const XLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    ip: "Loading...",
    city: "Loading...",
    country: "Loading...",
    browser: "Unknown",
    os: "Unknown",
  });

  useEffect(() => {
    // Get browser and OS info
    const userAgent = navigator.userAgent;
    let browser = "Unknown";
    let os = "Unknown";

    // Detect browser
    if (userAgent.indexOf("Firefox") > -1) browser = "Firefox";
    else if (userAgent.indexOf("Chrome") > -1) browser = "Chrome";
    else if (userAgent.indexOf("Safari") > -1) browser = "Safari";
    else if (userAgent.indexOf("Edge") > -1) browser = "Edge";

    // Detect OS
    if (userAgent.indexOf("Win") > -1) os = "Windows";
    else if (userAgent.indexOf("Mac") > -1) os = "macOS";
    else if (userAgent.indexOf("Linux") > -1) os = "Linux";
    else if (userAgent.indexOf("Android") > -1) os = "Android";
    else if (userAgent.indexOf("iOS") > -1) os = "iOS";

    // Fetch IP and location
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setSystemInfo({
          ip: data.ip || "Unavailable",
          city: data.city || "Unknown",
          country: data.country_name || "Unknown",
          browser,
          os,
        });
      })
      .catch(() => {
        setSystemInfo({
          ip: "Unavailable",
          city: "Unknown",
          country: "Unknown",
          browser,
          os,
        });
      });
  }, []);

  return (
    <footer className="border-t border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="col-span-1 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Ghost className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-lg">GhostID</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sign in without being seen.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-4">Developers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sdk" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  SDK
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
              >
                <XLogo />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* System Info Bar */}
        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 justify-items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 text-primary" />
              <span className="font-mono">{systemInfo.ip}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{systemInfo.city}, {systemInfo.country}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Monitor className="h-4 w-4 text-primary" />
              <span>{systemInfo.browser}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Cpu className="h-4 w-4 text-primary" />
              <span>{systemInfo.os}</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-border/40 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 GhostID. All rights reserved.
            </p>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
