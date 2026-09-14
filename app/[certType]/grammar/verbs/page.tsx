import { irregularVerbsData, regularVerbsData } from '@/lib/data/grammar';
import VerbsClient from './VerbsClient';
import type { CertType } from '@/lib/types';

export default async function VerbsPage({
  params,
}: {
  params: Promise<{ certType: string }>;
}) {
  const { certType } = await params;

  return (
    <VerbsClient
      certType={certType as CertType}
      irregularVerbs={irregularVerbsData}
      regularVerbs={regularVerbsData}
    />
  );
}
