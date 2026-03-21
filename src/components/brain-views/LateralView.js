import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, {
  G,
  Path,
  Circle,
  Line,
  Text as SvgText,
  Defs,
  Ellipse,
} from 'react-native-svg';

// Hotspot positions as percentages (0-100) within the 360x300 viewBox
export const LATERAL_REGIONS = [
  { id: 'frontal_lobe', name: 'Frontal Lobe', x: 28, y: 35 },
  { id: 'parietal_lobe', name: 'Parietal Lobe', x: 58, y: 25 },
  { id: 'temporal_lobe', name: 'Temporal Lobe', x: 35, y: 68 },
  { id: 'occipital_lobe', name: 'Occipital Lobe', x: 82, y: 38 },
  { id: 'cerebellum', name: 'Cerebellum', x: 82, y: 68 },
  { id: 'brainstem', name: 'Brainstem', x: 68, y: 82 },
  { id: 'prefrontal_cortex', name: 'Prefrontal Cortex', x: 14, y: 38 },
  { id: 'motor_cortex', name: 'Motor Cortex', x: 42, y: 20 },
  { id: 'somatosensory_cortex', name: 'Somatosensory Cortex', x: 50, y: 20 },
  { id: 'brocas_area', name: "Broca's Area", x: 25, y: 55 },
  { id: 'wernickes_area', name: "Wernicke's Area", x: 62, y: 52 },
  { id: 'visual_cortex', name: 'Visual Cortex', x: 88, y: 42 },
  { id: 'auditory_cortex', name: 'Auditory Cortex', x: 42, y: 58 },
];

const LateralView = ({
  width = 360,
  height = 300,
  showLabels = true,
  hotspots: hotspotOverrides,
  onHotspotPress,
  highlightedRegion,
}) => {
  const activeHotspots = hotspotOverrides || LATERAL_REGIONS;

  const getHighlightOpacity = (regionId) => {
    if (!highlightedRegion) return 0;
    return highlightedRegion === regionId ? 0.35 : 0;
  };

  const regionColors = {
    frontal_lobe: '#4C6EF5',
    parietal_lobe: '#22D3EE',
    temporal_lobe: '#4ADE80',
    occipital_lobe: '#F472B6',
    cerebellum: '#FB923C',
    brainstem: '#A78BFA',
    prefrontal_cortex: '#4C6EF5',
    motor_cortex: '#4C6EF5',
    somatosensory_cortex: '#22D3EE',
    brocas_area: '#4C6EF5',
    wernickes_area: '#22D3EE',
    visual_cortex: '#F472B6',
    auditory_cortex: '#4ADE80',
  };

  // Functional area hotspot indicator dots
  const functionalAreas = [
    'prefrontal_cortex',
    'motor_cortex',
    'somatosensory_cortex',
    'brocas_area',
    'wernickes_area',
    'visual_cortex',
    'auditory_cortex',
  ];

  const lobeRegions = [
    'frontal_lobe',
    'parietal_lobe',
    'temporal_lobe',
    'occipital_lobe',
    'cerebellum',
    'brainstem',
  ];

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox="0 0 360 300">
        {/* ===== BRAIN OUTLINE - Anatomically accurate lateral profile ===== */}

        {/* Frontal Lobe fill region */}
        <Path
          d="
            M 72,140
            C 62,130 52,118 48,105
            C 44,92 44,78 50,65
            C 56,52 68,42 82,36
            C 96,30 112,28 128,28
            C 138,28 148,29 158,32
            L 158,32
            C 158,40 157,56 156,70
            L 156,70
            C 152,80 146,95 140,110
            C 134,120 126,130 118,140
            L 72,140
          "
          fill="#4C6EF540"
          stroke="none"
        />
        {/* Highlight overlay for frontal lobe */}
        <Path
          d="
            M 72,140
            C 62,130 52,118 48,105
            C 44,92 44,78 50,65
            C 56,52 68,42 82,36
            C 96,30 112,28 128,28
            C 138,28 148,29 158,32
            L 158,32
            C 158,40 157,56 156,70
            L 156,70
            C 152,80 146,95 140,110
            C 134,120 126,130 118,140
            L 72,140
          "
          fill={regionColors.frontal_lobe}
          opacity={getHighlightOpacity('frontal_lobe')}
          stroke="none"
        />

        {/* Parietal Lobe fill region */}
        <Path
          d="
            M 158,32
            C 170,30 185,28 200,28
            C 218,28 236,30 252,36
            C 264,40 274,48 280,58
            C 284,65 286,74 285,84
            L 285,84
            C 278,90 268,98 258,106
            C 248,114 236,122 224,130
            L 156,70
            C 157,56 158,40 158,32
          "
          fill="#22D3EE40"
          stroke="none"
        />
        <Path
          d="
            M 158,32
            C 170,30 185,28 200,28
            C 218,28 236,30 252,36
            C 264,40 274,48 280,58
            C 284,65 286,74 285,84
            L 285,84
            C 278,90 268,98 258,106
            C 248,114 236,122 224,130
            L 156,70
            C 157,56 158,40 158,32
          "
          fill={regionColors.parietal_lobe}
          opacity={getHighlightOpacity('parietal_lobe')}
          stroke="none"
        />

        {/* Temporal Lobe fill region */}
        <Path
          d="
            M 72,140
            L 118,140
            C 126,150 136,162 150,170
            C 165,178 182,184 200,186
            C 218,188 236,186 252,180
            L 252,180
            C 244,186 234,192 222,196
            C 208,200 192,202 176,202
            C 158,202 140,200 124,194
            C 108,188 94,178 84,166
            C 78,158 74,150 72,140
          "
          fill="#4ADE8040"
          stroke="none"
        />
        <Path
          d="
            M 72,140
            L 118,140
            C 126,150 136,162 150,170
            C 165,178 182,184 200,186
            C 218,188 236,186 252,180
            L 252,180
            C 244,186 234,192 222,196
            C 208,200 192,202 176,202
            C 158,202 140,200 124,194
            C 108,188 94,178 84,166
            C 78,158 74,150 72,140
          "
          fill={regionColors.temporal_lobe}
          opacity={getHighlightOpacity('temporal_lobe')}
          stroke="none"
        />

        {/* Occipital Lobe fill region */}
        <Path
          d="
            M 285,84
            C 290,94 294,106 296,118
            C 298,132 296,146 292,158
            C 288,168 282,176 274,182
            C 266,186 258,184 252,180
            L 252,180
            C 236,186 218,188 200,186
            C 182,184 165,178 150,170
            C 136,162 126,150 118,140
            L 224,130
            C 236,122 248,114 258,106
            C 268,98 278,90 285,84
          "
          fill="#F472B640"
          stroke="none"
        />
        <Path
          d="
            M 285,84
            C 290,94 294,106 296,118
            C 298,132 296,146 292,158
            C 288,168 282,176 274,182
            C 266,186 258,184 252,180
            L 252,180
            C 236,186 218,188 200,186
            C 182,184 165,178 150,170
            C 136,162 126,150 118,140
            L 224,130
            C 236,122 248,114 258,106
            C 268,98 278,90 285,84
          "
          fill={regionColors.occipital_lobe}
          opacity={getHighlightOpacity('occipital_lobe')}
          stroke="none"
        />

        {/* Cerebellum fill */}
        <Path
          d="
            M 252,192
            C 260,190 268,192 276,196
            C 284,200 290,208 294,218
            C 296,226 296,234 292,240
            C 288,246 282,250 274,252
            C 266,254 256,254 248,250
            C 240,246 234,240 230,232
            C 228,224 228,216 232,208
            C 236,200 242,194 252,192
          "
          fill="#FB923C40"
          stroke="none"
        />
        <Path
          d="
            M 252,192
            C 260,190 268,192 276,196
            C 284,200 290,208 294,218
            C 296,226 296,234 292,240
            C 288,246 282,250 274,252
            C 266,254 256,254 248,250
            C 240,246 234,240 230,232
            C 228,224 228,216 232,208
            C 236,200 242,194 252,192
          "
          fill={regionColors.cerebellum}
          opacity={getHighlightOpacity('cerebellum')}
          stroke="none"
        />

        {/* Brainstem fill */}
        <Path
          d="
            M 230,232
            C 228,238 226,244 224,250
            C 222,258 220,264 218,270
            C 216,276 216,280 218,282
            C 220,284 224,284 228,282
            C 232,280 234,276 236,270
            C 238,262 240,254 240,246
            C 240,240 238,236 234,234
            L 230,232
          "
          fill="#A78BFA40"
          stroke="none"
        />
        <Path
          d="
            M 230,232
            C 228,238 226,244 224,250
            C 222,258 220,264 218,270
            C 216,276 216,280 218,282
            C 220,284 224,284 228,282
            C 232,280 234,276 236,270
            C 238,262 240,254 240,246
            C 240,240 238,236 234,234
            L 230,232
          "
          fill={regionColors.brainstem}
          opacity={getHighlightOpacity('brainstem')}
          stroke="none"
        />

        {/* ===== MAIN BRAIN OUTLINE ===== */}
        <Path
          d="
            M 72,140
            C 62,130 52,118 48,105
            C 44,92 44,78 50,65
            C 56,52 68,42 82,36
            C 96,30 112,28 128,28
            C 148,27 170,28 192,28
            C 214,28 236,30 252,36
            C 264,40 274,48 280,58
            C 286,68 290,80 294,94
            C 298,108 298,124 296,138
            C 294,152 290,164 282,174
            C 274,184 264,188 256,186
            C 248,188 238,192 230,196
          "
          fill="none"
          stroke="#B0BEC5"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* Lower brain outline (temporal lobe curve) */}
        <Path
          d="
            M 72,140
            C 74,152 80,164 88,174
            C 98,186 112,194 128,198
            C 144,202 162,204 180,202
            C 198,200 216,196 230,188
            C 238,184 244,178 248,172
          "
          fill="none"
          stroke="#B0BEC5"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* Occipital-temporal inferior curve */}
        <Path
          d="
            M 248,172
            C 252,178 256,184 256,188
            C 256,192 254,194 252,192
          "
          fill="none"
          stroke="#B0BEC5"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* ===== CEREBELLUM OUTLINE ===== */}
        <Path
          d="
            M 252,192
            C 260,190 268,192 276,196
            C 284,200 290,208 294,218
            C 296,226 296,234 292,240
            C 288,246 282,250 274,252
            C 266,254 256,254 248,250
            C 240,246 234,240 230,232
            C 228,224 228,216 232,208
            C 236,200 242,194 252,192
          "
          fill="none"
          stroke="#B0BEC5"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* Cerebellum folia (internal folding lines) */}
        <Path d="M 242,198 C 252,202 264,204 276,200" fill="none" stroke="#64748B" strokeWidth={0.6} />
        <Path d="M 236,208 C 248,214 262,216 278,210" fill="none" stroke="#64748B" strokeWidth={0.6} />
        <Path d="M 234,218 C 246,224 260,226 276,220" fill="none" stroke="#64748B" strokeWidth={0.6} />
        <Path d="M 234,228 C 246,234 260,236 274,230" fill="none" stroke="#64748B" strokeWidth={0.6} />
        <Path d="M 238,238 C 248,242 258,244 268,240" fill="none" stroke="#64748B" strokeWidth={0.6} />
        <Path d="M 242,246 C 250,248 258,250 264,248" fill="none" stroke="#64748B" strokeWidth={0.6} />

        {/* ===== BRAINSTEM ===== */}
        <Path
          d="
            M 230,232
            C 228,238 226,244 224,250
            C 222,258 220,264 218,270
            C 216,276 216,280 218,282
            C 220,284 224,284 228,282
            C 232,280 234,276 236,270
            C 238,262 240,254 240,246
            C 240,240 238,236 234,234
          "
          fill="none"
          stroke="#B0BEC5"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* ===== LATERAL FISSURE (Sylvian Fissure) - prominent ===== */}
        <Path
          d="
            M 72,140
            C 82,138 94,136 108,136
            C 124,136 142,140 160,148
            C 178,156 196,164 214,168
            C 230,172 242,172 248,172
          "
          fill="none"
          stroke="#475569"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* ===== CENTRAL SULCUS - prominent dividing line ===== */}
        <Path
          d="
            M 158,32
            C 156,42 154,54 154,66
            C 154,78 156,90 158,100
            C 160,110 162,120 162,130
            C 162,136 160,140 158,144
          "
          fill="none"
          stroke="#475569"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* ===== REGION BOUNDARY DASHED LINES ===== */}
        {/* Parietal-Occipital boundary (parieto-occipital sulcus, lateral view) */}
        <Line
          x1={268} y1={42} x2={252} y2={172}
          stroke="#FFFFFF30"
          strokeWidth={1}
          strokeDasharray="4,3"
        />

        {/* ===== SULCI - Cortical folding lines (gyri and sulci pattern) ===== */}

        {/* Frontal lobe sulci */}
        {/* Superior frontal sulcus */}
        <Path d="M 60,80 C 72,76 86,74 100,72 C 112,70 124,68 136,66 C 144,64 150,62 154,60" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Inferior frontal sulcus */}
        <Path d="M 56,100 C 68,96 82,94 96,92 C 110,90 122,88 134,86 C 142,84 148,82 152,80" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Precentral sulcus */}
        <Path d="M 138,36 C 136,46 134,58 134,70 C 134,82 136,94 138,106 C 140,114 142,122 144,130" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Middle frontal gyrus sulcus */}
        <Path d="M 62,90 C 74,88 86,86 98,84 C 110,82 120,80 130,78" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Frontal pole short sulci */}
        <Path d="M 52,108 C 58,106 64,104 70,102" fill="none" stroke="#64748B" strokeWidth={0.6} strokeLinecap="round" />
        <Path d="M 50,92 C 56,90 62,88 68,86" fill="none" stroke="#64748B" strokeWidth={0.6} strokeLinecap="round" />
        {/* Orbital frontal sulcus */}
        <Path d="M 58,118 C 70,116 84,114 98,112 C 112,110 124,108 136,106" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />

        {/* Parietal lobe sulci */}
        {/* Postcentral sulcus */}
        <Path d="M 176,36 C 174,46 172,58 172,70 C 172,82 174,94 176,106 C 178,114 180,122 182,130" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Intraparietal sulcus */}
        <Path d="M 178,52 C 192,50 206,48 220,48 C 234,48 246,50 256,54" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Superior parietal sulcus */}
        <Path d="M 172,40 C 186,38 200,36 214,36 C 228,36 240,38 250,42" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Inferior parietal sulcus */}
        <Path d="M 180,68 C 194,66 208,64 222,64 C 236,66 248,70 258,76" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Supramarginal gyrus sulcus */}
        <Path d="M 184,80 C 196,78 210,78 224,80 C 236,82 246,86 254,92" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Angular gyrus sulcus */}
        <Path d="M 200,92 C 214,90 228,92 240,96 C 250,100 258,106 264,112" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />

        {/* Temporal lobe sulci */}
        {/* Superior temporal sulcus */}
        <Path d="M 82,156 C 96,154 112,152 130,152 C 150,152 170,156 190,162 C 208,168 224,174 236,178" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Middle temporal sulcus */}
        <Path d="M 86,170 C 100,168 116,166 134,166 C 154,168 174,172 194,178 C 210,182 224,186 234,188" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Inferior temporal sulcus */}
        <Path d="M 92,184 C 108,182 126,180 146,180 C 166,182 186,186 204,190 C 218,194 228,196 236,196" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />

        {/* Occipital lobe sulci */}
        {/* Lateral occipital sulcus */}
        <Path d="M 268,80 C 274,90 278,102 280,114 C 282,126 282,138 280,148" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Transverse occipital sulcus */}
        <Path d="M 260,100 C 268,98 276,100 282,104" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Inferior occipital sulcus */}
        <Path d="M 262,130 C 270,128 278,130 284,134" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Lunate sulcus */}
        <Path d="M 278,90 C 282,96 286,104 288,112 C 290,120 290,128 288,136" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />
        {/* Calcarine sulcus (visible portion laterally) */}
        <Path d="M 272,140 C 278,144 284,150 288,156" fill="none" stroke="#64748B" strokeWidth={0.8} strokeLinecap="round" />

        {/* Additional short sulci for surface texture */}
        <Path d="M 100,42 C 108,40 116,40 124,40" fill="none" stroke="#64748B" strokeWidth={0.6} strokeLinecap="round" />
        <Path d="M 90,56 C 100,54 110,52 120,52" fill="none" stroke="#64748B" strokeWidth={0.6} strokeLinecap="round" />
        <Path d="M 192,56 C 202,54 212,54 222,56" fill="none" stroke="#64748B" strokeWidth={0.6} strokeLinecap="round" />
        <Path d="M 104,128 C 114,126 124,124 134,124" fill="none" stroke="#64748B" strokeWidth={0.6} strokeLinecap="round" />

        {/* ===== FUNCTIONAL AREA HOTSPOT DOTS ===== */}
        {activeHotspots.map((spot) => {
          const px = (spot.x / 100) * 360;
          const py = (spot.y / 100) * 300;
          const isFunctional = functionalAreas.includes(spot.id);
          const isLobe = lobeRegions.includes(spot.id);
          const color = regionColors[spot.id] || '#94A3B8';

          return (
            <G key={spot.id}>
              {/* Pulsing outer ring for functional areas */}
              {isFunctional && (
                <Circle
                  cx={px}
                  cy={py}
                  r={6}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                  opacity={0.4}
                />
              )}
              {/* Core dot */}
              <Circle
                cx={px}
                cy={py}
                r={isFunctional ? 3.5 : 0}
                fill={color}
                opacity={0.9}
                stroke="#FFFFFF"
                strokeWidth={0.5}
              />
              {/* Touchable area (invisible, larger hit target) */}
              {onHotspotPress && (
                <Circle
                  cx={px}
                  cy={py}
                  r={14}
                  fill="transparent"
                  onPress={() => onHotspotPress(spot.id)}
                />
              )}
            </G>
          );
        })}

        {/* ===== TEXT LABELS ===== */}
        {showLabels && (
          <G>
            {/* Lobe labels */}
            <SvgText
              x={100} y={90}
              fill="#94A3B8"
              fontSize={9}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.9}
            >
              Frontal Lobe
            </SvgText>
            <SvgText
              x={210} y={60}
              fill="#94A3B8"
              fontSize={9}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.9}
            >
              Parietal Lobe
            </SvgText>
            <SvgText
              x={140} y={176}
              fill="#94A3B8"
              fontSize={9}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.9}
            >
              Temporal Lobe
            </SvgText>
            <SvgText
              x={280} y={120}
              fill="#94A3B8"
              fontSize={8}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.9}
            >
              Occipital
            </SvgText>
            <SvgText
              x={280} y={130}
              fill="#94A3B8"
              fontSize={8}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.9}
            >
              Lobe
            </SvgText>
            <SvgText
              x={262} y={224}
              fill="#94A3B8"
              fontSize={8}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.9}
            >
              Cerebellum
            </SvgText>
            <SvgText
              x={218} y={268}
              fill="#94A3B8"
              fontSize={7}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.9}
            >
              Brainstem
            </SvgText>

            {/* Functional area labels (smaller, italic-like) */}
            <SvgText
              x={50} y={114}
              fill="#CBD5E1"
              fontSize={6.5}
              textAnchor="middle"
              opacity={0.8}
            >
              Prefrontal
            </SvgText>
            <SvgText
              x={50} y={122}
              fill="#CBD5E1"
              fontSize={6.5}
              textAnchor="middle"
              opacity={0.8}
            >
              Cortex
            </SvgText>
            <SvgText
              x={148} y={26}
              fill="#CBD5E1"
              fontSize={6.5}
              textAnchor="end"
              opacity={0.8}
            >
              Motor
            </SvgText>
            <SvgText
              x={168} y={26}
              fill="#CBD5E1"
              fontSize={6.5}
              textAnchor="start"
              opacity={0.8}
            >
              Sensory
            </SvgText>
            <SvgText
              x={90} y={168}
              fill="#CBD5E1"
              fontSize={6.5}
              textAnchor="middle"
              opacity={0.8}
            >
              Broca's
            </SvgText>
            <SvgText
              x={224} y={158}
              fill="#CBD5E1"
              fontSize={6.5}
              textAnchor="middle"
              opacity={0.8}
            >
              Wernicke's
            </SvgText>
            <SvgText
              x={296} y={140}
              fill="#CBD5E1"
              fontSize={6.5}
              textAnchor="start"
              opacity={0.8}
            >
              Visual
            </SvgText>
            <SvgText
              x={152} y={160}
              fill="#CBD5E1"
              fontSize={6.5}
              textAnchor="middle"
              opacity={0.8}
            >
              Auditory
            </SvgText>

            {/* Sulcus labels */}
            <SvgText
              x={156} y={148}
              fill="#64748B"
              fontSize={5.5}
              textAnchor="start"
              opacity={0.6}
              transform="rotate(-5, 156, 148)"
            >
              Lateral Fissure
            </SvgText>
            <SvgText
              x={162} y={58}
              fill="#64748B"
              fontSize={5.5}
              textAnchor="start"
              opacity={0.6}
              transform="rotate(80, 162, 58)"
            >
              Central Sulcus
            </SvgText>
          </G>
        )}
      </Svg>
    </View>
  );
};

export default LateralView;
