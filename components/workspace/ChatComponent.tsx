'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Input } from '@/components/Input';
import type { User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { sendMessageAction } from '@/app/projects/[projectId]/actions';
import { SubmitButton } from '../SubmitButton';

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
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`*, profiles (full_name, avatar_url, role)`)
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (error) {
        toast.error("Erreur", { description: "Impossible de charger les messages." });
      } else {
        setMessages(data as Message[]);
      }
    };
    fetchMessages();
  }, [projectId, supabase]);

  useEffect(() => {
    const channel = supabase
      .channel(`project-messages-${projectId}`)
      .on<Message>(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `project_id=eq.${projectId}` },
        async (payload) => {
          const { data: profile } = await supabase.from('profiles').select('full_name, avatar_url, role').eq('id', payload.new.sender_id).single();
          const fullMessage = {...payload.new, profiles: profile} as Message;
          setMessages((currentMessages) => [...currentMessages, fullMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, supabase]);

  const handleFormAction = async (formData: FormData) => {
    const content = formData.get('content') as string;
    if (!content?.trim()) return;

    formRef.current?.reset();

    const result = await sendMessageAction(formData);

    if (result?.error) {
      toast.error("Erreur d'envoi", { description: result.error });
    }
    // Pas de toast de succès car l'UI se met à jour en temps réel.
  };

  return (
    <div className="flex flex-col h-[40rem] rounded-lg bg-deep-space-blue/30 border border-slate-dark/20 p-4">
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

      <div className="mt-4 border-t border-slate-dark/20 pt-4">
        <form ref={formRef} action={handleFormAction} className="flex items-center gap-2">
          <input type="hidden" name="projectId" value={projectId} />
          <Input
            name="content"
            type="text"
            placeholder="Écrivez votre message..."
            className="flex-grow"
            autoComplete="off"
          />
          <SubmitButton loadingText="Envoi...">Envoyer</SubmitButton>
        </form>
      </div>
    </div>
  );
}
