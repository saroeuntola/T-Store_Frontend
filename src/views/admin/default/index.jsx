import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoUser from "config_API/infoUser";
import { getAccessToken } from "service/Auth";
import { getCount } from "config_API/Auth_api";


const Dashboard = () => {
  const [authorized, setAuthorized] = useState(true);
  const navigate = useNavigate();
  const user = InfoUser();
  const token = getAccessToken();
  const [Counts, setCounts] = useState([]);

  useEffect(() => {
    const can = (role) => (user?.Roles || []).includes(role);
    if (user) {
      if (!can("admin") && !can("manager")) {
        setAuthorized(false);
      }
    }
    if (!authorized) {
      navigate("/unauthorized");
    }
  }, [user, authorized, navigate]);

 useEffect(() => {
   const fetchData = async () => {
     try {
     const response = await getCount(token);
       setCounts(response.data);
      
     } catch (error) {
       console.error("Error fetching counts:", error);
     }
   };

   fetchData();
 }, [token]);


  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Users"}
          subtitle={Counts.total_users}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Products"}
          subtitle={Counts.total_products}
        />

        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Order"}
          subtitle={Counts.total_orders}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Category"}
          subtitle={Counts.total_category}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Colors"}
          subtitle={Counts.total_colors}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Sizes"}
          subtitle={
            Counts.total_sizes
          }
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
