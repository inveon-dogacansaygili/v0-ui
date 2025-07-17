"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, FileText, Users, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  onActionLogsClick: () => void
  onAgentsPanelClick: () => void
  currentChatId: string
  onChatSelect: (chatId: string) => void
  onNewChat: () => void
}

const agents = [
  {
    id: "ui-agent",
    name: "UI Agent",
    color: "bg-blue-500",
    conversations: [
      { id: "chat-1", title: "Dashboard redesign concepts", timestamp: "2 hours ago", type: "A" },
      { id: "chat-2", title: "Component library updates", timestamp: "1 day ago", type: "P" },
    ],
  },
  {
    id: "seo-agent",
    name: "SEO Agent",
    color: "bg-green-500",
    conversations: [
      { id: "chat-3", title: "Keyword optimization strategy", timestamp: "3 hours ago", type: "A" },
      { id: "chat-4", title: "Content audit results", timestamp: "2 days ago", type: "P" },
    ],
  },
  {
    id: "marketing-agent",
    name: "Performance Marketing Agent",
    color: "bg-purple-500",
    conversations: [{ id: "chat-5", title: "Campaign performance analysis", timestamp: "5 hours ago", type: "A" }],
  },
  {
    id: "campaign-agent",
    name: "Campaign Agent",
    color: "bg-orange-500",
    conversations: [{ id: "chat-6", title: "Q4 campaign planning", timestamp: "1 day ago", type: "P" }],
  },
  {
    id: "merchandising-agent",
    name: "Merchandising Agent",
    color: "bg-pink-500",
    conversations: [{ id: "chat-7", title: "Product catalog optimization", timestamp: "6 hours ago", type: "A" }],
  },
]

const allConversations = agents
  .flatMap((agent) => agent.conversations.map((conv) => ({ ...conv, agent: agent.name, agentColor: agent.color })))
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

export function Sidebar({
  onActionLogsClick,
  onAgentsPanelClick,
  currentChatId,
  onChatSelect,
  onNewChat,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedAgents, setExpandedAgents] = useState<string[]>(["ui-agent"])

  const toggleAgent = (agentId: string) => {
    setExpandedAgents((prev) => (prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId]))
  }

  const filteredConversations = allConversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-80 bg-white/70 backdrop-blur-xl border-r border-slate-200/50 flex flex-col shadow-xl">
      {/* New Chat Button */}
      <div className="p-4 border-b border-slate-200/50">
        <Button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl h-12 font-medium shadow-lg hover:shadow-xl transition-all duration-200 group"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
          New Chat
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-slate-200/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-50/50 border-slate-200/50 rounded-lg focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Feature Buttons */}
      <div className="p-4 border-b border-slate-200/50 space-y-2">
        <Button
          variant="ghost"
          onClick={onActionLogsClick}
          className="w-full justify-start text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg h-10"
        >
          <FileText className="w-4 h-4 mr-3" />
          Action Logs
        </Button>
        <Button
          variant="ghost"
          onClick={onAgentsPanelClick}
          className="w-full justify-start text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg h-10"
        >
          <Users className="w-4 h-4 mr-3" />
          Agents Panel
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {/* Grouped by Agent */}
        <div className="p-4 border-b border-slate-200/50">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Conversations by Agent</h3>
          <div className="space-y-2">
            {agents.map((agent) => (
              <Collapsible
                key={agent.id}
                open={expandedAgents.includes(agent.id)}
                onOpenChange={() => toggleAgent(agent.id)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-slate-100/50 transition-colors">
                  <div className="flex items-center">
                    {expandedAgents.includes(agent.id) ? (
                      <ChevronDown className="w-4 h-4 mr-2 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-2 text-slate-500" />
                    )}
                    <div className={cn("w-3 h-3 rounded-full mr-2", agent.color)} />
                    <span className="text-sm font-medium text-slate-700">{agent.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {agent.conversations.length}
                  </Badge>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-1 space-y-1">
                  {agent.conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => onChatSelect(conv.id)}
                      className={cn(
                        "w-full text-left p-2 rounded-lg transition-colors hover:bg-slate-100/50",
                        currentChatId === conv.id && "bg-blue-50 border border-blue-200",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700 truncate">{conv.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{conv.timestamp}</p>
                        </div>
                        <Badge variant={conv.type === "P" ? "default" : "secondary"} className="ml-2 text-xs">
                          {conv.type}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* All Conversations */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">All Conversations</h3>
          <div className="space-y-1">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onChatSelect(conv.id)}
                className={cn(
                  "w-full text-left p-2 rounded-lg transition-colors hover:bg-slate-100/50",
                  currentChatId === conv.id && "bg-blue-50 border border-blue-200",
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <div className={cn("w-2 h-2 rounded-full mr-2", conv.agentColor)} />
                      <p className="text-xs text-slate-500">{conv.agent}</p>
                    </div>
                    <p className="text-sm text-slate-700 truncate">{conv.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{conv.timestamp}</p>
                  </div>
                  <Badge variant={conv.type === "P" ? "default" : "secondary"} className="ml-2 text-xs">
                    {conv.type}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
