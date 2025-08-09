import { motion } from 'framer-motion';

interface Sport {
  name: string;
  participants: number;
  progress: number;
  color: string;
  icon: React.ReactNode;
}

interface MobileSportsOverviewProps {
  sports: Sport[];
}

const MobileSportsOverview = ({ sports }: MobileSportsOverviewProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
      <h3 className="text-white text-lg font-semibold mb-4">Deportes Activos</h3>
      
      <div className="space-y-3">
        {sports.map((sport, index) => (
          <motion.div
            key={sport.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${sport.color}20` }}
              >
                <div style={{ color: sport.color }}>
                  {sport.icon}
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">{sport.name}</h4>
                <p className="text-gray-400 text-xs">{sport.participants} participantes</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-white font-semibold text-sm">{sport.progress}%</p>
              <div className="w-16 h-2 bg-white/10 rounded-full mt-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${sport.progress}%` }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: sport.color }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MobileSportsOverview;