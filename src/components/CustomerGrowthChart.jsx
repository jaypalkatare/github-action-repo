'use client';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CustomerGrowthChart = () => {
  const options = {
    chart: {
      type: 'line',
      toolbar: { show: false }
    },
    colors: ['#818CF8'],
    stroke: {
      curve: 'smooth',
      width: 2
    },
    markers: {
      size: 4,
      strokeWidth: 0
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } }
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      min: 0,
      max: 220,
      tickAmount: 5,
      labels: {
        formatter: (value) => `${value}`
      }
    },
    legend: { show: false }
  };

  const series = [{
    name: 'Customers',
    data: [110, 140, 165, 175, 185, 210]
  }];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-300">Customer Growth</h2>
      <div className="h-[300px]">
        <Chart
          options={options}
          series={series}
          type="line"
          height="100%"
        />
      </div>
    </div>
  );
};

export default CustomerGrowthChart;
