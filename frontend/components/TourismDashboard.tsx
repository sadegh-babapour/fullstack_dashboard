'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart, Bar, 
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import type { VisitorData, Demographics } from '../types/tourism'

const COLORS = ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];

export default function TourismDashboard() {
  const [visitorData, setVisitorData] = useState<VisitorData[]>([])
  const [demographics, setDemographics] = useState<Demographics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitorResponse, demographicsResponse] = await Promise.all([
          fetch('/api/visitors'),
          fetch('/api/demographics')
        ])
        
        const visitorData = await visitorResponse.json()
        const demographicsData = await demographicsResponse.json()
        
        console.log('Visitor Data:', visitorData)
        console.log('Demographics Data:', demographicsData)
        
        setVisitorData(visitorData)
        setDemographics(demographicsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  console.log('Current state:', { visitorData, demographics })
  
  // Debug render to verify data
  if (!demographics) {
    return <div>No demographics data available</div>
  }

  // Chart theme configuration
  const darkTheme = {
    backgroundColor: 'transparent',
    textColor: '#94a3b8', // slate-400
    fontSize: 12,
    axis: {
      stroke: '#475569', // slate-600
      tickStroke: '#475569'
    },
    grid: {
      stroke: '#1e293b', // slate-800
      strokeDasharray: '3 3'
    }
  };

  return (
    <div className="space-y-8">
      {/* Visitor Trends */}
      <div className="bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-slate-200">Monthly Visitor Trends</h2>
        <div className="h-[400px]">
          <ResponsiveContainer>
            <BarChart data={visitorData} style={{ color: darkTheme.textColor }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={darkTheme.grid.stroke} 
              />
              <XAxis 
                dataKey="month" 
                stroke={darkTheme.axis.stroke}
                tick={{ fill: darkTheme.textColor }}
              />
              <YAxis 
                stroke={darkTheme.axis.stroke}
                tick={{ fill: darkTheme.textColor }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  color: '#e2e8f0'
                }}
              />
              <Legend 
                wrapperStyle={{ color: darkTheme.textColor }}
              />
              <Bar dataKey="domestic" fill="#60a5fa" name="Domestic Visitors" />
              <Bar dataKey="international" fill="#34d399" name="International Visitors" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Average Stay Duration */}
      <div className="bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Average Stay Duration Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <LineChart data={visitorData} style={{ color: darkTheme.textColor }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={darkTheme.grid.stroke}
              />
              <XAxis 
                dataKey="month" 
                stroke={darkTheme.axis.stroke}
                tick={{ fill: darkTheme.textColor }}
              />
              <YAxis 
                stroke={darkTheme.axis.stroke}
                tick={{ fill: darkTheme.textColor }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  color: '#e2e8f0'
                }}
              />
              <Legend 
                wrapperStyle={{ color: darkTheme.textColor }}
              />
              <Line 
                type="monotone" 
                dataKey="avg_stay_days" 
                stroke="#60a5fa" 
                name="Average Stay (Days)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Visitor Demographics */}
      {demographics && (
        <div className="bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Visitor Demographics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Age Groups */}
            <div className="h-[300px]">
              <h3 className="text-lg font-medium mb-2">Age Groups</h3>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={demographics.age_groups}
                    dataKey="percentage"
                    nameKey="group"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={{ fill: darkTheme.textColor }}
                  >
                    {demographics.age_groups.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    wrapperStyle={{ 
                      color: darkTheme.textColor,
                      padding: '0 8px'
                    }}
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Visit Purpose */}
            <div className="bg-slate-800 p-6 rounded-lg shadow">
            <div className="h-[320px]">

              <h3 className="text-lg font-medium mb-2">Visit Purpose</h3>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={demographics.purpose}
                    dataKey="percentage"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {demographics.purpose.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}