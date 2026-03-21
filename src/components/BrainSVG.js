import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Text as SvgText, Line } from 'react-native-svg';
import { COLORS } from '../utils/theme';

// Anatomical lateral (side) view brain SVG with tappable regions
// Regions are SVG paths for rendering + absolutely positioned TouchableOpacity for tap handling

const REGION_PATHS = {
  frontal_lobe: {
    path: 'M 52,28 C 42,22 30,20 22,24 C 14,28 8,38 6,50 C 5,58 6,68 10,78 C 12,82 16,86 22,90 L 28,92 C 32,93 38,92 42,90 L 52,84 L 56,78 L 58,68 L 58,56 L 56,42 Z',
    label: 'Frontal Lobe',
    labelPos: { x: 28, y: 56 },
    // hit area as percentage of SVG viewBox (0 4 110 140) mapped to container
    hitArea: { left: '2%', top: '10%', width: '48%', height: '48%' },
    color: '#4C6EF5',
  },
  parietal_lobe: {
    path: 'M 52,28 L 56,42 L 58,56 L 58,68 L 62,72 L 68,74 L 78,72 L 86,66 L 90,56 L 88,44 L 82,34 L 74,28 L 64,26 Z',
    label: 'Parietal Lobe',
    labelPos: { x: 72, y: 50 },
    hitArea: { left: '47%', top: '10%', width: '36%', height: '38%' },
    color: '#FBBF24',
  },
  temporal_lobe: {
    path: 'M 22,90 L 28,92 C 32,93 38,92 42,90 L 52,84 L 56,78 L 58,68 L 62,72 L 68,74 L 70,80 L 68,88 L 64,96 L 56,102 L 46,106 L 36,108 L 26,106 L 20,102 L 18,96 Z',
    label: 'Temporal Lobe',
    labelPos: { x: 42, y: 96 },
    hitArea: { left: '12%', top: '55%', width: '46%', height: '25%' },
    color: '#4ADE80',
  },
  occipital_lobe: {
    path: 'M 78,72 L 86,66 L 90,56 L 88,44 L 92,48 L 98,56 L 100,66 L 98,78 L 94,86 L 88,90 L 82,88 L 76,82 L 70,80 L 68,74 Z',
    label: 'Occipital\nLobe',
    labelPos: { x: 88, y: 68 },
    hitArea: { left: '60%', top: '26%', width: '36%', height: '38%' },
    color: '#F472B6',
  },
  cerebellum: {
    path: 'M 70,108 C 74,104 80,100 86,98 C 90,96 94,96 96,98 C 100,100 102,106 100,112 C 98,118 94,122 88,124 C 82,126 76,124 72,120 C 68,116 68,112 70,108 Z',
    label: 'Cerebellum',
    labelPos: { x: 86, y: 112 },
    hitArea: { left: '58%', top: '66%', width: '40%', height: '22%' },
    color: '#22D3EE',
  },
  brainstem: {
    path: 'M 62,96 L 64,96 L 68,100 L 70,108 C 68,112 66,116 64,120 L 62,126 L 60,132 L 58,136 L 56,136 L 54,132 L 54,126 L 56,118 L 58,110 L 58,102 Z',
    label: 'Brainstem',
    labelPos: { x: 54, y: 126 },
    hitArea: { left: '46%', top: '66%', width: '18%', height: '32%' },
    color: '#FB923C',
  },
};

const INTERNAL_PATHS = {
  prefrontal_cortex: {
    path: 'M 16,42 C 12,48 10,56 10,64 C 10,70 12,76 16,80 L 22,82 L 26,78 L 28,70 L 26,60 L 22,50 L 18,44 Z',
    label: 'PFC',
    labelPos: { x: 18, y: 65 },
    hitArea: { left: '6%', top: '24%', width: '18%', height: '30%' },
    color: '#818CF8',
    dashed: true,
  },
  primary_motor_cortex: {
    path: 'M 46,32 L 50,30 L 54,34 L 56,42 L 54,48 L 50,46 L 48,40 Z',
    label: 'Motor',
    labelPos: { x: 50, y: 42 },
    hitArea: { left: '40%', top: '16%', width: '12%', height: '16%' },
    color: '#C084FC',
    dashed: true,
  },
  somatosensory_cortex: {
    path: 'M 56,42 L 60,38 L 64,34 L 66,40 L 64,48 L 60,52 L 56,48 Z',
    label: 'Sensory',
    labelPos: { x: 60, y: 46 },
    hitArea: { left: '49%', top: '18%', width: '12%', height: '16%' },
    color: '#F9A8D4',
    dashed: true,
  },
  corpus_callosum: {
    path: 'M 36,68 C 42,62 50,60 58,62 C 64,64 68,66 70,70 L 68,72 C 64,68 58,66 52,66 C 46,66 40,68 36,72 Z',
    label: 'Corpus Callosum',
    labelPos: { x: 52, y: 64 },
    hitArea: { left: '30%', top: '38%', width: '32%', height: '10%' },
    color: '#E2E8F0',
  },
  thalamus: {
    path: 'M 52,73 C 54,70 58,70 60,73 C 62,76 60,80 58,80 C 54,80 50,76 52,73 Z',
    label: 'Thalamus',
    labelPos: { x: 56, y: 78 },
    hitArea: { left: '44%', top: '46%', width: '14%', height: '10%' },
    color: '#A78BFA',
  },
  hypothalamus: {
    path: 'M 42,82 C 44,80 48,80 50,82 C 52,84 50,88 48,88 C 44,88 40,84 42,82 Z',
    label: 'Hypothal.',
    labelPos: { x: 46, y: 86 },
    hitArea: { left: '34%', top: '52%', width: '14%', height: '10%' },
    color: '#F97316',
  },
  hippocampus: {
    path: 'M 50,90 C 52,88 56,87 58,89 C 60,91 62,94 60,96 C 58,98 54,97 52,95 C 50,93 48,92 50,90 Z',
    label: 'Hippocampus',
    labelPos: { x: 56, y: 94 },
    hitArea: { left: '42%', top: '58%', width: '18%', height: '10%' },
    color: '#34D399',
  },
  amygdala: {
    path: 'M 40,90 C 42,88 46,88 47,90 C 48,92 46,95 44,95 C 42,95 38,92 40,90 Z',
    label: 'Amygdala',
    labelPos: { x: 40, y: 98 },
    hitArea: { left: '32%', top: '58%', width: '14%', height: '10%' },
    color: '#FB7185',
  },
  basal_ganglia: {
    path: 'M 44,70 C 46,68 50,68 52,70 C 54,72 52,76 50,76 C 46,76 42,72 44,70 Z',
    label: 'Basal G.',
    labelPos: { x: 48, y: 74 },
    hitArea: { left: '36%', top: '44%', width: '14%', height: '10%' },
    color: '#FBBF24',
  },
  brocas_area: {
    path: 'M 24,84 C 26,82 30,82 32,84 C 33,86 32,88 30,88 C 28,88 22,86 24,84 Z',
    label: "Broca's",
    labelPos: { x: 28, y: 87 },
    hitArea: { left: '18%', top: '54%', width: '12%', height: '8%' },
    color: '#818CF8',
    dashed: true,
  },
  wernickes_area: {
    path: 'M 62,82 C 64,80 68,80 69,82 C 70,84 68,86 66,86 C 64,86 60,84 62,82 Z',
    label: "Wernicke's",
    labelPos: { x: 66, y: 85 },
    hitArea: { left: '52%', top: '52%', width: '14%', height: '8%' },
    color: '#34D399',
    dashed: true,
  },
};

// Map from data region IDs to SVG region IDs for highlighting/navigation
const REGION_ID_MAP = {
  frontal_lobe: 'frontal_lobe',
  parietal_lobe: 'parietal_lobe',
  temporal_lobe: 'temporal_lobe',
  occipital_lobe: 'occipital_lobe',
  cerebellum: 'cerebellum',
  brainstem: 'brainstem',
  prefrontal_cortex: 'prefrontal_cortex',
  primary_motor_cortex: 'primary_motor_cortex',
  somatosensory_cortex: 'somatosensory_cortex',
  thalamus: 'thalamus',
  hypothalamus: 'hypothalamus',
  hippocampus: 'hippocampus',
  amygdala: 'amygdala',
  corpus_callosum: 'corpus_callosum',
  basal_ganglia: 'basal_ganglia',
  medulla: 'brainstem',
  pons: 'brainstem',
  substantia_nigra: 'basal_ganglia',
  cerebral_cortex: 'frontal_lobe',
  nucleus_accumbens: 'basal_ganglia',
  visual_cortex: 'occipital_lobe',
  auditory_cortex: 'temporal_lobe',
  olfactory_bulb: 'frontal_lobe',
  pineal_gland: 'thalamus',
  pituitary_gland: 'hypothalamus',
  suprachiasmatic_nucleus: 'hypothalamus',
  ventral_tegmental_area: 'brainstem',
  brocas_area: 'brocas_area',
  wernickes_area: 'wernickes_area',
  optic_chiasm: 'hypothalamus',
};

export { REGION_ID_MAP };

export default function BrainSVG({ width = 350, height = 320, onRegionPress, highlightedRegions, dimmedRegions }) {
  const handlePress = (regionId) => {
    if (onRegionPress) onRegionPress(regionId);
  };

  const getOpacity = (regionId) => {
    if (dimmedRegions && dimmedRegions.size > 0) {
      return dimmedRegions.has(regionId) ? 0.2 : 1;
    }
    return 1;
  };

  const getFillOpacity = (regionId) => {
    if (highlightedRegions && highlightedRegions.has(regionId)) return 0.7;
    return 0.45;
  };

  return (
    <View style={{ width, height, alignSelf: 'center', position: 'relative' }}>
      {/* SVG diagram (visual only, no touch handlers) */}
      <Svg width={width} height={height} viewBox="0 4 110 140">
        {/* Brain outline */}
        <Path
          d="M 52,24 C 42,18 28,16 18,22 C 8,30 2,44 2,60 C 2,72 6,82 12,90 L 18,96 L 22,102 L 26,106 L 36,108 L 46,106 L 56,102 L 64,96 L 68,100 L 70,108 C 68,112 66,118 64,124 L 62,130 L 58,136 L 56,138 L 54,136 L 54,130 L 56,120 L 58,112 C 58,112 68,112 70,108 C 74,104 82,98 88,96 C 94,94 100,96 102,102 C 104,108 102,116 96,122 C 90,126 82,128 76,126 C 70,124 66,118 64,124 M 70,108 C 72,104 78,100 86,98 M 100,66 C 102,74 100,84 94,90 L 88,94 M 92,48 C 96,54 100,60 100,66 L 98,78 M 88,44 C 90,46 92,48 92,48 M 82,34 L 88,44 M 74,28 L 82,34 M 64,26 L 74,28 M 52,24 L 64,26"
          fill="none"
          stroke={COLORS.lightNavy}
          strokeWidth={1.2}
          opacity={0.4}
        />

        {/* Major lobe filled paths */}
        {Object.entries(REGION_PATHS).map(([id, region]) => (
          <React.Fragment key={id}>
            <Path
              d={region.path}
              fill={region.color}
              fillOpacity={getFillOpacity(id) * (getOpacity(id))}
              stroke={region.color}
              strokeWidth={1.5}
              strokeOpacity={0.8 * getOpacity(id)}
            />
            <SvgText
              x={region.labelPos.x}
              y={region.labelPos.y}
              fill="#FFFFFF"
              fontSize={5.5}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.9 * getOpacity(id)}
            >
              {region.label}
            </SvgText>
          </React.Fragment>
        ))}

        {/* Central sulcus */}
        <Line x1={54} y1={28} x2={58} y2={68} stroke={COLORS.darkNavy} strokeWidth={1.8} opacity={0.6} />
        {/* Lateral (Sylvian) fissure */}
        <Path d="M 22,90 Q 38,82 58,68" fill="none" stroke={COLORS.darkNavy} strokeWidth={1.5} opacity={0.5} />

        {/* Internal structure paths */}
        {Object.entries(INTERNAL_PATHS).map(([id, region]) => (
          <React.Fragment key={id}>
            <Path
              d={region.path}
              fill={region.color}
              fillOpacity={(region.dashed ? 0.35 : 0.5) * getOpacity(id)}
              stroke={region.color}
              strokeWidth={region.dashed ? 0.8 : 1}
              strokeOpacity={getOpacity(id)}
              strokeDasharray={region.dashed ? '2,1' : undefined}
            />
            <SvgText
              x={region.labelPos.x}
              y={region.labelPos.y}
              fill="#FFFFFF"
              fontSize={id === 'corpus_callosum' ? 3.5 : (id === 'prefrontal_cortex' || id === 'primary_motor_cortex' || id === 'somatosensory_cortex' ? 4 : 3)}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.9 * getOpacity(id)}
            >
              {region.label}
            </SvgText>
          </React.Fragment>
        ))}

        {/* Extra labels */}
        <SvgText x={92} y={76} fill="#F9A8D4" fontSize={3} fontWeight="bold" textAnchor="middle" opacity={0.8 * getOpacity('occipital_lobe')}>
          Visual Ctx
        </SvgText>
        <SvgText x={36} y={102} fill="#86EFAC" fontSize={3} fontWeight="bold" textAnchor="middle" opacity={0.8 * getOpacity('temporal_lobe')}>
          Auditory Ctx
        </SvgText>

        {/* Spinal cord indication */}
        <Line x1={56} y1={136} x2={56} y2={142} stroke={COLORS.textMuted} strokeWidth={1.5} opacity={0.4} />
        <SvgText x={56} y={146} fill={COLORS.textMuted} fontSize={3.5} textAnchor="middle" opacity={0.6}>
          Spinal Cord
        </SvgText>
      </Svg>

      {/* Touch overlays — absolutely positioned over the SVG for reliable cross-platform taps */}
      {Object.entries(REGION_PATHS).map(([id, region]) => (
        <TouchableOpacity
          key={`touch_${id}`}
          style={[
            styles.touchOverlay,
            {
              left: region.hitArea.left,
              top: region.hitArea.top,
              width: region.hitArea.width,
              height: region.hitArea.height,
            },
          ]}
          activeOpacity={0.6}
          onPress={() => handlePress(id)}
        />
      ))}
      {Object.entries(INTERNAL_PATHS).map(([id, region]) => (
        <TouchableOpacity
          key={`touch_${id}`}
          style={[
            styles.touchOverlay,
            {
              left: region.hitArea.left,
              top: region.hitArea.top,
              width: region.hitArea.width,
              height: region.hitArea.height,
            },
          ]}
          activeOpacity={0.6}
          onPress={() => handlePress(id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  touchOverlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
});
