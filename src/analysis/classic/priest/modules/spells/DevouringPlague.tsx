import { t } from '@lingui/macro';
import { formatPercentage } from 'common/format';
import { SpellIcon, SpellLink } from 'interface';
import Analyzer, { Options } from 'parser/core/Analyzer';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import Enemies from 'parser/shared/modules/Enemies';
import UptimeBar from 'parser/ui/UptimeBar';
import * as SPELLS from '../../SPELLS';
import { Build } from 'analysis/classic/priest/CONFIG';

class DevouringPlague extends Analyzer {
  static dependencies = {
    enemies: Enemies,
  };
  protected enemies!: Enemies;

  get uptime() {
    return this.enemies.getBuffUptime(SPELLS.DEVOURING_PLAGUE) / this.owner.fightDuration;
  }

  get suggestionThresholds() {
    return {
      actual: this.uptime,
      isLessThan: {
        minor: 0.95,
        average: 0.9,
        major: 0.8,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  constructor(options: Options) {
    super(options);

    this.active = options.owner.build === Build.SHADOW;
  }

  suggestions(when: When) {
    when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <span>
          Your <SpellLink id={SPELLS.DEVOURING_PLAGUE} /> uptime can be improved. Try to pay more
          attention to your <SpellLink id={SPELLS.DEVOURING_PLAGUE} /> on the boss.
        </span>,
      )
        .icon('spell_shadow_devouringplague')
        .actual(
          t({
            id: 'priest.shadow.suggestions.devouringPlague.uptime',
            message: `${formatPercentage(actual)}% Devouring Plague uptime`,
          }),
        )
        .recommended(`>${formatPercentage(recommended)}% is recommended`),
    );
  }

  subStatistic() {
    const history = this.enemies.getDebuffHistory(SPELLS.DEVOURING_PLAGUE);
    return (
      <div className="flex">
        <div className="flex-sub icon">
          <SpellIcon id={SPELLS.DEVOURING_PLAGUE} />
        </div>
        <div className="flex-sub value" style={{ width: 140 }}>
          {formatPercentage(this.uptime, 0)}% <small>uptime</small>
        </div>
        <div className="flex-main chart" style={{ padding: 15 }}>
          <UptimeBar
            uptimeHistory={history}
            start={this.owner.fight.start_time}
            end={this.owner.fight.end_time}
          />
        </div>
      </div>
    );
  }
}

export default DevouringPlague;
