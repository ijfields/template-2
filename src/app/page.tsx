import { TokenContract } from '@/components/TokenContract'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">GUAPX DAO</h1>
        <TokenContract 
          onSuccess={() => console.log('Token deployed!')}
          onError={(error) => console.error('Deploy failed:', error)}
        />
      </div>
    </main>
  )
}
