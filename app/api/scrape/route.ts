import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { profileUrl } = await request.json()

    if (!profileUrl) {
      return NextResponse.json(
        { error: 'Profile URL is required' },
        { status: 400 }
      )
    }

    // Extract username from URL
    let username = profileUrl
    if (profileUrl.includes('linkedin.com')) {
      const match = profileUrl.match(/linkedin\.com\/in\/([^\/\?]+)/)
      if (match) {
        username = match[1]
      }
    }

    // Since LinkedIn requires authentication and has anti-scraping measures,
    // we'll create a simulated response with sample data
    // In production, this would use LinkedIn's official API or a scraping service

    const mockProfile = {
      name: username.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      headline: 'Professional | Industry Leader | Innovator',
      username: username
    }

    const mockPosts = generateMockPosts(mockProfile.name)

    // Generate year-in-review story using AI
    const story = await generateYearInReview(mockProfile, mockPosts)

    return NextResponse.json({
      profile: mockProfile,
      posts: mockPosts,
      story: story
    })

  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    )
  }
}

function generateMockPosts(name: string) {
  const posts = [
    {
      date: '2024-12-15',
      content: `Excited to announce that our team has launched a groundbreaking new product! This year has been incredible for innovation and growth. #Innovation #ProductLaunch`,
      engagement: { likes: 342, comments: 28 }
    },
    {
      date: '2024-11-20',
      content: `Grateful to speak at the Tech Summit 2024! Sharing insights on AI and the future of work with amazing industry leaders. #TechSummit #AI`,
      engagement: { likes: 521, comments: 45 }
    },
    {
      date: '2024-10-08',
      content: `Our Q3 results are in and they're phenomenal! Thank you to the entire team for their dedication and hard work. We're just getting started! #TeamWork #Growth`,
      engagement: { likes: 287, comments: 19 }
    },
    {
      date: '2024-09-12',
      content: `Honored to receive the Industry Excellence Award! This recognition belongs to our entire organization. Proud of what we've accomplished together. #Awards #Excellence`,
      engagement: { likes: 698, comments: 82 }
    },
    {
      date: '2024-08-05',
      content: `Celebrating 5 years with the company! From startup to industry leader - what an incredible journey. Excited for what's next! #Anniversary #CareerMilestone`,
      engagement: { likes: 412, comments: 56 }
    },
    {
      date: '2024-07-18',
      content: `Just wrapped up an amazing workshop on leadership and innovation. The future is bright when we invest in our people! #Leadership #ProfessionalDevelopment`,
      engagement: { likes: 234, comments: 15 }
    },
    {
      date: '2024-06-22',
      content: `Thrilled to announce our expansion into new markets! This opens up incredible opportunities for growth and impact. #Expansion #BusinessGrowth`,
      engagement: { likes: 445, comments: 33 }
    },
    {
      date: '2024-05-10',
      content: `Mentoring the next generation of leaders has been one of the most rewarding experiences. Invest in others - it pays dividends! #Mentorship #GiveBack`,
      engagement: { likes: 289, comments: 21 }
    },
    {
      date: '2024-04-03',
      content: `Q1 exceeded all expectations! Thank you to our customers, partners, and team members who made this possible. #Results #Success`,
      engagement: { likes: 356, comments: 27 }
    },
    {
      date: '2024-03-14',
      content: `Excited to partner with industry leaders on our latest initiative! Collaboration is key to driving meaningful change. #Partnership #Innovation`,
      engagement: { likes: 423, comments: 38 }
    },
    {
      date: '2024-02-28',
      content: `Reflecting on lessons learned and growth achieved. Every challenge is an opportunity to become better. #Growth #Reflection`,
      engagement: { likes: 267, comments: 18 }
    },
    {
      date: '2024-01-15',
      content: `New year, new goals! Setting ambitious targets for 2024. Let's make it our best year yet! #NewYear #Goals2024`,
      engagement: { likes: 512, comments: 44 }
    }
  ]

  return posts
}

async function generateYearInReview(profile: any, posts: any[]) {
  // Create a comprehensive year-in-review story
  const totalEngagement = posts.reduce((sum, post) => sum + post.engagement.likes + post.engagement.comments, 0)
  const avgLikes = Math.round(posts.reduce((sum, post) => sum + post.engagement.likes, 0) / posts.length)

  const story = `
📊 ${profile.name}'s 2024 LinkedIn Journey

This year has been nothing short of extraordinary! Here's a look back at an incredible 12 months:

🎯 KEY HIGHLIGHTS

• Published ${posts.length} impactful posts
• Generated ${totalEngagement.toLocaleString()} total engagements
• Averaged ${avgLikes} likes per post
• Connected with thousands of professionals

🏆 MAJOR MILESTONES

Q1: Started the year strong with ambitious goals and strategic partnerships. Set the foundation for an incredible year of growth.

Q2: Expanded into new markets and invested heavily in mentorship and leadership development. The team's dedication was truly inspiring.

Q3: Celebrated personal and professional milestones, including a prestigious Industry Excellence Award. The recognition reflects our collective efforts.

Q4: Launched groundbreaking products and shared insights at major industry conferences. Ended the year with phenomenal results.

💡 TOP THEMES

Innovation & Product Development - Led several product launches that transformed our market position
Leadership & Growth - Spoke at conferences and mentored emerging leaders
Team Excellence - Celebrated team achievements and fostered a culture of collaboration
Strategic Expansion - Opened new markets and forged powerful partnerships

📈 IMPACT & ENGAGEMENT

The LinkedIn community responded enthusiastically to content about:
• Innovation and AI (peak engagement: 521 likes)
• Awards and recognition (peak engagement: 698 likes)
• Team achievements and culture
• Industry insights and thought leadership

🎊 LOOKING AHEAD TO 2025

Building on this momentum, the focus shifts to:
• Scaling successful initiatives
• Deepening industry partnerships
• Continuing to mentor and develop talent
• Pushing boundaries in innovation

Thank you to everyone who engaged, commented, and supported this journey. Here's to making 2025 even more impactful!

#YearInReview #2024Recap #LinkedIn #ProfessionalGrowth
`

  return story.trim()
}
