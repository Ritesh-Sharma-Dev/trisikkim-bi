"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldX,
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    fetch("/api/auth/register/status")
      .then((r) => r.json())
      .then((d) => setRegistrationEnabled(d.enabled))
      .catch(() => setRegistrationEnabled(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Registration failed.");
      } else {
        router.push("/auth/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (registrationEnabled === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1077A6] via-[#0e6590] to-[#1a1550]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!registrationEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1077A6] via-[#0e6590] to-[#1a1550] font-body px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldX className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="font-display font-bold text-white text-2xl mb-3">
            Registration Disabled
          </h1>
          <p className="text-white/60 text-sm mb-6">
            New user registration is currently disabled. Contact the
            administrator.
          </p>
          <Link
            href="/auth/login"
            className="inline-block bg-[#f4c430] text-[#1a1550] font-semibold px-6 py-3 rounded-lg text-sm hover:bg-[#e6b800] transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1077A6] via-[#0e6590] to-[#1a1550] font-body px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#f4c430] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-[#1a1550]" />
          </div>
          <h1 className="font-display font-bold text-white text-3xl">
            Create Account
          </h1>
          <p className="text-white/60 text-sm mt-2">
            Admin registration for TRITC CMS
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-4"
        >
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-lg p-3 text-sm border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#1a1550] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1077A6]/50" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 border border-[#1077A6]/20 rounded-lg text-sm text-[#1a1550] focus:border-[#1077A6] focus:ring-2 focus:ring-[#1077A6]/10 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a1550] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1077A6]/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@tritc.sikkim.gov.in"
                className="w-full pl-10 pr-4 py-3 border border-[#1077A6]/20 rounded-lg text-sm text-[#1a1550] focus:border-[#1077A6] focus:ring-2 focus:ring-[#1077A6]/10 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a1550] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1077A6]/50" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-[#1077A6]/20 rounded-lg text-sm text-[#1a1550] focus:border-[#1077A6] focus:ring-2 focus:ring-[#1077A6]/10 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a1550]/40 hover:text-[#1a1550]/70"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a1550] mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1077A6]/50" />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-[#1077A6]/20 rounded-lg text-sm text-[#1a1550] focus:border-[#1077A6] focus:ring-2 focus:ring-[#1077A6]/10 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1077A6] hover:bg-[#0e6590] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 text-sm"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-[#1a1550]/50">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#1077A6] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
