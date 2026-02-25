"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus, Trash2, Save, Link2, Mail, Phone, MapPin,
  Users, Clock, RotateCcw, Globe, AlertCircle, CheckCircle2,
} from "lucide-react";

interface FooterLink { label: string; href: string; }
interface SectionState {
  siteTitle: string; email: string; phone: string;
  address: string; footerLinks: FooterLink[];
}
interface LiveStats { visitors: string; lastUpdated: string; }

export default function SettingsAdmin() {
  const [state, setState] = useState<SectionState>({
    siteTitle: "", email: "", phone: "", address: "", footerLinks: [],
  });
  const [live, setLive] = useState<LiveStats>({ visitors: "—", lastUpdated: "—" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const flash = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };
  const flashErr = (msg: string) => { setError(msg); setTimeout(() => setError(""), 4000); };

  const fetchAll = useCallback(async () => {
    try {
      const [sRes, luRes] = await Promise.all([
        fetch("/api/settings"),
        fetch("/api/settings/last-updated"),
      ]);
      const sd = await sRes.json();
      const ld = await luRes.json();
      if (sd.success) {
        const s = sd.data as Record<string, string>;
        let links: FooterLink[] = [];
        if (s.footer_links) {
          try {
            const p = JSON.parse(s.footer_links);
            if (Array.isArray(p)) links = p;
          } catch { /**/ }
        }
        setState({
          siteTitle: s.site_title ?? "", email: s.footer_email ?? "",
          phone: s.footer_phone ?? "", address: s.footer_address ?? "",
          footerLinks: links,
        });
        setLive((prev) => ({
          ...prev,
          visitors: s.visitors_count ? Number(s.visitors_count).toLocaleString("en-IN") : "0",
        }));
      }
      if (ld.success) setLive((prev) => ({ ...prev, lastUpdated: ld.date }));
    } catch { flashErr("Failed to load settings."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const saveSettings = async (section: string, payload: Record<string, string>) => {
    setSaving(section); setError("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) { flash("Saved successfully."); fetchAll(); }
      else flashErr(data.error || "Failed to save.");
    } catch { flashErr("Failed to save."); }
    finally { setSaving(null); }
  };

  const handleResetVisitors = async () => {
    if (!confirm("Reset visitor count to 0?")) return;
    setSaving("visitors");
    try {
      await fetch("/api/settings/visitors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: 0 }),
      });
      setLive((prev) => ({ ...prev, visitors: "0" }));
      flash("Visitor count reset.");
    } catch { flashErr("Failed to reset."); }
    finally { setSaving(null); }
  };

  const updateLink = (idx: number, field: "label" | "href", val: string) => {
    const next = [...state.footerLinks];
    next[idx] = { ...next[idx], [field]: val };
    setState({ ...state, footerLinks: next });
  };
  const addLink = () =>
    setState({ ...state, footerLinks: [...state.footerLinks, { label: "", href: "" }] });
  const removeLink = (idx: number) =>
    setState({ ...state, footerLinks: state.footerLinks.filter((_, i) => i !== idx) });
  const saveLinks = () =>
    saveSettings("links", { footer_links: JSON.stringify(state.footerLinks) });

  if (loading)
    return <div className="bg-white rounded-xl border p-8 text-center text-[#1a1550]/50">Loading settings…</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-lg p-3 text-sm border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-lg p-3 text-sm border border-green-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {success}
        </div>
      )}

      {/* Live Stats */}
      <div className="bg-white rounded-xl border border-[#1077A6]/10 p-5">
        <h2 className="font-display font-bold text-[#1a1550] text-base mb-4 flex items-center gap-2">
          <div className="w-1 h-5 bg-[#f4c430] rounded-full" />
          Live Stats
          <span className="text-[11px] font-normal text-[#1a1550]/40 ml-1">(auto-tracked)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#f8f7fc] border border-[#1077A6]/8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1077A6]/10 flex items-center justify-center text-[#1077A6]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10.5px] uppercase tracking-widest text-[#1a1550]/40 font-semibold">Total Visitors</p>
                <p className="text-xl font-bold text-[#1a1550] leading-tight">{live.visitors}</p>
              </div>
            </div>
            <button onClick={handleResetVisitors} disabled={saving === "visitors"} title="Reset to 0"
              className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#f8f7fc] border border-[#1077A6]/8">
            <div className="w-10 h-10 rounded-lg bg-[#1077A6]/10 flex items-center justify-center text-[#1077A6]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10.5px] uppercase tracking-widest text-[#1a1550]/40 font-semibold">Last Updated</p>
              <p className="text-sm font-bold text-[#1a1550] leading-tight">{live.lastUpdated}</p>
              <p className="text-[10px] text-[#1a1550]/30 mt-0.5">Auto-computed from content</p>
            </div>
          </div>
        </div>
      </div>

      {/* Site Info */}
      <Section title="Site Information" icon={<Globe className="w-4 h-4" />}>
        <Field label="Site Title">
          <input type="text" value={state.siteTitle}
            onChange={(e) => setState({ ...state, siteTitle: e.target.value })}
            placeholder="e.g. Tribal Research Institute & Training Centre"
            className={inputCls} />
        </Field>
        <SaveButton label="Save Site Info" loading={saving === "siteInfo"}
          onClick={() => saveSettings("siteInfo", { site_title: state.siteTitle })} />
      </Section>

      {/* Contact Details */}
      <Section title="Contact Information" icon={<Mail className="w-4 h-4" />}>
        <Field label="Email Address" icon={<Mail className="w-3.5 h-3.5 text-[#1077A6]/40" />}>
          <input type="email" value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            placeholder="contact@example.gov.in" className={inputCls} />
        </Field>
        <Field label="Phone Number" icon={<Phone className="w-3.5 h-3.5 text-[#1077A6]/40" />}>
          <input type="text" value={state.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
            placeholder="+91 XXXXX XXXXX" className={inputCls} />
        </Field>
        <Field label="Address" icon={<MapPin className="w-3.5 h-3.5 text-[#1077A6]/40" />}>
          <textarea value={state.address}
            onChange={(e) => setState({ ...state, address: e.target.value })}
            rows={2} placeholder="Street, City, State, PIN" className={inputCls} />
        </Field>
        <SaveButton label="Save Contact Info" loading={saving === "contact"}
          onClick={() => saveSettings("contact", {
            footer_email: state.email,
            footer_phone: state.phone,
            footer_address: state.address,
          })} />
      </Section>

      {/* Footer Related Links */}
      <Section title="Footer Related Links" icon={<Link2 className="w-4 h-4" />}>
        <div className="space-y-2">
          {state.footerLinks.map((link, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-2 p-3 rounded-xl bg-[#f8f7fc] border border-[#1077A6]/8">
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-semibold text-[#1a1550]/40 uppercase tracking-wider mb-1">Display Label</label>
                <input type="text" value={link.label}
                  onChange={(e) => updateLink(idx, "label", e.target.value)}
                  placeholder="e.g. National Tribal Research Portal" className={inputCls} />
              </div>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-semibold text-[#1a1550]/40 uppercase tracking-wider mb-1">URL</label>
                <input type="url" value={link.href}
                  onChange={(e) => updateLink(idx, "href", e.target.value)}
                  placeholder="https://..." className={inputCls} />
              </div>
              <button type="button" onClick={() => removeLink(idx)} title="Remove link"
                className="self-end sm:self-center mt-0 sm:mt-4 p-2 rounded-lg hover:bg-red-50 text-red-400 shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {state.footerLinks.length === 0 && (
            <p className="text-[12px] text-[#1a1550]/30 italic py-2">
              No links yet. Click &ldquo;Add Link&rdquo; below.
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <button type="button" onClick={addLink}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1077A6] hover:text-[#f4c430] transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Link
          </button>
          <SaveButton label="Save Links" loading={saving === "links"} onClick={saveLinks} />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-[#1077A6]/10 p-5 space-y-4">
      <h2 className="font-display font-bold text-[#1a1550] text-base flex items-center gap-2">
        <div className="w-1 h-5 bg-[#1077A6] rounded-full" />
        {icon && <span className="text-[#1077A6]">{icon}</span>}
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1a1550]/60 mb-1.5">
        {icon}{label}
      </label>
      {children}
    </div>
  );
}

function SaveButton({ label, loading, onClick }: { label: string; loading: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={loading}
      className="flex items-center gap-2 bg-[#1077A6] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0e6590] disabled:opacity-60 transition-colors">
      <Save className="w-3.5 h-3.5" />
      {loading ? "Saving…" : label}
    </button>
  );
}

const inputCls = "w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none bg-white";
