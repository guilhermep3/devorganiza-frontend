import { Button } from '@/components/button';
import { Header } from '@/components/layout/header';
import { FileX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header noNav noAnimate />
      <div className="flex-1 pt-24 flex flex-col justify-center items-center gap-4">
        <h1 className='text-xl md:text-2xl font-bold flex items-center gap-1'>404 - Página Não Encontrada <FileX /></h1>
        <p>Desculpe, a página que você está procurando não existe.</p>
        <Button href="/" className='mt-5'>
          Voltar para a Página Inicial
        </Button>
      </div>
    </div>
  );
}
