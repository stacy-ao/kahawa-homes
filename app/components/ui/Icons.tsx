import React from 'react';

export const IconStar: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 14, height = 14, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);

export const IconSearch: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 16, height = 16, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className={className}>
    <circle cx={11} cy={11} r={8} />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export const IconClose: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 20, height = 20, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconPhone: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 16, height = 16, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

export const IconMail: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 16, height = 16, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x={3} y={5} width={18} height={14} rx={2} />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const IconTikTok: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 18, height = 18, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15.5 3c.4 2.2 1.7 3.5 3.8 3.7v3.1c-1.9.2-3.5-.4-4.9-1.4v6.5a6.1 6.1 0 1 1-5.3-6.1v3.2a2.9 2.9 0 1 0 2.2 2.8V3h4.2z" />
  </svg>
);

export const IconBell: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 18, height = 18, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
  </svg>
);

export const IconPin: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 15, height = 15, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1116 0z" />
    <circle cx={12} cy={10} r={2.5} />
  </svg>
);

export const IconChevron: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 13, height = 13, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconBack: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 16, height = 16, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

export const IconShare: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 15, height = 15, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className}>
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
  </svg>
);

export const IconHeart: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 15, height = 15, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

export const IconGrid: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 14, height = 14, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className}>
    <rect x={3} y={3} width={7} height={7} />
    <rect x={14} y={3} width={7} height={7} />
    <rect x={14} y={14} width={7} height={7} />
    <rect x={3} y={14} width={7} height={7} />
  </svg>
);

export const IconUser: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 18, height = 18, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx={12} cy={7} r={4} />
  </svg>
);

export const IconWifi: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 20, height = 20, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className={className}>
    <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
  </svg>
);

export const IconTV: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 20, height = 20, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className={className}>
    <rect x={2} y={3} width={20} height={14} rx={2} />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

export const IconAC: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 20, height = 20, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className={className}>
    <rect x={2} y={6} width={20} height={8} rx={2} />
    <path d="M6 18l2-4M12 18v-4M18 18l-2-4" />
  </svg>
);

export const IconKitchen: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 20, height = 20, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className={className}>
    <path d="M8 2v4M12 2v4M16 2v4M3 8h18v13a1 1 0 01-1 1H4a1 1 0 01-1-1V8zM3 8l3-6M21 8l-3-6" />
  </svg>
);

export const IconParking: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 20, height = 20, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className={className}>
    <rect x={3} y={3} width={18} height={18} rx={2} />
    <path d="M9 17V7h4a3 3 0 010 6H9" />
  </svg>
);

export const IconPool: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 20, height = 20, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className={className}>
    <path d="M2 12h20M2 18c2.5-3 5-3 7.5 0s5 3 7.5 0M7 12V8a5 5 0 0110 0v4" />
  </svg>
);

export const IconSecurity: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 20, height = 20, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const IconUSB: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 20, height = 20, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className={className}>
    <path d="M12 2v8M8 6l4-4 4 4M5 10h14v4a7 7 0 01-14 0v-4z" />
  </svg>
);

export const IconWA: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 22, height = 22, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.12 1.535 5.845L.057 23.885l6.2-1.627A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.031-1.388l-.36-.214-3.733.979.995-3.64-.233-.374A9.774 9.774 0 012.182 12c0-5.418 4.4-9.818 9.818-9.818S21.818 6.582 21.818 12 17.418 21.818 12 21.818z" />
  </svg>
);

export const amenityIconMap: Record<string, React.FC<any>> = {
  'High-Speed WiFi': IconWifi,
  'WiFi': IconWifi,
  'DSTV & Netflix': IconTV,
  'Netflix': IconTV,
  'Air Conditioning': IconAC,
  'Full Kitchen': IconKitchen,
  'Kitchen': IconKitchen,
  'Secure Parking': IconParking,
  'Parking': IconParking,
  'Swimming Pool Access': IconPool,
  'Private Pool': IconPool,
  'Pool': IconPool,
  '24/7 Security': IconSecurity,
  'USB Charging Ports': IconUSB,
};

export const getAmenityIcon = (name: string): React.FC<any> => {
  for (const key of Object.keys(amenityIconMap)) {
    if (name.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
      return amenityIconMap[key];
    }
  }
  return () => (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
      <circle cx={12} cy={12} r={10} />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
};
