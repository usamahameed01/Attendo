import { create } from 'zustand';

import { seedTeam, teamHeadcount, teamStats } from '@/data/seed';
import type { TeamMember } from '@/data/types';

type TeamState = {
  roster: TeamMember[];
  headcount: number;
  stats: { present: number; absent: number; onLeave: number; late: number };
};

export const useTeamStore = create<TeamState>(() => ({
  roster: seedTeam,
  headcount: teamHeadcount,
  stats: teamStats,
}));
