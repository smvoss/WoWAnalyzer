import { defineMessage } from '@lingui/macro';
import SPELLS from 'common/SPELLS';
import { TALENTS_MONK } from 'common/TALENTS';
import { SpellLink } from 'interface';
import { explanationAndDataSubsection } from 'interface/guide/components/ExplanationRow';
import { RoundedPanel } from 'interface/guide/components/GuideDivs';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, {
  CastEvent,
  DamageEvent,
  EndChannelEvent,
  GetRelatedEvent,
  HasAbility,
  RemoveBuffEvent,
} from 'parser/core/Events';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import AbilityTracker from 'parser/shared/modules/AbilityTracker';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import CastEfficiencyBar from 'parser/ui/CastEfficiencyBar';
import { GapHighlight } from 'parser/ui/CooldownBar';
import DonutChart from 'parser/ui/DonutChart';
import Statistic from 'parser/ui/Statistic';
import { STATISTIC_ORDER } from 'parser/ui/StatisticBox';

// Inspired by the penance bolt counter module from Discipline Priest

const FISTS_OF_FURY_MINIMUM_TICK_TIME = 100; // This is to check that additional ticks aren't just hitting secondary targets

class FistsofFury extends Analyzer {
  static dependencies = {
    abilityTracker: AbilityTracker,
  };
  previousTickTimestamp = 0;
  nonSerenityFistsTicks = 0;
  nonSerenityCasts = 0;
  lastCastInSerenity = false;

  currentChannelTicks = 0;

  // FoF will always hit one time, so this is ultimately a 1-indexed array of [1,5]
  ticksHit = [0, 0, 0, 0, 0];
  ticksHitSer = [0, 0, 0, 0, 0];
  colors = ['#666', '#1eff00', '#0070ff', '#a435ee', '#ff8000'];

  clipped: { [guid: number]: number } = {};
  clippedSER: { [guid: number]: number } = {};

  protected abilityTracker!: AbilityTracker;

  constructor(options: Options) {
    super(options);
    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(SPELLS.FISTS_OF_FURY_CAST),
      this.onFistsCast,
    );
    this.addEventListener(
      Events.damage.by(SELECTED_PLAYER).spell(SPELLS.FISTS_OF_FURY_DAMAGE),
      this.onFistsDamage,
    );
    this.addEventListener(
      Events.removebuff.by(SELECTED_PLAYER).spell(SPELLS.FISTS_OF_FURY_CAST),
      this.onRemoveBuff,
    );
    this.addEventListener(
      Events.EndChannel.by(SELECTED_PLAYER).spell(SPELLS.FISTS_OF_FURY_CAST),
      this.onChannelEnd,
    );
  }

  isNewFistsTick(timestamp: number) {
    return (
      !this.previousTickTimestamp ||
      timestamp - this.previousTickTimestamp > FISTS_OF_FURY_MINIMUM_TICK_TIME
    );
  }

  onFistsDamage(event: DamageEvent) {
    if (!this.isNewFistsTick(event.timestamp)) {
      return;
    }
    this.currentChannelTicks += 1;
    if (!this.lastCastInSerenity) {
      this.nonSerenityFistsTicks += 1;
    }
    this.previousTickTimestamp = event.timestamp;
  }

  onRemoveBuff(event: RemoveBuffEvent) {
    if (this.currentChannelTicks > 5) {
      console.log('error, detected too many ticks of fof');
      return;
    }

    if (this.lastCastInSerenity) {
      this.ticksHitSer[this.currentChannelTicks - 1] += 1;
    } else {
      this.ticksHit[this.currentChannelTicks - 1] += 1;
    }
  }

  onChannelEnd(event: EndChannelEvent) {
    const nextAbility = GetRelatedEvent(event, 'fof-cast');
    if (nextAbility !== undefined && HasAbility(nextAbility) && this.currentChannelTicks < 5) {
      // FoF has 5 total damage events, so if the channel ended with less than that we assume it was clipped
      if (this.lastCastInSerenity) {
        this.clippedSER[nextAbility.ability.guid] =
          (this.clippedSER[nextAbility.ability.guid] || 0) + 1;
      } else {
        this.clipped[nextAbility.ability.guid] = (this.clipped[nextAbility.ability.guid] || 0) + 1;
      }
    }
  }

  onFistsCast(event: CastEvent) {
    this.currentChannelTicks = 0;
    if (!this.selectedCombatant.hasBuff(TALENTS_MONK.SERENITY_TALENT.id)) {
      this.lastCastInSerenity = false;
      this.nonSerenityCasts += 1;
    } else {
      this.lastCastInSerenity = true;
    }
  }

  get averageTicks() {
    return this.nonSerenityFistsTicks / this.nonSerenityCasts;
  }

  get suggestionThresholds() {
    return {
      actual: this.averageTicks,
      isLessThan: {
        minor: 5,
        average: 4.75,
        major: 4.5,
      },
      style: ThresholdStyle.DECIMAL,
    };
  }

  donutChart(ticks: number[]) {
    return Object.values(ticks).map((val, idx) => {
      return { label: idx + 1, color: this.colors[idx], value: val };
    });
  }

  suggestions(when: When) {
    when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <span>
          {' '}
          You are cancelling your <SpellLink spell={SPELLS.FISTS_OF_FURY_CAST} /> casts early and
          losing ticks{' '}
        </span>,
      )
        .icon(SPELLS.FISTS_OF_FURY_CAST.icon)
        .actual(
          defineMessage({
            id: 'monk.windwalker.suggestions.fistOfFury.avgTicksPerCast',
            message: `${actual.toFixed(2)} average ticks on each Fists of Fury cast`,
          }),
        )
        .recommended(`Aim to get ${recommended} ticks with each Fists of Fury cast.`),
    );
  }

  statistic() {
    return (
      <Statistic
        position={STATISTIC_ORDER.CORE(4)}
        size="flexible"
        tooltip={
          <>
            Fists of Fury ticks 5 times over the duration of the channel
            <br />
            <br />
            Note: During <SpellLink spell={TALENTS_MONK.SERENITY_TALENT} />, Fists of Fury should be
            clipped by <SpellLink spell={SPELLS.RISING_SUN_KICK_DAMAGE} />. The graphs shown below
            are just for information.
          </>
        }
        dropdown={
          <div className="pad">
            <h3>
              Outside of <SpellLink spell={TALENTS_MONK.SERENITY_TALENT} />
            </h3>
            <DonutChart items={this.donutChart(this.ticksHit)} />
            <h3>
              Within <SpellLink spell={TALENTS_MONK.SERENITY_TALENT} />
            </h3>
            <small>
              During Serenity, Fists of Fury should be clipped by{' '}
              <SpellLink spell={SPELLS.RISING_SUN_KICK_DAMAGE} />
            </small>
            <DonutChart items={this.donutChart(this.ticksHitSer)} />
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Ability</th>
                  <th>Times Clipped</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(this.clipped).map(([key, value], idx) => (
                  <tr key={idx}>
                    <th>
                      <SpellLink spell={Number(key)} />
                    </th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      >
        <BoringSpellValueText spell={SPELLS.FISTS_OF_FURY_CAST}>
          {this.averageTicks.toFixed(2)} <small>Average ticks per cast</small>
        </BoringSpellValueText>
      </Statistic>
    );
  }

  get guideSubsection(): JSX.Element {
    const explanation = (
      <p>
        <b>
          <SpellLink spell={TALENTS_MONK.FISTS_OF_FURY_TALENT} />
        </b>{' '}
        is one of your primary dps skills, and in the majority of cases should be channeled to
        completion. When <SpellLink spell={TALENTS_MONK.XUENS_BATTLEGEAR_TALENT} /> is talented, it
        gives the buff <SpellLink spell={SPELLS.PRESSURE_POINT_BUFF} />, increasing the critical
        strike chance of all <SpellLink spell={TALENTS_MONK.RISING_SUN_KICK_TALENT} />
        's over the next 5 seconds by 40%.
        <br />
        <br />
        <SpellLink spell={TALENTS_MONK.FISTS_OF_FURY_TALENT} /> is a channel which should always be
        channeled to completion, unless actively within your{' '}
        <SpellLink spell={TALENTS_MONK.SERENITY_TALENT} /> window and then should only ever be
        clipped by <SpellLink spell={SPELLS.RISING_SUN_KICK_DAMAGE} />.
      </p>
    );

    const data = (
      <div>
        <RoundedPanel>
          <strong>
            <SpellLink spell={TALENTS_MONK.FISTS_OF_FURY_TALENT} /> cast efficiency
          </strong>
          {this.guideSubStatistic()}
          <h3>
            Outside of <SpellLink spell={TALENTS_MONK.SERENITY_TALENT} />
          </h3>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', marginRight: '4rem' }}>
              {/* TODO: I broke something here, now shows NaN for 5-tick casts out of SER  */}
              <DonutChart items={this.donutChart(this.ticksHit)} />
            </div>
            <table className="table table-condensed" style={{ flex: 1 }}>
              <thead>
                <tr>
                  <th>Ability</th>
                  <th>Times Clipped</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(this.clipped).map(([key, value], idx) => (
                  <tr key={idx}>
                    <th>
                      <SpellLink spell={Number(key)} />
                    </th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3>
            Within <SpellLink spell={TALENTS_MONK.SERENITY_TALENT} />
          </h3>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', marginRight: '4rem' }}>
              <DonutChart items={this.donutChart(this.ticksHitSer)} />
            </div>
            <table className="table table-condensed" style={{ flex: 1 }}>
              <thead>
                <tr>
                  <th>Ability</th>
                  <th>Times Clipped</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(this.clippedSER).map(([key, value], idx) => (
                  <tr key={idx}>
                    <th>
                      <SpellLink spell={Number(key)} />
                    </th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RoundedPanel>
      </div>
    );

    return explanationAndDataSubsection(explanation, data);
  }

  guideSubStatistic() {
    return (
      <CastEfficiencyBar
        spellId={TALENTS_MONK.FISTS_OF_FURY_TALENT.id}
        gapHighlightMode={GapHighlight.FullCooldown}
        minimizeIcons
        slimLines
        useThresholds
      />
    );
  }
}

export default FistsofFury;
