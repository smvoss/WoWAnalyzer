import { change, date } from 'common/changelog';
import { TALENTS_PRIEST } from 'common/TALENTS';
import SPELLS  from 'common/SPELLS'
import { Hana, ToppleTheNun } from 'CONTRIBUTORS';
import { SpellLink } from 'interface';


export default [
  change(date(2023, 1, 14), <><SpellLink id={SPELLS.SINS_OF_THE_MANY.id}/> module no longer uses Atonement event.</>, Hana),
  change(date(2023, 1, 10), <><SpellLink id={TALENTS_PRIEST.ATONEMENT_TALENT.id}/> refactor begun - added normalizer to create links between events.</>, Hana),
  change(date(2023, 1, 4), <><SpellLink id={TALENTS_PRIEST.CRYSTALLINE_REFLECTION_TALENT.id}/> bugfixes.</>, Hana),
  change(date(2022, 12, 26), 'Disable Twilight Equilibrium analyzer.', ToppleTheNun),
  change(date(2022, 12, 11), <><SpellLink id={TALENTS_PRIEST.RAPTURE_TALENT.id}/> added to guide.</>, Hana),
  change(date(2022, 11, 26), <>Enabled <SpellLink id={TALENTS_PRIEST.BLAZE_OF_LIGHT_TALENT.id}/>.</>, Hana),
  change(date(2022, 11, 23), <>Support for <SpellLink id={TALENTS_PRIEST.TWILIGHT_EQUILIBRIUM_TALENT.id}/>.</>, Hana),
  change(date(2022, 11, 23), <><SpellLink id={TALENTS_PRIEST.SCHISM_TALENT.id}/> updated following nerfs.</>, Hana),
  change(date(2022, 11, 23), <><SpellLink id={TALENTS_PRIEST.MALICIOUS_INTENT_TALENT.id}/> updated following buffs.</>, Hana),
  change(date(2022, 11, 23), <>Updated <SpellLink id={TALENTS_PRIEST.CRYSTALLINE_REFLECTION_TALENT.id}/> following nerfs.</>, Hana),
  change(date(2022, 11, 8), <>Updated <SpellLink id={TALENTS_PRIEST.TWIST_OF_FATE_TALENT.id}/> to use correct damage multiplier.</>, Hana),
  change(date(2022, 11, 7), <><SpellLink id={TALENTS_PRIEST.PROTECTIVE_LIGHT_TALENT.id}/> support added.</>, Hana),
  change(date(2022, 11, 6), <>Added <SpellLink id={TALENTS_PRIEST.BINDING_HEALS_TALENT.id}/> section to guide.</>, Hana),
  change(date(2022, 11, 6), <>Added DPS rotation to <SpellLink id={TALENTS_PRIEST.EVANGELISM_TALENT.id}/> guide.</>, Hana),
  change(date(2022, 11, 5), <>Updated <SpellLink id={SPELLS.SINS_OF_THE_MANY.id}/>.</>, Hana),
  change(date(2022, 11, 5), <>Added <SpellLink id={TALENTS_PRIEST.RESPLENDENT_LIGHT_TALENT.id}/>.</>, Hana),
  change(date(2022, 10, 30), <>Showed <SpellLink id={TALENTS_PRIEST.EVANGELISM_TALENT.id}/> casts and highlighted casts which are bad</>, Hana),
  change(date(2022, 10, 30), <>First backend section of <SpellLink id={TALENTS_PRIEST.EVANGELISM_TALENT.id}/>.</>, Hana),
  change(date(2022, 10, 29), <>Hid tier bonus when not using it</>, Hana),
  change(date(2022, 10, 29), <>Added line break in <SpellLink id={TALENTS_PRIEST.TWIST_OF_FATE_TALENT}/> module.</>, Hana),
  change(date(2022, 10, 23), <>Updated abilities file with new spells, updated mana costs of spells.</>, Hana),
  change(date(2022, 10, 23), <>Updated list of spells which are effected by healing increases.</>, Hana),
  change(date(2022, 10, 23), <>Updated <SpellLink id={TALENTS_PRIEST.PURGE_THE_WICKED_TALENT.id}/> section to the Guide.</>, Hana),
  change(date(2022, 10, 22), <>Added <SpellLink id={TALENTS_PRIEST.PURGE_THE_WICKED_TALENT.id}/> section to the Guide.</>, Hana),
  change(date(2022, 10, 22), <>Initial guide/suggestion revamp implementation, including section for <SpellLink id={TALENTS_PRIEST.POWER_WORD_RADIANCE_TALENT.id}/></>, Hana),
  change(date(2022, 10, 22), <>Added <SpellLink id={TALENTS_PRIEST.MALICIOUS_INTENT_TALENT}/>.</>, Hana),
  change(date(2022, 10, 16), <>Added <SpellLink id={TALENTS_PRIEST.PAIN_AND_SUFFERING_TALENT.id}/> and <SpellLink id={TALENTS_PRIEST.THROES_OF_PAIN_TALENT}/>.</>, Hana),
  change(date(2022, 10, 16), <>Added <SpellLink id={TALENTS_PRIEST.POWER_WORD_RADIANCE_TALENT.id}/> module.</>, Hana),
  change(date(2022, 10, 16), <>Fixed <SpellLink id={TALENTS_PRIEST.CONTRITION_TALENT.id}/>.</>, Hana),
  change(date(2022, 10, 15), <>Reorganised talents display</>, Hana),
  change(date(2022, 10, 15), <><SpellLink id={SPELLS.POWER_WORD_SHIELD.id}/> bugfixes. </>, Hana),
  change(date(2022, 10, 15), <>Added <SpellLink id={TALENTS_PRIEST.STOLEN_PSYCHE_TALENT.id}/>.</>, Hana),
  change(date(2022, 10, 11), <>Added <SpellLink id={TALENTS_PRIEST.CRYSTALLINE_REFLECTION_TALENT.id}/> module showing it's damage breakdown.</>, Hana),
  change(date(2022, 10, 10), <>Added generic <SpellLink id={SPELLS.POWER_WORD_SHIELD.id}/> module which handles attribution of it's amplifiers</>, Hana),
  change(date(2022, 10, 8), <>Added <SpellLink id={TALENTS_PRIEST.AEGIS_OF_WRATH_TALENT.id}/>.</>, Hana),
  change(date(2022, 10, 3), <>Added <SpellLink id={TALENTS_PRIEST.EXPIATION_TALENT.id}/>.</>, Hana),
  change(date(2022, 10, 3), <>Added <SpellLink id={TALENTS_PRIEST.INDEMNITY_TALENT.id}/>.</>, Hana),
  change(date(2022, 10, 3), <>Dragonflight Clean up.</>, Hana),
];
