import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Clock, CheckCircle2, AlertCircle, Target, Zap, BarChart3 } from 'lucide-react';

const Analytics = () => {
  const { tasks } = useTaskContext();

  // Beautiful light color palette
  const colors = {
    done: {
      light: '#A7F3D0',
      medium: '#10B981',
      icon: '#059669'
    },
    progress: {
      light: '#93C5FD',
      medium: '#3B82F6', 
      icon: '#2563EB'
    },
    pending: {
      light: '#FDE68A',
      medium: '#F59E0B',
      icon: '#D97706'
    },
    high: {
      light: '#FECACA',
      medium: '#EF4444',
      icon: '#DC2626'
    },
    medium: {
      light: '#DDD6FE',
      medium: '#8B5CF6',
      icon: '#7C3AED'
    },
    low: {
      light: '#E5E7EB',
      medium: '#6B7280',
      icon: '#4B5563'
    },
    theme: {
      light: '#C7D2FE',
      medium: '#6366F1',
      dark: '#4F46E5'
    }
  };

  // Enhanced analytics data using actual task data
  const statusData = [
    { 
      name: 'Done', 
      value: tasks.filter(t => t.status === 'Done').length, 
      color: colors.done.light,
      borderColor: colors.done.medium,
      iconColor: colors.done.icon,
      tasks: tasks.filter(t => t.status === 'Done').map(t => t.title)
    },
    { 
      name: 'In Progress', 
      value: tasks.filter(t => t.status === 'In Progress').length, 
      color: colors.progress.light,
      borderColor: colors.progress.medium,
      iconColor: colors.progress.icon,
      tasks: tasks.filter(t => t.status === 'In Progress').map(t => t.title)
    },
    { 
      name: 'Pending', 
      value: tasks.filter(t => t.status === 'Pending').length, 
      color: colors.pending.light,
      borderColor: colors.pending.medium,
      iconColor: colors.pending.icon,
      tasks: tasks.filter(t => t.status === 'Pending').map(t => t.title)
    }
  ];

  const priorityData = [
    { 
      name: 'High', 
      value: tasks.filter(t => t.priority === 'High').length, 
      color: colors.high.light,
      borderColor: colors.high.medium,
      iconColor: colors.high.icon,
      taskNames: tasks.filter(t => t.priority === 'High').slice(0, 3).map(t => t.title),
      avgProgress: tasks.filter(t => t.priority === 'High').length > 0 
        ? Math.round(tasks.filter(t => t.priority === 'High').reduce((acc, t) => acc + (t.progress || 0), 0) / tasks.filter(t => t.priority === 'High').length)
        : 0
    },
    { 
      name: 'Medium', 
      value: tasks.filter(t => t.priority === 'Medium').length, 
      color: colors.medium.light,
      borderColor: colors.medium.medium,
      iconColor: colors.medium.icon,
      taskNames: tasks.filter(t => t.priority === 'Medium').slice(0, 3).map(t => t.title),
      avgProgress: tasks.filter(t => t.priority === 'Medium').length > 0 
        ? Math.round(tasks.filter(t => t.priority === 'Medium').reduce((acc, t) => acc + (t.progress || 0), 0) / tasks.filter(t => t.priority === 'Medium').length)
        : 0
    },
    { 
      name: 'Low', 
      value: tasks.filter(t => t.priority === 'Low').length, 
      color: colors.low.light,
      borderColor: colors.low.medium,
      iconColor: colors.low.icon,
      taskNames: tasks.filter(t => t.priority === 'Low').slice(0, 3).map(t => t.title),
      avgProgress: tasks.filter(t => t.priority === 'Low').length > 0 
        ? Math.round(tasks.filter(t => t.priority === 'Low').reduce((acc, t) => acc + (t.progress || 0), 0) / tasks.filter(t => t.priority === 'Low').length)
        : 0
    }
  ];

  // Enhanced progress distribution with actual task names
  const progressData = tasks
    .filter(t => t.status === 'In Progress')
    .map(task => ({
      name: task.title.length > 15 ? task.title.substring(0, 15) + '...' : task.title,
      fullName: task.title,
      progress: task.progress || 0,
      priority: task.priority,
      dueDate: task.date
    }))
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 8);

  // Real monthly data based on actual task dates
  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    
    return months.map((month, index) => {
      const monthTasks = tasks.filter(task => {
        if (!task.date) return false;
        const taskDate = new Date(task.date);
        return taskDate.getMonth() === index && taskDate.getFullYear() === currentYear;
      });
      
      return {
        month,
        completed: monthTasks.filter(t => t.status === 'Done').length,
        inProgress: monthTasks.filter(t => t.status === 'In Progress').length,
        pending: monthTasks.filter(t => t.status === 'Pending').length
      };
    }).filter(monthData => monthData.completed > 0 || monthData.inProgress > 0 || monthData.pending > 0)
      .slice(-6);
  };

  const monthlyData = getMonthlyData();

  // Enhanced metrics with better calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const avgProgress = inProgressTasks > 0 
    ? Math.round(tasks.filter(t => t.status === 'In Progress').reduce((acc, t) => acc + (t.progress || 0), 0) / inProgressTasks)
    : 0;
  
  const overdueTasks = tasks.filter(t => {
    if (!t.date || t.status === 'Done') return false;
    return new Date(t.date) < new Date();
  }).length;

  const highPriorityTasks = tasks.filter(t => t.priority === 'High').length;

  const metrics = [
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      description: 'Tasks completed',
      icon: TrendingUp,
      color: 'from-emerald-100 to-emerald-200',
      iconColor: colors.done.icon,
      trend: completionRate > 70 ? 'up' : completionRate > 40 ? 'stable' : 'down'
    },
    {
      title: 'Avg Progress',
      value: `${avgProgress}%`,
      description: 'Active tasks progress',
      icon: Target,
      color: 'from-blue-100 to-blue-200',
      iconColor: colors.progress.icon,
      trend: avgProgress > 50 ? 'up' : 'stable'
    },
    {
      title: 'Productivity',
      value: `${Math.round((completedTasks + (inProgressTasks * 0.5)) / totalTasks * 100)}%`,
      description: 'Overall efficiency',
      icon: Zap,
      color: 'from-purple-100 to-purple-200',
      iconColor: colors.medium.icon,
      trend: 'up'
    },
    {
      title: 'On Track',
      value: `${totalTasks - overdueTasks}`,
      description: 'Tasks not overdue',
      icon: CheckCircle2,
      color: 'from-green-100 to-green-200',
      iconColor: colors.done.icon,
      trend: overdueTasks === 0 ? 'up' : 'stable'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PriorityCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = priorityData.find(item => item.name === label);
      return (
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
          <p className="font-semibold text-gray-900 mb-2">{label} Priority</p>
          <p className="text-sm text-gray-600 mb-2">
            Total: <span className="font-semibold">{payload[0].value} tasks</span>
          </p>
          {data?.taskNames && data.taskNames.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Sample tasks:</p>
              {data.taskNames.map((taskName, index) => (
                <p key={index} className="text-xs text-gray-600">• {taskName}</p>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const ProgressCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const task = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
          <p className="font-semibold text-gray-900 mb-1">{task.fullName}</p>
          <p className="text-sm text-gray-600">Progress: <span className="font-semibold">{task.progress}%</span></p>
          <p className="text-sm text-gray-600">Priority: <span className="font-semibold">{task.priority}</span></p>
          {task.dueDate && (
            <p className="text-sm text-gray-600">
              Due: <span className="font-semibold">{new Date(task.dueDate).toLocaleDateString()}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (tasks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#7148CC] to-[#A213C5] rounded-full flex items-center justify-center mb-4 mx-auto">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Data Available</h2>
          <p className="text-gray-600">Create some tasks to see analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      {/* Reduced margins by increasing max-width and adjusting padding */}
    <div className="w-full px-0">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              
            </div>
            <div className="flex flex-wrap gap-2">
              {statusData.map((status, index) => (
                <div 
                  key={status.name}
                  className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div 
                    className="w-3 h-3 rounded-full border-2"
                    style={{ 
                      backgroundColor: status.color,
                      borderColor: status.borderColor
                    }}
                  ></div>
                  <span className="text-xs font-medium text-gray-700">{status.name}:</span>
                  <span className="text-xs font-bold" style={{ color: status.borderColor }}>{status.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Beautiful Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.title}
                className="group bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className="w-5 h-5" style={{ color: metric.iconColor }} />
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    metric.trend === 'up' ? 'bg-emerald-100 text-emerald-700' :
                    metric.trend === 'down' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-sm font-semibold text-gray-700 mb-1">{metric.title}</p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Beautiful Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution - Beautiful Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <h3 className="text-lg font-semibold text-gray-900">Task Status Overview</h3>
              <div className="flex gap-2 text-xs text-gray-500">
                <span>Total: {totalTasks}</span>
              </div>
            </div>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke={entry.borderColor}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {statusData.map((status, index) => (
                <div key={status.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full border-2"
                    style={{ 
                      backgroundColor: status.color,
                      borderColor: status.borderColor
                    }}
                  ></div>
                  <span className="text-xs text-gray-600">{status.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Distribution - Beautiful Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <h3 className="text-lg font-semibold text-gray-900">Priority Distribution</h3>
              <div className="text-xs text-gray-500">
                High: {highPriorityTasks} urgent
              </div>
            </div>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="#f3f4f6" />
                  <XAxis dataKey="name" fontSize={12} stroke="#9ca3af" />
                  <YAxis fontSize={12} stroke="#9ca3af" />
                  <Tooltip content={<PriorityCustomTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {priorityData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke={entry.borderColor}
                        strokeWidth={2}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Progress Tracking - Beautiful Horizontal Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <h3 className="text-lg font-semibold text-gray-900">Progress Tracking</h3>
              <div className="text-xs text-gray-500">
                {inProgressTasks} active tasks
              </div>
            </div>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" horizontal={false} stroke="#f3f4f6" />
                  <XAxis type="number" domain={[0, 100]} fontSize={12} stroke="#9ca3af" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 11 }}
                    width={80}
                    stroke="#9ca3af"
                  />
                  <Tooltip content={<ProgressCustomTooltip />} />
                  <Bar dataKey="progress" radius={[0, 4, 4, 0]}>
                    {progressData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          entry.priority === 'High' ? colors.high.light :
                          entry.priority === 'Medium' ? colors.medium.light : colors.low.light
                        }
                        stroke={
                          entry.priority === 'High' ? colors.high.borderColor :
                          entry.priority === 'Medium' ? colors.medium.borderColor : colors.low.borderColor
                        }
                        strokeWidth={2}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trend - Beautiful Area Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
              <div className="text-xs text-gray-500">
                {monthlyData.length} months trend
              </div>
            </div>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.done.light} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors.done.light} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.progress.light} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors.progress.light} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="#f3f4f6" />
                  <XAxis dataKey="month" fontSize={12} stroke="#9ca3af" />
                  <YAxis fontSize={12} stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stroke={colors.done.borderColor}
                    fill="url(#completedGradient)"
                    strokeWidth={2}
                    name="Completed"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="inProgress" 
                    stroke={colors.progress.borderColor}
                    fill="url(#progressGradient)"
                    strokeWidth={2}
                    name="In Progress"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Beautiful Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#7148CC] to-[#A213C5] text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6" />
              <h4 className="text-lg font-semibold">Performance Summary</h4>
            </div>
            <p className="text-3xl font-bold mb-2">{completionRate}%</p>
            <p className="text-purple-100 text-sm">Overall completion rate</p>
            <div className="mt-4 space-y-2">
              {statusData.map((status, index) => (
                <div key={status.name} className="flex justify-between text-sm">
                  <span className="text-purple-100">{status.name}</span>
                  <span className="font-semibold">{status.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6" style={{ color: colors.progress.icon }} />
              <h4 className="text-lg font-semibold text-gray-900">Progress Overview</h4>
            </div>
            <p className="text-3xl font-bold mb-2" style={{ color: colors.progress.icon }}>{avgProgress}%</p>
            <p className="text-gray-500 text-sm">Average progress</p>
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">On Track</span>
                  <span className="font-semibold" style={{ color: colors.done.icon }}>{totalTasks - overdueTasks}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${((totalTasks - overdueTasks) / totalTasks) * 100}%`,
                      backgroundColor: colors.done.light
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6" style={{ color: colors.high.icon }} />
              <h4 className="text-lg font-semibold text-gray-900">Attention Required</h4>
            </div>
            <p className="text-3xl font-bold mb-2" style={{ color: colors.high.icon }}>{overdueTasks}</p>
            <p className="text-gray-500 text-sm">Tasks needing attention</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">High Priority</span>
                <span className="font-semibold" style={{ color: colors.high.icon }}>{highPriorityTasks}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Pending Review</span>
                <span className="font-semibold" style={{ color: colors.pending.icon }}>{pendingTasks}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">In Progress</span>
                <span className="font-semibold" style={{ color: colors.progress.icon }}>{inProgressTasks}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;