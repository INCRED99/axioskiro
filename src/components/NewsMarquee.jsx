import React, { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

const NewsMarquee = () => {
  const [news, setNews] = useState([])

  // Recent Indian environmental and climate change news
  const mockNews = [
    {
      id: 1,
      title: "Supreme Court orders immediate halt to illegal mining in Aravalli hills to protect Delhi's green lung",
      url: "https://www.downtoearth.org.in/news/mining/supreme-court-aravalli-mining-ban-delhi-green-cover",
      source: "Down To Earth"
    },
    {
      id: 2,
      title: "Delhi records 'severe' air quality as AQI crosses 400 mark, GRAP Stage 4 implemented",
      url: "https://www.hindustantimes.com/cities/delhi-news/delhi-air-pollution-aqi-400-grap-stage-4",
      source: "Hindustan Times"
    },
    {
      id: 3,
      title: "Aravalli restoration project shows 40% increase in forest cover, wildlife returns to degraded areas",
      url: "https://www.thehindu.com/news/national/aravalli-forest-restoration-wildlife-conservation",
      source: "The Hindu"
    },
    {
      id: 4,
      title: "Delhi government launches electric bus fleet expansion to combat rising pollution levels",
      url: "https://timesofindia.indiatimes.com/city/delhi/electric-bus-fleet-pollution-control",
      source: "Times of India"
    },
    {
      id: 5,
      title: "Haryana government bans construction activities in Aravalli region following environmental violations",
      url: "https://www.business-standard.com/india-news/haryana-aravalli-construction-ban-environment",
      source: "Business Standard"
    },
    {
      id: 6,
      title: "Delhi's odd-even scheme returns as winter pollution reaches hazardous levels",
      url: "https://www.newindianexpress.com/cities/delhi/delhi-odd-even-winter-pollution-hazardous",
      source: "New Indian Express"
    },
    {
      id: 7,
      title: "NGT directs immediate action against illegal quarrying destroying Aravalli biodiversity",
      url: "https://www.downtoearth.org.in/news/governance/ngt-aravalli-quarrying-biodiversity-protection",
      source: "Down To Earth"
    },
    {
      id: 8,
      title: "Delhi's air quality monitoring network expanded with 100 new sensors across NCR region",
      url: "https://www.hindustantimes.com/cities/delhi-news/air-quality-monitoring-sensors-ncr-expansion",
      source: "Hindustan Times"
    },
    {
      id: 9,
      title: "Rajasthan launches massive afforestation drive in Aravalli hills to combat desertification",
      url: "https://www.thehindu.com/news/national/rajasthan-aravalli-afforestation-desertification",
      source: "The Hindu"
    },
    {
      id: 10,
      title: "Delhi pollution: Schools shift to online classes as air quality reaches 'severe plus' category",
      url: "https://timesofindia.indiatimes.com/city/delhi/schools-online-classes-severe-plus-air-quality",
      source: "Times of India"
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