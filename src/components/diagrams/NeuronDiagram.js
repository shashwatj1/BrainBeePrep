import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, {
  G,
  Path,
  Circle,
  Ellipse,
  Line,
  Text as SvgText,
} from 'react-native-svg';

export const NEURON_PARTS = [
  {
    id: 'dendrites',
    name: 'Dendrites',
    description:
      'Branch-like extensions that receive signals from other neurons',
  },
  {
    id: 'cell_body',
    name: 'Cell Body (Soma)',
    description:
      'Contains the nucleus and most organelles; integrates incoming signals',
  },
  {
    id: 'nucleus',
    name: 'Nucleus',
    description: 'Contains DNA and controls cell function',
  },
  {
    id: 'axon_hillock',
    name: 'Axon Hillock',
    description:
      'Where the axon begins; initiates action potentials when threshold is reached',
  },
  {
    id: 'axon',
    name: 'Axon',
    description:
      'Long fiber that carries electrical signals away from the cell body',
  },
  {
    id: 'myelin_sheath',
    name: 'Myelin Sheath',
    description:
      'Fatty insulation formed by oligodendrocytes (CNS) or Schwann cells (PNS) that speeds signal transmission',
  },
  {
    id: 'nodes_of_ranvier',
    name: 'Nodes of Ranvier',
    description:
      'Gaps between myelin segments where ions can flow, enabling saltatory conduction',
  },
  {
    id: 'axon_terminals',
    name: 'Axon Terminals',
    description:
      'Branching endpoints that release neurotransmitters into the synaptic cleft',
  },
  {
    id: 'synapse',
    name: 'Synapse',
    description:
      'The junction between two neurons where chemical signaling occurs',
  },
];

const COLORS = {
  cell_body: '#4C6EF5',
  dendrites: '#22D3EE',
  axon: '#4ADE80',
  myelin_sheath: '#A78BFA',
  nodes_of_ranvier: '#FB923C',
  axon_terminals: '#F472B6',
  nucleus: '#5B8DEF',
  synapse: '#F472B6',
  axon_hillock: '#4C6EF5',
  label: '#FFFFFF',
  labelLine: '#64748B',
  highlight: '#FBBF24',
};

const NeuronDiagram = ({
  width = 350,
  height = 280,
  showLabels = true,
  highlightedParts = [],
  onPartPress,
}) => {
  const isHighlighted = (partId) => highlightedParts.includes(partId);

  const getColor = (partId) => {
    if (isHighlighted(partId)) return COLORS.highlight;
    return COLORS[partId] || '#FFFFFF';
  };

  const getStrokeWidth = (partId) => (isHighlighted(partId) ? 2.5 : 1.5);

  const handlePress = (partId) => {
    if (onPartPress) {
      onPartPress(partId);
    }
  };

  // Scale factors relative to 350x280 base
  const sx = width / 350;
  const sy = height / 280;

  // --- Coordinate constants (in base 350x280 space) ---
  // Cell body center
  const somaX = 90;
  const somaY = 130;
  const somaRx = 30;
  const somaRy = 24;

  // Nucleus
  const nucleusR = 10;

  // Axon hillock
  const hillockX = 120;

  // Axon line
  const axonStartX = 130;
  const axonEndX = 275;
  const axonY = 130;

  // Myelin segments
  const myelinSegments = [
    { cx: 158, rx: 14, ry: 10 },
    { cx: 196, rx: 14, ry: 10 },
    { cx: 234, rx: 14, ry: 10 },
  ];

  // Nodes of Ranvier positions (between myelin segments)
  const nodesOfRanvier = [177, 215, 249];

  // Axon terminals
  const termStartX = 275;

  // Label positions: { partId, labelX, labelY, anchorX, anchorY }
  const labelData = [
    { partId: 'dendrites', labelX: 18, labelY: 22, anchorX: 35, anchorY: 80 },
    { partId: 'cell_body', labelX: 58, labelY: 260, anchorX: 88, anchorY: 155 },
    { partId: 'nucleus', labelX: 60, labelY: 210, anchorX: 90, anchorY: 140 },
    { partId: 'axon_hillock', labelX: 105, labelY: 260, anchorX: 125, anchorY: 140 },
    { partId: 'axon', labelX: 175, labelY: 260, anchorX: 200, anchorY: 135 },
    { partId: 'myelin_sheath', labelX: 175, labelY: 22, anchorX: 196, anchorY: 120 },
    { partId: 'nodes_of_ranvier', labelX: 220, labelY: 22, anchorX: 215, anchorY: 120 },
    { partId: 'axon_terminals', labelX: 280, labelY: 210, anchorX: 295, anchorY: 155 },
    { partId: 'synapse', labelX: 305, labelY: 260, anchorX: 315, anchorY: 165 },
  ];

  const renderLabel = (item) => {
    const part = NEURON_PARTS.find((p) => p.id === item.partId);
    if (!part) return null;
    const color = isHighlighted(item.partId) ? COLORS.highlight : COLORS.label;
    return (
      <G key={`label-${item.partId}`}>
        <Line
          x1={item.anchorX * sx}
          y1={item.anchorY * sy}
          x2={item.labelX * sx}
          y2={item.labelY * sy}
          stroke={isHighlighted(item.partId) ? COLORS.highlight : COLORS.labelLine}
          strokeWidth={0.8}
          strokeDasharray="2,2"
        />
        <Circle
          cx={item.anchorX * sx}
          cy={item.anchorY * sy}
          r={2}
          fill={isHighlighted(item.partId) ? COLORS.highlight : COLORS.labelLine}
        />
        <SvgText
          x={item.labelX * sx}
          y={item.labelY * sy}
          fill={color}
          fontSize={7.5 * Math.min(sx, sy)}
          fontWeight={isHighlighted(item.partId) ? 'bold' : 'normal'}
          textAnchor="middle"
        >
          {part.name}
        </SvgText>
      </G>
    );
  };

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* ======= DENDRITES ======= */}
        <G>
          {/* Main dendrite branches */}
          <Path
            d={`M${(somaX - somaRx + 5) * sx} ${somaY * sy}
               C${(somaX - 50) * sx} ${(somaY - 10) * sy},
                ${(somaX - 55) * sx} ${(somaY - 35) * sy},
                ${(somaX - 70) * sx} ${(somaY - 50) * sy}`}
            stroke={getColor('dendrites')}
            strokeWidth={getStrokeWidth('dendrites')}
            fill="none"
            strokeLinecap="round"
          />
          {/* Upper sub-branch */}
          <Path
            d={`M${(somaX - 58) * sx} ${(somaY - 38) * sy}
               C${(somaX - 65) * sx} ${(somaY - 50) * sy},
                ${(somaX - 72) * sx} ${(somaY - 60) * sy},
                ${(somaX - 80) * sx} ${(somaY - 68) * sy}`}
            stroke={getColor('dendrites')}
            strokeWidth={getStrokeWidth('dendrites') * 0.7}
            fill="none"
            strokeLinecap="round"
          />
          {/* Top branch */}
          <Path
            d={`M${(somaX - somaRx + 8) * sx} ${(somaY - 8) * sy}
               C${(somaX - 45) * sx} ${(somaY - 30) * sy},
                ${(somaX - 55) * sx} ${(somaY - 55) * sy},
                ${(somaX - 65) * sx} ${(somaY - 72) * sy}`}
            stroke={getColor('dendrites')}
            strokeWidth={getStrokeWidth('dendrites')}
            fill="none"
            strokeLinecap="round"
          />
          {/* Upper tiny fork */}
          <Path
            d={`M${(somaX - 60) * sx} ${(somaY - 62) * sy}
               L${(somaX - 72) * sx} ${(somaY - 78) * sy}`}
            stroke={getColor('dendrites')}
            strokeWidth={getStrokeWidth('dendrites') * 0.5}
            fill="none"
            strokeLinecap="round"
          />
          {/* Middle-upper branch */}
          <Path
            d={`M${(somaX - somaRx + 2) * sx} ${(somaY + 5) * sy}
               C${(somaX - 48) * sx} ${(somaY + 2) * sy},
                ${(somaX - 58) * sx} ${(somaY - 10) * sy},
                ${(somaX - 68) * sx} ${(somaY - 20) * sy}`}
            stroke={getColor('dendrites')}
            strokeWidth={getStrokeWidth('dendrites') * 0.8}
            fill="none"
            strokeLinecap="round"
          />
          {/* Bottom branch */}
          <Path
            d={`M${(somaX - somaRx + 5) * sx} ${(somaY + 10) * sy}
               C${(somaX - 45) * sx} ${(somaY + 20) * sy},
                ${(somaX - 55) * sx} ${(somaY + 40) * sy},
                ${(somaX - 65) * sx} ${(somaY + 55) * sy}`}
            stroke={getColor('dendrites')}
            strokeWidth={getStrokeWidth('dendrites')}
            fill="none"
            strokeLinecap="round"
          />
          {/* Bottom sub-branch */}
          <Path
            d={`M${(somaX - 52) * sx} ${(somaY + 35) * sy}
               C${(somaX - 60) * sx} ${(somaY + 45) * sy},
                ${(somaX - 70) * sx} ${(somaY + 50) * sy},
                ${(somaX - 78) * sx} ${(somaY + 42) * sy}`}
            stroke={getColor('dendrites')}
            strokeWidth={getStrokeWidth('dendrites') * 0.6}
            fill="none"
            strokeLinecap="round"
          />
          {/* Lower tiny fork */}
          <Path
            d={`M${(somaX - 60) * sx} ${(somaY + 48) * sy}
               L${(somaX - 70) * sx} ${(somaY + 62) * sy}`}
            stroke={getColor('dendrites')}
            strokeWidth={getStrokeWidth('dendrites') * 0.5}
            fill="none"
            strokeLinecap="round"
          />
        </G>

        {/* ======= CELL BODY (SOMA) ======= */}
        <Ellipse
          cx={somaX * sx}
          cy={somaY * sy}
          rx={somaRx * sx}
          ry={somaRy * sy}
          fill={getColor('cell_body')}
          fillOpacity={0.25}
          stroke={getColor('cell_body')}
          strokeWidth={getStrokeWidth('cell_body')}
        />

        {/* ======= NUCLEUS ======= */}
        <Circle
          cx={somaX * sx}
          cy={somaY * sy}
          r={nucleusR * Math.min(sx, sy)}
          fill={getColor('nucleus')}
          fillOpacity={0.35}
          stroke={getColor('nucleus')}
          strokeWidth={getStrokeWidth('nucleus')}
        />
        {/* Nucleolus */}
        <Circle
          cx={(somaX + 1) * sx}
          cy={(somaY - 1) * sy}
          r={3.5 * Math.min(sx, sy)}
          fill={getColor('nucleus')}
          fillOpacity={0.5}
        />

        {/* ======= AXON HILLOCK ======= */}
        <Path
          d={`M${(somaX + somaRx - 2) * sx} ${(somaY - 10) * sy}
             L${hillockX * sx} ${(somaY - 5) * sy}
             L${axonStartX * sx} ${somaY * sy}
             L${hillockX * sx} ${(somaY + 5) * sy}
             L${(somaX + somaRx - 2) * sx} ${(somaY + 10) * sy}`}
          fill={getColor('axon_hillock')}
          fillOpacity={0.2}
          stroke={getColor('axon_hillock')}
          strokeWidth={getStrokeWidth('axon_hillock')}
          strokeLinejoin="round"
        />

        {/* ======= AXON ======= */}
        <Line
          x1={axonStartX * sx}
          y1={axonY * sy}
          x2={axonEndX * sx}
          y2={axonY * sy}
          stroke={getColor('axon')}
          strokeWidth={getStrokeWidth('axon') * 1.2}
        />

        {/* ======= MYELIN SHEATH SEGMENTS ======= */}
        {myelinSegments.map((seg, i) => (
          <Ellipse
            key={`myelin-${i}`}
            cx={seg.cx * sx}
            cy={axonY * sy}
            rx={seg.rx * sx}
            ry={seg.ry * sy}
            fill={getColor('myelin_sheath')}
            fillOpacity={0.2}
            stroke={getColor('myelin_sheath')}
            strokeWidth={getStrokeWidth('myelin_sheath')}
          />
        ))}

        {/* ======= NODES OF RANVIER ======= */}
        {nodesOfRanvier.map((nx, i) => (
          <G key={`node-${i}`}>
            <Line
              x1={nx * sx}
              y1={(axonY - 4) * sy}
              x2={nx * sx}
              y2={(axonY + 4) * sy}
              stroke={getColor('nodes_of_ranvier')}
              strokeWidth={getStrokeWidth('nodes_of_ranvier') * 1.5}
              strokeLinecap="round"
            />
          </G>
        ))}

        {/* ======= AXON TERMINALS ======= */}
        <G>
          {/* Main terminal branches */}
          <Path
            d={`M${termStartX * sx} ${axonY * sy}
               C${(termStartX + 12) * sx} ${(axonY - 8) * sy},
                ${(termStartX + 20) * sx} ${(axonY - 18) * sy},
                ${(termStartX + 30) * sx} ${(axonY - 25) * sy}`}
            stroke={getColor('axon_terminals')}
            strokeWidth={getStrokeWidth('axon_terminals')}
            fill="none"
            strokeLinecap="round"
          />
          <Circle
            cx={(termStartX + 30) * sx}
            cy={(axonY - 25) * sy}
            r={3 * Math.min(sx, sy)}
            fill={getColor('axon_terminals')}
            fillOpacity={0.5}
            stroke={getColor('axon_terminals')}
            strokeWidth={1}
          />

          <Path
            d={`M${termStartX * sx} ${axonY * sy}
               C${(termStartX + 15) * sx} ${(axonY - 3) * sy},
                ${(termStartX + 25) * sx} ${(axonY - 5) * sy},
                ${(termStartX + 35) * sx} ${(axonY - 8) * sy}`}
            stroke={getColor('axon_terminals')}
            strokeWidth={getStrokeWidth('axon_terminals')}
            fill="none"
            strokeLinecap="round"
          />
          <Circle
            cx={(termStartX + 35) * sx}
            cy={(axonY - 8) * sy}
            r={3 * Math.min(sx, sy)}
            fill={getColor('axon_terminals')}
            fillOpacity={0.5}
            stroke={getColor('axon_terminals')}
            strokeWidth={1}
          />

          <Path
            d={`M${termStartX * sx} ${axonY * sy}
               C${(termStartX + 15) * sx} ${(axonY + 3) * sy},
                ${(termStartX + 25) * sx} ${(axonY + 5) * sy},
                ${(termStartX + 35) * sx} ${(axonY + 8) * sy}`}
            stroke={getColor('axon_terminals')}
            strokeWidth={getStrokeWidth('axon_terminals')}
            fill="none"
            strokeLinecap="round"
          />
          <Circle
            cx={(termStartX + 35) * sx}
            cy={(axonY + 8) * sy}
            r={3 * Math.min(sx, sy)}
            fill={getColor('axon_terminals')}
            fillOpacity={0.5}
            stroke={getColor('axon_terminals')}
            strokeWidth={1}
          />

          <Path
            d={`M${termStartX * sx} ${axonY * sy}
               C${(termStartX + 12) * sx} ${(axonY + 8) * sy},
                ${(termStartX + 20) * sx} ${(axonY + 18) * sy},
                ${(termStartX + 30) * sx} ${(axonY + 25) * sy}`}
            stroke={getColor('axon_terminals')}
            strokeWidth={getStrokeWidth('axon_terminals')}
            fill="none"
            strokeLinecap="round"
          />
          <Circle
            cx={(termStartX + 30) * sx}
            cy={(axonY + 25) * sy}
            r={3 * Math.min(sx, sy)}
            fill={getColor('axon_terminals')}
            fillOpacity={0.5}
            stroke={getColor('axon_terminals')}
            strokeWidth={1}
          />
        </G>

        {/* ======= SYNAPSE AREA ======= */}
        <G>
          {/* Small dots representing neurotransmitter vesicles */}
          {[
            { x: termStartX + 33, y: axonY - 27 },
            { x: termStartX + 38, y: axonY - 10 },
            { x: termStartX + 38, y: axonY + 10 },
            { x: termStartX + 33, y: axonY + 27 },
          ].map((dot, i) => (
            <Circle
              key={`vesicle-${i}`}
              cx={dot.x * sx}
              cy={dot.y * sy}
              r={1.2 * Math.min(sx, sy)}
              fill={getColor('synapse')}
              fillOpacity={0.7}
            />
          ))}
          {/* Postsynaptic membrane hint */}
          <Path
            d={`M${(termStartX + 40) * sx} ${(axonY - 30) * sy}
               C${(termStartX + 42) * sx} ${(axonY - 15) * sy},
                ${(termStartX + 42) * sx} ${(axonY + 15) * sy},
                ${(termStartX + 40) * sx} ${(axonY + 30) * sy}`}
            stroke={getColor('synapse')}
            strokeWidth={1}
            strokeDasharray="3,2"
            fill="none"
            strokeOpacity={0.6}
          />
        </G>

        {/* ======= LABELS ======= */}
        {showLabels && labelData.map(renderLabel)}
      </Svg>

      {/* Touchable overlays for part interaction */}
      {onPartPress &&
        labelData.map((item) => {
          // Create a touch area around each label
          const touchW = 60 * sx;
          const touchH = 20 * sy;
          const touchX = item.labelX * sx - touchW / 2;
          const touchY = item.labelY * sy - touchH / 2;
          return (
            <TouchableOpacity
              key={`touch-${item.partId}`}
              style={{
                position: 'absolute',
                left: touchX,
                top: touchY,
                width: touchW,
                height: touchH,
              }}
              onPress={() => handlePress(item.partId)}
              activeOpacity={0.6}
            />
          );
        })}
    </View>
  );
};

export default NeuronDiagram;
