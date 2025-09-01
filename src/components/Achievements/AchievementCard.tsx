import React, { useState, useEffect } from 'react';
import { Achievement } from '../../types/health';
import { Trophy, Footprints, Moon, Heart, Users, Lock, Share2, Star } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface AchievementCardProps {
  achievement: Achievement;
  onShare?: (achievementId: string) => void;
  onView?: (achievementId: string) => void;
  locale?: string;
}

const categoryIcons = {
  activity: Footprints,
  sleep: Moon,
  nutrition: Heart,
  stress: Heart,
  social: Users
};

const categoryColors = {
  activity: 'text-blue-600 bg-blue-50 border-blue-100',
  sleep: 'text-purple-600 bg-purple-50 border-purple-100',
  nutrition: 'text-orange-600 bg-orange-50 border-orange-100',
  stress: 'text-green-600 bg-green-50 border-green-100',
  social: 'text-pink-600 bg-pink-50 border-pink-100'
};

const rarityColors = {
  common: 'from-gray-50 to-gray-100',
  rare: 'from-blue-50 to-blue-100',
  epic: 'from-purple-50 to-purple-100',
  legendary: 'from-yellow-50 to-yellow-100'
};

export const AchievementCard: React.FC<AchievementCardProps> = ({ 
  achievement, 
  onShare,
  onView,
  locale = 'en-US'
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const Icon = categoryIcons[achievement.category];
  const isUnlocked = !!achievement.unlockedAt;
  const isInProgress = achievement.progress > 0 && !isUnlocked;
  const actualProgress = Math.min(achievement.progress, achievement.target);
  const progressPercentage = (actualProgress / achievement.target) * 100;
  const rarity = achievement.rarity || 'common';

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  // Show celebration when newly unlocked
  useEffect(() => {
    if (isUnlocked && achievement.unlockedAt) {
      const unlockTime = achievement.unlockedAt.getTime();
      const now = Date.now();
      const fiveMinutesAgo = now - (5 * 60 * 1000);
      
      if (unlockTime > fiveMinutesAgo) {
        setShowCelebration(true);
        const timer = setTimeout(() => setShowCelebration(false), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isUnlocked, achievement.unlockedAt]);

  const formatDate = (date: Date) => {
    try {
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      console.warn('Date formatting error:', error);
      return date.toLocaleDateString(locale);
    }
  };

  const formatProgress = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString(locale);
  };

  const handleCardClick = () => {
    onView?.(achievement.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(achievement.id);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        event_category: 'achievement',
        event_label: achievement.title
      });
    }
  };

  const getMotivationalMessage = () => {
    if (isUnlocked) return "Achievement unlocked! 🎉";
    
    const remaining = achievement.target - achievement.progress;
    const percentage = progressPercentage;
    
    if (percentage === 0) return "Ready to start this challenge?";
    if (percentage >= 90) return `Almost there! Just ${formatProgress(remaining)} more!`;
    if (percentage >= 75) return "You're in the final stretch!";
    if (percentage >= 50) return "Halfway there! Keep going!";
    if (percentage >= 25) return "Great progress so far!";
    return "Every step counts!";
  };

  return (
    <div 
      className={clsx(
        'bg-white rounded-xl p-6 shadow-sm border transition-all duration-300 cursor-pointer transform',
        'hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
        isUnlocked && `bg-gradient-to-br ${rarityColors[rarity]} border-yellow-200`,
        !isUnlocked && isInProgress && 'border-blue-200 bg-blue-50/20',
        !isUnlocked && achievement.progress === 0 && 'opacity-70 hover:opacity-100',
        showCelebration && 'animate-pulse ring-4 ring-yellow-300'
      )}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Achievement: ${achievement.title}. ${isUnlocked ? 'Unlocked' : `Progress: ${progressPercentage.toFixed(0)}%`}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-xl animate-pulse" />
      )}

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={clsx(
          'p-3 rounded-lg transition-all duration-300 border',
          isUnlocked ? 'bg-yellow-100 border-yellow-200' : categoryColors[achievement.category],
          isHovered && 'scale-110'
        )}>
          {isUnlocked ? (
            <Trophy className="w-6 h-6 text-yellow-600" />
          ) : achievement.progress === 0 ? (
            <Lock className="w-6 h-6 text-gray-400" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {achievement.rarity && achievement.rarity !== 'common' && (
            <div className={clsx(
              'flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium',
              rarity === 'legendary' && 'bg-yellow-100 text-yellow-800',
              rarity === 'epic' && 'bg-purple-100 text-purple-800',
              rarity === 'rare' && 'bg-blue-100 text-blue-800'
            )}>
              <Star className="w-3 h-3" />
              <span className="capitalize">{rarity}</span>
            </div>
          )}
          
          {isUnlocked && (
            <div className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded border border-yellow-200">
              Unlocked
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <div>
          <h3 className={clsx(
            'font-semibold mb-1 transition-colors',
            isUnlocked ? 'text-yellow-900' : 'text-gray-900'
          )}>
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {achievement.description}
          </p>
        </div>

        {/* Progress section */}
        {!isUnlocked && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Progress</span>
              <span className="font-semibold text-gray-900">
                {formatProgress(actualProgress)} / {formatProgress(achievement.target)}
              </span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={clsx(
                    'h-3 rounded-full transition-all duration-1000 ease-out relative',
                    isInProgress ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-gray-300'
                  )}
                  style={{ width: `${animatedProgress}%` }}
                >
                  {isInProgress && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  )}
                </div>
              </div>
              
              {isInProgress && animatedProgress > 10 && (
                <div 
                  className="absolute top-0 h-3 w-1 bg-white/60 rounded-full transition-all duration-1000"
                  style={{ left: `${animatedProgress}%`, transform: 'translateX(-50%)' }}
                />
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 font-medium">
                {animatedProgress.toFixed(0)}% complete
              </p>
              {achievement.estimatedCompletion && (
                <p className="text-xs text-blue-600">
                  Est. completion: {formatDate(achievement.estimatedCompletion)}
                </p>
              )}
            </div>

            {/* Motivational message */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-xs text-gray-700 font-medium">
                💡 {getMotivationalMessage()}
              </p>
            </div>
          </div>
        )}

        {/* Unlocked achievement info */}
        {isUnlocked && achievement.unlockedAt && (
          <div className="space-y-2">
            <div className="text-xs text-yellow-700 font-medium">
              🏆 Unlocked on {formatDate(achievement.unlockedAt)}
            </div>
            
            {achievement.points && (
              <div className="text-xs text-gray-600">
                Earned <span className="font-semibold text-yellow-600">{achievement.points}</span> points
              </div>
            )}

            {onShare && (
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium"
                aria-label={`Share ${achievement.title} achievement`}
              >
                <Share2 className="w-4 h-4" />
                <span>Share Achievement</span>
              </button>
            )}
          </div>
        )}

        {/* Next milestone hint */}
        {!isUnlocked && achievement.nextMilestone && (
          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs text-gray-500">
              <span className="font-medium">Next milestone:</span> {achievement.nextMilestone}
            </p>
          </div>
        )}
      </div>

      {/* Hover overlay for additional info */}
      {isHovered && achievement.tips && (
        <div className="absolute inset-x-0 bottom-0 bg-gray-900/90 text-white p-3 rounded-b-xl transform transition-all duration-200">
          <p className="text-xs leading-relaxed">{achievement.tips}</p>
        </div>
      )}
    </div>
  );
};
