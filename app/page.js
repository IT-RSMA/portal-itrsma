"use client";

import React, { useState } from "react";
import {
  FileCode2,
  CalendarDays,
  Activity,
  ExternalLink,
  LayoutDashboard,
  Maximize2,
  RefreshCw,
  Building2,
  Database
} from "lucide-react";

// 1. DAFTAR WEBSITE / APLIKASI YANG DIPANGGIL
const services = [
  {
    id: "api-doc",
    title: "Dokumentasi API RS",
    category: "Pengembangan & SIMRS",
    url: "https://doc-api-rsma.netlify.app/",
    icon: FileCode2,
    embeddable: true,
    description: "Spesifikasi dan dokumentasi endpoint API integrasi SIMRS."
  },
  {
    id: "jadwal-rs",
    title: "Jadwal Shift IT RSMA",
    category: "Pelayanan & Tim IT",
    url: "https://jadwal-itrsma.netlify.app/",
    icon: CalendarDays,
    embeddable: true,
    description: "Sistem generator dan manajemen jadwal duty & shift tim IT RSMA."
  },
  {
    id: "task-manager",
    title: "Task Manager",
    category: "task manager",
    url: "https://taskmanager-itrsma.netlify.app/",
    icon: Activity,
    embeddable: true,
    description: "Pantau kesehatan server database dan jaringan VPN RS."
  },
  // {
  //   id: "external-portal",
  //   title: "Portal BPJS / Health Care",
  //   category: "Eksternal",
  //   url: "https://bpjs-kesehatan.go.id",
  //   icon: Database,
  //   embeddable: false, // Membuka di tab baru jika tidak bisa di-embed
  //   description: "Portal resmi BPJS Kesehatan (Buka di tab baru)."
  // }
];

export default function HospitalDashboard() {
  const [activeService, setActiveService] = useState(services[0]);
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-72 bg-slate-900 text-slate-200 flex flex-col border-r border-slate-800">
        {/* Brand Header */}
        <div className="p-4 flex items-center gap-3 border-b border-slate-800">
          <img
            src="/logo.png"
            alt="Logo RSMA"
            className="w-10 h-10 object-contain bg-white/90 rounded-lg p-1 shadow-sm shrink-0"
          />
          <div>
            <h1 className="font-bold text-base text-white leading-tight">Portal RSMA</h1>
            <p className="text-xs text-slate-400">Dashboard Layanan Terpadu</p>
          </div>
        </div>

        {/* Menu Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
              Layanan Internal
            </p>
            <div className="space-y-1">
              {services.map((item) => {
                const Icon = item.icon;
                const isActive = activeService.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveService(item)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="truncate">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          &copy; {new Date().getFullYear()} TEAM IT RSMA
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Content Viewer (Iframe / External Placeholder) */}
        <div className="flex-1 bg-slate-50 relative overflow-hidden">
          {activeService.embeddable ? (
            <iframe
              key={iframeKey}
              src={activeService.url}
              className="w-full h-full border-0"
              title={activeService.title}
              sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads allow-forms"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4">
                <ExternalLink className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Aplikasi Membutuhkan Tab Terpisah
              </h3>
              <p className="text-slate-500 max-w-md text-sm mb-6">
                Website ini tidak mengizinkan tampilan di dalam frame (Keamanan iframe).
                Silakan klik tombol di bawah untuk membuka layanan secara penuh.
              </p>
              <a
                href={activeService.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Buka {activeService.title}
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}