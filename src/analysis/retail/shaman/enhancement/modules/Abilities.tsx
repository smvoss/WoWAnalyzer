import SPELLS from 'common/SPELLS';
import { TALENTS_SHAMAN } from 'common/TALENTS';
import { calculateMaxCasts } from 'parser/core/EventCalculateLib';
import CoreAbilities from 'parser/core/modules/Abilities';
import { SpellbookAbility } from 'parser/core/modules/Ability';
import SPELL_CATEGORY from 'parser/core/SPELL_CATEGORY';

import { MOLTEN_ASSAULT_SCALING, ESSENTIAL_EXTRACTION_EFFECT_BY_RANK } from '../constants';

import {
  TOTEMIC_SURGE_SCALING,
  GWTF_SW_SCALING,
  GWTF_GOW_SCALING,
} from 'analysis/retail/shaman/shared/constants';

class Abilities extends CoreAbilities {
  spellbook(): SpellbookAbility[] {
    const combatant = this.selectedCombatant;
    return [
      // Shaman Base line
      {
        spell: [SPELLS.BLOODLUST.id, SPELLS.HEROISM.id],
        category: SPELL_CATEGORY.COOLDOWNS,
        gcd: undefined,
        isUndetectable: true,
      },
      {
        spell: SPELLS.EARTHBIND_TOTEM.id,
        category: SPELL_CATEGORY.OTHERS,
        cooldown:
          30 - TOTEMIC_SURGE_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.TOTEMIC_SURGE_TALENT)],
        gcd: {
          base: 1000,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: SPELLS.FLAME_SHOCK.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste) => 6 / (1 + haste),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.GHOST_WOLF.id,
        category: SPELL_CATEGORY.UTILITY,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: SPELLS.HEALING_SURGE.id,
        gcd: {
          base: 1500,
        },
        category: SPELL_CATEGORY.OTHERS,
      },
      {
        spell: SPELLS.LIGHTNING_BOLT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.REINCARNATION.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        gcd: undefined,
      },

      // Shaman class Talents
      {
        spell: TALENTS_SHAMAN.CHAIN_HEAL_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.CHAIN_HEAL_TALENT),
        category: SPELL_CATEGORY.OTHERS,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.LAVA_BURST_TALENT.id,
        enabled:
          combatant.hasTalent(TALENTS_SHAMAN.LAVA_BURST_TALENT) &&
          !combatant.hasTalent(TALENTS_SHAMAN.ELEMENTAL_BLAST_TALENT),
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: 8,
        charges: 1,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.ASTRAL_SHIFT_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.ASTRAL_SHIFT_TALENT),
        cooldown: combatant.hasTalent(TALENTS_SHAMAN.PLANES_TRAVELER_TALENT) ? 90 : 120,
        category: SPELL_CATEGORY.DEFENSIVE,
        isDefensive: true,
      },
      {
        spell: TALENTS_SHAMAN.CHAIN_LIGHTNING_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.CHAIN_LIGHTNING_TALENT),
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.EARTH_ELEMENTAL_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.EARTH_ELEMENTAL_TALENT),
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 300,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: TALENTS_SHAMAN.WIND_SHEAR_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.WIND_SHEAR_TALENT),
        category: SPELL_CATEGORY.OTHERS,
        cooldown: 12,
        gcd: null,
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: TALENTS_SHAMAN.FROST_SHOCK_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.FROST_SHOCK_TALENT),
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste) => 6 / (1 + haste),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.EARTH_SHIELD_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.EARTH_SHIELD_TALENT),
        category: SPELL_CATEGORY.OTHERS,
        cooldown: (haste) => 6 / (1 + haste),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.CLEANSE_SPIRIT_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.CLEANSE_SPIRIT_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 8,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.SPIRITWALKERS_GRACE_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.SPIRITWALKERS_GRACE_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown: combatant.hasTalent(TALENTS_SHAMAN.GRACEFUL_SPIRIT_TALENT) ? 90 : 120,
        gcd: null,
      },
      {
        spell: TALENTS_SHAMAN.PURGE_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.PURGE_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.GREATER_PURGE_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.GREATER_PURGE_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 12,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.SPIRIT_WALK_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.SPIRIT_WALK_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown:
          60 - GWTF_SW_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.GO_WITH_THE_FLOW_TALENT)],
        gcd: {
          static: 0,
        },
      },
      {
        spell: TALENTS_SHAMAN.GUST_OF_WIND_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.GUST_OF_WIND_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown:
          30 - GWTF_GOW_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.GO_WITH_THE_FLOW_TALENT)],
        gcd: {
          static: 0,
        },
      },
      {
        spell: TALENTS_SHAMAN.ANCESTRAL_GUIDANCE_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.ANCESTRAL_GUIDANCE_TALENT),
        category: SPELL_CATEGORY.OTHERS,
        cooldown: 120,
        gcd: {
          static: 0,
        },
      },
      {
        spell: TALENTS_SHAMAN.NATURES_SWIFTNESS_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.NATURES_SWIFTNESS_TALENT),
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 60,
        gcd: {
          static: 0,
        },
      },
      {
        spell: TALENTS_SHAMAN.THUNDERSTORM_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.THUNDERSTORM_TALENT),
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        cooldown: combatant.hasTalent(TALENTS_SHAMAN.THUNDERSHOCK_TALENT) ? 25 : 30,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.LIGHTNING_LASSO_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.LIGHTNING_LASSO_TALENT),
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        cooldown: 45,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.HEX_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.HEX_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown: combatant.hasTalent(TALENTS_SHAMAN.VOODOO_MASTERY_TALENT) ? 15 : 30,
        gcd: {
          base: 1500,
        },
      },

      // Totems
      {
        spell: TALENTS_SHAMAN.TOTEMIC_PROJECTION_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.TOTEMIC_PROJECTION_TALENT),
        category: SPELL_CATEGORY.OTHERS,
        cooldown: 10,
        gcd: {
          static: 0,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: TALENTS_SHAMAN.CALL_OF_THE_ELEMENTS_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.CALL_OF_THE_ELEMENTS_TALENT),
        category: SPELL_CATEGORY.OTHERS,
        cooldown: combatant.hasTalent(TALENTS_SHAMAN.CALL_OF_THE_ELEMENTS_TALENT) ? 120 : 180,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.CAPACITOR_TOTEM_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.CAPACITOR_TOTEM_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown:
          60 - TOTEMIC_SURGE_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.TOTEMIC_SURGE_TALENT)],
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: TALENTS_SHAMAN.TREMOR_TOTEM_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.TREMOR_TOTEM_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown:
          60 - TOTEMIC_SURGE_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.TOTEMIC_SURGE_TALENT)],
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: TALENTS_SHAMAN.WIND_RUSH_TOTEM_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.WIND_RUSH_TOTEM_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown:
          120 - TOTEMIC_SURGE_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.TOTEMIC_SURGE_TALENT)],
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: TALENTS_SHAMAN.EARTHGRAB_TOTEM_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.EARTHGRAB_TOTEM_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown:
          60 - TOTEMIC_SURGE_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.TOTEMIC_SURGE_TALENT)],
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: TALENTS_SHAMAN.HEALING_STREAM_TOTEM_SHARED_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.HEALING_STREAM_TOTEM_SHARED_TALENT),
        category: SPELL_CATEGORY.OTHERS,
        cooldown:
          30 - TOTEMIC_SURGE_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.TOTEMIC_SURGE_TALENT)],
        charges: 1,
        gcd: {
          static: 1000,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: TALENTS_SHAMAN.MANA_SPRING_TOTEM_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.MANA_SPRING_TOTEM_TALENT),
        category: SPELL_CATEGORY.OTHERS,
        cooldown:
          45 - TOTEMIC_SURGE_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.TOTEMIC_SURGE_TALENT)],
        gcd: {
          static: 1000,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: TALENTS_SHAMAN.POISON_CLEANSING_TOTEM_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.POISON_CLEANSING_TOTEM_TALENT),
        category: SPELL_CATEGORY.OTHERS,
        cooldown:
          45 - TOTEMIC_SURGE_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.TOTEMIC_SURGE_TALENT)],
        gcd: {
          static: 1000,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: TALENTS_SHAMAN.STONESKIN_TOTEM_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.STONESKIN_TOTEM_TALENT),
        category: SPELL_CATEGORY.OTHERS,
        cooldown:
          30 - TOTEMIC_SURGE_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.TOTEMIC_SURGE_TALENT)],
        gcd: {
          static: 1000,
        },
        castEfficiency: {
          suggestion: false,
        },
      },
      {
        spell: TALENTS_SHAMAN.TRANQUIL_AIR_TOTEM_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.TRANQUIL_AIR_TOTEM_TALENT),
        category: SPELL_CATEGORY.OTHERS,
        cooldown:
          60 - TOTEMIC_SURGE_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.TOTEMIC_SURGE_TALENT)],
        gcd: {
          static: 1000,
        },
        castEfficiency: {
          suggestion: false,
        },
      },

      // Enhancement baseline

      // Enhancement talents

      {
        spell: TALENTS_SHAMAN.LAVA_LASH_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.LAVA_LASH_TALENT),
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste) =>
          (18 -
            MOLTEN_ASSAULT_SCALING[combatant.getTalentRank(TALENTS_SHAMAN.MOLTEN_ASSAULT_TALENT)]) /
          (1 + haste),
        gcd: {
          base: 1500,
        },
      },
      {
        // TODO: Correct Spell ID
        spell: TALENTS_SHAMAN.ASCENDANCE_ENHANCEMENT_TALENT.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 180,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(TALENTS_SHAMAN.ASCENDANCE_ENHANCEMENT_TALENT),
        damageSpellIds: [SPELLS.ASCENDANCE_INITIAL_DAMAGE.id],
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 1.0,
        },
      },
      {
        spell: TALENTS_SHAMAN.FERAL_SPIRIT_TALENT.id,
        buffSpellId: [
          //Feral Spirit isn't an actual buff, so we can only show the Elemental
          // Spirits buffs
          SPELLS.ELEMENTAL_SPIRITS_BUFF_MOLTEN_WEAPON.id,
          SPELLS.ELEMENTAL_SPIRITS_BUFF_ICY_EDGE.id,
          SPELLS.ELEMENTAL_SPIRITS_BUFF_CRACKLING_SURGE.id,
        ],
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: combatant.hasTalent(TALENTS_SHAMAN.ELEMENTAL_SPIRITS_TALENT) ? 90 : 120,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
        },
      },
      {
        // This is no error. We actually use the elemental shaman elemental blast spell id.
        spell: TALENTS_SHAMAN.ELEMENTAL_BLAST_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.ELEMENTAL_BLAST_TALENT),
        charges: combatant.getRepeatedTalentCount(TALENTS_SHAMAN.ELEMENTAL_BLAST_TALENT),
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: 12,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.6,
        },
      },
      {
        spell: TALENTS_SHAMAN.STORMSTRIKE_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste) => 7.5 / (1 + haste),
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.85,
          maxCasts: (cooldown: number) =>
            // Placeholder for enhancement's ascendance
            calculateMaxCasts(
              cooldown,
              this.owner.fightDuration -
                combatant.getBuffUptime(TALENTS_SHAMAN.ASCENDANCE_ENHANCEMENT_TALENT.id),
            ),
        },
      },
      {
        spell: SPELLS.WINDSTRIKE_CAST.id,
        // Placeholder for enhancement's ascendance
        enabled:
          combatant.hasTalent(TALENTS_SHAMAN.DEEPLY_ROOTED_ELEMENTS_TALENT) ||
          combatant.hasTalent(TALENTS_SHAMAN.ASCENDANCE_ENHANCEMENT_TALENT),
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste) => 3 / (1 + haste),
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.85,
          maxCasts: (cooldown: number) =>
            // Placeholder for enhancement's ascendance
            calculateMaxCasts(
              cooldown,
              combatant.getBuffUptime(TALENTS_SHAMAN.ASCENDANCE_ENHANCEMENT_TALENT.id),
            ),
        },
      },
      {
        spell: TALENTS_SHAMAN.CRASH_LIGHTNING_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: {
          base: 1500,
        },
        cooldown: (haste) => 9 / (1 + haste),
      },
      {
        spell: TALENTS_SHAMAN.FERAL_LUNGE_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.FERAL_LUNGE_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 30,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS_SHAMAN.SUNDERING_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(TALENTS_SHAMAN.SUNDERING_TALENT),
        cooldown: 40,
      },
      {
        spell: TALENTS_SHAMAN.FIRE_NOVA_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(TALENTS_SHAMAN.FIRE_NOVA_TALENT),
        cooldown: (haste) => 15 / (1 + haste),
      },
      {
        spell: TALENTS_SHAMAN.ICE_STRIKE_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(TALENTS_SHAMAN.ICE_STRIKE_TALENT),
        cooldown: (haste) => 15 / (1 + haste),
      },
      {
        spell: SPELLS.LIGHTNING_SHIELD.id,
        category: SPELL_CATEGORY.OTHERS,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0,
        },
      },
      {
        spell: SPELLS.FAE_TRANSFUSION.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 120 + ESSENTIAL_EXTRACTION_EFFECT_BY_RANK[0],
        gcd: {
          base: 1500,
        },
        enabled: false,
      },
      {
        spell: SPELLS.PRIMORDIAL_WAVE_CAST.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 45,
        gcd: {
          base: 1500,
        },
        enabled: false,
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 1,
        },
      },
      {
        spell: SPELLS.CHAIN_HARVEST.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 90,
        gcd: {
          base: 1500,
        },
        enabled: false,
      },
      {
        spell: SPELLS.VESPER_TOTEM.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        enabled: false,
      },
      {
        spell: TALENTS_SHAMAN.WINDFURY_TOTEM_TALENT.id,
        enabled: combatant.hasTalent(TALENTS_SHAMAN.WINDFURY_TOTEM_TALENT),
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: {
          base: 1000,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 1,
        },
      },
    ];
  }
}

export default Abilities;
