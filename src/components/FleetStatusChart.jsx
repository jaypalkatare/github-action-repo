'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const FleetStatusChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Active', 'Inactive', 'Maintenance'],
        datasets: [{
          data: [60, 25, 15],
          backgroundColor: [
            '#0EA5E9',  // Active - Blue
            '#10B981',  // Inactive - Green
            '#F59E0B'   // Maintenance - Yellow
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true
      }
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Fleet Status Overview</h2>
      <div className="h-[300px] relative">
        <canvas ref={chartRef} />
        {/* Optional: Add a center text overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">100%</div>
            <div className="text-sm text-gray-500">Total Fleet</div>
          </div>
        </div>
      </div>
      {/* Optional: Add custom legend below */}
      <div className="flex justify-center gap-8 mt-4">
        <div className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: '#0EA5E9' }}
          />
          <span className="text-sm text-gray-600">Active</span>
        </div>
        <div className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: '#10B981' }}
          />
          <span className="text-sm text-gray-600">Inactive</span>
        </div>
        <div className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: '#F59E0B' }}
          />
          <span className="text-sm text-gray-600">Maintenance</span>
        </div>
      </div>
    </div>
  );
};

export default FleetStatusChart;
