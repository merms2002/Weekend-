import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { conversations } from '@/data/adminData';
import type { Message, Conversation } from '@/types';

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `new-${Date.now()}`,
      senderId: 'admin',
      senderName: 'Admin',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      receiverId: selectedConversation.participantId,
      content: messageInput,
      timestamp: new Date().toISOString(),
      read: false,
    };

    // In a real app, this would update the backend
    selectedConversation.messages.push(newMessage);
    selectedConversation.lastMessage = messageInput;
    selectedConversation.lastMessageTime = new Date().toISOString();
    setMessageInput('');
  };

  return (
    <div className="h-[calc(100vh-140px)] glass-card overflow-hidden">
      <div className="flex h-full">
        {/* Conversations Sidebar */}
        <AnimatePresence mode="wait">
          {(!isMobileView || !selectedConversation) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={cn(
                "w-full md:w-80 border-r border-white/10 flex flex-col",
                isMobileView && selectedConversation && "hidden"
              )}
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-full h-10 pl-10 pr-4 rounded-xl",
                      "bg-white/5 border border-white/10",
                      "text-white placeholder:text-white/40 text-sm",
                      "focus:outline-none focus:border-primary/50",
                      "transition-all duration-300"
                    )}
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation, index) => (
                  <motion.button
                    key={conversation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedConversation(conversation);
                      setIsMobileView(true);
                    }}
                    className={cn(
                      "w-full p-4 flex items-center gap-3 text-left",
                      "border-b border-white/5 hover:bg-white/5",
                      "transition-all duration-300",
                      selectedConversation?.id === conversation.id && "bg-white/10"
                    )}
                  >
                    <div className="relative">
                      <img
                        src={conversation.participantAvatar}
                        alt={conversation.participantName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-medium">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={cn(
                          "font-medium truncate",
                          conversation.unreadCount > 0 ? "text-white" : "text-white/80"
                        )}>
                          {conversation.participantName}
                        </p>
                        <span className="text-xs text-white/40">
                          {new Date(conversation.lastMessageTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className={cn(
                        "text-sm truncate",
                        conversation.unreadCount > 0 ? "text-white/70" : "text-white/50"
                      )}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <AnimatePresence mode="wait">
          {selectedConversation && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={cn(
                "flex-1 flex flex-col",
                isMobileView && !selectedConversation && "hidden"
              )}
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isMobileView && (
                    <button
                      onClick={() => {
                        setSelectedConversation(null);
                        setIsMobileView(false);
                      }}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 text-white/60" />
                    </button>
                  )}
                  <img
                    src={selectedConversation.participantAvatar}
                    alt={selectedConversation.participantName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">{selectedConversation.participantName}</p>
                    <p className="text-xs text-green-400">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Phone className="w-4 h-4 text-white/60" />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Video className="w-4 h-4 text-white/60" />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <MoreVertical className="w-4 h-4 text-white/60" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map((message, index) => {
                  const isAdmin = message.senderId === 'admin';
                  const showAvatar = index === 0 || 
                    selectedConversation.messages[index - 1].senderId !== message.senderId;

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={cn(
                        "flex gap-3",
                        isAdmin ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      {showAvatar ? (
                        <img
                          src={message.senderAvatar}
                          alt={message.senderName}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 flex-shrink-0" />
                      )}
                      <div className={cn(
                        "max-w-[70%]",
                        isAdmin ? "items-end" : "items-start"
                      )}>
                        <div className={cn(
                          "px-4 py-2.5 rounded-2xl",
                          isAdmin 
                            ? "bg-primary text-white rounded-br-md" 
                            : "bg-white/10 text-white rounded-bl-md"
                        )}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className={cn(
                          "flex items-center gap-1 mt-1",
                          isAdmin ? "justify-end" : "justify-start"
                        )}>
                          <span className="text-xs text-white/40">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {isAdmin && (
                            message.read ? (
                              <CheckCheck className="w-3 h-3 text-primary" />
                            ) : (
                              <Check className="w-3 h-3 text-white/40" />
                            )
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Paperclip className="w-5 h-5 text-white/60" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className={cn(
                        "w-full h-12 pl-4 pr-12 rounded-xl",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder:text-white/40",
                        "focus:outline-none focus:border-primary/50",
                        "transition-all duration-300"
                      )}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                      <Smile className="w-5 h-5 text-white/60" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      "gradient-primary text-white",
                      "hover:opacity-90 transition-opacity",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!selectedConversation && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4"
            >
              <Send className="w-8 h-8 text-white/30" />
            </motion.div>
            <h3 className="text-lg font-semibold text-white mb-2">Select a conversation</h3>
            <p className="text-white/50 max-w-xs">
              Choose a conversation from the sidebar to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
