import { topicsData } from '@/lib/data/vocabulary';
import VocabularyStudyClient from './VocabularyStudyClient';

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((id) => ({
    topicId: id.toString(),
  }));
}

export default async function VocabularyStudyPage({
  params,
}: {
  params: Promise<{ certType: string; topicId: string }>;
}) {
  const { certType, topicId } = await params;
  const topicData = topicsData.find((t) => t.id === Number(topicId)) || topicsData[0];

  return <VocabularyStudyClient certType={certType} topicData={topicData} />;
}
