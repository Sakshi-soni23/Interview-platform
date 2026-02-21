import Maincontent from "./Maincontent";
import Sidebar from "./Sidebar";


export default function SidebarLayout() {

return (
    <>
     
        <div className="flex">
          <Sidebar />
          <Maincontent />
        </div>
      
    </>
  );
}
