'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import type { User } from '@supabase/supabase-js';

// Définition des types pour les messages et profils
interface Message {
  id: number;
  created_at: string;
  content: string;
  sender_id: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
    role: string | null;
  } | null;
}

export default function ChatComponent({ projectId, user }: { projectId: number, user: User | null }) {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Fonction pour faire défiler vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Faire défiler vers le bas quand les messages changent
    scrollToBottom();
  }, [messages]);

  // Récupération initiale des messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`*, profiles (full_name, avatar_url, role)`)
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Erreur de chargement des messages:', error);
      } else {
        setMessages(data as Message[]);
      }
    };

    fetchMessages();
  }, [projectId, supabase]);

  // Abonnement en temps réel aux nouveaux messages
  useEffect(() => {
    const channel = supabase
      .channel(`project-messages-${projectId}`)
      .on<Message>(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `project_id=eq.${projectId}` },
        async (payload) => {
          // Nous devons récupérer le profil car il n'est pas dans le payload
          const { data: profile } = await supabase.from('profiles').select('full_name, avatar_url, role').eq('id', payload.new.sender_id).single();
          const fullMessage = {...payload.new, profiles: profile} as Message;
          setMessages((currentMessages) => [...currentMessages, fullMessage]);
        }
      )
      .subscribe();

    // Nettoyer l'abonnement quand le composant est démonté
    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, supabase]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const content = newMessage.trim();
    setNewMessage('');

    const { error } = await supabase
      .from('messages')
      .insert({ content, project_id: projectId, sender_id: user.id });

    if (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  return (
    <div className="flex flex-col h-[40rem] rounded-lg bg-deep-space-blue/30 border border-slate-dark/20 p-4">
      {/* Zone d'affichage des messages */}
      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.sender_id === user?.id;
          const senderName = message.profiles?.full_name || 'Utilisateur';
          const senderRole = message.profiles?.role === 'admin' ? 'Admin' : 'Client';

          return (
            <div key={message.id} className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md rounded-lg px-4 py-2 ${isCurrentUser ? 'bg-kinetic-cyan text-deep-space-blue' : 'bg-slate-dark/30 text-slate-light'}`}>
                <p className="text-xs font-bold mb-1">{senderName} <span className="font-normal opacity-70">({senderRole})</span></p>
                <p className="text-sm">{message.content}</p>
                <p className="text-right text-xs opacity-50 mt-1">{new Date(message.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulaire d'envoi de message */}
      <div className="mt-4 border-t border-slate-dark/20 pt-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-grow"
            autoComplete="off"
          />
          <Button type="submit" disabled={!newMessage.trim()}>Envoyer</Button>
        </form>
      </div>
    </div>
  );
}
