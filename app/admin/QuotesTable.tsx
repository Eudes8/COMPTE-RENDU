'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import { Button } from '@/components/Button';

const mockQuotes = [
  {
    id: 1,
    client_email: 'jean.dupont@email.com',
    submission_date: '2024-08-12',
  },
  {
    id: 2,
    client_email: 'marie.curie@email.com',
    submission_date: '2024-08-11',
  },
  {
    id: 3,
    client_email: 'pierre.leroy@email.com',
    submission_date: '2024-08-10',
  },
];

export default function QuotesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email du Client</TableHead>
          <TableHead>Date de Soumission</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockQuotes.map((quote) => (
          <TableRow key={quote.id}>
            <TableCell>{quote.client_email}</TableCell>
            <TableCell>{new Date(quote.submission_date).toLocaleDateString('fr-FR')}</TableCell>
            <TableCell className="text-right">
              <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
                <Button variant="primary" size="sm">Lancer l'Onboarding</Button>
                <Button variant="secondary" size="sm">Rejeter</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
