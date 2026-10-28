import { Code, Compass, Monitor, Puzzle, type LucideIcon } from 'lucide-react';

export const SERVICE_IDS = ['software', 'consulting', 'custom', 'hardware'] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  software: Code,
  consulting: Compass,
  custom: Puzzle,
  hardware: Monitor,
};

export function isServiceId(value: string | null): value is ServiceId {
  return SERVICE_IDS.includes(value as ServiceId);
}
