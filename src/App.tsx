import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TranscriptionForm from "./components/TranscriptionForm";
import TranscriptionList from "./components/TranscriptionList";

export default function App() {
  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-b from-white via-amber-50 to-white dark:from-gray-900 dark:via-gray-900">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg">
              <span className="text-2xl font-bold">🦉</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                VoiceOwl
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Fast, reliable transcriptions — built for developers
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-300">
              Docs
            </a>
            <a
              href="#"
              className="px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-700 text-white text-sm shadow"
            >
              Upgrade
            </a>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="lg:col-span-1 glass p-6 rounded-xl shadow-glass"
          >
            <TranscriptionForm />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
          >
            <TranscriptionList />
          </motion.section>
        </main>

        <footer className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} VoiceOwl — built with ❤️
        </footer>
      </div>
    </div>
  );
}
