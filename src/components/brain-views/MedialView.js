import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, {
  G,
  Path,
  Circle,
  Line,
  Text as SvgText,
  Defs,
  Ellipse,
} from 'react-native-svg';

// ──────────────────────────────────────────────────────────────────────────────
// MedialView  –  midsagittal cross-section of the human brain
// Anatomically accurate SVG for Brain Bee competition study
// viewBox 0 0 360 300
// ──────────────────────────────────────────────────────────────────────────────

export const MEDIAL_REGIONS = [
  { id: 'corpus_callosum', name: 'Corpus Callosum', x: 47, y: 38 },
  { id: 'thalamus', name: 'Thalamus', x: 52, y: 50 },
  { id: 'hypothalamus', name: 'Hypothalamus', x: 42, y: 58 },
  { id: 'hippocampus', name: 'Hippocampus', x: 55, y: 64 },
  { id: 'amygdala', name: 'Amygdala', x: 43, y: 66 },
  { id: 'cerebellum', name: 'Cerebellum', x: 80, y: 76 },
  { id: 'brainstem', name: 'Brainstem', x: 58, y: 78 },
  { id: 'pituitary', name: 'Pituitary Gland', x: 38, y: 68 },
  { id: 'pineal_gland', name: 'Pineal Gland', x: 62, y: 43 },
  { id: 'ventricles', name: 'Ventricles', x: 48, y: 44 },
  { id: 'fornix', name: 'Fornix', x: 45, y: 42 },
  { id: 'cingulate_cortex', name: 'Cingulate Cortex', x: 42, y: 28 },
  { id: 'frontal_lobe', name: 'Frontal Lobe', x: 22, y: 32 },
  { id: 'parietal_lobe', name: 'Parietal Lobe', x: 52, y: 18 },
  { id: 'occipital_lobe', name: 'Occipital Lobe', x: 82, y: 35 },
];

// ── Hit-areas for touch targets (percentage-based) ──────────────────────────
const HIT_AREAS = {
  corpus_callosum: { left: '25%', top: '28%', width: '42%', height: '12%' },
  thalamus:        { left: '42%', top: '42%', width: '18%', height: '14%' },
  hypothalamus:    { left: '33%', top: '52%', width: '16%', height: '12%' },
  hippocampus:     { left: '46%', top: '58%', width: '18%', height: '10%' },
  amygdala:        { left: '35%', top: '60%', width: '12%', height: '10%' },
  cerebellum:      { left: '66%', top: '62%', width: '26%', height: '26%' },
  brainstem:       { left: '48%', top: '66%', width: '20%', height: '26%' },
  pituitary:       { left: '33%', top: '63%', width: '10%', height: '8%' },
  pineal_gland:    { left: '58%', top: '38%', width: '8%',  height: '8%' },
  ventricles:      { left: '30%', top: '34%', width: '30%', height: '14%' },
  fornix:          { left: '32%', top: '32%', width: '26%', height: '12%' },
  cingulate_cortex:{ left: '20%', top: '16%', width: '44%', height: '14%' },
  frontal_lobe:    { left: '2%',  top: '8%',  width: '32%', height: '50%' },
  parietal_lobe:   { left: '34%', top: '4%',  width: '34%', height: '22%' },
  occipital_lobe:  { left: '68%', top: '14%', width: '26%', height: '38%' },
};

// ── Colors ──────────────────────────────────────────────────────────────────
const C = {
  outline:        '#B0BEC5',
  sulci:          '#64748B',
  internalStroke: '#FFFFFF80',
  corpusCallosum: '#38BDF8',
  thalamus:       '#FBBF24',
  hypothalamus:   '#F87171',
  pituitary:      '#E879F9',
  hippocampus:    '#2DD4BF',
  amygdala:       '#E879F9',
  pineal:         '#FB923C',
  cerebellum:     '#FB923C',
  midbrain:       '#A78BFA',
  pons:           '#818CF8',
  medulla:        '#6366F1',
  ventricle:      '#22D3EE30',
  fornix:         '#E2E8F0',
  frontal:        '#4C6EF530',
  parietal:       '#22D3EE30',
  occipital:      '#F472B630',
  cingulate:      '#94A3B840',
  highlight:      '#FFFFFF40',
  labelBg:        '#00000060',
};

export default function MedialView({
  width = 360,
  height = 300,
  showLabels = true,
  onHotspotPress,
  highlightedRegion,
}) {
  const isHighlighted = (id) => highlightedRegion === id;
  const strokeHi = (id, base) => (isHighlighted(id) ? '#FFFFFFCC' : base);
  const fillHi = (id, base) => (isHighlighted(id) ? '#FFFFFF30' : 'none');
  const extra = (id) =>
    isHighlighted(id) ? { strokeWidth: 2.5, stroke: '#FFFFFFCC' } : {};

  return (
    <View style={{ width, height, alignSelf: 'center', position: 'relative' }}>
      <Svg width={width} height={height} viewBox="0 0 360 300">
        <Defs />

        {/* ================================================================
            CORTICAL LOBE FILLS (medial surfaces — translucent overlays)
            ================================================================ */}
        {/* Frontal lobe medial surface */}
        <Path
          d="M 40,46 C 30,38 20,36 14,42 C 8,50 6,64 8,80
             C 10,96 16,108 24,116 L 38,124 L 52,128 L 62,130
             L 80,126 L 96,118 L 108,108 L 118,94
             L 124,80 L 128,66
             L 128,120 L 120,132 L 108,144 L 100,148
             C 90,148 80,142 74,136 L 68,128 L 58,140
             L 48,148 L 38,150 L 28,148 L 20,140
             L 14,130 L 10,120 L 8,108
             L 6,96 L 6,82 L 6,68 L 8,54
             L 12,42 L 20,34 L 30,30 L 40,30 Z"
          fill={C.frontal}
          stroke="none"
          opacity={isHighlighted('frontal_lobe') ? 0.6 : 0.3}
        />

        {/* Parietal lobe medial surface */}
        <Path
          d="M 128,66 L 140,38 L 160,22 L 186,14 L 210,14
             L 232,20 L 246,32 L 250,44
             L 248,56 L 240,68 L 228,78
             L 218,84 L 204,88 L 190,90
             L 174,90 L 158,88 L 144,82
             L 134,76 Z"
          fill={C.parietal}
          stroke="none"
          opacity={isHighlighted('parietal_lobe') ? 0.6 : 0.3}
        />

        {/* Occipital lobe medial surface */}
        <Path
          d="M 250,44 L 264,38 L 282,36 L 300,40 L 316,52
             L 326,68 L 330,86 L 326,104
             L 318,120 L 306,132
             L 292,140 L 278,142 L 266,140
             L 254,132 L 244,120
             L 238,106 L 234,92
             L 234,80 L 238,68 L 244,56 Z"
          fill={C.occipital}
          stroke="none"
          opacity={isHighlighted('occipital_lobe') ? 0.6 : 0.3}
        />

        {/* ================================================================
            BRAIN OUTLINE — medial (cut) surface
            ================================================================ */}
        <Path
          d="M 40,46 C 30,38 20,36 14,42
             C 8,50 6,64 8,80 C 10,96 16,108 24,116
             L 38,124 L 52,128 L 62,130 L 80,126
             L 96,118 L 108,108 L 118,94
             L 128,80 L 128,66
             L 140,38 L 160,22 L 186,14 L 210,14
             L 232,20 L 250,32 L 264,38
             L 282,36 L 300,40 L 316,52
             L 326,68 L 330,86 L 326,104
             L 318,120 L 306,132 L 292,140
             L 278,142 L 266,140"
          fill="none"
          stroke={C.outline}
          strokeWidth={2}
        />

        {/* Lower contour: occipital -> cerebellum gap -> temporal -> frontal base */}
        <Path
          d="M 266,140 L 254,146 L 248,154"
          fill="none"
          stroke={C.outline}
          strokeWidth={2}
        />
        {/* Frontal/temporal base contour */}
        <Path
          d="M 100,148 C 90,148 80,142 74,136
             L 68,128 L 58,140 L 48,148 L 38,150
             L 28,148 L 20,140 L 14,130
             L 10,120 L 8,108"
          fill="none"
          stroke={C.outline}
          strokeWidth={2}
        />

        {/* Brainstem lower contour into spinal cord */}
        <Path
          d="M 196,234 L 192,246 L 190,260 L 190,278"
          fill="none"
          stroke={C.outline}
          strokeWidth={2}
        />

        {/* ================================================================
            MEDIAL SULCI
            ================================================================ */}
        {/* Cingulate sulcus — curves above cingulate gyrus */}
        <Path
          d="M 52,72 C 68,52 100,38 140,30
             C 168,24 196,22 218,24
             L 236,30 L 248,40"
          fill="none"
          stroke={C.sulci}
          strokeWidth={0.8}
        />

        {/* Parieto-occipital sulcus */}
        <Path
          d="M 248,40 L 236,76 L 228,100 L 224,114"
          fill="none"
          stroke={C.sulci}
          strokeWidth={0.8}
        />

        {/* Calcarine sulcus */}
        <Path
          d="M 224,114 L 248,100 L 272,88 L 296,78 L 316,72"
          fill="none"
          stroke={C.sulci}
          strokeWidth={0.8}
        />

        {/* Central sulcus (medial end) */}
        <Path
          d="M 164,16 L 160,38 L 156,54"
          fill="none"
          stroke={C.sulci}
          strokeWidth={0.8}
        />

        {/* Additional medial surface sulci for realism */}
        <Path
          d="M 70,60 C 84,50 100,44 120,38"
          fill="none"
          stroke={C.sulci}
          strokeWidth={0.5}
          opacity={0.5}
        />
        <Path
          d="M 36,88 C 44,82 56,78 68,74"
          fill="none"
          stroke={C.sulci}
          strokeWidth={0.5}
          opacity={0.5}
        />
        <Path
          d="M 270,50 C 280,56 290,66 296,78"
          fill="none"
          stroke={C.sulci}
          strokeWidth={0.5}
          opacity={0.5}
        />
        <Path
          d="M 286,44 C 300,54 310,68 318,82"
          fill="none"
          stroke={C.sulci}
          strokeWidth={0.5}
          opacity={0.4}
        />
        {/* Marginal sulcus */}
        <Path
          d="M 210,16 L 206,36 L 204,50"
          fill="none"
          stroke={C.sulci}
          strokeWidth={0.5}
          opacity={0.5}
        />

        {/* ================================================================
            CINGULATE CORTEX — band around corpus callosum
            ================================================================ */}
        <Path
          d="M 62,100 C 58,88 56,76 60,68
             C 70,50 100,38 140,32
             C 168,26 196,24 218,26
             L 236,32 L 244,40 L 240,46
             L 228,38 L 210,32 L 190,30
             C 168,30 140,36 112,46
             C 88,56 72,68 68,80
             C 64,90 64,96 66,102 Z"
          fill={C.cingulate}
          stroke={C.sulci}
          strokeWidth={0.5}
          opacity={isHighlighted('cingulate_cortex') ? 0.8 : 0.5}
          {...extra('cingulate_cortex')}
        />

        {/* ================================================================
            LATERAL VENTRICLE (space)
            ================================================================ */}
        <Path
          d="M 120,82 C 124,74 136,68 156,66
             C 172,64 188,66 200,70
             L 210,76 L 216,84 L 218,92
             L 212,96 L 200,94 L 186,90
             C 172,86 156,84 140,84
             L 126,86 Z"
          fill={C.ventricle}
          stroke={C.internalStroke}
          strokeWidth={0.6}
          opacity={isHighlighted('ventricles') ? 0.8 : 0.5}
          {...extra('ventricles')}
        />

        {/* ================================================================
            CORPUS CALLOSUM — large C-shaped white matter tract
            Genu (front), Body (middle), Splenium (back)
            ================================================================ */}
        <Path
          d="M 90,108 C 82,100 78,90 82,82
             C 86,72 98,64 118,58
             C 138,52 162,50 186,52
             C 206,54 222,60 230,68
             C 238,76 238,86 232,94
             L 226,100
             C 230,90 228,80 222,74
             C 214,66 198,60 180,58
             C 160,56 140,58 124,62
             C 106,68 94,76 92,86
             C 90,94 92,102 96,108 Z"
          fill={C.corpusCallosum}
          fillOpacity={isHighlighted('corpus_callosum') ? 0.9 : 0.7}
          stroke={strokeHi('corpus_callosum', C.internalStroke)}
          strokeWidth={1}
          {...extra('corpus_callosum')}
        />
        {/* Genu label area — thickened front */}
        <Path
          d="M 90,108 C 86,104 84,98 84,92
             C 84,86 88,80 94,76"
          fill="none"
          stroke={C.corpusCallosum}
          strokeWidth={0.5}
          opacity={0.6}
        />

        {/* ================================================================
            FORNIX — thin curved tract from hippocampus over thalamus
            ================================================================ */}
        <Path
          d="M 178,180 C 172,170 164,154 158,140
             C 152,126 148,116 146,110
             L 142,104 L 136,100 L 128,98
             L 118,100 L 110,106
             C 106,110 104,116 104,122"
          fill="none"
          stroke={C.fornix}
          strokeWidth={1.2}
          opacity={isHighlighted('fornix') ? 1 : 0.7}
          {...extra('fornix')}
        />

        {/* ================================================================
            THALAMUS — oval in center
            ================================================================ */}
        <Ellipse
          cx={180}
          cy={128}
          rx={26}
          ry={18}
          fill={C.thalamus}
          fillOpacity={isHighlighted('thalamus') ? 0.85 : 0.65}
          stroke={strokeHi('thalamus', C.internalStroke)}
          strokeWidth={1}
          {...extra('thalamus')}
        />

        {/* ================================================================
            HYPOTHALAMUS — below thalamus
            ================================================================ */}
        <Path
          d="M 136,146 C 140,138 150,134 160,134
             C 168,134 174,138 176,144
             C 178,150 174,156 166,160
             C 158,164 148,162 142,156
             C 138,152 136,150 136,146 Z"
          fill={C.hypothalamus}
          fillOpacity={isHighlighted('hypothalamus') ? 0.85 : 0.65}
          stroke={strokeHi('hypothalamus', C.internalStroke)}
          strokeWidth={1}
          {...extra('hypothalamus')}
        />

        {/* ================================================================
            PITUITARY GLAND — hanging below hypothalamus
            ================================================================ */}
        <Ellipse
          cx={148}
          cy={178}
          rx={10}
          ry={7}
          fill={C.pituitary}
          fillOpacity={isHighlighted('pituitary') ? 0.9 : 0.7}
          stroke={strokeHi('pituitary', C.internalStroke)}
          strokeWidth={1}
          {...extra('pituitary')}
        />
        {/* Stalk connecting to hypothalamus */}
        <Line
          x1={150}
          y1={160}
          x2={148}
          y2={171}
          stroke={C.pituitary}
          strokeWidth={1.5}
          opacity={0.6}
        />

        {/* ================================================================
            PINEAL GLAND — tiny structure at posterior thalamus
            ================================================================ */}
        <Circle
          cx={216}
          cy={118}
          r={5}
          fill={C.pineal}
          fillOpacity={isHighlighted('pineal_gland') ? 0.9 : 0.7}
          stroke={strokeHi('pineal_gland', C.internalStroke)}
          strokeWidth={1}
          {...extra('pineal_gland')}
        />

        {/* ================================================================
            HIPPOCAMPUS — curved structure in temporal region
            ================================================================ */}
        <Path
          d="M 170,168 C 176,162 186,158 196,160
             C 204,162 210,168 212,176
             C 214,184 208,190 200,192
             C 192,194 182,190 176,184
             C 170,178 168,174 170,168 Z"
          fill={C.hippocampus}
          fillOpacity={isHighlighted('hippocampus') ? 0.85 : 0.65}
          stroke={strokeHi('hippocampus', C.internalStroke)}
          strokeWidth={1}
          {...extra('hippocampus')}
        />

        {/* ================================================================
            AMYGDALA — almond shape near hippocampus
            ================================================================ */}
        <Path
          d="M 148,178 C 152,172 160,170 166,174
             C 170,176 170,182 166,186
             C 162,190 154,190 150,186
             C 146,182 146,180 148,178 Z"
          fill={C.amygdala}
          fillOpacity={isHighlighted('amygdala') ? 0.85 : 0.65}
          stroke={strokeHi('amygdala', C.internalStroke)}
          strokeWidth={1}
          {...extra('amygdala')}
        />

        {/* ================================================================
            BRAINSTEM — three divisions
            ================================================================ */}
        {/* Midbrain (top) */}
        <Path
          d="M 196,148 C 202,142 210,140 216,144
             C 222,148 224,156 222,164
             L 218,170 L 210,174 L 202,172
             L 196,166 L 194,158 Z"
          fill={C.midbrain}
          fillOpacity={isHighlighted('brainstem') ? 0.85 : 0.65}
          stroke={strokeHi('brainstem', C.internalStroke)}
          strokeWidth={1}
          {...extra('brainstem')}
        />

        {/* Pons (middle) */}
        <Path
          d="M 202,172 L 210,174 L 218,170
             L 222,178 L 224,188 L 222,196
             L 216,202 L 208,204 L 200,200
             L 196,192 L 196,182 Z"
          fill={C.pons}
          fillOpacity={isHighlighted('brainstem') ? 0.85 : 0.65}
          stroke={strokeHi('brainstem', C.internalStroke)}
          strokeWidth={1}
          {...extra('brainstem')}
        />

        {/* Medulla oblongata (bottom) */}
        <Path
          d="M 200,200 L 208,204 L 216,202
             L 214,212 L 210,222 L 206,230
             L 200,236 L 196,234
             L 192,226 L 192,216
             L 194,208 Z"
          fill={C.medulla}
          fillOpacity={isHighlighted('brainstem') ? 0.85 : 0.65}
          stroke={strokeHi('brainstem', C.internalStroke)}
          strokeWidth={1}
          {...extra('brainstem')}
        />

        {/* Brainstem subdivision boundary lines */}
        <Line
          x1={196}
          y1={166}
          x2={218}
          y2={170}
          stroke="#FFFFFF60"
          strokeWidth={0.6}
          strokeDasharray="3,2"
        />
        <Line
          x1={196}
          y1={198}
          x2={216}
          y2={202}
          stroke="#FFFFFF60"
          strokeWidth={0.6}
          strokeDasharray="3,2"
        />

        {/* ================================================================
            CEREBELLUM — with arbor vitae pattern
            ================================================================ */}
        {/* Outer shape */}
        <Path
          d="M 248,154 C 254,148 264,144 278,144
             C 296,144 312,152 322,166
             C 330,178 332,194 326,208
             C 320,222 308,232 292,236
             C 276,240 260,236 248,226
             C 238,218 232,206 232,192
             C 232,178 236,166 244,156 Z"
          fill={C.cerebellum}
          fillOpacity={isHighlighted('cerebellum') ? 0.7 : 0.5}
          stroke={strokeHi('cerebellum', C.internalStroke)}
          strokeWidth={1}
          {...extra('cerebellum')}
        />

        {/* Arbor vitae (tree of life) branching white matter pattern */}
        {/* Main trunk */}
        <Path
          d="M 278,230 L 278,210 L 280,195 L 282,182 L 282,168 L 280,158"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          opacity={0.5}
        />
        {/* Left branches */}
        <Path
          d="M 280,210 L 264,218 L 252,222"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1}
          opacity={0.4}
        />
        <Path
          d="M 264,218 L 260,226"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={0.7}
          opacity={0.35}
        />
        <Path
          d="M 280,195 L 262,200 L 248,208"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1}
          opacity={0.4}
        />
        <Path
          d="M 262,200 L 256,192"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={0.7}
          opacity={0.35}
        />
        <Path
          d="M 282,182 L 264,184 L 250,190"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1}
          opacity={0.4}
        />
        <Path
          d="M 264,184 L 258,176"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={0.7}
          opacity={0.35}
        />
        <Path
          d="M 282,168 L 268,168 L 254,172"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={0.8}
          opacity={0.35}
        />
        <Path
          d="M 280,158 L 268,156 L 256,160"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={0.7}
          opacity={0.3}
        />
        {/* Right branches */}
        <Path
          d="M 280,210 L 296,216 L 308,224"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1}
          opacity={0.4}
        />
        <Path
          d="M 296,216 L 300,226"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={0.7}
          opacity={0.35}
        />
        <Path
          d="M 280,195 L 298,200 L 312,210"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1}
          opacity={0.4}
        />
        <Path
          d="M 298,200 L 306,194"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={0.7}
          opacity={0.35}
        />
        <Path
          d="M 282,182 L 300,184 L 316,194"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1}
          opacity={0.4}
        />
        <Path
          d="M 300,184 L 310,180"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={0.7}
          opacity={0.35}
        />
        <Path
          d="M 282,168 L 298,168 L 314,176"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={0.8}
          opacity={0.35}
        />
        <Path
          d="M 280,158 L 296,156 L 310,162"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={0.7}
          opacity={0.3}
        />
        {/* Folia lines (horizontal striations) */}
        <Path
          d="M 242,190 C 258,186 278,186 298,188 C 312,190 322,194 328,200"
          fill="none"
          stroke="#FFFFFF30"
          strokeWidth={0.5}
        />
        <Path
          d="M 238,200 C 254,196 278,196 300,198 C 314,200 324,206 328,210"
          fill="none"
          stroke="#FFFFFF30"
          strokeWidth={0.5}
        />
        <Path
          d="M 244,210 C 258,208 278,208 296,210 C 310,214 318,220 322,224"
          fill="none"
          stroke="#FFFFFF30"
          strokeWidth={0.5}
        />
        <Path
          d="M 250,174 C 264,170 282,170 300,172 C 314,176 322,180 326,186"
          fill="none"
          stroke="#FFFFFF30"
          strokeWidth={0.5}
        />
        <Path
          d="M 252,162 C 266,158 282,158 298,160 C 312,164 320,170 324,176"
          fill="none"
          stroke="#FFFFFF30"
          strokeWidth={0.5}
        />

        {/* ================================================================
            SPINAL CORD
            ================================================================ */}
        <Path
          d="M 190,260 L 190,278 L 186,290"
          fill="none"
          stroke={C.outline}
          strokeWidth={2}
        />
        <Path
          d="M 196,234 L 192,250 L 190,260"
          fill="none"
          stroke={C.medulla}
          strokeWidth={3}
          opacity={0.5}
        />

        {/* ================================================================
            LABELS
            ================================================================ */}
        {showLabels && (
          <G>
            {/* Corpus Callosum labels */}
            <SvgText
              x={160}
              y={68}
              fill="#FFFFFF"
              fontSize={7}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.9}
            >
              Corpus Callosum
            </SvgText>
            <SvgText x={92} y={96} fill="#38BDF8" fontSize={5} textAnchor="middle" opacity={0.7}>
              genu
            </SvgText>
            <SvgText x={170} y={56} fill="#38BDF8" fontSize={5} textAnchor="middle" opacity={0.7}>
              body
            </SvgText>
            <SvgText x={228} y={92} fill="#38BDF8" fontSize={5} textAnchor="middle" opacity={0.7}>
              splenium
            </SvgText>

            {/* Thalamus */}
            <SvgText
              x={180}
              y={131}
              fill="#FFFFFF"
              fontSize={7}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.9}
            >
              Thalamus
            </SvgText>

            {/* Hypothalamus */}
            <SvgText
              x={156}
              y={152}
              fill="#FFFFFF"
              fontSize={6}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.9}
            >
              Hypothalamus
            </SvgText>

            {/* Pituitary */}
            <SvgText
              x={148}
              y={194}
              fill="#E879F9"
              fontSize={5.5}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.9}
            >
              Pituitary
            </SvgText>

            {/* Pineal gland */}
            <SvgText
              x={216}
              y={110}
              fill="#FB923C"
              fontSize={5.5}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.9}
            >
              Pineal
            </SvgText>

            {/* Hippocampus */}
            <SvgText
              x={192}
              y={180}
              fill="#FFFFFF"
              fontSize={6}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.9}
            >
              Hippocampus
            </SvgText>

            {/* Amygdala */}
            <SvgText
              x={158}
              y={184}
              fill="#FFFFFF"
              fontSize={5.5}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.85}
            >
              Amygdala
            </SvgText>

            {/* Brainstem divisions */}
            <SvgText
              x={220}
              y={155}
              fill="#A78BFA"
              fontSize={5}
              fontWeight="bold"
              textAnchor="start"
              opacity={0.85}
            >
              Midbrain
            </SvgText>
            <SvgText
              x={226}
              y={190}
              fill="#818CF8"
              fontSize={5}
              fontWeight="bold"
              textAnchor="start"
              opacity={0.85}
            >
              Pons
            </SvgText>
            <SvgText
              x={218}
              y={222}
              fill="#6366F1"
              fontSize={5}
              fontWeight="bold"
              textAnchor="start"
              opacity={0.85}
            >
              Medulla
            </SvgText>

            {/* Cerebellum */}
            <SvgText
              x={282}
              y={200}
              fill="#FFFFFF"
              fontSize={7}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.9}
            >
              Cerebellum
            </SvgText>

            {/* Fornix */}
            <SvgText
              x={118}
              y={96}
              fill="#E2E8F0"
              fontSize={5}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.8}
            >
              Fornix
            </SvgText>

            {/* Ventricle */}
            <SvgText
              x={170}
              y={84}
              fill="#22D3EE"
              fontSize={5}
              textAnchor="middle"
              opacity={0.7}
            >
              Ventricle
            </SvgText>

            {/* Cingulate cortex */}
            <SvgText
              x={150}
              y={42}
              fill="#FFFFFF"
              fontSize={5.5}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.7}
            >
              Cingulate Cortex
            </SvgText>

            {/* Lobe labels */}
            <SvgText
              x={50}
              y={78}
              fill="#FFFFFF"
              fontSize={8}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.5}
            >
              Frontal
            </SvgText>
            <SvgText
              x={50}
              y={90}
              fill="#FFFFFF"
              fontSize={8}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.5}
            >
              Lobe
            </SvgText>

            <SvgText
              x={194}
              y={24}
              fill="#FFFFFF"
              fontSize={7}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.5}
            >
              Parietal Lobe
            </SvgText>

            <SvgText
              x={296}
              y={90}
              fill="#FFFFFF"
              fontSize={7}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.5}
            >
              Occipital
            </SvgText>
            <SvgText
              x={296}
              y={100}
              fill="#FFFFFF"
              fontSize={7}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.5}
            >
              Lobe
            </SvgText>

            {/* Spinal cord */}
            <SvgText
              x={186}
              y={286}
              fill={C.outline}
              fontSize={5}
              textAnchor="middle"
              opacity={0.6}
            >
              Spinal Cord
            </SvgText>

            {/* Sulci labels */}
            <SvgText
              x={248}
              y={62}
              fill={C.sulci}
              fontSize={4.5}
              textAnchor="start"
              opacity={0.6}
              fontStyle="italic"
            >
              P-O sulcus
            </SvgText>
            <SvgText
              x={268}
              y={82}
              fill={C.sulci}
              fontSize={4.5}
              textAnchor="start"
              opacity={0.6}
              fontStyle="italic"
            >
              Calcarine s.
            </SvgText>
          </G>
        )}
      </Svg>

      {/* ================================================================
          TOUCH OVERLAYS — absolutely positioned for reliable tapping
          ================================================================ */}
      {MEDIAL_REGIONS.map((region) => {
        const area = HIT_AREAS[region.id];
        if (!area) return null;
        return (
          <TouchableOpacity
            key={`touch_${region.id}`}
            style={[
              styles.touchOverlay,
              {
                left: area.left,
                top: area.top,
                width: area.width,
                height: area.height,
              },
            ]}
            activeOpacity={0.6}
            onPress={() => onHotspotPress && onHotspotPress(region.id)}
          />
        );
      })}
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
