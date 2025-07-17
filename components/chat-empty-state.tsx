"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Mic, Sparkles, Bot } from "lucide-react"

interface ChatEmptyStateProps {
  onInputChange: (value: string) => void
  onSendMessage: (e: React.FormEvent) => void
  selectedAgent?: string
  onAgentSelect: (agent: string) => void
}

const agents = [
  { id: "auto", name: "Auto-select Agent", color: "bg-slate-500" },
  { id: "ui-agent", name: "UI Agent", color: "bg-blue-500" },
  { id: "seo-agent", name: "SEO Agent", color: "bg-green-500" },
  { id: "performance-marketing-agent", name: "Performance Marketing Agent", color: "bg-purple-500" },
  { id: "campaign-agent", name: "Campaign Agent", color: "bg-orange-500" },
  { id: "merchandising-agent", name: "Merchandising Agent", color: "bg-pink-500" },
]

export function ChatEmptyState({
  onInputChange,
  onSendMessage,
  selectedAgent = "auto",
  onAgentSelect,
}: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-between h-full">
      {/* Header with Agent Selection */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl font-medium text-slate-800">What's on the agenda today?</h1>

        {/* Optional Agent Selection */}
        <div className="flex items-center space-x-3">
          <Bot className="w-5 h-5 text-slate-500" />
          <Select value={selectedAgent} onValueChange={onAgentSelect}>
            <SelectTrigger className="w-64 bg-white/80 border-slate-200/50">
              <SelectValue placeholder="Choose an agent (optional)" />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${agent.color}`} />
                    <span>{agent.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Proactive Job Suggestions */}
      <div className="w-full max-w-3xl mb-8 space-y-4">
        <h2 className="text-sm font-medium text-slate-500 mb-3">Suggested tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="p-4 border border-slate-200/50 hover:border-blue-200/50 hover:bg-blue-50/30 transition-colors cursor-pointer group">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-700 group-hover:text-slate-900">Analyze last week's campaign</h3>
                <p className="text-sm text-slate-500 mt-1">Performance Marketing Agent can provide insights</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border border-slate-200/50 hover:border-green-200/50 hover:bg-green-50/30 transition-colors cursor-pointer group">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Sparkles className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-700 group-hover:text-slate-900">Optimize product descriptions</h3>
                <p className="text-sm text-slate-500 mt-1">SEO Agent can help improve search rankings</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border border-slate-200/50 hover:border-purple-200/50 hover:bg-purple-50/30 transition-colors cursor-pointer group">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-700 group-hover:text-slate-900">Design new landing page</h3>
                <p className="text-sm text-slate-500 mt-1">UI Agent can create wireframes and mockups</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border border-slate-200/50 hover:border-orange-200/50 hover:bg-orange-50/30 transition-colors cursor-pointer group">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-700 group-hover:text-slate-900">Plan Q3 marketing strategy</h3>
                <p className="text-sm text-slate-500 mt-1">Campaign Agent can develop a comprehensive plan</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full max-w-3xl mb-8">
        <div className="relative">
          <Input
            placeholder="Ask anything"
            className="h-14 px-12 py-6 pr-16 bg-white border border-slate-200 rounded-full shadow-sm focus:shadow-md transition-shadow text-base"
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSendMessage(e)}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-700">
              <Mic className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-700">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
