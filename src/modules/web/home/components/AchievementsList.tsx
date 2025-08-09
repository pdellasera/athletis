import { motion } from 'framer-motion';
import { Zap, Trophy, Star, Target } from 'lucide-react';
import type { Achievement } from '../types';

interface AchievementsListProps {
  achievements: Achievement[];
}

const AchievementsList = ({ achievements }: AchievementsListProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap': return <Zap className="w-4 h-4 text-white" />;
      case 'trophy': return <Trophy className="w-4 h-4 text-white" />;
      case 'star': return <Star className="w-4 h-4 text-white" />;
      case 'target': return <Target className="w-4 h-4 text-white" />;
      default: return <Star className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div 
      className="bg-white/8 backdrop-blur-xl rounded-xl p-5 border border-white/20"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <h3 className="text-white text-lg font-medium mb-4">Logros Recientes</h3>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-gradient-to-r from-[#5b8df9] to-[#7ca9f9] rounded-lg">
                {getIcon(achievement.icon)}
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm font-medium mb-1">{achievement.title}</h4>
                <p className="text-white/75 text-xs mb-2">{achievement.description}</p>
                <p className="text-white/50 text-xs">{achievement.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;