import TALENTS from 'common/TALENTS/shaman';
import { SpellLink } from 'interface';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events from 'parser/core/Events';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import AbilityTracker from 'parser/shared/modules/AbilityTracker';

class Icefury extends Analyzer {
  static dependencies = {
    abilityTracker: AbilityTracker,
  };
  empoweredFrostShockCasts = 0;
  protected abilityTracker!: AbilityTracker;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(TALENTS.ICEFURY_TALENT);
    if (!this.active) {
      return;
    }
    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(TALENTS.FROST_SHOCK_TALENT),
      this.onFrostShockCast,
    );
  }

  get suggestionThresholds() {
    return {
      actual:
        this.empoweredFrostShockCasts /
        this.abilityTracker.getAbility(TALENTS.ICEFURY_TALENT.id).casts,
      isLessThan: {
        minor: 4,
        average: 3.5,
        major: 3,
      },
      style: ThresholdStyle.DECIMAL,
    };
  }

  onFrostShockCast() {
    if (this.selectedCombatant.hasBuff(TALENTS.ICEFURY_TALENT.id)) {
      this.empoweredFrostShockCasts += 1;
    }
  }

  suggestions(when: When) {
    when(this.suggestionThresholds).addSuggestion((suggest, actual) =>
      suggest(
        <>
          You should fully utilize your <SpellLink spell={TALENTS.ICEFURY_TALENT} /> casts by
          casting 4 <SpellLink spell={TALENTS.FROST_SHOCK_TALENT} />s before the{' '}
          <SpellLink spell={TALENTS.ICEFURY_TALENT} /> buff expires. Pay attention to the remaining
          duration of the buff to ensure you have time to use all of the stacks.
        </>,
      )
        .icon(TALENTS.ICEFURY_TALENT.icon)
        .actual(
          <>
            On average, only {actual.toFixed(2)} <SpellLink spell={TALENTS.ICEFURY_TALENT} />
            (s) stacks were consumed with <SpellLink spell={TALENTS.FROST_SHOCK_TALENT} /> casts
            before <SpellLink spell={TALENTS.ICEFURY_TALENT} /> buff expired.
          </>,
        )
        .recommended("It's recommended to always consume all 4 stacks."),
    );
  }
}

export default Icefury;
