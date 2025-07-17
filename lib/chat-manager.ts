interface ChatSession {
  id: string
  name: string
  timestamp: Date
  messages: any[]
  agent?: string
}

class ChatManager {
  private sessions: Map<string, ChatSession> = new Map()
  private static instance: ChatManager | null = null
  private listeners: Set<() => void> = new Set()

  static getInstance(): ChatManager {
    console.log('ChatManager.getInstance() called')
    if (!ChatManager.instance) {
      console.log('Creating new ChatManager instance')
      ChatManager.instance = new ChatManager()
    }
    return ChatManager.instance
  }

  addListener(listener: () => void): () => void {
    console.log('ChatManager.addListener() called, current listeners count:', this.listeners.size)
    this.listeners.add(listener)
    console.log('Listener added, new count:', this.listeners.size)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners(): void {
    console.log('ChatManager.notifyListeners() called, notifying', this.listeners.size, 'listeners')
    this.listeners.forEach(listener => listener())
  }

  createNewSession(agent?: string): string {
    console.log('ChatManager.createNewSession() called with agent:', agent)
    const sessionId = crypto.randomUUID()
    console.log('Generated new session ID:', sessionId)
    const now = new Date()
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const session: ChatSession = {
      id: sessionId,
      name: `Chat ${timeString}`,
      timestamp: now,
      messages: [],
      agent
    }
    
    this.sessions.set(sessionId, session)
    console.log('Session created and stored. Total sessions:', this.sessions.size)
    this.notifyListeners()
    return sessionId
  }

  getSession(sessionId: string): ChatSession | undefined {
    console.log('ChatManager.getSession() called with sessionId:', sessionId)
    const session = this.sessions.get(sessionId)
    console.log('Session found:', !!session)
    return session
  }

  updateSessionMessages(sessionId: string, messages: any[]): void {
    console.log('ChatManager.updateSessionMessages() called with sessionId:', sessionId, 'messages count:', messages.length)
    const session = this.sessions.get(sessionId)
    if (session) {
      session.messages = messages
      session.timestamp = new Date()
      console.log('Session messages updated, new timestamp:', session.timestamp)
      this.notifyListeners()
    } else {
      console.warn('Session not found for updateSessionMessages:', sessionId)
    }
  }

  updateSessionAgent(sessionId: string, agent: string): void {
    console.log('ChatManager.updateSessionAgent() called with sessionId:', sessionId, 'agent:', agent)
    const session = this.sessions.get(sessionId)
    if (session) {
      session.agent = agent
      console.log('Session agent updated')
      this.notifyListeners()
    } else {
      console.warn('Session not found for updateSessionAgent:', sessionId)
    }
  }

  updateSessionName(sessionId: string, name: string): void {
    console.log('ChatManager.updateSessionName() called with sessionId:', sessionId, 'name:', name)
    const session = this.sessions.get(sessionId)
    if (session) {
      session.name = name
      console.log('Session name updated')
      this.notifyListeners()
    } else {
      console.warn('Session not found for updateSessionName:', sessionId)
    }
  }

  getAllSessions(): ChatSession[] {
    console.log('ChatManager.getAllSessions() called, total sessions:', this.sessions.size)
    const sessions = Array.from(this.sessions.values()).sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    )
    console.log('Returning sorted sessions:', sessions.length)
    return sessions
  }

  deleteSession(sessionId: string): void {
    console.log('ChatManager.deleteSession() called with sessionId:', sessionId)
    const existed = this.sessions.has(sessionId)
    this.sessions.delete(sessionId)
    console.log('Session deleted, existed:', existed, 'remaining sessions:', this.sessions.size)
    this.notifyListeners()
  }

  getSessionsByAgent(agent: string): ChatSession[] {
    console.log('ChatManager.getSessionsByAgent() called with agent:', agent)
    const sessions = this.getAllSessions().filter(session => session.agent === agent)
    console.log('Found sessions for agent:', sessions.length)
    return sessions
  }
}

export const chatManager = ChatManager.getInstance()
export type { ChatSession }
