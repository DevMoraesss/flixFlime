import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
                404
            </h1>
            <h2 className="text-2xl font-bold text-white mt-4">Página não encontrada</h2>
            <p className="text-gray-400 mt-2 max-w-md">
                A página que você está procurando não existe ou pode ter sido removida.
            </p>
            <Link
                href="/"
                className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-red-700 transition-colors"
            >
                Voltar para o Início
            </Link>
        </div>
    );
}
