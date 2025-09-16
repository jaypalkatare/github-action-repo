'use client';
import { useState, useEffect } from 'react';
import FleetStatusChart from '@/components/FleetStatusChart';
import MonthlyUsageChart from '@/components/MonthlyUsageChart';
import CustomerGrowthChart from '@/components/CustomerGrowthChart';
import { FaLaptop, FaUsers, FaCar, FaChartBar } from 'react-icons/fa';

const DashboardNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '⚡' },
    { id: 'devices', label: 'Devices', icon: '💻' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'vehicles', label: 'Vehicles', icon: '🚗' },
    { id: 'reports', label: 'Reports', icon: '📊' },
  ];

  return (
    <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors
            ${activeTab === tab.id
              ? 'bg-white shadow-sm text-black'
              : 'text-gray-600 hover:bg-white/50'}`}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const StatCard = ({ title, value, subtext, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
    <div className="">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-5xl font-bold mt-2">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{subtext}</p>
    </div>
    <div className=" text-end">
      <span className="text-7xl text-gray-400 ">{icon}</span>
    </div>
  </div>
);

const RecentActivity = () => {
  const activities = [
    { event: 'New customer added', time: '2 minutes ago' },
    { event: 'Vehicle VEH003 serviced', time: '1 hour ago' },
    { event: 'Device DEV002 went offline', time: '3 hours ago' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="divide-y">
        {activities.map((activity, index) => (
          <div key={index} className="py-3 flex justify-between">
            <span className="text-gray-800">{activity.event}</span>
            <span className="text-gray-500 text-sm">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    setCurrentTime(Date.now());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
     

      <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Devices"
          value="5"
          subtext="3 active"
          icon={<FaLaptop />}
        />
        <StatCard
          title="Total Customers"
          value="5"
          subtext="4 active"
          icon={<FaUsers />}
        />
        <StatCard
          title="Total Vehicles"
          value="5"
          subtext="3 active"
          icon={<FaCar />}
        />
        <StatCard
          title="Total Reports"
          value="4"
          subtext="Available templates"
          icon={<FaChartBar />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FleetStatusChart />
        <RecentActivity />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyUsageChart />
        <CustomerGrowthChart />
      </div>
    </div>
  );
}
