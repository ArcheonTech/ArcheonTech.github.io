// import { Menu } from "lucide-react";

// import {
//   NavLink,
// } from "react-router";

// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "./navigation-menu";
// import { Sheet, SheetContent, SheetTrigger } from "./sheet";
// import { Button } from "./button";

// const SECTIONS = [
//   { id: "", label: "Home" },
//   { id: "research", label: "Research" },
// ] as const;

// function scrollToId(id: string) {
//   const el = document.getElementById(id);
//   if (!el) return;
//   el.scrollIntoView({ behavior: "smooth", block: "start" });
// }

// function DesktopNav() {
//   return (
//     <NavigationMenu className="hidden md:flex">
//       <NavigationMenuList>
//         {SECTIONS.map((s) => (
//           <NavigationMenuItem key={s.id}>
//             <NavigationMenuLink asChild>
//               <NavLink to={`/${s.id}`} end>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="font-medium"
//                 >
//                   {s.label}
//                 </Button>
//               </NavLink>
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//         ))}
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }

// function MobileNav() {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="ghost" size="icon" className="md:hidden">
//           <Menu className="h-5 w-5" />
//           <span className="sr-only">Open menu</span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="left" className="w-72">
//         <div className="mt-6 space-y-2">
//           {SECTIONS.map((s) => (
//             <Button
//               key={s.id}
//               variant="ghost"
//               className="w-full justify-start text-base"
//               onClick={() => {
//                 scrollToId(s.id);
//                 // Close the sheet by clicking the overlay programmatically
//                 const overlay = document.querySelector<HTMLElement>(
//                   "[data-state='open'][data-radix-sheet-override]"
//                 );
//                 overlay?.click();
//               }}
//             >
//               {s.label}
//             </Button>
//           ))}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

// export function NavBar() {
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto max-w-6xl px-4">
//         <div className="flex h-16 md:h-20 items-center justify-between gap-3">
//           {/* Brand */}
//           <NavLink to={`/`} end className="flex items-center gap-3">
//             <img src="/logo-192x192.png" alt="Marble Labs" className="h-10 md:h-12" />
//             Marble Labs
//           </NavLink>

//           <DesktopNav />
//           <div className="md:hidden flex items-center gap-2">
//             <MobileNav />
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom"; // ← use react-router-dom
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./sheet"; // ← add SheetClose
import { Button } from "./button";

// Union type: internal routes (to) OR external links (href)
type NavItem =
  | { label: string; to: string; end?: boolean }
  | { label: string; href: string; external?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/", end: true },
  { label: "Research", to: "/research" },
  { label: "Students", to: "/students" },
  // Example PDF in /public:
  { label: "Dr. Davalos' Website", href: "https://edavalosanaya.github.io", external: true },
];

function DesktopNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {NAV_ITEMS.map((item) => (
          <NavigationMenuItem key={"to" in item ? item.to : item.href}>
            <NavigationMenuLink asChild>
              {"to" in item ? (
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "text-foreground",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </a>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <nav className="mt-6 grid gap-1">
          {NAV_ITEMS.map((item) => (
            // SheetClose closes the drawer when the child is clicked
            <SheetClose asChild key={"to" in item ? item.to : item.href}>
              {"to" in item ? (
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "w-full text-left px-3 py-2 rounded-md text-base font-medium",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "text-foreground",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="w-full px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </a>
              )}
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 md:h-20 items-center justify-between gap-3">
          {/* Brand → send home */}
           <NavLink to={`/`} end className="flex items-center gap-3">
             <img src="/logo-192x192.png" alt="Marble Labs" className="h-10 md:h-12" />
             Marble Labs
           </NavLink>

          <DesktopNav />
          <div className="md:hidden flex items-center gap-2">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
