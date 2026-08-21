import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const DashboardProfileRoute: React.FC = () => {
  const [userName, setUserName] = useLocalStorage<string>('kahawa-user-name', '');
  const [draftName, setDraftName] = useState(userName);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(draftName.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a] mb-2">
        Your Profile
      </h1>
      <p className="text-sm text-[#6b5744] mb-8">
        Manage your personal information and preferences.
      </p>

      <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 md:p-8 shadow-md">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1.5 text-[#1e120a]">
              Display Name
            </label>
            <input
              type="text"
              className="name-field"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          <button type="submit" className="landing-cta">
            Save Changes
          </button>

          {saved && (
            <p className="text-xs text-[#25d366] font-semibold mt-2">
              Profile updated successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default DashboardProfileRoute;
