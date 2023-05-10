import ITEMS from 'common/ITEMS';
import SPELLS from 'common/SPELLS';
import { TALENTS_EVOKER } from 'common/TALENTS';

export const SPELL_COLORS = {
  CYCLE_OF_LIFE: '#fafad2',
  DISINTEGRATE: '#0047AB',
  DREAM_BREATH: '#c49c94',
  DREAM_FLIGHT: '#228b22',
  ECHO: '#2E8B57',
  EMERALD_BLOSSOM: '#c1e1c1',
  EMERALD_COMMUNION: '#aef359',
  FLUTTERING_SEEDLING: '#ffff00',
  LIVING_FLAME: '#880e0b',
  LIFEBIND: '#bf0a30',
  GOLDEN_HOUR: '#ffbfa0',
  SPIRITBLOOM: '#fe85ff',
  TA_ECHO: '#6711ad',
  RENEWING_BLAZE: '#680c07',
  REVERSION: '#ffbb78',
  REWIND: '#ffbf00',
  VERDANT_EMBRACE: '#96ffd8',
};

export const DUPLICATION_SPELLS = [
  SPELLS.EMERALD_BLOSSOM.id,
  SPELLS.EMERALD_BLOSSOM_ECHO.id,
  TALENTS_EVOKER.REVERSION_TALENT.id,
  SPELLS.REVERSION_ECHO.id,
  SPELLS.SPIRITBLOOM.id,
  SPELLS.SPIRITBLOOM_SPLIT.id,
  SPELLS.SPIRITBLOOM_FONT.id,
  SPELLS.DREAM_BREATH.id,
  SPELLS.DREAM_BREATH_FONT.id,
  SPELLS.DREAM_BREATH_ECHO.id,
  SPELLS.VERDANT_EMBRACE_HEAL.id,
  SPELLS.LIVING_FLAME_HEAL.id,
  SPELLS.DREAM_FLIGHT_HEAL.id,
  SPELLS.RENEWING_BLAZE_HEAL.id,
  TALENTS_EVOKER.REWIND_TALENT.id,
  SPELLS.CYCLE_OF_LIFE_HEAL.id,
  TALENTS_EVOKER.EMERALD_COMMUNION_TALENT.id,
  SPELLS.EMERALD_COMMUNION_ALLY.id,
  SPELLS.FLUTTERING_SEEDLINGS_HEAL.id,
  TALENTS_EVOKER.ECHO_TALENT.id,
  ITEMS.BROODKEEPERS_PROMISE_HEAL.id, // adding this here because everyone is running it
]; // common spell ids that trigger heal duplication for Cycle of Life and Lifebind

// heal events that can be caused by an echo heal
export const ECHO_HEALS = [
  SPELLS.DREAM_BREATH_ECHO,
  SPELLS.EMERALD_BLOSSOM_ECHO,
  SPELLS.LIVING_FLAME_HEAL,
  SPELLS.REVERSION_ECHO,
  SPELLS.SPIRITBLOOM_SPLIT,
  SPELLS.SPIRITBLOOM_FONT,
  SPELLS.SPIRITBLOOM,
  SPELLS.VERDANT_EMBRACE_HEAL,
  SPELLS.LIFEBIND_HEAL,
  SPELLS.GOLDEN_HOUR_HEAL,
];

export const STASIS_CAST_IDS = [
  SPELLS.LIVING_FLAME_CAST.id,
  TALENTS_EVOKER.VERDANT_EMBRACE_TALENT.id,
  TALENTS_EVOKER.REVERSION_TALENT.id,
  TALENTS_EVOKER.TEMPORAL_ANOMALY_TALENT.id,
  SPELLS.EMERALD_BLOSSOM_CAST.id,
  TALENTS_EVOKER.ECHO_TALENT.id,
  TALENTS_EVOKER.CAUTERIZING_FLAME_TALENT.id,
  TALENTS_EVOKER.DREAM_BREATH_TALENT.id,
  SPELLS.DREAM_BREATH_FONT.id,
  TALENTS_EVOKER.SPIRITBLOOM_TALENT.id,
  SPELLS.SPIRITBLOOM_FONT.id,
];

// hots
export const ECHO_BASE_DURATION = 15000;
export const DREAM_BREATH_MIN_DURATION = 4000;
export const DREAM_BREATH_MAX_DURATION = 16000;
export const REVERSION_BASE_DURATION = 12000;

// talents
export const CALL_OF_YSERA_DREAM_BREATH_INCREASE = 0.4;
export const CALL_OF_YSERA_DREAM_LIVING_FLAME_INCREASE = 1;
export const CYCLE_OF_LIFE_PERCENT_SAVED = 0.15;
export const CYCLE_OF_LIFE_SEED_DURATION = 10000;
export const EMPATH_REGEN_FACTOR = 1;
export const FLOW_STATE_FACTOR = 0.1;
export const GRACE_PERIOD_INCREASE = 0.05;
export const RENEWING_BREATH_INCREASE = 0.15;
export const TIMELESS_MAGIC = 0.15;
export const TIMELORD_INCREASE = 0.25;
