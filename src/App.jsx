/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              UNBLOCKED<span className="text-orange-500">GAMES</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-white/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-white/60">
            <span className="hidden md:block">v1.0.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              layoutId={game.id}
              onClick={() => setSelectedGame(game)}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-orange-500/50 transition-colors"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 group-hover:text-orange-500 transition-colors">{game.title}</h3>
                <p className="text-sm text-white/50 line-clamp-2">{game.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Play Now
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No games found matching your search.</p>
          </div>
        )}
      </main>

      {/* Game Player Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              layoutId={selectedGame.id}
              className="bg-[#111] w-full max-w-5xl h-full max-h-[80vh] rounded-3xl overflow-hidden border border-white/10 flex flex-col relative"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedGame.thumbnail}
                    alt=""
                    className="w-8 h-8 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <h2 className="font-bold text-lg">{selectedGame.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(selectedGame.iframeUrl, '_blank')}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-[#111] border-t border-white/10 flex items-center justify-between">
                <p className="text-sm text-white/40">{selectedGame.description}</p>
                <div className="flex items-center gap-4">
                   <span className="text-xs text-white/20 uppercase tracking-widest font-bold">Unblocked Games v1.0</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Gamepad2 className="w-5 h-5" />
            <span className="font-bold tracking-tight">UNBLOCKEDGAMES</span>
          </div>
          <div className="flex gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs text-white/20">© 2026 Unblocked Games Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
