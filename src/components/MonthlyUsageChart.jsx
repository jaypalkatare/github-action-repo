'use client';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MonthlyUsageChart = () => {
  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },
    colors: ['#818CF8', '#6EE7B7'],
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '60%',
      }
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (value) => `${value}`
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    }
  };

  const series = [
    {
      name: 'Devices',
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      name: 'Vehicles',
      data: [78, 80, 85, 87, 90, 87, 92]
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">Monthly Device and Vehicle Usage</h2>
      <div className="h-[300px]">
        <Chart
          options={options}
          series={series}
          type="bar"
          height="100%"
        />
      </div>
    </div>
  );
};

export default MonthlyUsageChart;
