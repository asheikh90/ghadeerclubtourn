import React from 'react'
import { Shield, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 border-t border-emerald-800/30 mt-12">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-center space-x-3 text-center">
          <Shield className="h-5 w-5 text-emerald-400" />
          <p className="text-emerald-200 text-sm">
            <span className="font-bold text-yellow-400">Data protected by Wilayah Ethics.</span>
            <span className="mx-2">No sharing with third parties.</span>
          </p>
          <Heart className="h-5 w-5 text-emerald-400" />
        </div>
        
        <div className="text-center mt-4 pt-4 border-t border-emerald-800/30">
          <p className="text-emerald-300/70 text-xs">
            © 2024 Ghadeer Club - Preparing the Ummah for Imam al-Mahdi (ajtf)
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
