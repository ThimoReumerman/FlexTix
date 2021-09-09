import { useEffect } from "react";
import { NavBarProps } from "../components/NavBar";
import ArtistForm from "../components/forms/ArtistForm";

export const DashboardNav: NavBarProps = {
  items: [
    {
      href: "/home",
      title: "Home",
    },
  ],
};

interface IProps {
  navHandler: (nav: NavBarProps) => void;
}

const Dashboard: React.FC<IProps> = ({ navHandler }) => {
  console.log("Creating dashboard");

  useEffect(() => {
    const initialize = () => {
      navHandler(DashboardNav);
    };

    initialize();
  });

  return (
    <div id="dashboard">
      <div id="dashboardNav"></div>
      <div id="dashboardContent">
        <ArtistForm />
      </div>
    </div>
  );
};

export default Dashboard;
