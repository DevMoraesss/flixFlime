'use client';

import Link from 'next/link';
import { Film, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-header h-[var(--header-height)]">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <Film className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                        FlixFilme
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                        Início
                    </Link>
                    <Link href="/favorites" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                        Meus Filmes
                    </Link>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Search className="w-5 h-5 text-gray-300" />
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Nav */}
                {isOpen && (
                    <div className="absolute top-[var(--header-height)] left-0 right-0 glass-header border-t border-white/5 p-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                        >
                            Início
                        </Link>
                        <Link
                            href="/favorites"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                        >
                            Meus Filmes
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
