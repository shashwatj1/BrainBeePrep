import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, {
  G,
  Path,
  Circle,
  Ellipse,
  Rect,
  Line,
  Text as SvgText,
} from 'react-native-svg';

export const EAR_PARTS = [
  {
    id: 'pinna',
    name: 'Pinna (Outer Ear)',
    description: 'Collects and funnels sound waves into the ear canal',
  },
  {
    id: 'ear_canal',
    name: 'Ear Canal',
    description: 'Tube that directs sound waves to the eardrum',
  },
  {
    id: 'eardrum',
    name: 'Eardrum (Tympanic Membrane)',
    description: 'Thin membrane that vibrates in response to sound waves',
  },
  {
    id: 'malleus',
    name: 'Malleus (Hammer)',
    description:
      'First ossicle; attached to the eardrum; transmits vibrations to the incus',
  },
  {
    id: 'incus',
    name: 'Incus (Anvil)',
    description: 'Second ossicle; connects malleus to stapes',
  },
  {
    id: 'stapes',
    name: 'Stapes (Stirrup)',
    description:
      'Third ossicle; smallest bone in the body; presses against the oval window',
  },
  {
    id: 'oval_window',
    name: 'Oval Window',
    description:
      'Membrane-covered opening where stapes transmits vibrations into the fluid-filled cochlea',
  },
  {
    id: 'cochlea',
    name: 'Cochlea',
    description:
      'Spiral-shaped organ containing the organ of Corti; converts mechanical vibrations to electrical signals via hair cells',
  },
  {
    id: 'hair_cells',
    name: 'Hair Cells',
    description:
      'Mechanoreceptors in the cochlea that convert fluid vibrations into electrical signals; damage causes permanent hearing loss',
  },
  {
    id: 'auditory_nerve',
    name: 'Auditory Nerve',
    description:
      'Carries electrical signals from hair cells to the brainstem and auditory cortex',
  },
];

const COLORS = {
  pinna: '#64748B',
  ear_canal: '#64748B',
  eardrum: '#FBBF24',
  malleus: '#FB923C',
  incus: '#F87171',
  stapes: '#F472B6',
  oval_window: '#A78BFA',
  cochlea: '#4C6EF5',
  hair_cells: '#22D3EE',
  auditory_nerve: '#4ADE80',
  label: '#FFFFFF',
  labelLine: '#64748B',
};

const HIGHLIGHT_BOOST = 1.0;
const DIM_OPACITY = 0.35;

const EarDiagram = ({
  width = 350,
  height = 280,
  showLabels = true,
  highlightedParts = [],
  onPartPress,
}) => {
  const hasHighlights = highlightedParts && highlightedParts.length > 0;

  const getOpacity = (partId) => {
    if (!hasHighlights) return 1;
    return highlightedParts.includes(partId) ? HIGHLIGHT_BOOST : DIM_OPACITY;
  };

  const getStrokeWidth = (partId, base = 1.5) => {
    if (hasHighlights && highlightedParts.includes(partId)) return base + 1;
    return base;
  };

  const handlePress = (partId) => {
    if (onPartPress) {
      const part = EAR_PARTS.find((p) => p.id === partId);
      onPartPress(part);
    }
  };

  const scaleX = width / 350;
  const scaleY = height / 280;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox="0 0 350 280">
        {/* ===== PINNA (Outer Ear) ===== */}
        <G opacity={getOpacity('pinna')} onPress={() => handlePress('pinna')}>
          <Path
            d="M 30 70 Q 15 60, 12 80 Q 8 100, 10 120 Q 8 140, 15 158
               Q 20 170, 30 178 Q 38 184, 42 175 Q 46 165, 44 150
               Q 42 140, 45 130 Q 50 118, 48 105 Q 47 90, 42 80
               Q 38 72, 30 70 Z"
            fill={COLORS.pinna}
            fillOpacity={0.25}
            stroke={COLORS.pinna}
            strokeWidth={getStrokeWidth('pinna', 2)}
          />
          {/* Inner ear fold / antihelix */}
          <Path
            d="M 28 80 Q 22 90, 24 105 Q 25 118, 30 128 Q 34 138, 36 148"
            fill="none"
            stroke={COLORS.pinna}
            strokeWidth={1.2}
            strokeOpacity={0.6}
          />
          {/* Tragus */}
          <Path
            d="M 42 115 Q 48 118, 50 125 Q 48 130, 42 128"
            fill={COLORS.pinna}
            fillOpacity={0.35}
            stroke={COLORS.pinna}
            strokeWidth={1}
          />
          {/* Ear lobe */}
          <Path
            d="M 30 178 Q 25 188, 28 192 Q 32 196, 38 190 Q 42 184, 42 175"
            fill={COLORS.pinna}
            fillOpacity={0.2}
            stroke={COLORS.pinna}
            strokeWidth={1.5}
          />
        </G>

        {/* ===== EAR CANAL ===== */}
        <G
          opacity={getOpacity('ear_canal')}
          onPress={() => handlePress('ear_canal')}>
          <Path
            d="M 50 118 L 105 118 Q 110 118, 110 123 L 110 128
               Q 110 133, 105 133 L 50 133"
            fill={COLORS.ear_canal}
            fillOpacity={0.15}
            stroke={COLORS.ear_canal}
            strokeWidth={getStrokeWidth('ear_canal', 1.5)}
          />
        </G>

        {/* ===== EARDRUM (Tympanic Membrane) ===== */}
        <G
          opacity={getOpacity('eardrum')}
          onPress={() => handlePress('eardrum')}>
          <Ellipse
            cx={113}
            cy={126}
            rx={3}
            ry={14}
            fill={COLORS.eardrum}
            fillOpacity={0.3}
            stroke={COLORS.eardrum}
            strokeWidth={getStrokeWidth('eardrum', 1.8)}
          />
        </G>

        {/* ===== MALLEUS (Hammer) ===== */}
        <G
          opacity={getOpacity('malleus')}
          onPress={() => handlePress('malleus')}>
          {/* Handle attached to eardrum */}
          <Line
            x1={116}
            y1={118}
            x2={116}
            y2={136}
            stroke={COLORS.malleus}
            strokeWidth={getStrokeWidth('malleus', 2.5)}
            strokeLinecap="round"
          />
          {/* Head */}
          <Circle
            cx={118}
            cy={115}
            r={4}
            fill={COLORS.malleus}
            fillOpacity={0.5}
            stroke={COLORS.malleus}
            strokeWidth={getStrokeWidth('malleus', 1.5)}
          />
        </G>

        {/* ===== INCUS (Anvil) ===== */}
        <G opacity={getOpacity('incus')} onPress={() => handlePress('incus')}>
          {/* Body */}
          <Path
            d="M 122 113 Q 130 108, 136 112 Q 138 116, 135 120 L 130 126"
            fill={COLORS.incus}
            fillOpacity={0.35}
            stroke={COLORS.incus}
            strokeWidth={getStrokeWidth('incus', 2)}
            strokeLinecap="round"
          />
          {/* Long process */}
          <Line
            x1={130}
            y1={126}
            x2={134}
            y2={138}
            stroke={COLORS.incus}
            strokeWidth={getStrokeWidth('incus', 2)}
            strokeLinecap="round"
          />
        </G>

        {/* ===== STAPES (Stirrup) ===== */}
        <G
          opacity={getOpacity('stapes')}
          onPress={() => handlePress('stapes')}>
          {/* Stirrup shape */}
          <Path
            d="M 134 138 L 140 134 Q 146 130, 148 134 L 148 140
               Q 146 144, 140 140 L 134 138 Z"
            fill={COLORS.stapes}
            fillOpacity={0.3}
            stroke={COLORS.stapes}
            strokeWidth={getStrokeWidth('stapes', 1.8)}
          />
          {/* Footplate */}
          <Line
            x1={148}
            y1={133}
            x2={148}
            y2={141}
            stroke={COLORS.stapes}
            strokeWidth={getStrokeWidth('stapes', 2.5)}
            strokeLinecap="round"
          />
        </G>

        {/* ===== OVAL WINDOW ===== */}
        <G
          opacity={getOpacity('oval_window')}
          onPress={() => handlePress('oval_window')}>
          <Ellipse
            cx={152}
            cy={137}
            rx={3}
            ry={8}
            fill={COLORS.oval_window}
            fillOpacity={0.3}
            stroke={COLORS.oval_window}
            strokeWidth={getStrokeWidth('oval_window', 1.8)}
          />
        </G>

        {/* ===== COCHLEA (Spiral) ===== */}
        <G
          opacity={getOpacity('cochlea')}
          onPress={() => handlePress('cochlea')}>
          {/* Outer spiral */}
          <Path
            d="M 158 137 Q 162 115, 185 112 Q 210 110, 218 130
               Q 224 148, 210 160 Q 196 170, 180 164
               Q 168 158, 170 145 Q 172 134, 184 130
               Q 194 128, 198 137 Q 200 144, 192 148
               Q 186 150, 186 143"
            fill="none"
            stroke={COLORS.cochlea}
            strokeWidth={getStrokeWidth('cochlea', 2.5)}
            strokeLinecap="round"
          />
          {/* Fill hint for cochlea body */}
          <Path
            d="M 165 125 Q 175 110, 195 112 Q 215 114, 220 135
               Q 222 155, 205 165 Q 185 172, 168 155 Q 158 142, 165 125 Z"
            fill={COLORS.cochlea}
            fillOpacity={0.1}
            stroke="none"
          />
        </G>

        {/* ===== HAIR CELLS (inside cochlea inset) ===== */}
        <G
          opacity={getOpacity('hair_cells')}
          onPress={() => handlePress('hair_cells')}>
          {/* Inset box */}
          <Rect
            x={230}
            y={95}
            width={50}
            height={40}
            rx={4}
            ry={4}
            fill="none"
            stroke={COLORS.hair_cells}
            strokeWidth={1}
            strokeDasharray="3,2"
          />
          {/* Connector line from cochlea to inset */}
          <Line
            x1={200}
            y1={140}
            x2={230}
            y2={115}
            stroke={COLORS.hair_cells}
            strokeWidth={0.8}
            strokeDasharray="3,2"
          />
          {/* Hair cell bodies */}
          <Rect x={237} y={118} width={5} height={12} rx={1} fill={COLORS.hair_cells} fillOpacity={0.6} />
          <Rect x={246} y={118} width={5} height={12} rx={1} fill={COLORS.hair_cells} fillOpacity={0.6} />
          <Rect x={255} y={118} width={5} height={12} rx={1} fill={COLORS.hair_cells} fillOpacity={0.6} />
          <Rect x={264} y={118} width={5} height={12} rx={1} fill={COLORS.hair_cells} fillOpacity={0.6} />
          {/* Stereocilia (tiny hairs on top) */}
          <Line x1={238} y1={118} x2={237} y2={110} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          <Line x1={240} y1={118} x2={240} y2={109} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          <Line x1={242} y1={118} x2={243} y2={110} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          <Line x1={247} y1={118} x2={246} y2={109} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          <Line x1={249} y1={118} x2={249} y2={108} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          <Line x1={251} y1={118} x2={252} y2={109} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          <Line x1={256} y1={118} x2={255} y2={110} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          <Line x1={258} y1={118} x2={258} y2={109} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          <Line x1={260} y1={118} x2={261} y2={110} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          <Line x1={265} y1={118} x2={264} y2={110} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          <Line x1={267} y1={118} x2={267} y2={109} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          <Line x1={269} y1={118} x2={270} y2={110} stroke={COLORS.hair_cells} strokeWidth={0.8} />
          {/* Basilar membrane line */}
          <Line
            x1={235}
            y1={131}
            x2={272}
            y2={131}
            stroke={COLORS.hair_cells}
            strokeWidth={1.2}
            strokeOpacity={0.5}
          />
          {/* Inset label */}
          <SvgText
            x={255}
            y={104}
            fill={COLORS.hair_cells}
            fontSize={6}
            fontWeight="600"
            textAnchor="middle">
            Hair Cells
          </SvgText>
        </G>

        {/* ===== AUDITORY NERVE ===== */}
        <G
          opacity={getOpacity('auditory_nerve')}
          onPress={() => handlePress('auditory_nerve')}>
          <Path
            d="M 192 155 Q 200 175, 215 185 Q 230 195, 250 198
               Q 270 200, 290 195"
            fill="none"
            stroke={COLORS.auditory_nerve}
            strokeWidth={getStrokeWidth('auditory_nerve', 3)}
            strokeLinecap="round"
          />
          {/* Nerve fiber branches near cochlea */}
          <Path
            d="M 186 150 Q 190 158, 192 155"
            fill="none"
            stroke={COLORS.auditory_nerve}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <Path
            d="M 182 158 Q 188 164, 196 162"
            fill="none"
            stroke={COLORS.auditory_nerve}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </G>

        {/* ===== EUSTACHIAN TUBE ===== */}
        <G opacity={hasHighlights ? DIM_OPACITY : 1}>
          <Path
            d="M 130 150 Q 125 170, 110 190 Q 100 205, 85 215"
            fill="none"
            stroke="#64748B"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="4,3"
          />
          {showLabels && (
            <SvgText
              x={68}
              y={222}
              fill={COLORS.label}
              fontSize={6.5}
              fontWeight="500"
              textAnchor="middle">
              Eustachian Tube
            </SvgText>
          )}
        </G>

        {/* ===== LABELS ===== */}
        {showLabels && (
          <G>
            {/* Pinna label */}
            <Line x1={20} y1={60} x2={20} y2={50} stroke={COLORS.labelLine} strokeWidth={0.8} />
            <SvgText x={20} y={46} fill={COLORS.label} fontSize={6.5} fontWeight="500" textAnchor="middle">
              Pinna
            </SvgText>

            {/* Ear Canal label */}
            <Line x1={78} y1={118} x2={78} y2={105} stroke={COLORS.labelLine} strokeWidth={0.8} />
            <SvgText x={78} y={101} fill={COLORS.label} fontSize={6.5} fontWeight="500" textAnchor="middle">
              Ear Canal
            </SvgText>

            {/* Eardrum label */}
            <Line x1={113} y1={112} x2={113} y2={90} stroke={COLORS.labelLine} strokeWidth={0.8} />
            <Line x1={113} y1={90} x2={100} y2={82} stroke={COLORS.labelLine} strokeWidth={0.8} />
            <SvgText x={100} y={78} fill={COLORS.label} fontSize={6.5} fontWeight="500" textAnchor="middle">
              Eardrum
            </SvgText>

            {/* Malleus label */}
            <Line x1={118} y1={110} x2={108} y2={72} stroke={COLORS.labelLine} strokeWidth={0.8} />
            <SvgText x={108} y={68} fill={COLORS.label} fontSize={6.5} fontWeight="500" textAnchor="middle">
              Malleus
            </SvgText>

            {/* Incus label */}
            <Line x1={132} y1={110} x2={140} y2={80} stroke={COLORS.labelLine} strokeWidth={0.8} />
            <SvgText x={140} y={76} fill={COLORS.label} fontSize={6.5} fontWeight="500" textAnchor="middle">
              Incus
            </SvgText>

            {/* Stapes label */}
            <Line x1={142} y1={130} x2={155} y2={76} stroke={COLORS.labelLine} strokeWidth={0.8} />
            <SvgText x={160} y={72} fill={COLORS.label} fontSize={6.5} fontWeight="500" textAnchor="middle">
              Stapes
            </SvgText>

            {/* Oval Window label */}
            <Line x1={152} y1={128} x2={165} y2={68} stroke={COLORS.labelLine} strokeWidth={0.8} />
            <SvgText x={182} y={64} fill={COLORS.label} fontSize={6.5} fontWeight="500" textAnchor="middle">
              Oval Window
            </SvgText>

            {/* Cochlea label */}
            <Line x1={195} y1={110} x2={210} y2={52} stroke={COLORS.labelLine} strokeWidth={0.8} />
            <SvgText x={220} y={48} fill={COLORS.label} fontSize={6.5} fontWeight="500" textAnchor="middle">
              Cochlea
            </SvgText>

            {/* Auditory Nerve label */}
            <Line x1={260} y1={198} x2={275} y2={210} stroke={COLORS.labelLine} strokeWidth={0.8} />
            <SvgText x={290} y={218} fill={COLORS.label} fontSize={6.5} fontWeight="500" textAnchor="middle">
              Auditory Nerve
            </SvgText>

            {/* Section labels */}
            <SvgText x={30} y={16} fill={COLORS.label} fontSize={7} fontWeight="700" textAnchor="start" opacity={0.5}>
              OUTER EAR
            </SvgText>
            <Line x1={75} y1={14} x2={75} y2={24} stroke={COLORS.labelLine} strokeWidth={0.5} opacity={0.4} />
            <SvgText x={85} y={16} fill={COLORS.label} fontSize={7} fontWeight="700" textAnchor="start" opacity={0.5}>
              MIDDLE EAR
            </SvgText>
            <Line x1={155} y1={14} x2={155} y2={24} stroke={COLORS.labelLine} strokeWidth={0.5} opacity={0.4} />
            <SvgText x={165} y={16} fill={COLORS.label} fontSize={7} fontWeight="700" textAnchor="start" opacity={0.5}>
              INNER EAR
            </SvgText>

            {/* Vertical division lines (subtle) */}
            <Line x1={75} y1={24} x2={75} y2={260} stroke={COLORS.labelLine} strokeWidth={0.3} opacity={0.2} strokeDasharray="4,4" />
            <Line x1={155} y1={24} x2={155} y2={260} stroke={COLORS.labelLine} strokeWidth={0.3} opacity={0.2} strokeDasharray="4,4" />

            {/* Title */}
            <SvgText x={175} y={272} fill={COLORS.label} fontSize={8} fontWeight="700" textAnchor="middle" opacity={0.6}>
              Cross-Section of the Human Ear
            </SvgText>
          </G>
        )}
      </Svg>
    </View>
  );
};

export default EarDiagram;
