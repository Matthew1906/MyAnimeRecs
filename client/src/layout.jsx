import { Outlet } from "react-router";
import { DesktopNavigation, Footer, MobileNavigation } from "./components/partials";
import { useScreenSize } from "./hooks";
import { BackgroundCarousel } from "./components/carousels";

const Layout = ({search=false}) => {
  const screenSize = useScreenSize();
  return (
      <div className="w-full min-h-screen h-auto flex flex-col justify-between items-center">
        {screenSize===0? <MobileNavigation search={search}/>: <DesktopNavigation search={search}/>} 
        <div className="grow">
          <div className="w-full h-full grid grid-cols-1 grid-rows-1 justify-center">
            <BackgroundCarousel />
            <main className="z-10 row-start-1 col-start-1 max-w-[1440px] w-full min-h-screen h-full overflow-x-hidden p-5">
              <Outlet />
            </main>
          </div> 
        </div>
        <Footer />
      </div>
  );
};

export default Layout;