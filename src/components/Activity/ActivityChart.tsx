import React, { useState, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ActivityData, HealthGoal } from '../../types/health';
import { format, subDays, isToday, isYesterday } from 'date-fns';
import { TrendingUp, TrendingDown, Calendar, Download, Settings } from 'lucide-react';
import clsx from 'clsx';

interface ActivityChartProps {
  data: ActivityData[];
  period?: '7d' | '30d' | '90d';
  metrics?: ('steps' | 'calories' | 'distance')[];
  goals?: HealthGoal[];
  onPeriodChange?: (period: '7d' | '30d' | '90d') => void;
  onMetricToggle?: (metric: string) => void;
  onDataPointClick?: (data: any) => void;
}

const metricConfig = {
  steps: {
    key: 'steps',
    label: 'Steps',
    color: '#3b82f6',
    unit: '',
    formatter: (value: number) => value.toLocaleString()
  },
  calories: {
    key: 'calories',
    label: 'Calories',
    color: '#f59e0b',
    unit: 'cal',
    formatter: (value: number) => value.toString()
  },
  distance: {
    key: 'distance',
    label: 'Distance',
    color: '#10b981',
    unit: 'km',
    formatter: (value: number) => `${value.toFixed(1)}`
  }
};

export const ActivityChart: React.FC<ActivityChartProps> = ({ 
  data,
  period = '7d',
  metrics = ['steps'],
  goals = [],
  onPeriodChange,
  onMetricToggle,
  onDataPointClick
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string>(metrics[0]);
  const [showGoalLine, setShowGoalLine] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const periodDays = {
    '7d': 7,
    '30d': 30,
    '90d': 90
  };

  const chartData = useMemo(() => {
    const days = periodDays[period];
    const endDate = new Date();
    const startDate = subDays(endDate, days - 1);

    // Fill missing days with zero values
    const filledData = [];
    for (let i = 0; i < days; i++) {
      const currentDate = subDays(endDate, days - 1 - i);
      const existingData = data.find(d => 
        d.date.toDateString() === currentDate.toDateString()
      );

      const formatDate = (date: Date) => {
        if (isToday(date)) return 'Today';
        if (isYesterday(date)) return 'Yesterday';
        if (period === '7d') return format(date, 'EEE');
        if (period === '30d') return format(date, 'MMM dd');
        return format(date, 'MM/dd');
      };

      filledData.push({
        date: formatDate(currentDate),
        fullDate: currentDate,
        steps: existingData?.steps || 0,
        calories: existingData?.calories || 0,
        distance: existingData?.distance || 0,
        activeMinutes: existingData?.activeMinutes || 0,
        workoutCount: existingData?.workouts?.length || 0,
        isToday: isToday(currentDate),
        hasData: !!existingData
      });
    }

    return filledData;
  }, [data, period]);

  const currentMetricConfig = metricConfig[selectedMetric as keyof typeof metricConfig];
  const goalValue = goals.find(g => g.type === selectedMetric)?.target;

  // Calculate trends and statistics
  const statistics = useMemo(() => {
    const values = chartData.map(d => d[selectedMetric as keyof typeof d] as number);
    const nonZeroValues = values.filter(v => v > 0);
    
    if (nonZeroValues.length === 0) {
      return { average: 0, trend: 0, max: 0, min: 0 };
    }

    const average = nonZeroValues.reduce((sum, val) => sum + val, 0) / nonZeroValues.length;
    const max = Math.max(...nonZeroValues);
    const min = Math.min(...nonZeroValues);
    
    // Calculate trend (comparing first half vs second half)
    const midPoint = Math.floor(values.length / 2);
    const firstHalf = values.slice(0, midPoint).filter(v => v > 0);
    const secondHalf = values.slice(midPoint).filter(v => v > 0);
    
    const firstAvg = firstHalf.length > 0 ? firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length : 0;
    const secondAvg = secondHalf.length > 0 ? secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length : 0;
    
    const trend = firstAvg > 0 ? ((secondAvg - firstAvg) / firstAvg) * 100 : 0;

    return { average, trend, max, min };
  }, [chartData, selectedMetric]);

  const handleMetricChange = (metric: string) => {
    setSelectedMetric(metric);
    onMetricToggle?.(metric);
  };

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      const csvData = [
        ['Date', 'Steps', 'Calories', 'Distance (km)', 'Active Minutes', 'Workouts'],
        ...chartData.map(d => [
          d.fullDate.toISOString().split('T')[0],
          d.steps,
          d.calories,
          d.distance,
          d.activeMinutes,
          d.workoutCount
        ])
      ];

      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `activity-data-${period}.csv`;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  }, [chartData, period]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{currentMetricConfig.label}:</span>
              <span className="font-medium text-gray-900">
                {currentMetricConfig.formatter(payload[0].value)} {currentMetricConfig.unit}
              </span>
            </div>
            {goalValue && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Goal:</span>
                <span className="text-gray-700">
                  {currentMetricConfig.formatter(goalValue)} {currentMetricConfig.unit}
                </span>
              </div>
            )}
            {data.workoutCount > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Workouts:</span>
                <span className="text-gray-700">{data.workoutCount}</span>
              </div>
            )}
            {!data.hasData && (
              <p className="text-xs text-amber-600 mt-1">⚠️ No data recorded</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{period} Activity Trend</h3>
          <div className="flex items-center space-x-4 mt-1">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {statistics.trend !== 0 && (
                <>
                  {statistics.trend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={statistics.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                    {statistics.trend > 0 ? '+' : ''}{statistics.trend.toFixed(1)}%
                  </span>
                </>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Avg: {currentMetricConfig.formatter(statistics.average)} {currentMetricConfig.unit}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Period selector */}
          {onPeriodChange && (
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {(['7d', '30d', '90d'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => onPeriodChange(p)}
                  className={clsx(
                    'px-3 py-1 rounded text-sm font-medium transition-all duration-200',
                    period === p
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Export button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Export data"
          >
            <Download className={clsx('w-4 h-4', isExporting && 'animate-spin')} />
          </button>
        </div>
      </div>

      {/* Metric selector */}
      <div className="flex items-center space-x-2 mb-4">
        {Object.entries(metricConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => handleMetricChange(key)}
            className={clsx(
              'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              selectedMetric === key
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
            )}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: config.color }}
            />
            <span>{config.label}</span>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData}
            onClick={onDataPointClick}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Goal reference line */}
            {showGoalLine && goalValue && (
              <ReferenceLine 
                y={goalValue} 
                stroke="#ef4444" 
                strokeDasharray="5 5"
                label={{ value: "Goal", position: "topRight", fontSize: 12 }}
              />
            )}
            
            <Line 
              type="monotone" 
              dataKey={selectedMetric}
              stroke={currentMetricConfig.color}
              strokeWidth={3}
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={payload.isToday ? 6 : 4}
                    fill={currentMetricConfig.color}
                    stroke="white"
                    strokeWidth={2}
                    className={clsx(
                      'transition-all duration-200',
                      !payload.hasData && 'opacity-50',
                      payload.isToday && 'animate-pulse'
                    )}
                  />
                );
              }}
              activeDot={{ 
                r: 8, 
                stroke: currentMetricConfig.color, 
                strokeWidth: 3,
                fill: 'white'
              }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Chart overlay for empty state */}
        {chartData.every(d => d[selectedMetric as keyof typeof d] === 0) && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
            <div className="text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">No {selectedMetric} data available</p>
              <p className="text-sm text-gray-400">Start tracking to see your progress</p>
            </div>
          </div>
        )}
      </div>

      {/* Chart controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showGoalLine}
              onChange={(e) => setShowGoalLine(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-600">Show goal line</span>
          </label>
        </div>

        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
            <span>No data</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Statistics summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-500">Average</p>
          <p className="font-semibold text-gray-900">
            {currentMetricConfig.formatter(statistics.average)} {currentMetricConfig.unit}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Best Day</p>
          <p className="font-semibold text-green-600">
            {currentMetricConfig.formatter(statistics.max)} {currentMetricConfig.unit}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Trend</p>
          <div className="flex items-center justify-center space-x-1">
            {statistics.trend > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : statistics.trend < 0 ? (
              <TrendingDown className="w-4 h-4 text-red-500" />
            ) : null}
            <p className={clsx(
              'font-semibold text-sm',
              statistics.trend > 0 ? 'text-green-600' : statistics.trend < 0 ? 'text-red-600' : 'text-gray-600'
            )}>
              {statistics.trend === 0 ? 'Stable' : `${statistics.trend > 0 ? '+' : ''}${statistics.trend.toFixed(1)}%`}
            </p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Goal Rate</p>
          <p className="font-semibold text-gray-900">
            {goalValue ? `${((statistics.average / goalValue) * 100).toFixed(0)}%` : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};
