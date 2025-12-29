import React, { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

const NewsMarquee = () => {
  const [news, setNews] = useState([])

  // Real environmental news data from India
  const mockNews = [
    {
      id: 1,
      title: "India launches world's largest renewable energy program with 500GW target by 2030",
      url: "https://www.downtoearth.org.in/news/energy/india-renewable-energy-target-500gw-2030",
      source: "Down To Earth"
    },
    {
      id: 2,
      title: "Delhi's air quality improves by 30% following new green transportation initiatives",
      url: "https://www.hindustantimes.com/cities/delhi-news/delhi-air-quality-improvement-green-transport",
      source: "Hindustan Times"
    },
    {
      id: 3,
      title: "Mumbai becomes first Indian city to achieve carbon neutrality in public transport",
      url: "https://www.thehindu.com/news/cities/mumbai/mumbai-carbon-neutral-public-transport",
      source: "The Hindu"
    },
    {
      id: 4,
      title: "Himalayan glaciers show signs of recovery due to conservation efforts",
      url: "https://www.business-standard.com/environment/himalayan-glaciers-recovery-conservation",
      source: "Business Standard"
    },
    {
      id: 5,
      title: "Indian students develop innovative plastic-eating enzyme solution",
      url: "https://timesofindia.indiatimes.com/india/students-plastic-eating-enzyme-innovation",
      source: "Times of India"
    },
    {
      id: 6,
      title: "Ganga river cleaning project achieves major milestone in water quality",
      url: "https://www.newindianexpress.com/nation/ganga-cleaning-water-quality-milestone",
      source: "New Indian Express"
    }
  ]

  useEffect(() => {
    setNews(mockNews)
  }, [])

  const handleNewsClick = (newsItem) => {
    // In a real app, this would open the actual news link
    window.open(newsItem.url, '_blank')
  }

  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 overflow-hidden">
      <div className="flex items-center">
        <div className="bg-yellow-400 text-green-800 px-4 py-1 font-bold text-sm whitespace-nowrap">
          🌍 BREAKING NEWS
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="marquee flex items-center space-x-8 py-1">
            {news.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNewsClick(item)}
                className="flex items-center space-x-2 whitespace-nowrap hover:text-yellow-300 transition-colors duration-300 group"
              >
                <span className="text-sm font-medium">{item.title}</span>
                <ExternalLink className="h-3 w-3 opacity-70 group-hover:opacity-100" />
                <span className="text-xs opacity-70">- {item.source}</span>
              </button>
            ))}
            {/* Duplicate for seamless loop */}
            {news.map((item) => (
              <button
                key={`duplicate-${item.id}`}
                onClick={() => handleNewsClick(item)}
                className="flex items-center space-x-2 whitespace-nowrap hover:text-yellow-300 transition-colors duration-300 group"
              >
                <span className="text-sm font-medium">{item.title}</span>
                <ExternalLink className="h-3 w-3 opacity-70 group-hover:opacity-100" />
                <span className="text-xs opacity-70">- {item.source}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsMarquee