'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/Button';
import type { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Type pour les fichiers de projet
interface ProjectFile {
  id: number;
  created_at: string;
  file_name: string;
  storage_path: string;
  profiles: {
    full_name: string | null;
  } | null;
}

export default function FilesComponent({ projectId, user, userRole }: { projectId: number, user: User | null, userRole: string | null }) {
  const supabase = createClient();
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // Récupération initiale des fichiers
  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase
        .from('project_files')
        .select(`*, profiles (full_name)`)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur de chargement des fichiers:', error);
        toast.error("Erreur de chargement", { description: "Impossible de charger la liste des fichiers." });
      } else {
        setFiles(data as ProjectFile[]);
      }
    };
    fetchFiles();
  }, [projectId, supabase]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0 || !user) {
        throw new Error('Vous devez sélectionner un fichier à uploader.');
      }

      const file = event.target.files[0];
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${projectId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: newFile, error: insertError } = await supabase
        .from('project_files')
        .insert({
          project_id: projectId,
          uploader_id: user.id,
          file_name: file.name,
          storage_path: filePath,
        })
        .select('*, profiles (full_name)')
        .single();

      if (insertError) throw insertError;

      setFiles((currentFiles) => [newFile as ProjectFile, ...currentFiles]);
      toast.success("Succès", { description: `Le fichier "${file.name}" a été uploadé.` });

    } catch (error: any) {
      console.error('Erreur upload:', error);
      toast.error("Erreur d'upload", { description: error.message });
    } finally {
      setUploading(false);
      event.target.value = ''; // Reset file input
    }
  };

  const handleFileDownload = async (filePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('project-files')
        .createSignedUrl(filePath, 60); // URL valide pour 60 secondes
      if (error) throw error;
      window.open(data.signedUrl, '_blank');
    } catch (error: any) {
      console.error('Erreur de téléchargement:', error);
      toast.error("Erreur", { description: `Impossible de télécharger le fichier.` });
    }
  };

  const isAdmin = userRole === 'admin';

  return (
    <div className="rounded-lg bg-deep-space-blue/30 border border-slate-dark/20 p-6">
      {isAdmin && (
        <div className="mb-4 border-b border-slate-dark/20 pb-4">
          <label htmlFor="file-upload" className="font-semibold text-white">Uploader un nouveau fichier</label>
          <p className="text-xs text-slate-dark mb-2">La taille maximale par fichier est de 50MB.</p>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileUpload}
            disabled={uploading}
            className="text-sm text-slate-light file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-kinetic-cyan file:text-deep-space-blue hover:file:bg-kinetic-cyan/90 disabled:opacity-50"
          />
          {uploading && <p className="text-sm text-kinetic-cyan mt-2 animate-pulse">Upload en cours...</p>}
        </div>
      )}

      <ul className="space-y-3">
        {files.length > 0 ? files.map((file) => (
          <li key={file.id} className="flex justify-between items-center bg-deep-space-blue/50 p-3 rounded-md">
            <div>
              <p className="font-semibold text-slate-light truncate max-w-[150px] sm:max-w-full">{file.file_name}</p>
              <p className="text-xs text-slate-dark">
                Par {file.profiles?.full_name || 'Admin'} le {new Date(file.created_at).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <Button size="sm" variant="secondary" onClick={() => handleFileDownload(file.storage_path)}>
              Télécharger
            </Button>
          </li>
        )) : (
          !uploading && <p className="text-slate-dark text-center py-4">Aucun fichier pour ce projet.</p>
        )}
      </ul>
    </div>
  );
}
