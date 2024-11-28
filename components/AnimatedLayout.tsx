'use client'

import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

interface AnimatedLayoutProps {
  children: React.ReactNode
}

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="main"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-24 pb-12 flex-grow"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}