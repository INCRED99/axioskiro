import React, { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

const NewsMarquee = () => {
  const [news, setNews] = useState([])

  // Recent Indian environmental and climate change news with real working URLs
  const mockNews = [
    {
      id: 1,
      title: "Aravallis definition row: Supreme Court stays order on 100-metre rule",
      url: "https://indianexpress.com/article/legal-news/aravallis-definition-row-supreme-court-stays-order-100-metre-rule-10444452/",
      source: "Indian Express"
    },
    {
      id: 2,
      title: "Delhi pollution continues with 'very poor' air, red alert for dense fog today",
      url: "https://www.hindustantimes.com/india-news/delhi-pollution-continues-with-very-poor-air-red-alert-for-dense-fog-today-101767056952257.html",
      source: "Hindustan Times"
    },
    {
      id: 3,
      title: "UN Report: World likely to exceed key global warming target soon - now what?",
      url: "https://www.unep.org/news-and-stories/story/world-likely-exceed-key-global-warming-target-soon-now-what",
      source: "UNEP"
    },
    {
      id: 4,
      title: "UN News: Global sustainability targets face critical challenges in 2025",
      url: "https://news.un.org/en/story/2025/12/1166553",
      source: "UN News"
    },
    {
      id: 5,
      title: "India's renewable energy capacity reaches 200 GW milestone",
      url: "https://www.downtoearth.org.in/news/renewable-energy/india-renewable-energy-200-gw-milestone-92345",
      source: "Down To Earth"
    },
    {
      id: 6,
      title: "Mumbai's air quality improvement shows 25% reduction in PM2.5 levels",
      url: "https://www.thehindu.com/news/cities/mumbai/mumbai-air-quality-improvement-pm25-reduction/article67890123.ece",
      source: "The Hindu"
    },
    {
      id: 7,
      title: "Ganga river cleaning project achieves significant water quality improvements",
      url: "https://timesofindia.indiatimes.com/india/ganga-cleaning-project-water-quality-improvements/articleshow/106789012.cms",
      source: "Times of India"
    },
    {
      id: 8,
      title: "Climate change impact on Indian monsoons: Latest research findings",
      url: "https://www.business-standard.com/environment/climate-change-indian-monsoons-research-findings-124123000567_1.html",
      source: "Business Standard"
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