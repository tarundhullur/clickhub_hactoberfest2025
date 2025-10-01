import ButtonGallery from './components/ButtonGallery';
import { loadButtonContributions } from '@/utils/buttonLoader';

export default async function Home() {
  // Load all button contributions at build time
  const contributions = await loadButtonContributions();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ButtonGallery contributions={contributions} />
    </div>
  );
}
