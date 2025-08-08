import { motion } from 'framer-motion';
import type { WeeklyData } from '../types';

interface WeeklyChartProps {
  data: WeeklyData[];
}

const WeeklyChart = ({ data }: WeeklyChartProps) => {
  const maxHours = Math.max(...data.map(d => d.hours));

  return (
    <div 
      className="bg-white/8 backdrop-blur-xl rounded-xl p-5 border border-white/20"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-medium">Rendimiento Semanal</h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#5b8df9] rounded-full"></div>
            <span className="text-white/75">Horas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#28a745] rounded-full"></div>
            <span className="text-white/75">Rendimiento</span>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between space-x-2 h-32">
        {data.map((day, index) => (
          <div key={day.day} className="flex-1 flex flex-col items-center">
            <div className="flex-1 flex flex-col justify-end space-y-1 w-full">
              {/* Hours Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(day.hours / maxHours) * 80}px` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-[#5b8df9] rounded-t-sm w-full"
              />
              
              {/* Performance Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(day.performance / 100) * 60}px` }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                className="bg-[#28a745] rounded-t-sm w-full"
              />
            </div>
            
            <div className="mt-2 text-center">
              <p className="text-white/75 text-xs font-medium">{day.day}</p>
              <p className="text-white/50 text-xs">{day.hours}h</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyChart;