import React from 'react';
import {
  Leaf,
  Flame,
  Activity,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Sparkles, // For AI
  Lightbulb, // For Suggestion
  Footprints, // For Suggestion
  Recycle, // For Suggestion
  Bike, // For Activity
  Plug, // For Activity
  CheckCircle2, // For Activity
  ListChecks, // For Activity Feed
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data for the chart
const chartData = [
  { name: 'Jan', co2: 150, energy: 25, points: 2400 },
  { name: 'Feb', co2: 140, energy: 22, points: 2210 },
  { name: 'Mar', co2: 145, energy: 24, points: 2290 },
  { name: 'Apr', co2: 130, energy: 21, points: 3908 },
  { name: 'May', co2: 135, energy: 23, points: 3000 },
  { name: 'Jun', co2: 124, energy: 19, points: 4300 },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 sm:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Sustainability Dashboard
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
          Welcome back! Here's your eco-impact overview.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- KPI Cards Row --- */}

        {/* Carbon Footprint KPI */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">
              Carbon Footprint
            </h2>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <Leaf className="text-green-600 dark:text-green-300" size={20} />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 dark:text-white mt-4">
            124{' '}
            <span className="text-2xl text-gray-500 dark:text-gray-400">
              kg CO₂
            </span>
          </p>
          <div className="flex items-center mt-2 text-green-500">
            <TrendingDown size={16} className="mr-1" />
            <span className="text-sm font-medium">12% lower than last month</span>
          </div>
        </div>

        {/* Energy Usage KPI */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">
              Energy Usage
            </h2>
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
              <Flame
                className="text-orange-600 dark:text-orange-300"
                size={20}
              />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 dark:text-white mt-4">
            19.3{' '}
            <span className="text-2xl text-gray-500 dark:text-gray-400">
              kWh
            </span>
          </p>
          <div className="flex items-center mt-2 text-red-500">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm font-medium">3.2% from last week</span>
          </div>
        </div>

        {/* Eco-Points KPI */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">
              Eco-Points
            </h2>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Activity
                className="text-blue-600 dark:text-blue-300"
                size={20}
              />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 dark:text-white mt-4">
            2,150{' '}
            <span className="text-2xl text-gray-500 dark:text-gray-400">
              pts
            </span>
          </p>
          <div className="flex items-center mt-2 text-green-500">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm font-medium">+120 this week</span>
          </div>
        </div>

        {/* --- Main Content Row --- */}

        {/* Analytics Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800 dark:text-white mb-4">
            <BarChart2 className="text-purple-500" /> Monthly Impact
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  strokeOpacity={0.2}
                  className="dark:stroke-gray-600"
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                  stroke="#6b7280"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                  stroke="#6b7280"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                  itemStyle={{
                    color: '#333',
                  }}
                />
                <Legend iconType="circle" />
                <Bar
                  dataKey="co2"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  name="CO₂ (kg)"
                />
                <Bar
                  dataKey="energy"
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                  name="Energy (kWh)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800 dark:text-white mb-4">
            <ListChecks className="text-cyan-500" /> Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <CheckCircle2
                  className="text-green-500 dark:text-green-300"
                  size={20}
                />
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  4 eco-friendly tasks
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completed today
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Bike className="text-blue-500 dark:text-blue-300" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  3.1 km travelled
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sustainably by bike
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Plug
                  className="text-yellow-500 dark:text-yellow-300"
                  size={20}
                />
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  2 energy-saving actions
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unplugged devices
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Suggestions Row --- */}

        {/* AI Suggestions */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
            <Sparkles className="text-yellow-500" /> AI Sustainability Suggestions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-yellow-50 dark:bg-gray-700/50 rounded-xl flex items-start gap-3 transition-all hover:bg-yellow-100 dark:hover:bg-gray-700">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-800/60 rounded-full">
                <Lightbulb
                  className="text-yellow-600 dark:text-yellow-300"
                  size={20}
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Switch to LED lighting to reduce home energy use by up to 80%.
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-gray-700/50 rounded-xl flex items-start gap-3 transition-all hover:bg-blue-100 dark:hover:bg-gray-700">
              <div className="p-2 bg-blue-100 dark:bg-blue-800/60 rounded-full">
                <Footprints
                  className="text-blue-600 dark:text-blue-300"
                  size={20}
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Consider walking or biking for short trips under 1 km to cut
                emissions.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-gray-700/50 rounded-xl flex items-start gap-3 transition-all hover:bg-green-100 dark:hover:bg-gray-700">
              <div className="p-2 bg-green-100 dark:bg-green-800/60 rounded-full">
                <Recycle
                  className="text-green-600 dark:text-green-300"
                  size={20}
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Try buying reusable containers instead of plastic to reduce
                landfill waste.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;