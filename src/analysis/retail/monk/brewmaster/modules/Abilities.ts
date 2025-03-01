import SPELLS from 'common/SPELLS';
import CoreAbilities, { AbilityRange } from 'parser/core/modules/Abilities';
import { SpellbookAbility } from 'parser/core/modules/Ability';
import SPELL_CATEGORY from 'parser/core/SPELL_CATEGORY';
import talents from 'common/TALENTS/monk';

class Abilities extends CoreAbilities {
  spellbook(): SpellbookAbility[] {
    const combatant = this.selectedCombatant;
    return [
      // Rotational Spells
      {
        spell: talents.KEG_SMASH_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste) => 8 / (1 + haste),
        charges: combatant.hasTalent(talents.STORMSTOUTS_LAST_KEG_TALENT) ? 2 : 1,
        damageSpellIds: [talents.KEG_SMASH_TALENT.id],
        castEfficiency: {
          suggestion: true,
        },
        gcd: {
          static: 1000,
        },
        range: 15,
      },
      {
        spell: SPELLS.BLACKOUT_KICK_BRM.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: combatant.hasTalent(talents.FLUIDITY_OF_MOTION_TALENT) ? 3 : 4,
        castEfficiency: {
          suggestion: true,
        },
        gcd: {
          static: 1000,
        },
        range: AbilityRange.Melee,
      },
      {
        spell: talents.BREATH_OF_FIRE_TALENT.id,
        isDefensive: true,
        buffSpellId: SPELLS.BREATH_OF_FIRE_DEBUFF.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: 15,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: talents.RISING_SUN_KICK_TALENT.id,
        enabled: combatant.hasTalent(talents.RISING_SUN_KICK_TALENT),
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste) => 10 / (1 + haste),
        gcd: {
          static: 1000,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.8,
        },
        range: AbilityRange.Melee,
      },
      {
        spell: SPELLS.TIGER_PALM.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: {
          static: 1000,
        },
        range: AbilityRange.Melee,
      },
      {
        spell: talents.RUSHING_JADE_WIND_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste) => 6 / (1 + haste),
        enabled: combatant.hasTalent(talents.RUSHING_JADE_WIND_TALENT),
        buffSpellId: talents.RUSHING_JADE_WIND_TALENT.id,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: talents.CHI_BURST_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: 30,
        enabled: combatant.hasTalent(talents.CHI_BURST_TALENT),
        castEfficiency: {
          suggestion: true,
        },
        gcd: {
          static: 1000,
        },
      },
      {
        spell: talents.CHI_WAVE_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: 15,
        enabled: combatant.hasTalent(talents.CHI_WAVE_TALENT),
        castEfficiency: {
          suggestion: true,
        },
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.CRACKLING_JADE_LIGHTNING.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: {
          // This was tested in-game (in Legion): it does NOT have a static GCD but a base GCD of 1sec and scales with Haste
          base: 1500,
        },
      },
      {
        spell: SPELLS.SPINNING_CRANE_KICK_BRM.id,
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        gcd: {
          static: 1000,
        },
      },
      // Cooldowns
      {
        spell: talents.INVOKE_NIUZAO_THE_BLACK_OX_TALENT.id,
        enabled: combatant.hasTalent(talents.INVOKE_NIUZAO_THE_BLACK_OX_TALENT),
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 180,
        gcd: {
          base: 1000,
        },
      },
      {
        spell: talents.BONEDUST_BREW_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: 60,
        gcd: { static: 1000 }, // TODO: verify gcd
        enabled: combatant.hasTalent(talents.BONEDUST_BREW_TALENT),
      },
      {
        spell: talents.WEAPONS_OF_ORDER_TALENT.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 120,
        gcd: { base: 1000 },
        enabled: combatant.hasTalent(talents.WEAPONS_OF_ORDER_TALENT),
      },
      {
        spell: talents.EXPLODING_KEG_TALENT.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 60,
        gcd: { static: 1000 },
        enabled: combatant.hasTalent(talents.EXPLODING_KEG_TALENT),
      },
      {
        spell: talents.PURIFYING_BREW_TALENT.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: (haste) =>
          (combatant.hasTalent(talents.LIGHT_BREWING_TALENT) ? 16 : 20) / (1 + haste),
        charges: combatant.hasTalent(talents.IMPROVED_PURIFYING_BREW_TALENT) ? 2 : 1,
        gcd: null,
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
        },
      },
      {
        spell: talents.CELESTIAL_BREW_TALENT.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: combatant.hasTalent(talents.CELESTIAL_BREW_TALENT) ? 48 : 60,
        gcd: {
          base: 1000,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.7,
        },
      },
      {
        spell: talents.BLACK_OX_BREW_TALENT.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: 120,
        castEfficiency: {
          suggestion: false,
          recommendedEfficiency: 0.7,
        },
        enabled: combatant.hasTalent(talents.BLACK_OX_BREW_TALENT),
        gcd: null,
      },
      {
        spell: SPELLS.EXPEL_HARM.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: 5,
        gcd: {
          static: 500,
        },
      },
      {
        spell: talents.FORTIFYING_BREW_TALENT.id,
        buffSpellId: SPELLS.FORTIFYING_BREW_BRM_BUFF.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: combatant.hasTalent(talents.EXPEDITIOUS_FORTIFICATION_TALENT) ? 300 : 420,
        gcd: null,
      },
      {
        spell: talents.HEALING_ELIXIR_TALENT.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 30,
        enabled: combatant.hasTalent(talents.HEALING_ELIXIR_TALENT),
        gcd: null,
      },
      {
        spell: talents.DAMPEN_HARM_TALENT.id,
        buffSpellId: talents.DAMPEN_HARM_TALENT.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: 120,
        enabled: combatant.hasTalent(talents.DAMPEN_HARM_TALENT),
        gcd: null,
      },
      {
        spell: talents.DIFFUSE_MAGIC_TALENT.id,
        buffSpellId: talents.DIFFUSE_MAGIC_TALENT.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: 90,
        enabled: combatant.hasTalent(talents.DIFFUSE_MAGIC_TALENT),
        gcd: null,
      },
      {
        spell: talents.ZEN_MEDITATION_TALENT.id,
        buffSpellId: talents.ZEN_MEDITATION_TALENT.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: combatant.hasTalent(talents.FUNDAMENTAL_OBSERVATION_TALENT) ? 225 : 300,
        gcd: null,
      },
      // Utility
      {
        spell: talents.RING_OF_PEACE_TALENT.id,
        category: SPELL_CATEGORY.UTILITY,
        enabled: combatant.hasTalent(talents.RING_OF_PEACE_TALENT),
        gcd: {
          // This was tested in-game (in Legion): it does NOT have a static GCD but a base GCD of 1sec and scales with Haste
          base: 1500,
        },
      },
      {
        spell: talents.CHI_TORPEDO_TALENT.id,
        category: SPELL_CATEGORY.UTILITY,
        enabled: combatant.hasTalent(talents.CHI_TORPEDO_TALENT),
        cooldown: 20,
        charges: 1 + Number(combatant.hasTalent(talents.IMPROVED_ROLL_TALENT)),
        // Both Roll and Chi Torpedo don't actually have a GCD but block all spells during its animation for about the same duration, so maybe time it in-game and mark it as channeling instead? The issue is you can follow up any ability on the GCD with chi torpedo/roll, so it can still cause overlap.
        gcd: null,
      },
      {
        spell: SPELLS.ROLL.id,
        category: SPELL_CATEGORY.UTILITY,
        enabled: !combatant.hasTalent(talents.CHI_TORPEDO_TALENT),
        cooldown: combatant.hasTalent(talents.CELERITY_TALENT) ? 15 : 20,
        charges:
          1 +
          Number(combatant.hasTalent(talents.CELERITY_TALENT)) +
          Number(combatant.hasTalent(talents.IMPROVED_ROLL_TALENT)),
        // Both Roll and Chi Torpedo don't actually have a GCD but block all spells during its animation for about the same duration, so maybe time it in-game and mark it as channeling instead? The issue is you can follow up any ability on the GCD with chi torpedo/roll, so it can still cause overlap.
        gcd: null,
      },
      {
        spell: talents.TRANSCENDENCE_TALENT.id,
        category: SPELL_CATEGORY.UTILITY,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.TRANSCENDENCE_TRANSFER.id,
        category: SPELL_CATEGORY.UTILITY,
        gcd: {
          // This was tested in-game (in Legion): it does NOT have a static GCD but a base GCD of 1sec and scales with Haste
          base: 1500,
        },
      },
      {
        spell: talents.SUMMON_BLACK_OX_STATUE_TALENT.id,
        category: SPELL_CATEGORY.UTILITY,
        enabled: combatant.hasTalent(talents.SUMMON_BLACK_OX_STATUE_TALENT),
        gcd: {
          static: 1000,
        },
      },
      {
        spell: talents.SUMMON_WHITE_TIGER_STATUE_TALENT.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        enabled: combatant.hasTalent(talents.SUMMON_WHITE_TIGER_STATUE_TALENT),
        gcd: {
          static: 1000,
        },
        cooldown: 120,
      },
      {
        spell: talents.PARALYSIS_TALENT.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 45,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.LEG_SWEEP.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: combatant.hasTalent(talents.TIGER_TAIL_SWEEP_TALENT) ? 50 : 60,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.PROVOKE.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 8,
        gcd: null,
        range: 30,
      },
      {
        spell: talents.SPEAR_HAND_STRIKE_TALENT.id,
        cooldown: 15,
        category: SPELL_CATEGORY.UTILITY,
        gcd: null,
      },
      // Its unlikely that these spells will ever be cast but if they are they will show.
      {
        spell: SPELLS.DETOX_ENERGY.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 8,
        gcd: {
          // This was tested in-game (in Legion): it does NOT have a static GCD but a base GCD of 1sec and scales with Haste
          base: 1500,
        },
      },
      {
        spell: SPELLS.VIVIFY.id, // don't know if the vivify spell has been updated to the new ID yet
        category: SPELL_CATEGORY.UTILITY,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: talents.TIGERS_LUST_TALENT.id,
        category: SPELL_CATEGORY.UTILITY,
        enabled: combatant.hasTalent(talents.TIGERS_LUST_TALENT),
        cooldown: 30,
        gcd: {
          static: 1000,
        },
      },
    ];
  }
}

export default Abilities;
