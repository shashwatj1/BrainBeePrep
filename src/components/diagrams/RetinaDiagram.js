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
  Defs,
  LinearGradient,
  Stop,
  Polygon,
} from 'react-native-svg';

export const RETINA_PARTS = [
  {
    id: 'pigment_epithelium',
    name: 'Pigment Epithelium',
    description:
      'Absorbs stray light and recycles photopigments in rods and cones',
  },
  {
    id: 'rods',
    name: 'Rods',
    description:
      'Photoreceptors for dim-light (scotopic) vision; ~120 million per eye; high sensitivity but no color detection',
  },
  {
    id: 'cones',
    name: 'Cones',
    description:
      'Photoreceptors for color and detail; ~6 million per eye; three types (S, M, L) for blue, green, and red wavelengths',
  },
  {
    id: 'bipolar_cells',
    name: 'Bipolar Cells',
    description:
      'Relay signals from photoreceptors to ganglion cells; can be ON or OFF type',
  },
  {
    id: 'ganglion_cells',
    name: 'Ganglion Cells',
    description:
      'Output neurons of the retina whose axons form the optic nerve; fire action potentials',
  },
  {
    id: 'optic_nerve',
    name: 'Optic Nerve',
    description:
      'Bundle of ~1.2 million ganglion cell axons carrying visual information to the brain',
  },
  {
    id: 'light_path',
    name: 'Light Path',
    description:
      'Light passes through all retinal layers before reaching photoreceptors at the back',
  },
];

const COLORS = {
  rods: '#A78BFA',
  cones: '#22D3EE',
  bipolar: '#4ADE80',
  ganglion: '#4C6EF5',
  opticNerve: '#FB923C',
  pigment: '#64748B',
  label: '#FFFFFF',
  labelLine: '#64748B',
  lightArrow: '#FBBF24',
  background: '#1E293B',
  outerNuclear: '#7C6FAA',
  innerNuclear: '#3A7A5A',
};

const RetinaDiagram = ({
  width = 350,
  height = 300,
  showLabels = true,
  highlightedParts = [],
  onPartPress,
}) => {
  const isHighlighted = (partId) => highlightedParts.includes(partId);

  const getOpacity = (partId) => {
    if (highlightedParts.length === 0) return 1;
    return isHighlighted(partId) ? 1 : 0.3;
  };

  const handlePress = (partId) => {
    if (onPartPress) {
      onPartPress(partId);
    }
  };

  // Layout zones (left to right): light arrow | ganglion | inner nuclear | bipolar | outer nuclear | photoreceptors | pigment
  // X positions scaled to width
  const scaleX = width / 350;
  const scaleY = height / 300;

  // Vertical band boundaries (x coords)
  const zones = {
    lightArrowStart: 8 * scaleX,
    lightArrowEnd: 38 * scaleX,
    opticNerveX: 52 * scaleX,
    ganglionStart: 62 * scaleX,
    ganglionEnd: 95 * scaleX,
    innerNuclearStart: 95 * scaleX,
    innerNuclearEnd: 125 * scaleX,
    bipolarStart: 125 * scaleX,
    bipolarEnd: 165 * scaleX,
    outerNuclearStart: 165 * scaleX,
    outerNuclearEnd: 195 * scaleX,
    photoStart: 195 * scaleX,
    photoEnd: 280 * scaleX,
    pigmentStart: 280 * scaleX,
    pigmentEnd: 310 * scaleX,
  };

  const yTop = 30 * scaleY;
  const yBottom = 260 * scaleY;
  const yMid = (yTop + yBottom) / 2;
  const layerHeight = yBottom - yTop;

  // Rod positions (thin, tall cylinders)
  const rodSpacing = layerHeight / 8;
  const rods = [];
  for (let i = 0; i < 7; i++) {
    rods.push({
      x: 230 * scaleX,
      y: yTop + 15 * scaleY + i * rodSpacing,
    });
  }

  // Cone positions (shorter, wider, conical)
  const cones = [
    { x: 215 * scaleX, y: yTop + 30 * scaleY },
    { x: 215 * scaleX, y: yMid - 10 * scaleY },
    { x: 215 * scaleX, y: yMid + 40 * scaleY },
    { x: 215 * scaleX, y: yBottom - 40 * scaleY },
  ];

  // Bipolar cell positions
  const bipolarCells = [];
  const bipolarSpacing = layerHeight / 6;
  for (let i = 0; i < 5; i++) {
    bipolarCells.push({
      x: (zones.bipolarStart + zones.bipolarEnd) / 2,
      y: yTop + 25 * scaleY + i * bipolarSpacing,
    });
  }

  // Ganglion cell positions
  const ganglionCells = [];
  const ganglionSpacing = layerHeight / 5;
  for (let i = 0; i < 4; i++) {
    ganglionCells.push({
      x: (zones.ganglionStart + zones.ganglionEnd) / 2,
      y: yTop + 30 * scaleY + i * ganglionSpacing,
    });
  }

  const renderPigmentEpithelium = () => (
    <G opacity={getOpacity('pigment_epithelium')}>
      <Rect
        x={zones.pigmentStart}
        y={yTop}
        width={zones.pigmentEnd - zones.pigmentStart}
        height={layerHeight}
        fill={COLORS.pigment}
        rx={4 * scaleX}
      />
      {/* Melanin granule dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Circle
          key={`melanin-${i}`}
          cx={zones.pigmentStart + 15 * scaleX}
          cy={yTop + 15 * scaleY + i * (layerHeight / 12)}
          r={2.5 * scaleX}
          fill="#475569"
        />
      ))}
    </G>
  );

  const renderRods = () => (
    <G opacity={getOpacity('rods')}>
      {rods.map((rod, i) => {
        const outerSegW = 6 * scaleX;
        const outerSegH = 30 * scaleY;
        const innerSegW = 5 * scaleX;
        const innerSegH = 16 * scaleY;
        const baseX = rod.x;
        const baseY = rod.y;
        return (
          <G key={`rod-${i}`}>
            {/* Outer segment (rectangular, at right toward pigment) */}
            <Rect
              x={baseX + 18 * scaleX}
              y={baseY - outerSegH / 2}
              width={outerSegW}
              height={outerSegH}
              fill={COLORS.rods}
              rx={2 * scaleX}
            />
            {/* Inner segment (slightly wider) */}
            <Rect
              x={baseX + 8 * scaleX}
              y={baseY - innerSegH / 2}
              width={innerSegW}
              height={innerSegH}
              fill={COLORS.rods}
              opacity={0.7}
              rx={2 * scaleX}
            />
            {/* Connecting cilium */}
            <Line
              x1={baseX + 13 * scaleX}
              y1={baseY}
              x2={baseX + 18 * scaleX}
              y2={baseY}
              stroke={COLORS.rods}
              strokeWidth={1.5}
            />
            {/* Synaptic terminal (small circle at left) */}
            <Circle
              cx={baseX + 3 * scaleX}
              cy={baseY}
              r={3 * scaleX}
              fill={COLORS.rods}
              opacity={0.8}
            />
            {/* Axon to synaptic terminal */}
            <Line
              x1={baseX + 6 * scaleX}
              y1={baseY}
              x2={baseX + 8 * scaleX}
              y2={baseY}
              stroke={COLORS.rods}
              strokeWidth={1}
              opacity={0.6}
            />
          </G>
        );
      })}
    </G>
  );

  const renderCones = () => (
    <G opacity={getOpacity('cones')}>
      {cones.map((cone, i) => {
        const baseX = cone.x;
        const baseY = cone.y;
        // Outer segment: conical / tapered shape
        return (
          <G key={`cone-${i}`}>
            {/* Outer segment (cone shape pointing right) */}
            <Polygon
              points={`${baseX + 30 * scaleX},${baseY} ${baseX + 18 * scaleX},${baseY - 10 * scaleY} ${baseX + 18 * scaleX},${baseY + 10 * scaleY}`}
              fill={COLORS.cones}
            />
            {/* Inner segment (wider ellipse) */}
            <Ellipse
              cx={baseX + 12 * scaleX}
              cy={baseY}
              rx={6 * scaleX}
              ry={9 * scaleY}
              fill={COLORS.cones}
              opacity={0.7}
            />
            {/* Synaptic pedicle (flat base at left) */}
            <Rect
              x={baseX - 2 * scaleX}
              y={baseY - 5 * scaleY}
              width={8 * scaleX}
              height={10 * scaleY}
              fill={COLORS.cones}
              opacity={0.8}
              rx={2 * scaleX}
            />
          </G>
        );
      })}
    </G>
  );

  const renderOuterNuclearLayer = () => (
    <G opacity={getOpacity('rods')}>
      <Rect
        x={zones.outerNuclearStart}
        y={yTop}
        width={zones.outerNuclearEnd - zones.outerNuclearStart}
        height={layerHeight}
        fill={COLORS.outerNuclear}
        opacity={0.15}
      />
      {/* Nuclei dots */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Circle
          key={`on-${i}`}
          cx={zones.outerNuclearStart + 15 * scaleX}
          cy={yTop + 12 * scaleY + i * (layerHeight / 10)}
          r={4 * scaleX}
          fill={COLORS.outerNuclear}
          opacity={0.35}
        />
      ))}
    </G>
  );

  const renderBipolarCells = () => (
    <G opacity={getOpacity('bipolar_cells')}>
      {/* Inner nuclear layer background */}
      <Rect
        x={zones.innerNuclearStart}
        y={yTop}
        width={zones.innerNuclearEnd - zones.innerNuclearStart}
        height={layerHeight}
        fill={COLORS.innerNuclear}
        opacity={0.1}
      />
      {bipolarCells.map((cell, i) => (
        <G key={`bipolar-${i}`}>
          {/* Cell body */}
          <Ellipse
            cx={cell.x}
            cy={cell.y}
            rx={7 * scaleX}
            ry={10 * scaleY}
            fill={COLORS.bipolar}
          />
          {/* Dendrite going right (toward photoreceptors) */}
          <Line
            x1={cell.x + 7 * scaleX}
            y1={cell.y}
            x2={cell.x + 22 * scaleX}
            y2={cell.y + (i % 2 === 0 ? -5 : 5) * scaleY}
            stroke={COLORS.bipolar}
            strokeWidth={1.5}
            opacity={0.6}
          />
          {/* Axon going left (toward ganglion cells) */}
          <Line
            x1={cell.x - 7 * scaleX}
            y1={cell.y}
            x2={cell.x - 22 * scaleX}
            y2={cell.y + (i % 2 === 0 ? 5 : -5) * scaleY}
            stroke={COLORS.bipolar}
            strokeWidth={1.5}
            opacity={0.6}
          />
          {/* Nucleus */}
          <Circle
            cx={cell.x}
            cy={cell.y}
            r={3 * scaleX}
            fill="#166534"
          />
        </G>
      ))}
    </G>
  );

  const renderGanglionCells = () => (
    <G opacity={getOpacity('ganglion_cells')}>
      {ganglionCells.map((cell, i) => (
        <G key={`ganglion-${i}`}>
          {/* Cell body (larger than bipolar) */}
          <Circle
            cx={cell.x}
            cy={cell.y}
            r={10 * scaleX}
            fill={COLORS.ganglion}
          />
          {/* Dendrites going right (toward bipolar cells) */}
          <Line
            x1={cell.x + 10 * scaleX}
            y1={cell.y - 3 * scaleY}
            x2={cell.x + 25 * scaleX}
            y2={cell.y - 8 * scaleY}
            stroke={COLORS.ganglion}
            strokeWidth={1.5}
            opacity={0.6}
          />
          <Line
            x1={cell.x + 10 * scaleX}
            y1={cell.y + 3 * scaleY}
            x2={cell.x + 25 * scaleX}
            y2={cell.y + 8 * scaleY}
            stroke={COLORS.ganglion}
            strokeWidth={1.5}
            opacity={0.6}
          />
          {/* Nucleus */}
          <Circle
            cx={cell.x}
            cy={cell.y}
            r={4 * scaleX}
            fill="#3730A3"
          />
          {/* Axon going left (to optic nerve) */}
          <Line
            x1={cell.x - 10 * scaleX}
            y1={cell.y}
            x2={zones.opticNerveX + 6 * scaleX}
            y2={yMid}
            stroke={COLORS.opticNerve}
            strokeWidth={1.5}
            opacity={0.5}
          />
        </G>
      ))}
    </G>
  );

  const renderOpticNerve = () => (
    <G opacity={getOpacity('optic_nerve')}>
      {/* Optic nerve bundle leaving to the left */}
      <Ellipse
        cx={zones.opticNerveX}
        cy={yMid}
        rx={8 * scaleX}
        ry={30 * scaleY}
        fill={COLORS.opticNerve}
        opacity={0.8}
      />
      {/* Nerve fiber lines exiting to the left */}
      <Line
        x1={zones.opticNerveX - 8 * scaleX}
        y1={yMid}
        x2={zones.lightArrowEnd + 5 * scaleX}
        y2={yMid - 10 * scaleY}
        stroke={COLORS.opticNerve}
        strokeWidth={2.5}
        opacity={0.7}
      />
      <Line
        x1={zones.opticNerveX - 8 * scaleX}
        y1={yMid}
        x2={zones.lightArrowEnd + 5 * scaleX}
        y2={yMid}
        stroke={COLORS.opticNerve}
        strokeWidth={2.5}
        opacity={0.7}
      />
      <Line
        x1={zones.opticNerveX - 8 * scaleX}
        y1={yMid}
        x2={zones.lightArrowEnd + 5 * scaleX}
        y2={yMid + 10 * scaleY}
        stroke={COLORS.opticNerve}
        strokeWidth={2.5}
        opacity={0.7}
      />
    </G>
  );

  const renderLightArrow = () => {
    const arrowX = zones.lightArrowStart + 10 * scaleX;
    const arrowTop = yTop + 20 * scaleY;
    const arrowBottom = yBottom - 20 * scaleY;
    const arrowMid = (arrowTop + arrowBottom) / 2;
    return (
      <G opacity={getOpacity('light_path')}>
        {/* Wavy light rays */}
        {[0, 1, 2].map((i) => {
          const offsetY = (i - 1) * 35 * scaleY;
          const ax = arrowX;
          const ay = arrowMid + offsetY;
          return (
            <G key={`light-ray-${i}`}>
              <Path
                d={`M ${ax - 6 * scaleX} ${ay}
                    Q ${ax - 3 * scaleX} ${ay - 6 * scaleY} ${ax} ${ay}
                    Q ${ax + 3 * scaleX} ${ay + 6 * scaleY} ${ax + 6 * scaleX} ${ay}`}
                stroke={COLORS.lightArrow}
                strokeWidth={2}
                fill="none"
              />
            </G>
          );
        })}
        {/* Main arrow shaft pointing right */}
        <Line
          x1={arrowX + 8 * scaleX}
          y1={arrowMid}
          x2={arrowX + 22 * scaleX}
          y2={arrowMid}
          stroke={COLORS.lightArrow}
          strokeWidth={2.5}
        />
        {/* Arrowhead pointing right */}
        <Polygon
          points={`${arrowX + 22 * scaleX},${arrowMid - 6 * scaleY} ${arrowX + 30 * scaleX},${arrowMid} ${arrowX + 22 * scaleX},${arrowMid + 6 * scaleY}`}
          fill={COLORS.lightArrow}
        />
      </G>
    );
  };

  const renderLabels = () => {
    if (!showLabels) return null;

    const fontSize = Math.max(7, 8 * Math.min(scaleX, scaleY));
    const labelData = [
      {
        id: 'light_path',
        text: 'Light',
        x: zones.lightArrowStart + 10 * scaleX,
        y: yTop + 8 * scaleY,
        anchor: 'middle',
        lineToX: zones.lightArrowStart + 10 * scaleX,
        lineToY: yTop + 18 * scaleY,
      },
      {
        id: 'optic_nerve',
        text: 'Optic Nerve',
        x: zones.opticNerveX,
        y: yBottom + 20 * scaleY,
        anchor: 'middle',
        lineToX: zones.opticNerveX,
        lineToY: yBottom + 5 * scaleY,
      },
      {
        id: 'ganglion_cells',
        text: 'Ganglion',
        x: (zones.ganglionStart + zones.ganglionEnd) / 2,
        y: yTop - 10 * scaleY,
        anchor: 'middle',
        lineToX: (zones.ganglionStart + zones.ganglionEnd) / 2,
        lineToY: yTop + 5 * scaleY,
      },
      {
        id: 'bipolar_cells',
        text: 'Bipolar',
        x: (zones.bipolarStart + zones.bipolarEnd) / 2,
        y: yBottom + 20 * scaleY,
        anchor: 'middle',
        lineToX: (zones.bipolarStart + zones.bipolarEnd) / 2,
        lineToY: yBottom + 5 * scaleY,
      },
      {
        id: 'rods',
        text: 'Rods',
        x: 240 * scaleX,
        y: yTop - 10 * scaleY,
        anchor: 'middle',
        lineToX: 240 * scaleX,
        lineToY: yTop + 5 * scaleY,
      },
      {
        id: 'cones',
        text: 'Cones',
        x: 210 * scaleX,
        y: yBottom + 20 * scaleY,
        anchor: 'middle',
        lineToX: 215 * scaleX,
        lineToY: yBottom - 15 * scaleY,
      },
      {
        id: 'pigment_epithelium',
        text: 'Pigment Epith.',
        x: zones.pigmentEnd + 5 * scaleX,
        y: yMid,
        anchor: 'start',
        lineToX: zones.pigmentEnd,
        lineToY: yMid,
      },
    ];

    return (
      <G>
        {labelData.map((label) => (
          <G key={`label-${label.id}`} opacity={getOpacity(label.id)}>
            {/* Label line */}
            <Line
              x1={label.x}
              y1={label.y + (label.y < yMid ? 4 : -6)}
              x2={label.lineToX}
              y2={label.lineToY}
              stroke={COLORS.labelLine}
              strokeWidth={1}
              strokeDasharray="2,2"
            />
            {/* Label text */}
            <SvgText
              x={label.x}
              y={label.y}
              fill={COLORS.label}
              fontSize={fontSize}
              fontWeight="600"
              textAnchor={label.anchor}
            >
              {label.text}
            </SvgText>
          </G>
        ))}
      </G>
    );
  };

  const renderTouchableLayer = (partId, x, y, w, h) => {
    if (!onPartPress) return null;
    return (
      <Rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="transparent"
        onPress={() => handlePress(partId)}
      />
    );
  };

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Background */}
        <Rect x={0} y={0} width={width} height={height} fill={COLORS.background} rx={8} />

        {/* Layer separator lines (subtle) */}
        <G opacity={0.15}>
          <Line x1={zones.ganglionEnd} y1={yTop} x2={zones.ganglionEnd} y2={yBottom} stroke="#94A3B8" strokeWidth={0.5} strokeDasharray="3,3" />
          <Line x1={zones.innerNuclearEnd} y1={yTop} x2={zones.innerNuclearEnd} y2={yBottom} stroke="#94A3B8" strokeWidth={0.5} strokeDasharray="3,3" />
          <Line x1={zones.bipolarEnd} y1={yTop} x2={zones.bipolarEnd} y2={yBottom} stroke="#94A3B8" strokeWidth={0.5} strokeDasharray="3,3" />
          <Line x1={zones.outerNuclearEnd} y1={yTop} x2={zones.outerNuclearEnd} y2={yBottom} stroke="#94A3B8" strokeWidth={0.5} strokeDasharray="3,3" />
          <Line x1={zones.photoEnd} y1={yTop} x2={zones.photoEnd} y2={yBottom} stroke="#94A3B8" strokeWidth={0.5} strokeDasharray="3,3" />
        </G>

        {/* Render layers back to front */}
        {renderPigmentEpithelium()}
        {renderRods()}
        {renderCones()}
        {renderOuterNuclearLayer()}
        {renderBipolarCells()}
        {renderGanglionCells()}
        {renderOpticNerve()}
        {renderLightArrow()}

        {/* Labels */}
        {renderLabels()}

        {/* Touchable regions */}
        {renderTouchableLayer('pigment_epithelium', zones.pigmentStart, yTop, zones.pigmentEnd - zones.pigmentStart, layerHeight)}
        {renderTouchableLayer('rods', 225 * scaleX, yTop, 30 * scaleX, layerHeight)}
        {renderTouchableLayer('cones', 205 * scaleX, yTop, 25 * scaleX, layerHeight)}
        {renderTouchableLayer('bipolar_cells', zones.bipolarStart, yTop, zones.bipolarEnd - zones.bipolarStart, layerHeight)}
        {renderTouchableLayer('ganglion_cells', zones.ganglionStart, yTop, zones.ganglionEnd - zones.ganglionStart, layerHeight)}
        {renderTouchableLayer('optic_nerve', zones.opticNerveX - 10 * scaleX, yMid - 35 * scaleY, 20 * scaleX, 70 * scaleY)}
        {renderTouchableLayer('light_path', zones.lightArrowStart, yTop, 35 * scaleX, layerHeight)}
      </Svg>
    </View>
  );
};

export default RetinaDiagram;
