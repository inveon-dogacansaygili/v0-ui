"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Bot,
  ChevronDown,
  ChevronRight,
  Eye,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatEmptyState } from "@/components/chat-empty-state"
import { useAgent } from "agents/react";
import { useAgentChat } from "agents/ai-react";
import { chatManager } from "@/lib/chat-manager"

interface SystemAction {
  type: "success" | "error" | "info"
  title: string
  description: string
  steps?: string[]
  canUndo?: boolean
}

interface NextAction {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  estimatedTime: string
  agent: string
}

interface Message {
  id: string
  type: "user" | "agent" | "system"
  content: string
  timestamp: string
  agent?: string
  systemAction?: SystemAction
  nextActions?: NextAction[]
}

interface ChatInterfaceProps {
  activeAgent: string
  chatId: string
  onAgentChange: (agent: string) => void
  onChatIdChange?: (chatId: string) => void
}

const agentColors = {
  "UI Agent": "bg-blue-500",
  "SEO Agent": "bg-green-500",
  "Performance Marketing Agent": "bg-purple-500",
  "Campaign Agent": "bg-orange-500",
  "Merchandising Agent": "bg-pink-500",
}

const agentMapping = {
  auto: "UI Agent",
  "ui-agent": "UI Agent",
  "seo-agent": "SEO Agent",
  "performance-marketing-agent": "Performance Marketing Agent",
  "campaign-agent": "Campaign Agent",
  "merchandising-agent": "Merchandising Agent",
}

const sampleMessages: Message[] = [
  {
    id: "1",
    type: "user",
    content: "I need help redesigning our dashboard to improve user engagement",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    type: "system",
    content: "Agent routing: Analyzing request...",
    timestamp: "10:30 AM",
    systemAction: {
      type: "info",
      title: "Agent Selection Process",
      description: "Routing to UI Agent based on design-related keywords",
      steps: [
        "Analyzed user query for intent and domain keywords",
        "Identified 'redesigning', 'dashboard', and 'user engagement' as UI-related terms",
        "Calculated confidence scores for each available agent",
        "UI Agent scored 94% confidence based on design expertise",
        "Routed conversation to UI Agent for optimal assistance",
      ],
    },
  },
  {
    id: "3",
    type: "agent",
    content:
      "I'd be happy to help you redesign your dashboard! Let me analyze your current user engagement metrics and suggest some improvements. Based on modern UX principles, here are some key areas we should focus on:\n\n1. **Information Architecture** - Reorganizing content hierarchy\n2. **Visual Hierarchy** - Improving contrast and spacing\n3. **Interactive Elements** - Enhancing button states and micro-interactions\n4. **Data Visualization** - Making charts more intuitive\n\nWould you like me to start with a specific area, or shall I create a comprehensive audit first?",
    timestamp: "10:31 AM",
    agent: "UI Agent",
    nextActions: [
      {
        id: "na1",
        title: "Conduct UX Audit",
        description: "Perform comprehensive analysis of current dashboard usability",
        priority: "high",
        estimatedTime: "15 min",
        agent: "UI Agent",
      },
      {
        id: "na2",
        title: "Create User Journey Map",
        description: "Map out user flows and identify pain points",
        priority: "medium",
        estimatedTime: "20 min",
        agent: "UI Agent",
      },
      {
        id: "na3",
        title: "Design Wireframes",
        description: "Create low-fidelity wireframes for improved layout",
        priority: "medium",
        estimatedTime: "30 min",
        agent: "UI Agent",
      },
      {
        id: "na4",
        title: "Analyze Competitor Dashboards",
        description: "Research industry best practices and design patterns",
        priority: "low",
        estimatedTime: "25 min",
        agent: "UI Agent",
      },
    ],
  },
  {
    id: "4",
    type: "system",
    content: "Dashboard analysis completed",
    timestamp: "10:31 AM",
    systemAction: {
      type: "success",
      title: "Dashboard Analysis Complete",
      description: "Generated 15 improvement recommendations with priority scores",
      steps: [
        "Connected to analytics dashboard and retrieved user interaction data",
        "Analyzed heatmap data to identify most and least engaged areas",
        "Evaluated current information architecture and navigation patterns",
        "Assessed visual hierarchy and contrast ratios for accessibility",
        "Reviewed loading performance and identified optimization opportunities",
        "Cross-referenced findings with UX best practices and design principles",
        "Generated prioritized list of 15 actionable recommendations",
        "Created detailed improvement plan with estimated impact scores",
      ],
      canUndo: false,
    },
  },
]

export function ChatInterface({ activeAgent, chatId, onAgentChange, onChatIdChange }: ChatInterfaceProps) {
  // Get or create session - only create if chatId is "new" or empty
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    if (chatId === "new" || !chatId) {
      // Don't create session here, wait for useEffect
      return ""
    }
    return chatId
  })

  const agent = useAgent({
    agent: "zero-agent",
    name: currentSessionId ? "session-" + currentSessionId : undefined,
    host: "http://localhost:8787",
  });

  const {
    messages: agentMessages,
    input: agentInput,
    handleInputChange: handleAgentInputChange,
    handleSubmit: handleAgentSubmit,
    addToolResult,
    clearHistory,
    isLoading,
    stop,
  } = useAgentChat({
    agent,
    maxSteps: 5,
  });

  const [isTyping, setIsTyping] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<string>("auto")
  const [expandedSystemActions, setExpandedSystemActions] = useState<string[]>([])
  const [expandedNextActions, setExpandedNextActions] = useState<string[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isNewChat, setIsNewChat] = useState(chatId === "new" || !chatId)

  // Convert agent messages to UI messages format
  const formatAgentMessagesForUI = (messages: typeof agentMessages): Message[] => {
    return messages.map((msg, index) => {
      let content = "";
      if (typeof msg.content === "string") {
        content = msg.content;
      } else if (Array.isArray(msg.content)) {
        content = (msg.content as any[]).map((c: any) => c.type === "text" ? c.text : "").join("");
      } else {
        content = String(msg.content);
      }
      
      return {
        id: index.toString(),
        type: msg.role === "user" ? "user" : "agent",
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        agent: msg.role === "assistant" ? activeAgent : undefined,
      };
    })
  }

  // Get messages to display - prioritize agent messages for active conversations
  const displayMessages: Message[] = isNewChat 
    ? [] // Empty array for new chats 
    : (() => {
        // For active conversations with agent messages, prioritize those
        if (agentMessages.length > 0) {
          console.log("Using agent messages for display, count:", agentMessages.length)
          return formatAgentMessagesForUI(agentMessages)
        }
        
        // For existing sessions without active agent messages, load from ChatManager
        if (currentSessionId && !isNewChat) {
          const session = chatManager.getSession(currentSessionId)
          if (session && session.messages.length > 0) {
            console.log("Loading messages from ChatManager for session:", currentSessionId, "count:", session.messages.length)
            return formatAgentMessagesForUI(session.messages)
          }
        }
        
        // Final fallback to sample messages
        return sampleMessages
      })()

  const toggleSystemActionDetails = (messageId: string) => {
    setExpandedSystemActions((prev) =>
      prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId],
    )
  }

  const toggleNextActions = (messageId: string) => {
    setExpandedNextActions((prev) =>
      prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId],
    )
  }

  const executeNextAction = (actionId: string, actionTitle: string) => {
    console.log(`Executing action: ${actionTitle}`)
    // In a real app, this would trigger the action execution
  }

  const handleSendMessage = (e: React.FormEvent) => {
    if (!agentInput.trim()) return
    
    e.preventDefault();

    // If this is a new chat, set isNewChat to false and update agent
    if (isNewChat) {
      setIsNewChat(false)
      // Set the active agent based on selection
      if (selectedAgent !== "auto") {
        const mappedAgent = agentMapping[selectedAgent as keyof typeof agentMapping]
        if (mappedAgent) {
          onAgentChange(mappedAgent)
          chatManager.updateSessionAgent(currentSessionId, mappedAgent)
        }
      }
    }
    
    handleAgentSubmit(e as React.FormEvent<HTMLFormElement>);
  }

  const handleInputChangeWrapper = (value: string) => {
    handleAgentInputChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      // debugger;
      handleSendMessage(e)
    }
  }

  const handleAgentSelect = (agent: string) => {
    setSelectedAgent(agent)
    if (agent !== "auto") {
      const mappedAgent = agentMapping[agent as keyof typeof agentMapping]
      if (mappedAgent) {
        onAgentChange(mappedAgent)
      }
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [displayMessages])

  // Reset to new chat state when chatId changes to "new"
  useEffect(() => {
    if (chatId === "new" || !chatId) {
      // Create a new session immediately when starting a new chat
      const newSessionId = chatManager.createNewSession()
      console.log("Creating new session for new chat:", newSessionId)
      setCurrentSessionId(newSessionId)
      onChatIdChange?.(newSessionId)
      setIsNewChat(true)
      setSelectedAgent("auto")
      clearHistory()
    } else if (chatId !== currentSessionId) {
      // Switching to an existing chat
      console.log("Switching to existing chat:", chatId, "from:", currentSessionId)
      
      // Only clear history if we're actually switching to a different session
      if (currentSessionId && chatId !== currentSessionId) {
        clearHistory()
      }
      
      setCurrentSessionId(chatId)
      setIsNewChat(false)
      
      // Load existing session messages if available - messages will be loaded via displayMessages logic
      const session = chatManager.getSession(chatId)
      if (session && session.messages.length > 0) {
        console.log("Found existing session with", session.messages.length, "messages - they will be displayed from ChatManager")
      } else {
        console.log("No stored messages found for session:", chatId)
      }
    }
  }, [chatId, clearHistory, onChatIdChange, currentSessionId])

  // Force agent reconnection when session changes
  useEffect(() => {
    if (currentSessionId && !isNewChat) {
      console.log("Session changed, current agent messages:", agentMessages.length)
      
      // Check if we need to manually restore messages from ChatManager
      const session = chatManager.getSession(currentSessionId)
      if (session && session.messages.length > 0 && agentMessages.length === 0) {
        console.log("Session has stored messages but agent messages is empty. Session messages:", session.messages.length)
        // Try to manually restore messages by populating the agent chat
        // This might require a different approach since useAgentChat doesn't have a direct way to set messages
      }
    }
  }, [currentSessionId, isNewChat, agentMessages.length])

  // Update session messages when agentMessages change
  useEffect(() => {
    if (agentMessages.length > 0 && currentSessionId) {
      console.log("Updating session messages for session:", currentSessionId, "messages:", agentMessages.length)
      chatManager.updateSessionMessages(currentSessionId, agentMessages)
      
      // Only update session name if this is a new chat (isNewChat is false means we just sent the first message)
      // and we're not loading (to prevent updates during streaming)
      // and the session doesn't already have a custom name
      if (!isLoading && !isNewChat) {
        const session = chatManager.getSession(currentSessionId)
        const firstUserMessage = agentMessages.find(msg => msg.role === "user")
        
        // Only update if session exists, has default name, and we have a user message
        if (session && firstUserMessage && typeof firstUserMessage.content === "string" && 
            session.name.startsWith("Chat ")) {
          const sessionName = firstUserMessage.content.slice(0, 50) + (firstUserMessage.content.length > 50 ? "..." : "")
          console.log("Updating session name from", session.name, "to:", sessionName)
          chatManager.updateSessionName(currentSessionId, sessionName)
        }
      }
    }
  }, [agentMessages, currentSessionId, isLoading, isNewChat])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-slate-600 bg-slate-50 border-slate-200"
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-white/50 to-slate-50/30">
      {/* Active Agent Header - Only show when not in empty state */}
      {!isNewChat && (
        <div className="p-6 border-b border-slate-200/50 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className={cn("w-3 h-3 rounded-full", agentColors[activeAgent as keyof typeof agentColors])} />
            <span className="text-sm text-slate-600">You're chatting with:</span>
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-medium">
              {activeAgent}
            </Badge>
          </div>
        </div>
      )}

      {/* Conditional Rendering based on isNewChat */}
      {isNewChat ? (
        <ChatEmptyState
          onInputChange={handleInputChangeWrapper}
          onSendMessage={(e) => {handleSendMessage(e)}}
          selectedAgent={selectedAgent}
          onAgentSelect={handleAgentSelect}
        />
      ) : (
        <>
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6 max-w-4xl mx-auto">
              {displayMessages.map((message) => (
                <div key={message.id} className="space-y-4">
                  {message.type === "user" && (
                    <div className="flex justify-end">
                      <div className="flex items-start space-x-3 max-w-2xl">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl rounded-tr-md shadow-lg">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-slate-200 text-slate-600">
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  )}

                  {message.type === "agent" && (
                    <>
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-3 max-w-2xl">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback
                              className={cn("text-white", agentColors[message.agent as keyof typeof agentColors])}
                            >
                              <Bot className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-white p-4 rounded-2xl rounded-tl-md shadow-lg border border-slate-200/50">
                            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Next Best Actions */}
                      {message.nextActions && message.nextActions.length > 0 && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-3 max-w-3xl">
                            <div className="w-8 h-8 flex items-center justify-center">
                              <div className="w-0.5 h-8 bg-slate-200"></div>
                            </div>
                            <Card className="flex-1 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-blue-200/50">
                              <CardContent className="p-4">
                                <Collapsible
                                  open={expandedNextActions.includes(message.id)}
                                  onOpenChange={() => toggleNextActions(message.id)}
                                >
                                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                                    <div className="flex items-center space-x-2">
                                      <Lightbulb className="w-4 h-4 text-blue-600" />
                                      <h4 className="font-medium text-slate-800">Next Best Actions</h4>
                                      <Badge variant="secondary" className="text-xs">
                                        {message.nextActions.length}
                                      </Badge>
                                    </div>
                                    {expandedNextActions.includes(message.id) ? (
                                      <ChevronDown className="w-4 h-4 text-slate-500" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4 text-slate-500" />
                                    )}
                                  </CollapsibleTrigger>

                                  <CollapsibleContent className="mt-3">
                                    <div className="space-y-2">
                                      {message.nextActions.map((action) => (
                                        <div
                                          key={action.id}
                                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200/50 hover:border-blue-300/50 transition-colors group"
                                        >
                                          <div className="flex items-start space-x-3 flex-1">
                                            <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5" />
                                            <div className="flex-1">
                                              <div className="flex items-center space-x-2 mb-1">
                                                <h5 className="font-medium text-slate-800 text-sm">{action.title}</h5>
                                                <Badge
                                                  variant="outline"
                                                  className={`text-xs ${getPriorityColor(action.priority)}`}
                                                >
                                                  {action.priority}
                                                </Badge>
                                              </div>
                                              <p className="text-xs text-slate-600 mb-1">{action.description}</p>
                                              <div className="flex items-center space-x-3 text-xs text-slate-500">
                                                <span className="flex items-center">
                                                  <Clock className="w-3 h-3 mr-1" />
                                                  {action.estimatedTime}
                                                </span>
                                                <span className="flex items-center">
                                                  <Bot className="w-3 h-3 mr-1" />
                                                  {action.agent}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => executeNextAction(action.id, action.title)}
                                            className="h-8 px-3 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity"
                                          >
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            Execute
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {message.type === "system" && message.systemAction && (
                    <div className="flex justify-center">
                      <Card className="max-w-2xl bg-slate-50/50 border-slate-200/50">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            {message.systemAction.type === "success" && (
                              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                            )}
                            {message.systemAction.type === "error" && (
                              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                            )}
                            {message.systemAction.type === "info" && <Clock className="w-5 h-5 text-blue-500 mt-0.5" />}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-medium text-slate-700">{message.systemAction.title}</h4>
                                {message.systemAction.steps && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleSystemActionDetails(message.id)}
                                    className="h-6 px-2 text-xs text-slate-600 hover:text-slate-900"
                                  >
                                    <Eye className="w-3 h-3 mr-1" />
                                    Details
                                    {expandedSystemActions.includes(message.id) ? (
                                      <ChevronDown className="w-3 h-3 ml-1" />
                                    ) : (
                                      <ChevronRight className="w-3 h-3 ml-1" />
                                    )}
                                  </Button>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mb-2">{message.systemAction.description}</p>

                              {/* Detailed Steps */}
                              {message.systemAction.steps && (
                                <Collapsible open={expandedSystemActions.includes(message.id)}>
                                  <CollapsibleContent className="mt-3">
                                    <div className="bg-white rounded-lg p-3 border border-slate-200/50">
                                      <h5 className="font-medium text-slate-700 mb-2 text-xs flex items-center">
                                        <Eye className="w-3 h-3 mr-1" />
                                        Processing Steps
                                      </h5>
                                      <div className="space-y-2">
                                        {message.systemAction.steps.map((step, stepIndex) => (
                                          <div key={stepIndex} className="flex items-start space-x-2">
                                            <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                              <span className="text-xs font-medium text-blue-600">{stepIndex + 1}</span>
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed">{step}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <span className="text-xs text-slate-400">{message.timestamp}</span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback
                        className={cn("text-white", agentColors[activeAgent as keyof typeof agentColors])}
                      >
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-md shadow-lg border border-slate-200/50">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-6 border-t border-slate-200/50 bg-white/70 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-4">
                <div className="flex-1 relative">
                  <Input
                    value={agentInput}
                    onChange={handleAgentInputChange}
                    onKeyPress={(e) => {handleKeyPress(e)}}
                    placeholder="Type your message..."
                    className="min-h-[48px] pr-12 bg-white border-slate-200/50 rounded-xl shadow-sm focus:shadow-md transition-shadow resize-none"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={(e) => {handleSendMessage(e)}}
                    disabled={!agentInput.trim() || isLoading}
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
