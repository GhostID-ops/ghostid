import { useEffect, useState } from "react";
import { Monitor, MapPin, Globe, Cpu } from "lucide-react";

interface SystemInfo {
  ip: string;
  city: string;
  country: string;
  browser: string;
  os: string;
}

const SystemInfoBar = () => {
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
    <div className="border-t border-border/40 bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono">{systemInfo.ip}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{systemInfo.city}, {systemInfo.country}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Monitor className="h-3.5 w-3.5 text-primary" />
            <span>{systemInfo.browser}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cpu className="h-3.5 w-3.5 text-primary" />
            <span>{systemInfo.os}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemInfoBar;
