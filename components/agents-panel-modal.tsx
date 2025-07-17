"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, TrendingUp, Megaphone, Package, Search, Zap, Users, CheckCircle2, Info } from "lucide-react"

interface AgentsPanelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const agents = [
  {
    id: "ui-agent",
    name: "UI Agent",
    icon: Palette,
    description: "Design systems, user interfaces, and user experience optimization",
    tag: "Design & UX",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    isSubscribed: true,
    capabilities: [
      "Wireframe and mockup creation",
      "Design system development",
      "User experience audits",
      "Accessibility compliance",
    ],
  },
  {
    id: "performance-marketing-agent",
    name: "Performance Marketing Agent",
    icon: TrendingUp,
    description: "Campaign optimization, ROI analysis, and conversion tracking",
    tag: "Marketing Analytics",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    isSubscribed: false,
    capabilities: [
      "Campaign performance analysis",
      "A/B testing and optimization",
      "ROI and ROAS tracking",
      "Audience segmentation",
    ],
  },
  {
    id: "campaign-agent",
    name: "Campaign Agent",
    icon: Megaphone,
    description: "Multi-channel campaign management and audience targeting",
    tag: "Campaign Management",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    isSubscribed: true,
    capabilities: [
      "Multi-channel campaign setup",
      "Audience targeting and personas",
      "Content calendar planning",
      "Campaign performance monitoring",
    ],
  },
  {
    id: "merchandising-agent",
    name: "Merchandising Agent",
    icon: Package,
    description: "Product catalog optimization and inventory management",
    tag: "E-commerce",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
    isSubscribed: false,
    capabilities: [
      "Product catalog optimization",
      "Inventory management",
      "Pricing strategy analysis",
      "Product recommendation engines",
    ],
  },
  {
    id: "seo-agent",
    name: "SEO Agent",
    icon: Search,
    description: "Search optimization, content analysis, and ranking improvements",
    tag: "SEO & Content",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    isSubscribed: true,
    capabilities: [
      "Technical SEO audits",
      "Keyword research and analysis",
      "Content optimization",
      "Backlink analysis and strategy",
    ],
  },
]

export function AgentsPanelModal({ open, onOpenChange }: AgentsPanelModalProps) {
  const handleViewDetails = (agentId: string, agentName: string) => {
    console.log(`Viewing details for ${agentName}`)
    // In a real app, this would open a detailed agent information modal
  }

  const handleBuyNow = (agentId: string, agentName: string) => {
    console.log(`Purchasing ${agentName}`)
    // In a real app, this would open the purchase flow
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl bg-white/95 backdrop-blur-xl border-slate-200/50 shadow-2xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-slate-800">
            <Users className="w-5 h-5" />
            <span>Available Agents</span>
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[70vh] pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className="group hover:shadow-lg transition-all duration-200 border-slate-200/50 hover:border-slate-300/50 relative"
              >
                <CardContent className="p-6">
                  {/* Subscription Status Badge */}
                  {agent.isSubscribed && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-100 text-green-700 border-green-200 font-medium">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Subscribed
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-start space-x-4">
                    {/* Agent Icon */}
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${agent.color} shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      <agent.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Agent Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                          {agent.name}
                        </h3>
                        <Zap className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                      </div>

                      <p className="text-sm text-slate-600 mb-3 leading-relaxed">{agent.description}</p>

                      <Badge className={`${agent.bgColor} ${agent.textColor} border-0 font-medium mb-4`}>
                        {agent.tag}
                      </Badge>

                      {/* Capabilities List */}
                      <div className="mb-4">
                        <h4 className="text-xs font-medium text-slate-700 mb-2">Key Capabilities:</h4>
                        <ul className="space-y-1">
                          {agent.capabilities.map((capability, index) => (
                            <li key={index} className="text-xs text-slate-600 flex items-start">
                              <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        {agent.isSubscribed ? (
                          // Subscribed Agent - Only View Details button
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(agent.id, agent.name)}
                            className="flex-1 h-8 text-xs border-slate-300 text-slate-700 hover:bg-slate-50"
                          >
                            <Info className="w-3 h-3 mr-1" />
                            View Details
                          </Button>
                        ) : (
                          // Non-subscribed Agent - View Details + Buy Now buttons
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(agent.id, agent.name)}
                              className="h-8 text-xs border-slate-300 text-slate-700 hover:bg-slate-50"
                            >
                              <Info className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleBuyNow(agent.id, agent.name)}
                              className="h-8 text-xs bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-sm hover:shadow-md transition-all"
                            >
                              Buy Now
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50/50 rounded-lg border border-slate-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-slate-500" />
              <p className="text-sm text-slate-600">
                Agents are automatically selected based on your query context. No manual selection required.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Subscribed</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                <span>Available for purchase</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
