import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

function Header() {
  return (
    <header className="bg-slate-900 shadow-2xl text-white">
      {/* <div className="w-full max-w-3/4 mx-auto px-8 py-14 flex items-center justify-between h-20"> */}
      <div className="max-w-screen-xl mx-auto px-8 py-4 flex items-center justify-between h-20">
        <div className="flex items-center">
          <Link to="/">
            <img src="https://hub.microcks.io/assets/images/hub-microcks.svg"
              alt="Microcks Logo"
              className="h-8  mr-2" />
            {/* <span className="font-bold text-xl">hub.microcks.io</span> */}
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="space-x-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white bg-slate-900 hover:bg-slate-800">
                Contribute
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="p-2 space-y-1 bg-white rounded-md text-black min-w-2xs">
                  <li>
                    <Link to="/doc/contribute" className="block px-3 py-2 rounded hover:bg-gray-100">
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link to="/doc/blog" className="block px-3 py-2 rounded hover:bg-gray-100">
                      Create API mocks and tests suite
                    </Link>
                  </li>
                  <li>
                    <Link to="/doc/faq" className="block px-3 py-2 rounded hover:bg-gray-100">
                      Package your API mocks and tests
                    </Link>
                  </li>
                  <li>
                    <Link to="/doc/faq" className="block px-3 py-2 rounded hover:bg-gray-100">
                      Submit your API package
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {[
              { label: "About", href: "/about" },
              { label: "Documentation", href: "/docs" },
              { label: "Community", href: "/community" },
            ].map(({ label, href }) => (
              <NavigationMenuItem key={label}>
                <Link to={href} className="text-white hover:text-slate-300 px-3 py-2 rounded transition-colors">
                  <NavigationMenuLink asChild>
                    <span>{label}</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

      </div>
    </header>
  );
}
export default Header;